import React, { useMemo } from 'react';
import Header from '../../components/Header/Header';
import EventCard from '../../components/EventCard/EventCard';
import type { Eclipse } from '../../data/types';
import eclipsesData from '../../data/eclipses.json';
import { parseDate } from '../../data/utils';
import './Eclipses.css';

const Eclipses: React.FC = () => {
  const eclipses = useMemo(() => {
    const eclipseList = eclipsesData as Eclipse[];
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    return eclipseList.sort((a, b) => {
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
          <h1 className="page-title">Éclipses</h1>
          <p className="page-subtitle">
            Découvrez toutes les éclipses solaires et lunaires et leurs significations astrologiques
          </p>
        </div>
        <div className="events-list-page">
          {eclipses.map((eclipse, index) => {
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const eventDate = parseDate(eclipse.date);
            eventDate.setHours(0, 0, 0, 0);
            const isCurrentOrNext = eventDate.getTime() >= now.getTime();
            const isPast = eventDate.getTime() < now.getTime();
            return (
              <EventCard 
                key={index} 
                event={eclipse} 
                type="eclipse" 
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

export default Eclipses;
