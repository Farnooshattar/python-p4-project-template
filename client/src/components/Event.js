import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";

import EventsImage from "./EventsImage";

function Event({ event, setaddedToCart }) {
  const { id, title, description, created_at, updated_at, in_cart } = event;
  console.log("first", in_cart);
  const [cart, setCart] = useState(in_cart);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a data object with the user and event IDs
    const data = {
      // user_id: session["user_id"],
      event_id: id, // Assuming you have access to the event's ID
    };

    const handleAddToCart = () => {
      // Call the addToCart function to add the event to the cart
      const updatedCart = cart + 1;
      setCart(updatedCart);

      const cartdata = { in_cart: updatedCart };
      setaddedToCart(true);
      fetch("/incart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartdata),
      })
        .then((resp) => resp.json())
        .then((response) => {
          // Handle the response from the server here

          console.log("my response", response);
        });
    };

    fetch("/add_event_to_user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((response) => {
        // Handle the response from the server here
        handleAddToCart();
        console.log(response);
      });
  };
  return (
    <div>
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#first">
            <Nav.Item>
              <Nav.Link href="#first">
                <EventsImage />
              </Nav.Link>
            </Nav.Item>
            {/* <Nav.Item>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#disabled" disabled>
                Disabled
              </Nav.Link>
            </Nav.Item> */}
          </Nav>
        </Card.Header>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Badge bg="secondary">{cart}</Badge>
          <Card.Text>{description}</Card.Text>
          <Button variant="primary" onClick={handleSubmit}>
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
export default Event;
