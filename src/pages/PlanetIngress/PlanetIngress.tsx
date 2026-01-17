import React, { useMemo } from 'react';
import Header from '../../components/Header/Header';
import EventCard from '../../components/EventCard/EventCard';
import type { PlanetIngress } from '../../data/types';
import planetIngressData from '../../data/planetIngress.json';
import { parseDate } from '../../data/utils';
import './PlanetIngress.css';

const PlanetIngress: React.FC = () => {
  const ingresses = useMemo(() => {
    const ingressList = planetIngressData as PlanetIngress[];
    return ingressList.sort((a, b) => {
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
          <h1 className="page-title">Ingrès planétaires</h1>
          <p className="page-subtitle">
            Découvrez tous les ingrès planétaires et leurs significations astrologiques
          </p>
        </div>
        <div className="events-list-page">
          {ingresses.map((ingress, index) => (
            <EventCard key={index} event={ingress} type="planet_ingress" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanetIngress;
