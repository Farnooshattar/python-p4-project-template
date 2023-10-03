import EventsList from "./EventsList";
import React, { useEffect, useState } from "react";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import MyCarousel from "./MyCarousel";
import UserEvents from "./UserEvents";

import { useHistory } from "react-router-dom";
import Logout from "./Logout";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [key, setKey] = useState("home");
  const [addedToCart, setaddedToCart] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetch("/events", { method: "GET" })
      .then((r) => r.json())
      .then((events) => setEvents(events));
  }, []);

  const handleLogout = () => {
    fetch("/logout", { method: "DELETE" }).then(() => history.push("/logout"));
  };
  /* 
  1. You have a fetch inside the UserEvents component.
  2. Refactor so that fetch happens in its own function (e.g. populateUserCart)
  3. During useEffect, run that function. Functionality should be identical to current functionality. 
  4. Move useEffect and populateUserCart to HomePage.
  5. Pass populateUserCart and user cart setter function to where you add events to cart.
  
  */

  return (
    <>
      <Container>
        <Row className="mx-auto">
          <MyCarousel />
        </Row>
        <Row>
          <Col>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3">
              <Tab eventKey="home" title="Home">
                <EventsList events={events} setaddedToCart={setaddedToCart} />
              </Tab>
              <Tab eventKey="cart" title="My Cart">
                <UserEvents addedToCart={addedToCart} />
              </Tab>
              <Tab eventKey="about" title="About"></Tab>
            </Tabs>
          </Col>
          <Col>
            <Button variant="outline-dark" onClick={handleLogout}>
              Logout
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default HomePage;
