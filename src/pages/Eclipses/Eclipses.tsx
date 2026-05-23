import React, { useMemo } from 'react';
import Header from '../../components/Header/Header';
import EventTimelineSections from '../../components/EventTimelineSections/EventTimelineSections';
import type { Eclipse } from '../../data/types';
import eclipsesData from '../../data/eclipses.json';
import { parseDate } from '../../data/utils';
import './Eclipses.css';

const Eclipses: React.FC = () => {
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
        <EventTimelineSections
          pageClassName="eclipses-page"
          classPrefix="eclipses"
          eventType="eclipse"
          upcomingTitle="À venir"
          nextTitle="Prochaine éclipse"
          upcoming={upcoming}
          history={history}
          getUpcomingKey={(eclipse) =>
            `upcoming-${eclipse.date}-${eclipse.eclipseType}-${eclipse.sign}`
          }
          getHistoryKey={(eclipse) =>
            `history-${eclipse.date}-${eclipse.eclipseType}-${eclipse.sign}`
          }
        />
      </div>
    </div>
  );
};

export default Eclipses;
