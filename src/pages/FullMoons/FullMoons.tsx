import React, { useMemo } from 'react';
import Header from '../../components/Header/Header';
import EventCard from '../../components/EventCard/EventCard';
import type { FullMoon } from '../../data/types';
import fullMoonsData from '../../data/fullMoons.json';
import { parseDate } from '../../data/utils';
import './FullMoons.css';

const FullMoons: React.FC = () => {
  const fullMoons = useMemo(() => {
    const moons = fullMoonsData as FullMoon[];
    return moons.sort((a, b) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      return dateB.getTime() - dateA.getTime(); // Plus récent en premier
    });
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
        <div className="events-list-page">
          {fullMoons.map((moon, index) => (
            <EventCard key={index} event={moon} type="full_moon" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FullMoons;
