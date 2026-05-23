import React, { useMemo } from 'react';
import Header from '../../components/Header/Header';
import EventTimelineSections from '../../components/EventTimelineSections/EventTimelineSections';
import type { Retrograde } from '../../data/types';
import retrogradesData from '../../data/retrogrades.json';
import { parseDate } from '../../data/utils';
import './PlanetRetrograde.css';

const PlanetRetrograde: React.FC = () => {
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
        <EventTimelineSections
          pageClassName="retrogrades-page"
          classPrefix="retrogrades"
          eventType="retrograde"
          upcomingTitle="En cours et à venir"
          nextTitle="Rétrograde à suivre"
          upcoming={activeOrUpcoming}
          history={history}
          getUpcomingKey={(retrograde) => `active-upcoming-${retrograde.start}-${retrograde.planet}`}
          getHistoryKey={(retrograde) => `history-${retrograde.start}-${retrograde.planet}`}
        />
      </div>
    </div>
  );
};

export default PlanetRetrograde;
