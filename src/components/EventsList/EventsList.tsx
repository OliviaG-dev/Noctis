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
    description: ''
  },
  {
    type: 'full_moon',
    label: 'Pleine lune',
    description: ''
  },
  {
    type: 'retrograde',
    label: 'Rétrogrades planétaires',
    description: ''
  },
  {
    type: 'planet_ingress',
    label: 'Ingrès planétaires',
    description: ''
  },
  {
    type: 'eclipse',
    label: 'Éclipses',
    description: ''
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
          <button key={eventType.type} className="event-type-item">
            <div className="event-type-icon">
              <img 
                src={getEventIcon(eventType.type)} 
                alt={eventType.label}
                className="event-icon-img"
              />
            </div>
            <div className="event-type-content">
              <h3 className="event-type-label">{eventType.label}</h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
