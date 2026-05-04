// @vitest-environment jsdom
import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Calendar from "./Calendar";

describe("Calendar component", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-02-10T10:00:00Z"));
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("disables previous month button on minimum month", () => {
    render(
      <MemoryRouter>
        <Calendar />
      </MemoryRouter>
    );

    const previousButton = screen.getByRole("button", {
      name: "Mois précédent",
    });
    fireEvent.click(previousButton);

    expect(screen.getByText(/janvier 2026/i)).toBeInTheDocument();
    expect(previousButton).toBeDisabled();
  });

  it("opens modal when clicking a day with events", () => {
    render(
      <MemoryRouter>
        <Calendar />
      </MemoryRouter>
    );

    expect(screen.getByText(/février 2026/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Mois suivant" }));
    expect(screen.getByText(/mars 2026/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText("17"));

    expect(screen.getByRole("button", { name: "Fermer" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Voir +" })
    ).toBeInTheDocument();
  });
});
