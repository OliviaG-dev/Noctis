import { describe, expect, it } from "vitest";
import {
  calculateDaysBetween,
  findRetrogradePhase,
  formatDate,
  getEventIcon,
  getEventsForDate,
  getPlanetIngressForDate,
  getRetrogradeForDate,
  groupEventsByDate,
  isDateInRange,
  loadAstrologyEvents,
  loadCompleteEventsForDate,
  parseDate,
} from "./utils";

describe("data utils", () => {
  it("parses and formats a date consistently", () => {
    const parsedDate = parseDate("2026-02-17");
    expect(formatDate(parsedDate)).toBe("2026-02-17");
  });

  it("checks date range inclusively", () => {
    expect(isDateInRange("2026-02-17", "2026-02-17", "2026-03-01")).toBe(true);
    expect(isDateInRange("2026-03-01", "2026-02-17", "2026-03-01")).toBe(true);
    expect(isDateInRange("2026-03-02", "2026-02-17", "2026-03-01")).toBe(false);
  });

  it("loads all expected astrology event types", () => {
    const events = loadAstrologyEvents();
    const eventTypes = new Set(events.map((event) => event.type));

    expect(eventTypes).toEqual(
      new Set([
        "new_moon",
        "full_moon",
        "eclipse",
        "planet_ingress",
        "retrograde",
      ])
    );
    expect(events.length).toBeGreaterThan(0);
  });

  it("groups and retrieves events for a specific date", () => {
    const events = loadAstrologyEvents();
    const eventsByDate = groupEventsByDate(events);
    const selectedDateEvents = getEventsForDate(
      parseDate("2026-02-17"),
      eventsByDate
    );

    expect(selectedDateEvents.length).toBeGreaterThanOrEqual(2);
    expect(selectedDateEvents.some((event) => event.type === "new_moon")).toBe(
      true
    );
    expect(selectedDateEvents.some((event) => event.type === "eclipse")).toBe(
      true
    );
  });

  it("finds retrograde details for a date and phase", () => {
    const retrograde = getRetrogradeForDate("2026-10-10");
    expect(retrograde).not.toBeNull();
    expect(retrograde?.planet).toBe("Vénus");

    const phase = findRetrogradePhase(retrograde!, "2026-10-25");
    expect(phase).not.toBeNull();
    expect(phase?.sign).toBe("Vierge");
  });

  it("finds planet ingress covering a date", () => {
    const ingress = getPlanetIngressForDate("2026-09-01");
    expect(ingress).not.toBeNull();
    expect(ingress?.planet).toBe("Neptune");
    expect(ingress?.sign).toBe("Bélier");
  });

  it("returns complete events for a day with overlaps", () => {
    const completeEvents = loadCompleteEventsForDate("2026-02-17");
    const types = completeEvents.map((event) => event.type);

    expect(types).toContain("new_moon");
    expect(types).toContain("eclipse");
    expect(types).toContain("planet_ingress");
  });

  it("calculates duration in days", () => {
    expect(calculateDaysBetween("2026-02-17", "2026-02-18")).toBe(1);
    expect(calculateDaysBetween("2026-02-17", "2026-03-01")).toBe(12);
  });

  it("returns icon path for known event types", () => {
    expect(getEventIcon("new_moon")).toContain("/icone/event/");
    expect(getEventIcon("full_moon")).toContain("/icone/event/");
    expect(getEventIcon("retrograde")).toContain("/icone/event/");
    expect(getEventIcon("eclipse")).toContain("/icone/event/");
    expect(getEventIcon("planet_ingress")).toContain("/icone/event/");
  });
});
