import React, { useMemo, useState } from 'react';
import Header from '../../components/Header/Header';
import EventCard from '../../components/EventCard/EventCard';
import type { NewMoon } from '../../data/types';
import newMoonsData from '../../data/newMoons.json';
import { parseDate } from '../../data/utils';
import './NewMoons.css';

const NewMoons: React.FC = () => {
  const [showHistory, setShowHistory] = useState(false);

  const { upcoming, history } = useMemo(() => {
    const moons = newMoonsData as NewMoon[];
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
          <h1 className="page-title">Nouvelles lunes</h1>
          <p className="page-subtitle">
            Découvrez toutes les nouvelles lunes et leurs significations astrologiques
          </p>
        </div>
        <div className="events-list-page new-moons-page">
          {upcoming.length > 0 && (
            <section className="new-moons-section new-moons-section-upcoming">
              <h2 className="new-moons-section-title">À venir ({upcoming.length})</h2>
              {upcoming.map((moon, index) => {
                if (index === 0) {
                  return (
                    <div key={`upcoming-${moon.date}-${moon.sign}`} className="new-moons-next-focus">
                      <h3 className="new-moons-next-title">Prochaine nouvelle lune</h3>
                      <EventCard
                        event={moon}
                        type="new_moon"
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
                      type="new_moon"
                      isFirst={false}
                      isPast={false}
                    />
                  </div>
                );
              })}
            </section>
          )}

          {history.length > 0 && (
            <section className="new-moons-section new-moons-section-history">
              <button
                type="button"
                className={`new-moons-history-toggle ${showHistory ? 'open' : ''}`}
                onClick={() => setShowHistory((prev) => !prev)}
              >
                <span>Historique ({history.length})</span>
                <span className="new-moons-history-icon" aria-hidden="true">
                  {showHistory ? '▾' : '▸'}
                </span>
              </button>
              <div className={`new-moons-history-content ${showHistory ? 'open' : ''}`}>
                {showHistory &&
                  history.map((moon) => (
                    <EventCard
                      key={`history-${moon.date}-${moon.sign}`}
                      event={moon}
                      type="new_moon"
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

export default NewMoons;
