/**
 * Types de signes astrologiques
 */
export type AstrologicalSign =
  | "Bélier"
  | "Taureau"
  | "Gémeaux"
  | "Cancer"
  | "Lion"
  | "Vierge"
  | "Balance"
  | "Scorpion"
  | "Sagittaire"
  | "Capricorne"
  | "Verseau"
  | "Poissons"
  | "Aries"; // Variante anglaise pour Neptune

/**
 * Types de planètes
 */
export type Planet =
  | "Mercure"
  | "Venus"
  | "Mars"
  | "Jupiter"
  | "Saturne"
  | "Uranus"
  | "Neptune"
  | "Pluton";

/**
 * Types d'éclipses
 */
export type EclipseType =
  | "solar_annular"
  | "solar_total"
  | "solar_partial"
  | "lunar_total"
  | "lunar_partial"
  | "lunar_penumbral";

/**
 * Type d'événement astrologique
 */
export type EventType =
  | "new_moon"
  | "full_moon"
  | "retrograde"
  | "eclipse"
  | "planet_ingress";

/**
 * Interface pour la durée d'un ingrès planétaire
 */
export interface IngressDuration {
  years: number;
  months: number;
}

/**
 * Type de terme pour un ingrès planétaire
 */
export type IngressTermType = "short" | "medium" | "long";

/**
 * Interface pour les ingrès planétaires
 */
export interface PlanetIngress {
  planet: Planet;
  sign: AstrologicalSign;
  start: string; // Format: YYYY-MM-DD
  end: string; // Format: YYYY-MM-DD
  duration?: IngressDuration; // Optionnel, peut être calculé automatiquement
  title: string;
  subtitle: string;
  keywords: string[];
  energy: MoonEnergy;
  effects: MoonEffects;
  advice: MoonAdvice;
  rituals: string[];
  affirmations: string[];
}

/**
 * Interface pour une phase d'un rétrograde (dans un signe spécifique)
 */
export interface RetrogradePhase {
  sign: AstrologicalSign;
  start: string; // Format: YYYY-MM-DD
  end: string; // Format: YYYY-MM-DD
}

/**
 * Interface pour les rétrogrades planétaires
 */
export interface Retrograde {
  planet: Planet;
  start: string; // Format: YYYY-MM-DD
  end: string; // Format: YYYY-MM-DD
  phases: RetrogradePhase[];
  title: string;
  subtitle: string;
  keywords: string[];
  energy: MoonEnergy;
  effects: MoonEffects;
  advice: MoonAdvice;
  rituals: string[];
  affirmations: string[];
}

/**
 * Interface pour les éclipses
 */
export interface Eclipse {
  date: string; // Format: YYYY-MM-DD
  type: EclipseType;
  title: string;
  subtitle: string;
  keywords: string[];
  energy: MoonEnergy;
  effects: MoonEffects;
  advice: MoonAdvice;
  rituals: string[];
}

/**
 * Interface pour l'énergie d'une pleine lune
 */
export interface MoonEnergy {
  intensity: number; // 1-5
  emotional: number; // 1-5
  mental: number; // 1-5
}

/**
 * Interface pour les effets d'une pleine lune
 */
export interface MoonEffects {
  general: string[];
  emotional: string[];
  spiritual: string[];
}

/**
 * Interface pour les conseils d'une pleine lune
 */
export interface MoonAdvice {
  do: string[];
  avoid: string[];
}

/**
 * Interface pour les pleines lunes
 */
export interface FullMoon {
  date: string; // Format: YYYY-MM-DD
  sign: AstrologicalSign;
  title: string;
  subtitle: string;
  keywords: string[];
  energy: MoonEnergy;
  effects: MoonEffects;
  advice: MoonAdvice;
  rituals: string[];
}

/**
 * Interface pour les nouvelles lunes
 */
export interface NewMoon {
  date: string; // Format: YYYY-MM-DD
  sign: AstrologicalSign;
  title: string;
  subtitle: string;
  keywords: string[];
  energy: MoonEnergy;
  intentions: string[];
  effects: MoonEffects;
  advice: MoonAdvice;
  affirmations: string[];
  rituals: string[];
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
