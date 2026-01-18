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
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    return moons.sort((a, b) => {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      dateA.setHours(0, 0, 0, 0);
      dateB.setHours(0, 0, 0, 0);
      
      const isACurrentOrNext = dateA.getTime() >= now.getTime();
      const isBCurrentOrNext = dateB.getTime() >= now.getTime();
      
      // Si un est en cours/prochain et l'autre non, celui en cours/prochain passe en premier
      if (isACurrentOrNext && !isBCurrentOrNext) return -1;
      if (!isACurrentOrNext && isBCurrentOrNext) return 1;
      
      // Si les deux sont en cours/prochain ou les deux sont passés, trier par date (croissante)
      return dateA.getTime() - dateB.getTime();
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
          {newMoons.map((moon, index) => {
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const eventDate = parseDate(moon.date);
            eventDate.setHours(0, 0, 0, 0);
            const isCurrentOrNext = eventDate.getTime() >= now.getTime();
            const isPast = eventDate.getTime() < now.getTime();
            return (
              <EventCard 
                key={index} 
                event={moon} 
                type="new_moon" 
                isFirst={index === 0 && isCurrentOrNext}
                isPast={isPast}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NewMoons;
