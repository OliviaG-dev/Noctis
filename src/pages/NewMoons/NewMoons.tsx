import React, { useMemo } from 'react';
import Header from '../../components/Header/Header';
import EventCard from '../../components/EventCard/EventCard';
import type { NewMoon } from '../../data/types';
import newMoonsData from '../../data/newMoons.json';
import { parseDate } from '../../data/utils';
import './NewMoons.css';

const NewMoons: React.FC = () => {
  const newMoons = useMemo(() => {
    const moons = newMoonsData as NewMoon[];
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
          <h1 className="page-title">Nouvelles lunes</h1>
          <p className="page-subtitle">
            Découvrez toutes les nouvelles lunes et leurs significations astrologiques
          </p>
        </div>
        <div className="events-list-page">
          {newMoons.map((moon, index) => (
            <EventCard key={index} event={moon} type="new_moon" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewMoons;
