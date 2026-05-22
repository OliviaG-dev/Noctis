import React, { useMemo, useState } from 'react';
import Header from '../../components/Header/Header';
import EventCard from '../../components/EventCard/EventCard';
import type { FullMoon } from '../../data/types';
import fullMoonsData from '../../data/fullMoons.json';
import { parseDate } from '../../data/utils';
import './FullMoons.css';

const FullMoons: React.FC = () => {
  const [showHistory, setShowHistory] = useState(false);

  const { upcoming, history } = useMemo(() => {
    const moons = fullMoonsData as FullMoon[];
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const withDates = moons.map((moon) => {
      const eventDate = parseDate(moon.date);
      eventDate.setHours(0, 0, 0, 0);
      return { moon, eventDate };
    });

    const upcomingMoons = withDates
      .filter(({ eventDate }) => eventDate.getTime() >= now.getTime())
      .sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime())
      .map(({ moon }) => moon);

    const historicalMoons = withDates
      .filter(({ eventDate }) => eventDate.getTime() < now.getTime())
      .sort((a, b) => b.eventDate.getTime() - a.eventDate.getTime())
      .map(({ moon }) => moon);

    return {
      upcoming: upcomingMoons,
      history: historicalMoons,
    };
  }, []);

  return (
    <div className="page-container">
      <Header />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">Pleines lunes</h1>
          <p className="page-subtitle">
            Découvrez toutes les pleines lunes et leurs significations astrologiques
          </p>
        </div>
        <div className="events-list-page full-moons-page">
          {upcoming.length > 0 && (
            <section className="full-moons-section full-moons-section-upcoming">
              <h2 className="full-moons-section-title">À venir ({upcoming.length})</h2>
              {upcoming.map((moon, index) => {
                if (index === 0) {
                  return (
                    <div key={`upcoming-${moon.date}-${moon.sign}`} className="full-moons-next-focus">
                      <h3 className="full-moons-next-title">Prochaine pleine lune</h3>
                      <EventCard
                        event={moon}
                        type="full_moon"
                        isFirst={true}
                        isPast={false}
                      />
                    </div>
                  );
                }
                return (
                  <div key={`upcoming-${moon.date}-${moon.sign}`}>
                    <EventCard
                      event={moon}
                      type="full_moon"
                      isFirst={false}
                      isPast={false}
                    />
                  </div>
                );
              })}
            </section>
          )}

          {history.length > 0 && (
            <section className="full-moons-section full-moons-section-history">
              <button
                type="button"
                className={`full-moons-history-toggle ${showHistory ? 'open' : ''}`}
                onClick={() => setShowHistory((prev) => !prev)}
              >
                <span>Historique ({history.length})</span>
                <span className="full-moons-history-icon" aria-hidden="true">
                  {showHistory ? '▾' : '▸'}
                </span>
              </button>
              <div className={`full-moons-history-content ${showHistory ? 'open' : ''}`}>
                {showHistory &&
                  history.map((moon) => (
                    <EventCard
                      key={`history-${moon.date}-${moon.sign}`}
                      event={moon}
                      type="full_moon"
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

export default FullMoons;
