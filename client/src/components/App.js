import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Authenticate from "./Authenticate";
import HomePage from "./HomePage";
import WelcomePage from "./WelcomePage";
import Logout from "./Logout";
function App() {
  const [user, setUser] = useState(null);
  const updateUser = (user) => setUser(user);
  console.log(user);
  return (
    <>
      <Switch>
        {user === null ? <Authenticate updateUser={updateUser} /> : null}
        <Route path="/eventspage" component={HomePage} />
        <Route path="/logout" component={WelcomePage} />
      </Switch>
    </>
  );
}

export default App;
