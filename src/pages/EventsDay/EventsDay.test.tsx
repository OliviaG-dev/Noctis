// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import EventsDay from "./EventsDay";

vi.mock("../../components/Header/Header", () => ({
  default: () => <div data-testid="header-mock">Header</div>,
}));

vi.mock("../../components/EventCard/EventCard", () => ({
  default: ({
    event,
  }: {
    event: { title: string };
  }) => <div data-testid="event-card-mock">{event.title}</div>,
}));

describe("EventsDay page", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders empty state when there is no event on selected date", () => {
    render(
      <MemoryRouter initialEntries={["/events-day/2026-01-01"]}>
        <Routes>
          <Route path="/events-day/:date" element={<EventsDay />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Aucun événement pour ce jour")).toBeInTheDocument();
  });

  it("renders accordion entries for a date with events", () => {
    render(
      <MemoryRouter initialEntries={["/events-day/2026-02-17"]}>
        <Routes>
          <Route path="/events-day/:date" element={<EventsDay />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Tous les événements astrologiques de ce jour/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Nouvelle lune en Verseau/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Éclipse solaire annulaire/i })
    ).toBeInTheDocument();
  });
});
