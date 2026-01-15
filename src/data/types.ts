/**
 * Types de signes astrologiques
 */
export type AstrologicalSign =
  | 'Bélier'
  | 'Taureau'
  | 'Gémeaux'
  | 'Cancer'
  | 'Lion'
  | 'Vierge'
  | 'Balance'
  | 'Scorpion'
  | 'Sagittaire'
  | 'Capricorne'
  | 'Verseau'
  | 'Poissons'
  | 'Aries'; // Variante anglaise pour Neptune

/**
 * Types de planètes
 */
export type Planet =
  | 'Mercure'
  | 'Venus'
  | 'Mars'
  | 'Jupiter'
  | 'Saturne'
  | 'Uranus'
  | 'Neptune'
  | 'Pluton';

/**
 * Types d'éclipses
 */
export type EclipseType =
  | 'annular_solar'
  | 'total_solar'
  | 'partial_solar'
  | 'total_lunar'
  | 'partial_lunar';

/**
 * Type d'événement astrologique
 */
export type EventType =
  | 'new_moon'
  | 'full_moon'
  | 'retrograde'
  | 'eclipse'
  | 'planet_ingress';

/**
 * Interface pour les ingrès planétaires
 */
export interface PlanetIngress {
  date: string; // Format: YYYY-MM-DD
  planet: Planet;
  sign: AstrologicalSign;
  title: string;
  description: string;
}

/**
 * Interface pour les rétrogrades planétaires
 */
export interface Retrograde {
  planet: Planet;
  start: string; // Format: YYYY-MM-DD
  end: string; // Format: YYYY-MM-DD
  description: string;
}

/**
 * Interface pour les éclipses
 */
export interface Eclipse {
  date: string; // Format: YYYY-MM-DD
  type: EclipseType;
  title: string;
  description: string;
}

/**
 * Interface pour les pleines lunes
 */
export interface FullMoon {
  date: string; // Format: YYYY-MM-DD
  sign: AstrologicalSign;
  title: string;
  description: string;
}

/**
 * Interface pour les nouvelles lunes
 */
export interface NewMoon {
  date: string; // Format: YYYY-MM-DD
  sign: AstrologicalSign;
  title: string;
  description: string;
}

/**
 * Interface générique pour un événement astrologique
 */
export interface AstrologyEvent {
  date: string; // Format: YYYY-MM-DD
  type: EventType;
  title: string;
  description: string;
  sign?: AstrologicalSign;
  planet?: Planet;
  start?: string; // Pour les rétrogrades
  end?: string; // Pour les rétrogrades
  eclipseType?: EclipseType;
}

/**
 * Interface pour un événement du calendrier (jour avec événements)
 */
export interface CalendarEvent {
  date: string; // Format: YYYY-MM-DD
  events: AstrologyEvent[];
}
