import EventsList from "./EventsList";
import React, { useEffect, useState } from "react";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MyCarousel from "./MyCarousel";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [key, setKey] = useState("home");

  useEffect(() => {
    fetch("/events", { method: "GET" })
      .then((r) => r.json())
      .then((events) => setEvents(events));
  }, []);

  return (
    <>
      <Container>
        <Row>
          <MyCarousel />
        </Row>
        <Row>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3">
            <Tab eventKey="home" title="Home">
              <EventsList events={events} />;
            </Tab>
            <Tab eventKey="cart" title="My Cart">
              Tab content for cart
            </Tab>
            <Tab eventKey="logout" title="Logout">
              Tab content for logout
            </Tab>
          </Tabs>
        </Row>
      </Container>
    </>
  );
};
export default EventsPage;
