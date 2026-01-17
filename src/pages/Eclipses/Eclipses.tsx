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
    return eclipseList.sort((a, b) => {
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
          <h1 className="page-title">Éclipses</h1>
          <p className="page-subtitle">
            Découvrez toutes les éclipses solaires et lunaires et leurs significations astrologiques
          </p>
        </div>
        <div className="events-list-page">
          {eclipses.map((eclipse, index) => (
            <EventCard key={index} event={eclipse} type="eclipse" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Eclipses;
