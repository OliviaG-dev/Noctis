import React, { useMemo, useState } from 'react';
import Header from '../../components/Header/Header';
import EventCard from '../../components/EventCard/EventCard';
import type { Retrograde } from '../../data/types';
import retrogradesData from '../../data/retrogrades.json';
import { parseDate } from '../../data/utils';
import './PlanetRetrograde.css';

const PlanetRetrograde: React.FC = () => {
  const [showHistory, setShowHistory] = useState(false);

  const { activeOrUpcoming, history } = useMemo(() => {
    const retrogradeList = retrogradesData as Retrograde[];
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const withDates = retrogradeList.map((retrograde) => {
      const startDate = parseDate(retrograde.start);
      const endDate = parseDate(retrograde.end);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      return { retrograde, startDate, endDate };
    });

    const currentAndUpcomingRetrogrades = withDates
      .filter(
        ({ startDate, endDate }) =>
          (startDate.getTime() <= now.getTime() && endDate.getTime() >= now.getTime()) ||
          startDate.getTime() >= now.getTime()
      )
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
      .map(({ retrograde }) => retrograde);

    const historicalRetrogrades = withDates
      .filter(({ endDate }) => endDate.getTime() < now.getTime())
      .sort((a, b) => b.endDate.getTime() - a.endDate.getTime())
      .map(({ retrograde }) => retrograde);

    return {
      activeOrUpcoming: currentAndUpcomingRetrogrades,
      history: historicalRetrogrades,
    };
  }, []);

  return (
    <div className="page-container">
      <Header />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Rétrogrades planétaires</h1>
          <p className="page-subtitle">
            Découvrez tous les rétrogrades planétaires et leurs significations astrologiques
          </p>
        </div>
        <div className="events-list-page retrogrades-page">
          {activeOrUpcoming.length > 0 && (
            <section className="retrogrades-section retrogrades-section-upcoming">
              <h2 className="retrogrades-section-title">
                En cours et à venir ({activeOrUpcoming.length})
              </h2>
              {activeOrUpcoming.map((retrograde, index) => {
                if (index === 0) {
                  return (
                    <div
                      key={`active-upcoming-${retrograde.start}-${retrograde.planet}`}
                      className="retrogrades-next-focus"
                    >
                      <h3 className="retrogrades-next-title">Rétrograde à suivre</h3>
                      <EventCard
                        event={retrograde}
                        type="retrograde"
                        isFirst={true}
                        isPast={false}
                      />
                    </div>
                  );
                }

                return (
                  <div key={`active-upcoming-${retrograde.start}-${retrograde.planet}`}>
                    <EventCard
                      event={retrograde}
                      type="retrograde"
                      isFirst={false}
                      isPast={false}
                    />
                  </div>
                );
              })}
            </section>
          )}

          {history.length > 0 && (
            <section className="retrogrades-section retrogrades-section-history">
              <button
                type="button"
                className={`retrogrades-history-toggle ${showHistory ? 'open' : ''}`}
                onClick={() => setShowHistory((prev) => !prev)}
              >
                <span>Historique ({history.length})</span>
                <span className="retrogrades-history-icon" aria-hidden="true">
                  {showHistory ? '▾' : '▸'}
                </span>
              </button>
              <div className={`retrogrades-history-content ${showHistory ? 'open' : ''}`}>
                {showHistory &&
                  history.map((retrograde) => (
                    <EventCard
                      key={`history-${retrograde.start}-${retrograde.planet}`}
                      event={retrograde}
                      type="retrograde"
                      isFirst={false}
                      isPast={true}
                    />
                  ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanetRetrograde;
