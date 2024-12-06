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

const Calendar = ({ user }) => {
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
        id: DayPilot.guid(),
        start: args.start.toDate(), // Convert to UTC
        end: args.end.toDate(), 
        text: modal.result,
        backColor: eventColor // Set selected color for the event
      };
      
      if (user) {
        calendar.events.add(newEvent);
        sendEventToServer(newEvent);
      }
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

  // GET request to server, update posts array on completion
  useEffect(() => {
    const getExistingEvents = async () => {
      const requestOptions = {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
      };

      try {
        const response = await fetch(`${process.env.REACT_APP_DEV_API_URL}/calendar`, requestOptions);
        if (!response.ok) return;
        
        const data = await response.json();
        if (!data.length) return;
        
        data.forEach((event, i) => {
          data[i] = {
            id: i,
            start: event.start,
            end: event.end,
            text: event.text,
            backColor: event.backColor
          };
        });
        setEvents(data);
      } catch (err) {
        console.log(err);
      }
    };

    getExistingEvents();
  }, []);

  const sendEventToServer = async (eventData) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      };

      const response = await fetch(`${process.env.REACT_APP_DEV_API_URL}/calendar`, requestOptions);
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
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
