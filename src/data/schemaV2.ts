import type {
  AstrologicalSign,
  EclipseType,
  EventType,
  Planet,
} from "./types";

export type GuidanceBucket = "pro" | "relationship" | "wellbeing";

export interface PracticalGuidance {
  pro: string[];
  relationship: string[];
  wellbeing: string[];
}

export interface AstrologyMetadata {
  exactTimeUtc?: string; // ISO string, ex: 2026-02-17T12:34:00Z
  referenceTimezone?: string; // ex: UTC, Europe/Paris
  degree?: string; // ex: 28deg13 Aquarius
  source?: string; // ex: Swiss Ephemeris / internal dataset
  confidence?: "low" | "medium" | "high";
}

export interface EventAudience {
  sun?: string[];
  moon?: string[];
  rising?: string[];
}

export interface AstrologyContentV2 {
  date: string;
  type: EventType;
  title: string;
  subtitle: string;
  keywords: string[];
  practicalGuidance?: PracticalGuidance;
  metadata?: AstrologyMetadata;
  audience?: EventAudience;
  disclaimer?: string;
}

export interface MoonContentV2 extends AstrologyContentV2 {
  type: "new_moon" | "full_moon";
  sign: AstrologicalSign;
}

export interface EclipseContentV2 extends AstrologyContentV2 {
  type: "eclipse";
  eclipseType: EclipseType;
  sign?: AstrologicalSign;
}

export interface RetrogradeContentV2 extends AstrologyContentV2 {
  type: "retrograde";
  planet: Planet;
  start: string;
  end: string;
}

export interface PlanetIngressContentV2 extends AstrologyContentV2 {
  type: "planet_ingress";
  planet: Planet;
  sign: AstrologicalSign;
  start: string;
  end: string;
}

export const DEFAULT_ASTROLOGY_DISCLAIMER =
  "L'astrologie est un outil de reflection et ne remplace pas un avis medical, juridique ou financier.";
