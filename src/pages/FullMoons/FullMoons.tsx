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
          <h1 className="page-title">Pleines lunes</h1>
          <p className="page-subtitle">
            Découvrez toutes les pleines lunes et leurs significations astrologiques
          </p>
        </div>
        <div className="events-list-page">
          {fullMoons.map((moon, index) => {
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
                type="full_moon" 
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

export default FullMoons;
