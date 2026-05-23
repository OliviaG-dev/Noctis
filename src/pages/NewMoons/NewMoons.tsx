import React, { useMemo } from 'react';
import Header from '../../components/Header/Header';
import EventTimelineSections from '../../components/EventTimelineSections/EventTimelineSections';
import type { NewMoon } from '../../data/types';
import newMoonsData from '../../data/newMoons.json';
import { parseDate } from '../../data/utils';
import './NewMoons.css';

const NewMoons: React.FC = () => {
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
        <EventTimelineSections
          pageClassName="new-moons-page"
          classPrefix="new-moons"
          eventType="new_moon"
          upcomingTitle="À venir"
          nextTitle="Prochaine nouvelle lune"
          upcoming={upcoming}
          history={history}
          getUpcomingKey={(moon) => `upcoming-${moon.date}-${moon.sign}`}
          getHistoryKey={(moon) => `history-${moon.date}-${moon.sign}`}
        />
      </div>
    </div>
  );
};

export default NewMoons;
