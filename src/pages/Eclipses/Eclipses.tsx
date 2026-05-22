import React, { useMemo, useState } from 'react';
import Header from '../../components/Header/Header';
import EventCard from '../../components/EventCard/EventCard';
import type { Eclipse } from '../../data/types';
import eclipsesData from '../../data/eclipses.json';
import { parseDate } from '../../data/utils';
import './Eclipses.css';

const Eclipses: React.FC = () => {
  const [showHistory, setShowHistory] = useState(false);

  const { upcoming, history } = useMemo(() => {
    const eclipseList = eclipsesData as Eclipse[];
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const withDates = eclipseList.map((eclipse) => {
      const eventDate = parseDate(eclipse.date);
      eventDate.setHours(0, 0, 0, 0);
      return { eclipse, eventDate };
    });

    const upcomingEclipses = withDates
      .filter(({ eventDate }) => eventDate.getTime() >= now.getTime())
      .sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime())
      .map(({ eclipse }) => eclipse);

    const historicalEclipses = withDates
      .filter(({ eventDate }) => eventDate.getTime() < now.getTime())
      .sort((a, b) => b.eventDate.getTime() - a.eventDate.getTime())
      .map(({ eclipse }) => eclipse);

    return {
      upcoming: upcomingEclipses,
      history: historicalEclipses,
    };
  }, []);

  return (
    <div className="page-container">
      <Header />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Éclipses</h1>
          <p className="page-subtitle">
            Découvrez toutes les éclipses solaires et lunaires et leurs significations astrologiques
          </p>
        </div>
        <div className="events-list-page eclipses-page">
          {upcoming.length > 0 && (
            <section className="eclipses-section eclipses-section-upcoming">
              <h2 className="eclipses-section-title">À venir ({upcoming.length})</h2>
              {upcoming.map((eclipse, index) => {
                if (index === 0) {
                  return (
                    <div
                      key={`upcoming-${eclipse.date}-${eclipse.eclipseType}-${eclipse.sign}`}
                      className="eclipses-next-focus"
                    >
                      <h3 className="eclipses-next-title">Prochaine éclipse</h3>
                      <EventCard
                        event={eclipse}
                        type="eclipse"
                        isFirst={true}
                        isPast={false}
                      />
                    </div>
                  );
                }
                return (
                  <div key={`upcoming-${eclipse.date}-${eclipse.eclipseType}-${eclipse.sign}`}>
                    <EventCard
                      event={eclipse}
                      type="eclipse"
                      isFirst={false}
                      isPast={false}
                    />
                  </div>
                );
              })}
            </section>
          )}

          {history.length > 0 && (
            <section className="eclipses-section eclipses-section-history">
              <button
                type="button"
                className={`eclipses-history-toggle ${showHistory ? 'open' : ''}`}
                onClick={() => setShowHistory((prev) => !prev)}
              >
                <span>Historique ({history.length})</span>
                <span className="eclipses-history-icon" aria-hidden="true">
                  {showHistory ? '▾' : '▸'}
                </span>
              </button>
              <div className={`eclipses-history-content ${showHistory ? 'open' : ''}`}>
                {showHistory &&
                  history.map((eclipse) => (
                    <EventCard
                      key={`history-${eclipse.date}-${eclipse.eclipseType}-${eclipse.sign}`}
                      event={eclipse}
                      type="eclipse"
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

export default Eclipses;
