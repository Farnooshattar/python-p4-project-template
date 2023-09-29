import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Authenticate from "./Authenticate";

function App() {
  const [user, setUser] = useState(null);
  const updateUser = (user) => setUser(user);
  console.log(user);
  return (
    <>
      <Authenticate updateUser={updateUser} />
    </>
  );
}

export default App;
