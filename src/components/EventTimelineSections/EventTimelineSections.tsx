import React, { useId, useState } from "react";
import EventCard from "../EventCard/EventCard";
import type { Eclipse, EventType, FullMoon, NewMoon, Retrograde } from "../../data/types";
import "../../styles/eventTimeline.css";

type TimelineEvent = NewMoon | FullMoon | Eclipse | Retrograde;

interface EventTimelineSectionsProps<T extends TimelineEvent> {
  pageClassName: string;
  classPrefix: string;
  eventType: EventType;
  upcomingTitle: string;
  nextTitle: string;
  upcoming: T[];
  history: T[];
  upcomingCount?: number;
  showNextFocus?: boolean;
  renderUpcomingItem?: (event: T, index: number, isFocusItem: boolean) => React.ReactNode;
  upcomingFooter?: React.ReactNode;
  getUpcomingKey: (event: T) => string;
  getHistoryKey: (event: T) => string;
}

const EventTimelineSections = <T extends TimelineEvent>({
  pageClassName,
  classPrefix,
  eventType,
  upcomingTitle,
  nextTitle,
  upcoming,
  history,
  upcomingCount,
  showNextFocus = true,
  renderUpcomingItem,
  upcomingFooter,
  getUpcomingKey,
  getHistoryKey,
}: EventTimelineSectionsProps<T>) => {
  const [showHistory, setShowHistory] = useState(false);
  const historyRegionId = useId();
  const historyToggleId = useId();

  return (
    <div className={`events-list-page event-timeline-page ${pageClassName}`}>
      {upcoming.length > 0 && (
        <section
          className={`event-timeline-section event-timeline-section-upcoming ${classPrefix}-section ${classPrefix}-section-upcoming`}
        >
          <h2 className={`event-timeline-section-title ${classPrefix}-section-title`}>
            {upcomingTitle} ({upcomingCount ?? upcoming.length})
          </h2>
          {upcoming.map((event, index) => {
            const key = getUpcomingKey(event);
            const isFocusItem = showNextFocus && index === 0;

            if (renderUpcomingItem) {
              return <React.Fragment key={key}>{renderUpcomingItem(event, index, isFocusItem)}</React.Fragment>;
            }

            if (isFocusItem) {
              return (
                <div key={key} className={`event-timeline-next-focus ${classPrefix}-next-focus`}>
                  <h3 className={`event-timeline-next-title ${classPrefix}-next-title`}>
                    {nextTitle}
                  </h3>
                  <EventCard event={event} type={eventType} isFirst={true} isPast={false} />
                </div>
              );
            }

            return <EventCard key={key} event={event} type={eventType} isFirst={false} isPast={false} />;
          })}
          {upcomingFooter}
        </section>
      )}

      {history.length > 0 && (
        <section
          className={`event-timeline-section event-timeline-section-history ${classPrefix}-section ${classPrefix}-section-history`}
        >
          <button
            type="button"
            id={historyToggleId}
            className={`event-timeline-history-toggle ${classPrefix}-history-toggle ${showHistory ? "open" : ""}`}
            onClick={() => setShowHistory((prev) => !prev)}
            aria-expanded={showHistory}
            aria-controls={historyRegionId}
          >
            <span>Historique ({history.length})</span>
            <span
              className={`event-timeline-history-icon ${classPrefix}-history-icon`}
              aria-hidden="true"
            >
              {showHistory ? "▾" : "▸"}
            </span>
          </button>
          <div
            id={historyRegionId}
            role="region"
            aria-labelledby={historyToggleId}
            className={`event-timeline-history-content ${classPrefix}-history-content ${showHistory ? "open" : ""}`}
          >
            {showHistory &&
              history.map((event) => (
                <EventCard
                  key={getHistoryKey(event)}
                  event={event}
                  type={eventType}
                  isFirst={false}
                  isPast={true}
                />
              ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default EventTimelineSections;
