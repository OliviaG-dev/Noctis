import React from 'react';
import './Calendar.css';

const Calendar: React.FC = () => {
  // Calendrier mensuel de base
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Premier jour du mois
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay(); // 0 = Dimanche, 1 = Lundi, etc.
  
  // Noms des jours de la semaine
  const weekDays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
  
  // Créer un tableau pour les jours du mois
  const days = [];
  
  // Ajouter des cellules vides pour les jours avant le premier jour du mois
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  
  // Ajouter tous les jours du mois
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2 className="calendar-title">
          {new Date(currentYear, currentMonth).toLocaleDateString('fr-FR', { 
            month: 'long', 
            year: 'numeric' 
          })}
        </h2>
      </div>
      
      <div className="calendar-grid">
        {/* En-têtes des jours de la semaine */}
        {weekDays.map((day, index) => (
          <div key={index} className="calendar-weekday">
            {day}
          </div>
        ))}
        
        {/* Jours du calendrier */}
        {days.map((day, index) => (
          <div 
            key={index} 
            className={`calendar-day ${day === today.getDate() ? 'today' : ''} ${day === null ? 'empty' : ''}`}
          >
            {day !== null && <span className="day-number">{day}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
