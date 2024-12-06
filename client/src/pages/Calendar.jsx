import React, { useEffect, useState } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};

const Calendar = () => {
  const [calendar, setCalendar] = useState(null);
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState("2025-10-05");
  const [eventColor, setEventColor] = useState("#3788d8"); // Default event color

  const config = {
    viewType: "Week",
    durationBarVisible: false,
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async args => {
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
      calendar.clearSelection();
      if (!modal.result) { return; }
      const newEvent = {
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result,
        backColor: eventColor // Set selected color for the event
      };
      calendar.events.add(newEvent);
    },
    onEventClick: async args => {
      await editEvent(args.e);
    },
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Delete",
          onClick: async args => {
            calendar.events.remove(args.source);
          },
        },
        {
          text: "-",
        },
        {
          text: "Edit...",
          onClick: async args => {
            await editEvent(args.source);
          }
        }
      ]
    }),

  };

  const editEvent = async (e) => {
    const modal = await DayPilot.Modal.prompt("Update event text:", e.text());
    if (!modal.result) { return; }
    e.data.text = modal.result;
    calendar.events.update(e);
  };

  useEffect(() => {
    const initialEvents = [];
    setEvents(initialEvents);
  }, []);

  return (
    <div style={styles.wrap}>
      <div style={styles.left}>
        <DayPilotNavigator
          selectMode={"Week"}
          showMonths={3}
          skipMonths={3}
          selectionDay={startDate}
          onTimeRangeSelected={args => {
            setStartDate(args.day);
          }}
        />
      </div>
      <div style={styles.main}>
        {/* Color Picker for Events */}
        <div className="color-picker-container mb-2">
          <label htmlFor="event-color">Select Event Color: </label>
          <input
            id="event-color"
            type="color"
            value={eventColor}
            onChange={(e) => setEventColor(e.target.value)}
          />
        </div>
        <DayPilotCalendar
          {...config}
          events={events}
          startDate={startDate}
          controlRef={setCalendar}
        />
      </div>
    </div>
  );
};

export default Calendar;
