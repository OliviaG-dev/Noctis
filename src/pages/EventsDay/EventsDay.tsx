import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import EventCard from '../../components/EventCard/EventCard';
import { loadCompleteEventsForDate, parseDate } from '../../data/utils';
import './EventsDay.css';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="events-day-accordion-item">
      <button 
        className={`events-day-accordion-header ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <span className="events-day-accordion-icon">{isOpen ? '▼' : '▶'}</span>
      </button>
      <div className={`events-day-accordion-content ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
};

const EventsDay: React.FC = () => {
  const { date } = useParams<{ date: string }>();

  const events = useMemo(() => {
    if (!date) return [];
    return loadCompleteEventsForDate(date);
  }, [date]);

  const dayDate = useMemo(() => {
    if (!date) return null;
    return parseDate(date);
  }, [date]);

  if (!date || !dayDate) {
    return (
      <div className="page-container">
        <Header />
        <div className="page-content">
          <p>Date invalide</p>
        </div>
      </div>
    );
  }

  const formattedDate = dayDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <div className="page-container">
      <Header />
      <div className="page-content">
        <div className="page-header">
          <h1 className="page-title">{capitalizedDate}</h1>
          <p className="page-subtitle">
            Tous les événements astrologiques de ce jour
          </p>
        </div>

        {events.length === 0 ? (
          <div className="events-day-empty">
            <p>Aucun événement pour ce jour</p>
          </div>
        ) : (
          <div className="events-day-accordion">
            {events.map(({ event, type }, index) => {
              const now = new Date();
              now.setHours(0, 0, 0, 0);
              const eventDate = 'date' in event ? parseDate(event.date) : parseDate(event.start);
              eventDate.setHours(0, 0, 0, 0);
              
              const isPast = 
                ('date' in event ? eventDate.getTime() < now.getTime() :
                 ('end' in event) ? parseDate(event.end).getTime() < now.getTime() :
                 false);

              // Pour les ingress planétaires, modifier le titre si ce n'est pas le premier jour
              let accordionTitle = event.title;
              if (type === 'planet_ingress' && 'start' in event && 'planet' in event && 'sign' in event) {
                const isFirstDay = date === event.start;
                if (!isFirstDay) {
                  accordionTitle = `${event.planet} en ${event.sign}`;
                }
              }

              return (
                <AccordionItem 
                  key={`${type}-${index}`}
                  title={accordionTitle}
                  defaultOpen={false}
                >
                  <EventCard
                    event={event}
                    type={type}
                    isFirst={false}
                    isPast={isPast}
                    hideDetailsAccordion={true}
                  />
                </AccordionItem>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsDay;
