import React from "react";
import Event from "./Event";

function EventsList({ events, setaddedToCart}) {
  return (
    <div>
      <ul>
        {events.map((event) => (
          <Event key={event.id} event={event} setaddedToCart={setaddedToCart} />
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
