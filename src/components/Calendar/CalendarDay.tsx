import React from 'react';
import type { AstrologyEvent } from '../../data/types';
import { getEventIcon } from '../../data/utils';
import './CalendarDay.css';

interface CalendarDayProps {
  day: number | null;
  isToday: boolean;
  events: AstrologyEvent[];
  onClick?: () => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ day, isToday, events, onClick }) => {
  if (day === null) {
    return <div className="calendar-day empty"></div>;
  }

  // Grouper les événements par type pour éviter les doublons d'icônes
  const eventTypes = new Set(events.map(e => e.type));
  const uniqueEvents = Array.from(eventTypes).map(type => 
    events.find(e => e.type === type)!
  );

  return (
    <div 
      className={`calendar-day ${isToday ? 'today' : ''} ${events.length > 0 ? 'has-event' : ''}`}
      onClick={events.length > 0 ? onClick : undefined}
    >
      <span className="day-number">{day}</span>
      {uniqueEvents.length > 0 && (
        <div className="calendar-day-events">
          {uniqueEvents.map((event, index) => (
            <img
              key={index}
              src={getEventIcon(event.type)}
              alt={event.title}
              className="calendar-event-icon"
              title={event.title}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarDay;
