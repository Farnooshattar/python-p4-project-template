import EventsList from "./EventsList";
import React, { useEffect, useState } from "react";
const UserEvents = () => {
  const [userevents, setUserEvents] = useState([]);

  useEffect(() => {
    fetch("/userevents", { method: "GET" })
      .then((r) => r.json())
      .then((userevents) => setUserEvents(userevents));
  }, []);

  return <EventsList events={userevents} />;
};
export default UserEvents;
