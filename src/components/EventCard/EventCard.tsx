import React, { useState } from 'react';
import type { NewMoon, FullMoon, Eclipse, PlanetIngress, Retrograde, AstrologicalSign, Planet, EclipseType } from '../../data/types';
import { parseDate } from '../../data/utils';
import { StarIcon, ArrowRightIcon, CheckIcon, XIcon, SparkleIcon, ShootingStarIcon } from './Icons';
import './EventCard.css';

const formatIngressDuration = (start: string, end: string): string => {
  const startDate = parseDate(start);
  const endDate = parseDate(end);
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays >= 365) {
    const years = Math.floor(diffDays / 365);
    const remainingDays = diffDays % 365;
    if (remainingDays >= 30) {
      const months = Math.floor(remainingDays / 30);
      if (months > 0) {
        return `${years} an${years > 1 ? 's' : ''} et ${months} mois`;
      }
    }
    return `${years} an${years > 1 ? 's' : ''}`;
  } else if (diffDays >= 30) {
    const months = Math.floor(diffDays / 30);
    const remainingDays = diffDays % 30;
    if (remainingDays >= 7) {
      const weeks = Math.floor(remainingDays / 7);
      if (weeks > 0) {
        return `${months} mois et ${weeks} semaine${weeks > 1 ? 's' : ''}`;
      }
    }
    return `${months} mois`;
  } else {
    return `${diffDays} jour${diffDays > 1 ? 's' : ''}`;
  }
};

interface EventCardProps {
  event: NewMoon | FullMoon | Eclipse | PlanetIngress | Retrograde;
  type: 'new_moon' | 'full_moon' | 'eclipse' | 'planet_ingress' | 'retrograde';
  isFirst?: boolean;
  isPast?: boolean;
  hideDetailsAccordion?: boolean;
}

const getSignIcon = (sign: AstrologicalSign | undefined): string | null => {
  if (!sign) return null;
  
  const signMap: Record<string, string> = {
    'Bélier': 'belier',
    'Taureau': 'taureau',
    'Gémeaux': 'gemeaux',
    'Cancer': 'cancer',
    'Lion': 'lion',
    'Vierge': 'vierge',
    'Balance': 'balance',
    'Scorpion': 'scorpion',
    'Sagittaire': 'sagitaire',
    'Capricorne': 'capricorne',
    'Verseau': 'verseau',
    'Poissons': 'poisson',
    'Aries': 'belier' // Variante anglaise
  };

  const iconName = signMap[sign];
  return iconName ? `/icone/astro/${iconName}.png` : null;
};

const getPlanetIcon = (planet: Planet | undefined): string | null => {
  if (!planet) return null;
  
  const planetMap: Record<string, string> = {
    'Mercure': 'mercure',
    'Venus': 'venus',
    'Vénus': 'venus', // Variante avec accent
    'Mars': 'mars',
    'Jupiter': 'jupiter',
    'Saturne': 'saturne',
    'Uranus': 'uranus',
    'Neptune': 'neptune',
    'Pluton': 'pluton'
  };

  const iconName = planetMap[planet];
  return iconName ? `/icone/planets/${iconName}.png` : null;
};

const getEclipseIcon = (eclipseType: EclipseType | undefined): string | null => {
  if (!eclipseType) return null;
  
  const eclipseMap: Record<string, string> = {
    'solar_total': 'solaire-totale',
    'solar_annular': 'solaire-annulaire',
    'solar_partial': 'solaire-totale', // Fallback si pas d'icône spécifique
    'lunar_total': 'lunaire-totale',
    'lunar_partial': 'lunaire-partielle',
    'lunar_penumbral': 'lunaire-penombrale'
  };

  const iconName = eclipseMap[eclipseType];
  return iconName ? `/icone/eclipses/${iconName}.png` : null;
};

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="accordion-item">
      <button 
        className={`accordion-header ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <span className="accordion-icon">{isOpen ? '▼' : '▶'}</span>
      </button>
      <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
        {children}
      </div>
    </div>
  );
};

const EventCard: React.FC<EventCardProps> = ({ event, type, isFirst = false, isPast = false, hideDetailsAccordion = false }) => {
  const dateStr = 'date' in event ? event.date : event.start;
  const date = parseDate(dateStr);

  const sign = 'sign' in event ? event.sign : undefined;
  const planet = 'planet' in event ? event.planet : undefined;
  const eclipseType = type === 'eclipse' && 'type' in event ? event.type : undefined;

  return (
    <div className={`event-card ${isFirst ? 'event-card-first' : ''} ${isPast ? 'event-card-past' : ''}`}>
      <div className="event-card-header">
        <div className="event-card-date">
          <span className="event-card-day">{date.getDate()}</span>
          <span className="event-card-month">{date.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase()}</span>
          <span className="event-card-year">{date.getFullYear()}</span>
        </div>
        <div className="event-card-title-section">
          <h3 className="event-card-title">{event.title}</h3>
          {eclipseType && getEclipseIcon(eclipseType) && (
            <img 
              src={getEclipseIcon(eclipseType)!} 
              alt={eclipseType} 
              className="event-card-sign-icon"
            />
          )}
          {sign && getSignIcon(sign) && type !== 'planet_ingress' && type !== 'retrograde' && type !== 'eclipse' && (
            <img 
              src={getSignIcon(sign)!} 
              alt={sign} 
              className="event-card-sign-icon"
            />
          )}
          {planet && getPlanetIcon(planet) && type !== 'eclipse' && (
            <img 
              src={getPlanetIcon(planet)!} 
              alt={planet} 
              className="event-card-sign-icon"
            />
          )}
          <p className="event-card-subtitle">
            {event.subtitle}
            {type === 'planet_ingress' && 'start' in event && 'end' in event && (
              <span className="subtitle-duration"> • Durée : {formatIngressDuration(event.start, event.end)}</span>
            )}
          </p>
          <div className="event-card-meta">
            {sign && <span className="event-card-sign">{sign}</span>}
            {planet && <span className="event-card-planet">{planet}</span>}
            {type === 'eclipse' && 'type' in event && (
              <span className="event-card-type">
                {event.type === 'solar_total' ? 'Éclipse solaire totale' :
                 event.type === 'solar_partial' ? 'Éclipse solaire partielle' :
                 event.type === 'solar_annular' ? 'Éclipse solaire annulaire' :
                 event.type === 'lunar_total' ? 'Éclipse lunaire totale' :
                 event.type === 'lunar_partial' ? 'Éclipse lunaire partielle' :
                 'Éclipse lunaire pénombrale'}
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

      {hideDetailsAccordion ? (
        <div className="event-card-accordion-content">
          {event.keywords && event.keywords.length > 0 && (
            <div className="accordion-section">
              <h4>Mots-clés</h4>
              <div className="event-card-keywords">
                {event.keywords.map((keyword, index) => (
                  <span key={index} className="keyword-tag">{keyword}</span>
                ))}
              </div>
            </div>
          )}

          {event.energy && (
            <div className="accordion-section">
              <h4>Énergie</h4>
              <div className="event-card-energy">
                <div className="energy-bars">
                  <div className="energy-bar">
                    <span>Intensité</span>
                    <div className="energy-bar-container">
                      <div className="energy-bar-fill" style={{ width: `${(event.energy.intensity / 5) * 100}%` }}></div>
                    </div>
                  </div>
                  <div className="energy-bar">
                    <span>Émotionnel</span>
                    <div className="energy-bar-container">
                      <div className="energy-bar-fill" style={{ width: `${(event.energy.emotional / 5) * 100}%` }}></div>
                    </div>
                  </div>
                  <div className="energy-bar">
                    <span>Mental</span>
                    <div className="energy-bar-container">
                      <div className="energy-bar-fill" style={{ width: `${(event.energy.mental / 5) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {event.effects && (
            <div className="accordion-section">
              <h4>Effets</h4>
              <div className="event-card-effects">
                {event.effects.general && event.effects.general.length > 0 && (
                  <div className="effects-section">
                    <strong>
                      <StarIcon className="effects-icon" />
                      Général :
                    </strong>
                    <ul>
                      {event.effects.general.map((effect, index) => (
                        <li key={index}>
                          <ArrowRightIcon className="effects-arrow" />
                          {effect}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {event.effects.emotional && event.effects.emotional.length > 0 && (
                  <div className="effects-section">
                    <strong>
                      <StarIcon className="effects-icon" />
                      Émotionnel :
                    </strong>
                    <ul>
                      {event.effects.emotional.map((effect, index) => (
                        <li key={index}>
                          <ArrowRightIcon className="effects-arrow" />
                          {effect}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {event.effects.spiritual && event.effects.spiritual.length > 0 && (
                  <div className="effects-section">
                    <strong>
                      <StarIcon className="effects-icon" />
                      Spirituel :
                    </strong>
                    <ul>
                      {event.effects.spiritual.map((effect, index) => (
                        <li key={index}>
                          <ArrowRightIcon className="effects-arrow" />
                          {effect}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {event.advice && (
            <div className="accordion-section">
              <h4>Conseils</h4>
              <div className="event-card-advice">
                <div className="advice-section">
                  {event.advice.do && event.advice.do.length > 0 && (
                    <div className="advice-do">
                      <strong>À faire :</strong>
                      <ul>
                        {event.advice.do.map((item, index) => (
                          <li key={index}>
                            <CheckIcon className="advice-check" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {event.advice.avoid && event.advice.avoid.length > 0 && (
                    <div className="advice-avoid">
                      <strong>À éviter :</strong>
                      <ul>
                        {event.advice.avoid.map((item, index) => (
                          <li key={index}>
                            <XIcon className="advice-x" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {'intentions' in event && event.intentions && event.intentions.length > 0 && (
            <div className="accordion-section">
              <h4>Intentions</h4>
              <div className="event-card-intentions">
                <ul>
                  {event.intentions.map((intention, index) => (
                    <li key={index}>
                      <StarIcon className="intentions-icon" />
                      {intention}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {event.rituals && event.rituals.length > 0 && (
            <div className="accordion-section">
              <h4>Rituels</h4>
              <div className="event-card-rituals">
                <ul>
                  {event.rituals.map((ritual, index) => (
                    <li key={index}>
                      <SparkleIcon className="rituals-icon" />
                      {ritual}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {'affirmations' in event && event.affirmations && event.affirmations.length > 0 && (
            <div className="accordion-section">
              <h4>Affirmations</h4>
              <div className="event-card-affirmations">
                <ul>
                  {event.affirmations.map((affirmation, index) => (
                    <li key={index}>
                      <ShootingStarIcon className="affirmations-icon" />
                      "{affirmation}"
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {type === 'retrograde' && 'phases' in event && event.phases && event.phases.length > 0 && (
            <div className="accordion-section">
              <h4>Phases</h4>
              <div className="event-card-phases">
                <div className="phases-list">
                  {event.phases.map((phase, index) => (
                    <div key={index} className="phase-item">
                      <span className="phase-sign">{phase.sign}</span>
                      <span className="phase-dates">
                        {parseDate(phase.start).toLocaleDateString('fr-FR')} - {parseDate(phase.end).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <AccordionItem title="Détails">
          <div className="event-card-accordion-content">
            {event.keywords && event.keywords.length > 0 && (
              <div className="accordion-section">
                <h4>Mots-clés</h4>
                <div className="event-card-keywords">
                  {event.keywords.map((keyword, index) => (
                    <span key={index} className="keyword-tag">{keyword}</span>
                  ))}
                </div>
              </div>
            )}

            {event.energy && (
              <div className="accordion-section">
                <h4>Énergie</h4>
                <div className="event-card-energy">
                  <div className="energy-bars">
                    <div className="energy-bar">
                      <span>Intensité</span>
                      <div className="energy-bar-container">
                        <div className="energy-bar-fill" style={{ width: `${(event.energy.intensity / 5) * 100}%` }}></div>
                      </div>
                    </div>
                    <div className="energy-bar">
                      <span>Émotionnel</span>
                      <div className="energy-bar-container">
                        <div className="energy-bar-fill" style={{ width: `${(event.energy.emotional / 5) * 100}%` }}></div>
                      </div>
                    </div>
                    <div className="energy-bar">
                      <span>Mental</span>
                      <div className="energy-bar-container">
                        <div className="energy-bar-fill" style={{ width: `${(event.energy.mental / 5) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {event.effects && (
              <div className="accordion-section">
                <h4>Effets</h4>
                <div className="event-card-effects">
                  {event.effects.general && event.effects.general.length > 0 && (
                    <div className="effects-section">
                      <strong>
                        <StarIcon className="effects-icon" />
                        Général :
                      </strong>
                      <ul>
                        {event.effects.general.map((effect, index) => (
                          <li key={index}>
                            <ArrowRightIcon className="effects-arrow" />
                            {effect}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {event.effects.emotional && event.effects.emotional.length > 0 && (
                    <div className="effects-section">
                      <strong>
                        <StarIcon className="effects-icon" />
                        Émotionnel :
                      </strong>
                      <ul>
                        {event.effects.emotional.map((effect, index) => (
                          <li key={index}>
                            <ArrowRightIcon className="effects-arrow" />
                            {effect}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {event.effects.spiritual && event.effects.spiritual.length > 0 && (
                    <div className="effects-section">
                      <strong>
                        <StarIcon className="effects-icon" />
                        Spirituel :
                      </strong>
                      <ul>
                        {event.effects.spiritual.map((effect, index) => (
                          <li key={index}>
                            <ArrowRightIcon className="effects-arrow" />
                            {effect}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {event.advice && (
              <div className="accordion-section">
                <h4>Conseils</h4>
                <div className="event-card-advice">
                  <div className="advice-section">
                    {event.advice.do && event.advice.do.length > 0 && (
                      <div className="advice-do">
                        <strong>À faire :</strong>
                        <ul>
                          {event.advice.do.map((item, index) => (
                            <li key={index}>
                              <CheckIcon className="advice-check" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {event.advice.avoid && event.advice.avoid.length > 0 && (
                      <div className="advice-avoid">
                        <strong>À éviter :</strong>
                        <ul>
                          {event.advice.avoid.map((item, index) => (
                            <li key={index}>
                              <XIcon className="advice-x" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {'intentions' in event && event.intentions && event.intentions.length > 0 && (
              <div className="accordion-section">
                <h4>Intentions</h4>
                <div className="event-card-intentions">
                  <ul>
                    {event.intentions.map((intention, index) => (
                      <li key={index}>
                        <StarIcon className="intentions-icon" />
                        {intention}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {event.rituals && event.rituals.length > 0 && (
              <div className="accordion-section">
                <h4>Rituels</h4>
                <div className="event-card-rituals">
                  <ul>
                    {event.rituals.map((ritual, index) => (
                      <li key={index}>
                        <SparkleIcon className="rituals-icon" />
                        {ritual}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {'affirmations' in event && event.affirmations && event.affirmations.length > 0 && (
              <div className="accordion-section">
                <h4>Affirmations</h4>
                <div className="event-card-affirmations">
                  <ul>
                    {event.affirmations.map((affirmation, index) => (
                      <li key={index}>
                        <ShootingStarIcon className="affirmations-icon" />
                        "{affirmation}"
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {type === 'retrograde' && 'phases' in event && event.phases && event.phases.length > 0 && (
              <div className="accordion-section">
                <h4>Phases</h4>
                <div className="event-card-phases">
                  <div className="phases-list">
                    {event.phases.map((phase, index) => (
                      <div key={index} className="phase-item">
                        <span className="phase-sign">{phase.sign}</span>
                        <span className="phase-dates">
                          {parseDate(phase.start).toLocaleDateString('fr-FR')} - {parseDate(phase.end).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </AccordionItem>
      )}
    </div>
  );
};

export default EventCard;
