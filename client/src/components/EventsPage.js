import EventsList from "./EventsList";
import React, { useEffect, useState } from "react";
const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/events", { method: "GET" })
      .then((r) => r.json())
      .then((events) => setEvents(events));
  }, []);

  return <EventsList events={events} />;
};
export default EventsPage;
