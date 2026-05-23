import React, { useMemo, useState } from "react";
import Header from "../../components/Header/Header";
import EventCard from "../../components/EventCard/EventCard";
import EventTimelineSections from "../../components/EventTimelineSections/EventTimelineSections";
import type { PlanetIngress } from "../../data/types";
import planetIngressData from "../../data/planetIngress.json";
import { parseDate } from "../../data/utils";
import "./PlanetIngress.css";

const UPCOMING_PAGE_SIZE = 3;

const PlanetIngressPage: React.FC = () => {
  const [upcomingPage, setUpcomingPage] = useState(0);
  const [openCurrentKeys, setOpenCurrentKeys] = useState<
    Record<string, boolean>
  >({});

  const { current, upcoming, history } = useMemo(() => {
    const ingressList = planetIngressData as PlanetIngress[];
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const withDates = ingressList.map((ingress) => {
      const startDate = parseDate(ingress.start);
      const endDate = parseDate(ingress.end);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      return { ingress, startDate, endDate };
    });

    const currentIngresses = withDates
      .filter(
        ({ startDate, endDate }) =>
          startDate.getTime() <= now.getTime() &&
          endDate.getTime() >= now.getTime(),
      )
      .sort((a, b) => a.endDate.getTime() - b.endDate.getTime())
      .map(({ ingress }) => ingress);

    const upcomingIngresses = withDates
      .filter(({ startDate }) => startDate.getTime() > now.getTime())
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
      .map(({ ingress }) => ingress);

    const historicalIngresses = withDates
      .filter(({ endDate }) => endDate.getTime() < now.getTime())
      .sort((a, b) => b.endDate.getTime() - a.endDate.getTime())
      .map(({ ingress }) => ingress);

    return {
      current: currentIngresses,
      upcoming: upcomingIngresses,
      history: historicalIngresses,
    };
  }, []);

  const toggleCurrentAccordion = (key: string) => {
    setOpenCurrentKeys((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const totalUpcomingPages = Math.ceil(upcoming.length / UPCOMING_PAGE_SIZE);
  const safeUpcomingPage = Math.min(
    upcomingPage,
    Math.max(totalUpcomingPages - 1, 0),
  );
  const paginatedUpcoming = upcoming.slice(
    safeUpcomingPage * UPCOMING_PAGE_SIZE,
    (safeUpcomingPage + 1) * UPCOMING_PAGE_SIZE,
  );

  return (
    <div className="page-container">
      <Header />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Ingrès planétaires</h1>
          <p className="page-subtitle">
            Découvrez tous les ingrès planétaires et leurs significations
            astrologiques
          </p>
        </div>
        <div className="events-list-page planet-ingress-page">
          {current.length > 0 && (
            <section className="planet-ingress-section planet-ingress-section-current">
              <h2 className="planet-ingress-section-title">
                En cours ({current.length})
              </h2>
              <div className="planet-ingress-section-content">
                {current.map((ingress) => {
                  const key = `${ingress.planet}-${ingress.start}-${ingress.sign}`;
                  const idKey = key.replace(/[^a-zA-Z0-9_-]/g, "-");
                  const toggleId = `planet-ingress-current-toggle-${idKey}`;
                  const contentId = `planet-ingress-current-content-${idKey}`;
                  const isOpen = openCurrentKeys[key] ?? false;
                  return (
                    <div key={key} className="planet-ingress-current-accordion">
                      <button
                        id={toggleId}
                        type="button"
                        className={`planet-ingress-current-toggle ${isOpen ? "open" : ""}`}
                        onClick={() => toggleCurrentAccordion(key)}
                        aria-expanded={isOpen}
                        aria-controls={contentId}
                      >
                        <span>
                          {ingress.planet} en {ingress.sign}
                        </span>
                        <span
                          className="planet-ingress-current-icon"
                          aria-hidden="true"
                        >
                          {isOpen ? "▾" : "▸"}
                        </span>
                      </button>
                      <div
                        id={contentId}
                        role="region"
                        aria-labelledby={toggleId}
                        className={`planet-ingress-current-content ${isOpen ? "open" : ""}`}
                      >
                        {isOpen && (
                          <EventCard
                            event={ingress}
                            type="planet_ingress"
                            isFirst={false}
                            isPast={false}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <EventTimelineSections
            pageClassName="planet-ingress-page-shared"
            classPrefix="planet-ingress"
            eventType="planet_ingress"
            upcomingTitle="À venir"
            nextTitle="Prochain ingrès planétaire"
            upcoming={paginatedUpcoming}
            history={history}
            upcomingCount={upcoming.length}
            showNextFocus={safeUpcomingPage === 0}
            upcomingFooter={
              totalUpcomingPages > 1 ? (
                <div className="planet-ingress-pagination-controls">
                  <button
                    type="button"
                    className="planet-ingress-pagination-btn"
                    disabled={safeUpcomingPage === 0}
                    onClick={() =>
                      setUpcomingPage((prev) => Math.max(prev - 1, 0))
                    }
                  >
                    Précédent
                  </button>
                  <span className="planet-ingress-pagination-indicator">
                    Page {safeUpcomingPage + 1} / {totalUpcomingPages}
                  </span>
                  <button
                    type="button"
                    className="planet-ingress-pagination-btn"
                    disabled={safeUpcomingPage >= totalUpcomingPages - 1}
                    onClick={() =>
                      setUpcomingPage((prev) =>
                        Math.min(prev + 1, totalUpcomingPages - 1),
                      )
                    }
                  >
                    Suivant
                  </button>
                </div>
              ) : null
            }
            getUpcomingKey={(ingress) =>
              `upcoming-${ingress.planet}-${ingress.start}-${ingress.sign}`
            }
            getHistoryKey={(ingress) =>
              `history-${ingress.planet}-${ingress.start}-${ingress.sign}`
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PlanetIngressPage;
