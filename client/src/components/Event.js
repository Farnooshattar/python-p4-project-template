import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";

import EventsImage from "./EventsImage";

function Event({ event, setaddedToCart }) {
  const { id, title, description, created_at, updated_at, in_cart } = event;
  console.log("first", in_cart);
  const [cart, setCart] = useState(in_cart);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [commentText, setCommentText] = useState(""); // State to store comment text
  const [commentsText, setCommentsText] = useState([]); // State to store comment text
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const data = {
    // user_id: session["user_id"],
    event_id: id,
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const handleAddToCart = () => {
      const updatedCart = cart + 1;
      setIsAddedToCart(true);
      setCart(updatedCart);

      const cartdata = { in_cart: updatedCart, event_id: id };
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
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Create a data object with the comment text
    const data = {
      text: commentText,
    };
    console.log("data", data);
    console.log("id", id);

    fetch("/events/" + id + "/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((response) => {
        // Handle the response from the server here
        console.log(response);
        // Clear the comment text input
        setCommentText("");
      });
  };
  const handleShowComments = () => {
    setSmShow(true);
    fetch("/events/" + id + "/comments", { method: "GET" })
      .then((r) => {
        if (!r.ok) {
          throw new Error("Network response was not ok");
        }
        return r.json();
      })
      .then((comments) => {
        setCommentsText(comments);
        console.log("Comments:", comments);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
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
          </Nav>
        </Card.Header>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Badge bg="secondary">
            <i style={{ color: "black" }}>Intersted People</i> :{cart}
          </Badge>
          <Card.Text>{description}</Card.Text>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isAddedToCart}>
            {isAddedToCart ? "Added to Cart" : "Add to Cart"}
          </Button>
          {/* <Button onClick={() => setSmShow(true)} className="me-2"> */}
          <Button onClick={handleShowComments} className="me-2">
            All comments
          </Button>
          {/* <Button onClick={() => setLgShow(true)}>Large modal</Button> */}
          <Modal
            size="sm"
            show={smShow}
            onHide={() => setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm">
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                {commentsText.text}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {commentsText.map((comment) => (
                <div key={comment.id}>
                  <p>{comment.text}</p>
                  <p>Created at: {comment.created_at}</p>
                </div>
              ))}
            </Modal.Body>
          </Modal>
          <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg">
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Large Modal
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>...</Modal.Body>
          </Modal>
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit}>
            <textarea
              placeholder="Add a comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}></textarea>
            <button type="submit">Add Comment</button>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}
export default Event;
