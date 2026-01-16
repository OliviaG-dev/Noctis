import React from 'react';
import { getEventIcon } from '../../data/utils';
import './EventsList.css';

interface EventTypeInfo {
  type: 'new_moon' | 'full_moon' | 'retrograde' | 'eclipse' | 'planet_ingress';
  label: string;
  description: string;
}

const eventTypes: EventTypeInfo[] = [
  {
    type: 'new_moon',
    label: 'Nouvelle lune',
    description: 'Début d\'un nouveau cycle lunaire, moment propice pour les nouveaux départs'
  },
  {
    type: 'full_moon',
    label: 'Pleine lune',
    description: 'Apogée du cycle lunaire, période d\'accomplissement et de libération'
  },
  {
    type: 'retrograde',
    label: 'Rétrogrades planétaires',
    description: 'Périodes de réflexion et de révision, idéales pour ralentir et réfléchir'
  },
  {
    type: 'planet_ingress',
    label: 'Ingrès planétaires',
    description: 'Changement de signe des planètes, marquant des transitions importantes'
  },
  {
    type: 'eclipse',
    label: 'Éclipses',
    description: 'Moments puissants de transformation et de changement de direction'
  }
];

const EventsList: React.FC = () => {
  return (
    <div className="events-list-container">
      <div className="events-list-header">
        <h2 className="events-list-title">Événements astrologiques</h2>
        <p className="events-list-subtitle">
          Découvrez les différents types d'événements célestes suivis par Noctis
        </p>
      </div>
      
      <div className="events-list">
        {eventTypes.map((eventType) => (
          <div key={eventType.type} className="event-type-item">
            <div className="event-type-icon">
              <img 
                src={getEventIcon(eventType.type)} 
                alt={eventType.label}
                className="event-icon-img"
              />
            </div>
            <div className="event-type-content">
              <h3 className="event-type-label">{eventType.label}</h3>
              <p className="event-type-description">{eventType.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
