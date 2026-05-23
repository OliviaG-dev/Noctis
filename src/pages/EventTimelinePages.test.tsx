// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import FullMoons from "./FullMoons/FullMoons";
import NewMoons from "./NewMoons/NewMoons";
import Eclipses from "./Eclipses/Eclipses";
import PlanetRetrograde from "./PlanetRetrograde/PlanetRetrograde";

vi.mock("../components/Header/Header", () => ({
  default: () => <div data-testid="header-mock">Header</div>,
}));

vi.mock("../components/EventCard/EventCard", () => ({
  default: ({ event }: { event: { title: string } }) => (
    <div data-testid="event-card-mock">{event.title}</div>
  ),
}));

vi.mock("../data/fullMoons.json", () => ({
  default: [
    { title: "Pleine lune a venir", date: "2026-07-01", sign: "Capricorne" },
    { title: "Pleine lune passee", date: "2026-05-01", sign: "Balance" },
  ],
}));

vi.mock("../data/newMoons.json", () => ({
  default: [
    { title: "Nouvelle lune a venir", date: "2026-07-10", sign: "Cancer" },
    { title: "Nouvelle lune passee", date: "2026-04-10", sign: "Belier" },
  ],
}));

vi.mock("../data/eclipses.json", () => ({
  default: [
    {
      title: "Eclipse a venir",
      date: "2026-07-20",
      sign: "Lion",
      eclipseType: "solar_total",
    },
    {
      title: "Eclipse passee",
      date: "2026-03-20",
      sign: "Poissons",
      eclipseType: "lunar_total",
    },
  ],
}));

vi.mock("../data/retrogrades.json", () => ({
  default: [
    {
      title: "Retrograde active",
      start: "2026-06-01",
      end: "2026-07-01",
      planet: "Mercure",
    },
    {
      title: "Retrograde passee",
      start: "2026-03-01",
      end: "2026-04-01",
      planet: "Mars",
    },
  ],
}));

describe("Event timeline pages", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-06-15T12:00:00Z"));
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("shows next focus and toggles history for FullMoons", () => {
    render(<FullMoons />);

    expect(screen.getByText("Prochaine pleine lune")).toBeInTheDocument();
    expect(screen.queryByText("Pleine lune passee")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Historique \(1\)/i }));

    expect(screen.getByText("Pleine lune passee")).toBeInTheDocument();
  });

  it("shows next focus and toggles history for NewMoons", () => {
    render(<NewMoons />);

    expect(screen.getByText("Prochaine nouvelle lune")).toBeInTheDocument();
    expect(screen.queryByText("Nouvelle lune passee")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Historique \(1\)/i }));

    expect(screen.getByText("Nouvelle lune passee")).toBeInTheDocument();
  });

  it("shows next focus and toggles history for Eclipses", () => {
    render(<Eclipses />);

    expect(screen.getByText("Prochaine éclipse")).toBeInTheDocument();
    expect(screen.queryByText("Eclipse passee")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Historique \(1\)/i }));

    expect(screen.getByText("Eclipse passee")).toBeInTheDocument();
  });

  it("shows next focus and toggles history for PlanetRetrograde", () => {
    render(<PlanetRetrograde />);

    expect(screen.getByText("Rétrograde à suivre")).toBeInTheDocument();
    expect(screen.queryByText("Retrograde passee")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Historique \(1\)/i }));

    expect(screen.getByText("Retrograde passee")).toBeInTheDocument();
  });
});
