import React, { useMemo, useState } from 'react';
import CalendarDay from './CalendarDay';
import CalendarModal from './CalendarModal';
import type { AstrologyEvent } from '../../data/types';
import { loadAstrologyEvents, groupEventsByDate, getEventsForDate } from '../../data/utils';
import './Calendar.css';

const Calendar: React.FC = () => {
  // Calendrier mensuel de base
  const today = new Date();
  const [displayDate, setDisplayDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  
  const currentMonth = displayDate.getMonth();
  const currentYear = displayDate.getFullYear();
  
  // Fonctions de navigation
  const goToPreviousMonth = () => {
    setDisplayDate(new Date(currentYear, currentMonth - 1, 1));
  };
  
  const goToNextMonth = () => {
    setDisplayDate(new Date(currentYear, currentMonth + 1, 1));
  };
  
  const goToToday = () => {
    setDisplayDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };
  
  // Charger et organiser les événements
  const eventsByDate = useMemo(() => {
    const events = loadAstrologyEvents();
    return groupEventsByDate(events);
  }, []);

  // État de la modale
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDayClick = (date: Date, dayEvents: AstrologyEvent[]) => {
    if (dayEvents.length > 0) {
      setSelectedDate(date);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };
  
  // Premier jour du mois
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay(); // 0 = Dimanche, 1 = Lundi, etc.
  
  // Noms des jours de la semaine
  const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  
  // Créer un tableau pour les jours du mois avec leurs événements
  const days = [];
  
  // Ajouter des cellules vides pour les jours avant le premier jour du mois
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push({ day: null, date: null, isToday: false, events: [] });
  }
  
  // Ajouter tous les jours du mois avec leurs événements
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const isToday = 
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
    const events = getEventsForDate(date, eventsByDate);
    
    days.push({ day, date, isToday, events });
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-navigation">
          <button 
            className="calendar-nav-button calendar-nav-prev"
            onClick={goToPreviousMonth}
            aria-label="Mois précédent"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h2 className="calendar-title">
            {new Date(currentYear, currentMonth).toLocaleDateString('fr-FR', { 
              month: 'long', 
              year: 'numeric' 
            })}
          </h2>
          <button 
            className="calendar-nav-button calendar-nav-next"
            onClick={goToNextMonth}
            aria-label="Mois suivant"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <button 
          className="calendar-today-button"
          onClick={goToToday}
        >
          Aujourd'hui
        </button>
      </div>
      
      <div className="calendar-grid">
        {/* En-têtes des jours de la semaine */}
        {weekDays.map((day, index) => (
          <div key={index} className="calendar-weekday">
            {day}
          </div>
        ))}
        
        {/* Jours du calendrier */}
        {days.map(({ day, date, isToday, events }, index) => (
          <CalendarDay
            key={index}
            day={day}
            isToday={isToday}
            events={events}
            onClick={date ? () => handleDayClick(date, events) : undefined}
          />
        ))}
      </div>

      <CalendarModal
        isOpen={isModalOpen}
        onClose={closeModal}
        date={selectedDate}
        events={selectedDate ? getEventsForDate(selectedDate, eventsByDate) : []}
      />
    </div>
  );
};

export default Calendar;
