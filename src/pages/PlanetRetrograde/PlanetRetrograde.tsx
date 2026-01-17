import React, { useMemo } from 'react';
import Header from '../../components/Header/Header';
import EventCard from '../../components/EventCard/EventCard';
import type { Retrograde } from '../../data/types';
import retrogradesData from '../../data/retrogrades.json';
import { parseDate } from '../../data/utils';
import './PlanetRetrograde.css';

const PlanetRetrograde: React.FC = () => {
  const retrogrades = useMemo(() => {
    const retrogradeList = retrogradesData as Retrograde[];
    return retrogradeList.sort((a, b) => {
      const dateA = parseDate(a.start);
      const dateB = parseDate(b.start);
      return dateB.getTime() - dateA.getTime(); // Plus récent en premier
    });
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
        <div className="events-list-page">
          {retrogrades.map((retrograde, index) => (
            <EventCard key={index} event={retrograde} type="retrograde" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanetRetrograde;
