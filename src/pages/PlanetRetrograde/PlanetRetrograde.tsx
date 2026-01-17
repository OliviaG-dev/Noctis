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
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    
    return retrogradeList.sort((a, b) => {
      const startA = parseDate(a.start);
      const startB = parseDate(b.start);
      const endA = parseDate(a.end);
      const endB = parseDate(b.end);
      startA.setHours(0, 0, 0, 0);
      startB.setHours(0, 0, 0, 0);
      endA.setHours(0, 0, 0, 0);
      endB.setHours(0, 0, 0, 0);
      
      // Vérifier si l'événement est en cours (now est entre start et end)
      const isACurrentOrNext = (startA.getTime() <= now.getTime() && endA.getTime() >= now.getTime()) || startA.getTime() >= now.getTime();
      const isBCurrentOrNext = (startB.getTime() <= now.getTime() && endB.getTime() >= now.getTime()) || startB.getTime() >= now.getTime();
      
      // Si un est en cours/prochain et l'autre non, celui en cours/prochain passe en premier
      if (isACurrentOrNext && !isBCurrentOrNext) return -1;
      if (!isACurrentOrNext && isBCurrentOrNext) return 1;
      
      // Si les deux sont en cours/prochain ou les deux sont passés, trier par date de début (croissante)
      return startA.getTime() - startB.getTime();
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
          {retrogrades.map((retrograde, index) => {
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const startDate = parseDate(retrograde.start);
            const endDate = parseDate(retrograde.end);
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(0, 0, 0, 0);
            const isCurrentOrNext = (startDate.getTime() <= now.getTime() && endDate.getTime() >= now.getTime()) || startDate.getTime() >= now.getTime();
            const isPast = endDate.getTime() < now.getTime();
            return (
              <EventCard 
                key={index} 
                event={retrograde} 
                type="retrograde" 
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

export default PlanetRetrograde;
