import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Authenticate from "./Authenticate";
import EventsPage from "./EventsPage";
function App() {
  const [user, setUser] = useState(null);
  const updateUser = (user) => setUser(user);
  console.log(user);
  return (
    <>
      <Switch>
        {user === null ? <Authenticate updateUser={updateUser} /> : null}
        <Route path="/eventspage" component={EventsPage} />
      </Switch>
    </>
  );
}

export default App;
