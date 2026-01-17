import React from 'react';
import type { NewMoon, FullMoon, Eclipse, PlanetIngress, Retrograde } from '../../data/types';
import { parseDate } from '../../data/utils';
import './EventCard.css';

interface EventCardProps {
  event: NewMoon | FullMoon | Eclipse | PlanetIngress | Retrograde;
  type: 'new_moon' | 'full_moon' | 'eclipse' | 'planet_ingress' | 'retrograde';
}

const EventCard: React.FC<EventCardProps> = ({ event, type }) => {
  const dateStr = 'date' in event ? event.date : event.start;
  const date = parseDate(dateStr);

  const sign = 'sign' in event ? event.sign : undefined;
  const planet = 'planet' in event ? event.planet : undefined;

  return (
    <div className="event-card">
      <div className="event-card-header">
        <div className="event-card-date">
          <span className="event-card-day">{date.getDate()}</span>
          <span className="event-card-month">{date.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase()}</span>
          <span className="event-card-year">{date.getFullYear()}</span>
        </div>
        <div className="event-card-title-section">
          <h3 className="event-card-title">{event.title}</h3>
          <p className="event-card-subtitle">{event.subtitle}</p>
          <div className="event-card-meta">
            {sign && <span className="event-card-sign">♈ {sign}</span>}
            {planet && <span className="event-card-planet">🪐 {planet}</span>}
            {type === 'eclipse' && 'type' in event && (
              <span className="event-card-type">
                {event.type === 'solar_total' ? '☀️ Éclipse solaire totale' :
                 event.type === 'solar_partial' ? '☀️ Éclipse solaire partielle' :
                 event.type === 'solar_annular' ? '☀️ Éclipse solaire annulaire' :
                 event.type === 'lunar_total' ? '🌙 Éclipse lunaire totale' :
                 event.type === 'lunar_partial' ? '🌙 Éclipse lunaire partielle' :
                 '🌙 Éclipse lunaire pénombrale'}
              </span>
            )}
            {type === 'planet_ingress' && 'end' in event && (
              <span className="event-card-duration">
                Du {parseDate(event.start).toLocaleDateString('fr-FR')} au {parseDate(event.end).toLocaleDateString('fr-FR')}
              </span>
            )}
            {type === 'retrograde' && 'end' in event && (
              <span className="event-card-duration">
                Du {parseDate(event.start).toLocaleDateString('fr-FR')} au {parseDate(event.end).toLocaleDateString('fr-FR')}
              </span>
            )}
          </div>
        </div>
      </div>

      {event.keywords && event.keywords.length > 0 && (
        <div className="event-card-keywords">
          {event.keywords.map((keyword, index) => (
            <span key={index} className="keyword-tag">{keyword}</span>
          ))}
        </div>
      )}

      {event.energy && (
        <div className="event-card-energy">
          <h4>Énergie</h4>
          <div className="energy-bars">
            <div className="energy-bar">
              <span>Intensité</span>
              <div className="energy-bar-fill" style={{ width: `${(event.energy.intensity / 5) * 100}%` }}></div>
            </div>
            <div className="energy-bar">
              <span>Émotionnel</span>
              <div className="energy-bar-fill" style={{ width: `${(event.energy.emotional / 5) * 100}%` }}></div>
            </div>
            <div className="energy-bar">
              <span>Mental</span>
              <div className="energy-bar-fill" style={{ width: `${(event.energy.mental / 5) * 100}%` }}></div>
            </div>
          </div>
        </div>
      )}

      {event.effects && (
        <div className="event-card-effects">
          <h4>Effets</h4>
          {event.effects.general && event.effects.general.length > 0 && (
            <div className="effects-section">
              <strong>Général :</strong>
              <ul>
                {event.effects.general.map((effect, index) => (
                  <li key={index}>{effect}</li>
                ))}
              </ul>
            </div>
          )}
          {event.effects.emotional && event.effects.emotional.length > 0 && (
            <div className="effects-section">
              <strong>Émotionnel :</strong>
              <ul>
                {event.effects.emotional.map((effect, index) => (
                  <li key={index}>{effect}</li>
                ))}
              </ul>
            </div>
          )}
          {event.effects.spiritual && event.effects.spiritual.length > 0 && (
            <div className="effects-section">
              <strong>Spirituel :</strong>
              <ul>
                {event.effects.spiritual.map((effect, index) => (
                  <li key={index}>{effect}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {event.advice && (
        <div className="event-card-advice">
          <h4>Conseils</h4>
          <div className="advice-section">
            {event.advice.do && event.advice.do.length > 0 && (
              <div className="advice-do">
                <strong>À faire :</strong>
                <ul>
                  {event.advice.do.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {event.advice.avoid && event.advice.avoid.length > 0 && (
              <div className="advice-avoid">
                <strong>À éviter :</strong>
                <ul>
                  {event.advice.avoid.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {'intentions' in event && event.intentions && event.intentions.length > 0 && (
        <div className="event-card-intentions">
          <h4>Intentions</h4>
          <ul>
            {event.intentions.map((intention, index) => (
              <li key={index}>{intention}</li>
            ))}
          </ul>
        </div>
      )}

      {event.rituals && event.rituals.length > 0 && (
        <div className="event-card-rituals">
          <h4>Rituels</h4>
          <ul>
            {event.rituals.map((ritual, index) => (
              <li key={index}>{ritual}</li>
            ))}
          </ul>
        </div>
      )}

      {'affirmations' in event && event.affirmations && event.affirmations.length > 0 && (
        <div className="event-card-affirmations">
          <h4>Affirmations</h4>
          <ul>
            {event.affirmations.map((affirmation, index) => (
              <li key={index}>"{affirmation}"</li>
            ))}
          </ul>
        </div>
      )}

      {type === 'retrograde' && 'phases' in event && event.phases && event.phases.length > 0 && (
        <div className="event-card-phases">
          <h4>Phases</h4>
          <div className="phases-list">
            {event.phases.map((phase, index) => (
              <div key={index} className="phase-item">
                <span className="phase-sign">♈ {phase.sign}</span>
                <span className="phase-dates">
                  {parseDate(phase.start).toLocaleDateString('fr-FR')} - {parseDate(phase.end).toLocaleDateString('fr-FR')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
