import React from 'react';
import type { AstrologyEvent } from '../../data/types';
import { getEventIcon } from '../../data/utils';
import './CalendarModal.css';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  events: AstrologyEvent[];
}

const CalendarModal: React.FC<CalendarModalProps> = ({ isOpen, onClose, date, events }) => {
  if (!isOpen || !date) return null;

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const formattedDate = date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <div className="calendar-modal-overlay" onClick={onClose}>
      <div className="calendar-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="calendar-modal-header">
          <h2 className="calendar-modal-title">{capitalizedDate}</h2>
          <button 
            className="calendar-modal-close"
            onClick={onClose}
            aria-label="Fermer"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="calendar-modal-body">
          {events.length === 0 ? (
            <p className="calendar-modal-empty">Aucun événement pour ce jour</p>
          ) : (
            <div className="calendar-modal-events">
              {events.map((event, index) => (
                <div key={`${event.type}-${event.date}-${index}`} className="calendar-modal-event-item">
                  <div className="calendar-modal-event-icon">
                    <img 
                      src={getEventIcon(event.type)}
                      alt={event.title}
                    />
                  </div>
                  <div className="calendar-modal-event-details">
                    <h3 className="calendar-modal-event-title">{event.title}</h3>
                    <p className="calendar-modal-event-description">{event.description}</p>
                    <div className="calendar-modal-event-tags">
                      {event.sign && (
                        <span className="calendar-modal-event-sign">{event.sign}</span>
                      )}
                      {event.planet && (
                        <span className="calendar-modal-event-planet">{event.planet}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
