import React from "react";
import UserEvent from "./UserEvent";

function UserEventsList({ events }) {
  return (
    <div>
      <ul>
        {events.map((event) => (
          <UserEvent key={event.id} event={event} />
        ))}
      </ul>
    </div>
  );
}

export default UserEventsList;
