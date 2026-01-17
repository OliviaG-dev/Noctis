import type {
  PlanetIngress,
  IngressDuration,
  IngressTermType,
  Retrograde,
  RetrogradePhase,
  Eclipse,
  FullMoon,
  NewMoon,
  AstrologyEvent,
  EventType,
  Planet,
} from "./types";
import planetIngressData from "./planetIngress.json";
import retrogradesData from "./retrogrades.json";
import eclipsesData from "./eclipses.json";
import fullMoonsData from "./fullMoons.json";
import newMoonsData from "./newMoons.json";

/**
 * Convertit une date au format YYYY-MM-DD en objet Date
 */
export function parseDate(dateString: string): Date {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Formate une date au format YYYY-MM-DD
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Vérifie si une date est dans une plage (inclusive)
 */
export function isDateInRange(
  date: string,
  start: string,
  end: string
): boolean {
  const dateObj = parseDate(date);
  const startObj = parseDate(start);
  const endObj = parseDate(end);
  return dateObj >= startObj && dateObj <= endObj;
}

/**
 * Charge et convertit les données en événements astrologiques
 */
export function loadAstrologyEvents(): AstrologyEvent[] {
  const events: AstrologyEvent[] = [];

  // Nouvelles lunes
  (newMoonsData as NewMoon[]).forEach((moon) => {
    events.push({
      date: moon.date,
      type: "new_moon",
      title: moon.title,
      description: moon.subtitle,
      sign: moon.sign,
    });
  });

  // Pleines lunes
  (fullMoonsData as FullMoon[]).forEach((moon) => {
    events.push({
      date: moon.date,
      type: "full_moon",
      title: moon.title,
      description: moon.subtitle,
      sign: moon.sign,
    });
  });

  // Éclipses
  (eclipsesData as Eclipse[]).forEach((eclipse) => {
    events.push({
      date: eclipse.date,
      type: "eclipse",
      title: eclipse.title,
      description: eclipse.subtitle,
      eclipseType: eclipse.type,
    });
  });

  // Ingrès planétaires (uniquement le jour de début)
  (planetIngressData as PlanetIngress[]).forEach((ingress) => {
    events.push({
      date: ingress.start,
      type: "planet_ingress",
      title: ingress.title,
      description: ingress.subtitle,
      planet: ingress.planet,
      sign: ingress.sign,
      start: ingress.start,
      end: ingress.end,
    });
  });

  // Rétrogrades (créer un événement pour chaque jour de la période)
  (retrogradesData as Retrograde[]).forEach((retrograde) => {
    const startDate = parseDate(retrograde.start);
    const endDate = parseDate(retrograde.end);
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const dateKey = formatDate(currentDate);
      // Trouver la phase pour cette date
      const phase = findRetrogradePhase(retrograde, dateKey);

      events.push({
        date: dateKey,
        type: "retrograde",
        title: `${retrograde.planet} rétrograde`,
        description: retrograde.subtitle,
        planet: retrograde.planet,
        start: retrograde.start,
        end: retrograde.end,
        sign: phase?.sign,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  return events;
}

/**
 * Organise les événements par date
 */
export function groupEventsByDate(
  events: AstrologyEvent[]
): Map<string, AstrologyEvent[]> {
  const eventsByDate = new Map<string, AstrologyEvent[]>();

  events.forEach((event) => {
    const dateKey = event.date;
    if (!eventsByDate.has(dateKey)) {
      eventsByDate.set(dateKey, []);
    }
    eventsByDate.get(dateKey)!.push(event);
  });

  return eventsByDate;
}

/**
 * Obtient les événements pour une date spécifique
 */
export function getEventsForDate(
  date: Date,
  eventsByDate: Map<string, AstrologyEvent[]>
): AstrologyEvent[] {
  const dateKey = formatDate(date);
  return eventsByDate.get(dateKey) || [];
}

/**
 * Trouve la phase d'un rétrograde pour une date donnée
 */
export function findRetrogradePhase(
  retrograde: Retrograde,
  date: string
): RetrogradePhase | null {
  const dateObj = parseDate(date);

  for (const phase of retrograde.phases) {
    const phaseStart = parseDate(phase.start);
    const phaseEnd = parseDate(phase.end);

    if (dateObj >= phaseStart && dateObj <= phaseEnd) {
      return phase;
    }
  }

  return null;
}

/**
 * Obtient toutes les phases d'un rétrograde pour une date donnée
 * (peut retourner plusieurs phases si la date est à la transition)
 */
export function getRetrogradePhasesForDate(
  retrograde: Retrograde,
  date: string
): RetrogradePhase[] {
  return retrograde.phases.filter((phase) => {
    const dateObj = parseDate(date);
    const phaseStart = parseDate(phase.start);
    const phaseEnd = parseDate(phase.end);
    return dateObj >= phaseStart && dateObj <= phaseEnd;
  });
}

/**
 * Obtient le rétrograde complet pour une planète et une date
 */
export function getRetrogradeForDate(
  date: string,
  planet?: Planet
): Retrograde | null {
  const retrogrades = retrogradesData as Retrograde[];
  const dateObj = parseDate(date);

  for (const retrograde of retrogrades) {
    if (planet && retrograde.planet !== planet) {
      continue;
    }

    const startDate = parseDate(retrograde.start);
    const endDate = parseDate(retrograde.end);

    if (dateObj >= startDate && dateObj <= endDate) {
      return retrograde;
    }
  }

  return null;
}

/**
 * Calcule la durée en jours entre deux dates
 */
export function calculateDaysBetween(start: string, end: string): number {
  const startDate = parseDate(start);
  const endDate = parseDate(end);
  const diffTime = endDate.getTime() - startDate.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Calcule la durée détaillée (années et mois) entre deux dates
 */
export function calculateIngressDuration(
  start: string,
  end: string
): IngressDuration {
  const startDate = parseDate(start);
  const endDate = parseDate(end);

  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  // Ajuster si le jour de fin est avant le jour de début
  if (endDate.getDate() < startDate.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }

  const totalMonths = years * 12 + months;

  return {
    years,
    months: totalMonths,
  };
}

/**
 * Détermine le type de terme pour un ingrès planétaire
 * - Court terme : moins de 6 mois
 * - Moyen terme : 6 mois à 2 ans
 * - Long terme : plus de 2 ans
 */
export function getIngressTermType(ingress: PlanetIngress): IngressTermType {
  const days = calculateDaysBetween(ingress.start, ingress.end);
  const months = days / 30;

  if (months < 6) {
    return "short"; // Court terme
  } else if (months < 24) {
    return "medium"; // Moyen terme
  } else {
    return "long"; // Long terme
  }
}

/**
 * Obtient l'ingrès planétaire pour une date donnée
 */
export function getPlanetIngressForDate(
  date: string,
  planet?: Planet
): PlanetIngress | null {
  const ingresses = planetIngressData as PlanetIngress[];
  const dateObj = parseDate(date);

  for (const ingress of ingresses) {
    if (planet && ingress.planet !== planet) {
      continue;
    }

    const startDate = parseDate(ingress.start);
    const endDate = parseDate(ingress.end);

    if (dateObj >= startDate && dateObj <= endDate) {
      return ingress;
    }
  }

  return null;
}

/**
 * Obtient l'icône pour un type d'événement
 */
export function getEventIcon(eventType: EventType): string {
  switch (eventType) {
    case "new_moon":
      return "/icone/nouvellelune.png";
    case "full_moon":
      return "/icone/pleinelune.png";
    case "retrograde":
      return "/icone/retrograde.png";
    case "eclipse":
      return "/icone/eclipse.png";
    case "planet_ingress":
      return "/icone/entrance.png";
    default:
      return "";
  }
}
