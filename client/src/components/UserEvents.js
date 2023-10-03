import UserEventsList from "./UserEventsList";
import React, { useEffect, useState } from "react";
const UserEvents = (addedToCart) => {
  const [userevents, setUserEvents] = useState([]);

  useEffect(() => {
    fetch("/userevents", { method: "GET" })
      .then((r) => r.json())
      .then((userevents) => setUserEvents(userevents));
  }, [addedToCart]);

  return <UserEventsList events={userevents} />;
};
export default UserEvents;
