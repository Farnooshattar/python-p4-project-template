import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Authenticate from "./Authenticate";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";
// import Col from "react-bootstrap/Col";

// import Image from "react-bootstrap/Image";
// import Row from "react-bootstrap/Row";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import Badge from "react-bootstrap/Badge";
// import Accordion from "react-bootstrap/Accordion";
// import Toast from "react-bootstrap/Toast";
// import MyImage from "./MyImage";
// import Carousel from "react-bootstrap/Carousel";
function App() {
  const [user, setUser] = useState(null);
  const updateUser = (user) => setUser(user);
  return (
    <>
      <Authenticate updateUser={updateUser} />
    </>
    // <>
    //   <MyImage />
    //   {/* <h1>

    //   </h1> */}
    //   <Carousel>
    //     <Carousel.Item>
    //       <MyImage text="First slide" />
    //       <Carousel.Caption>
    //         <h3>First slide label</h3>
    //         <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    //       </Carousel.Caption>
    //     </Carousel.Item>
    //     <Carousel.Item>
    //       <MyImage text="Second slide" />
    //       <Carousel.Caption>
    //         <h3>Second slide label</h3>
    //         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    //       </Carousel.Caption>
    //     </Carousel.Item>
    //     <Carousel.Item>
    //       <MyImage text="Third slide" />
    //       <Carousel.Caption>
    //         <h3>Third slide label</h3>
    //         <p>
    //           Praesent commodo cursus magna, vel scelerisque nisl consectetur.
    //         </p>
    //       </Carousel.Caption>
    //     </Carousel.Item>
    //   </Carousel>
    //   <Navbar expand="lg" className="bg-body-tertiary">
    //     <Container>
    //       <Navbar.Brand href="#home">
    //         <b>Events master</b>
    //       </Navbar.Brand>
    //       <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //       <Navbar.Collapse id="basic-navbar-nav">
    //         <Nav className="me-auto">
    //           <Nav.Link href="#home">Events</Nav.Link>
    //           <Nav.Link href="#link">Cart</Nav.Link>
    //           <Nav.Link href="#link">Sign in</Nav.Link>
    //         </Nav>
    //       </Navbar.Collapse>
    //     </Container>
    //   </Navbar>
    //   <Container>
    //     <Row>
    //       <Col>
    //         <Card style={{ width: "18rem" }}>
    //           <Card.Img
    //             variant="top"
    //             src="http://www.ljyo.ca/wp-content/uploads/2023/09/event.jpg"
    //           />
    //           <Card.Body>
    //             <Card.Title>Card Title</Card.Title>
    //             <Card.Text>
    //               Some quick example text to build on the card title and make up
    //               the bulk of the card's content.
    //             </Card.Text>
    //             <Button variant="secondary">
    //               Going <Badge bg="secondary">9</Badge>
    //               <span className="visually-hidden">unread messages</span>
    //             </Button>
    //             <Button variant="primary">Get tickets</Button>
    //           </Card.Body>
    //         </Card>
    //       </Col>
    //       <Col>
    //         <Card style={{ width: "18rem" }}>
    //           <Card.Img
    //             variant="top"
    //             src="http://www.ljyo.ca/wp-content/uploads/2023/09/event.jpg"
    //           />
    //           <Card.Body>
    //             <Card.Title>Card Title</Card.Title>
    //             <Card.Text>
    //               Some quick example text to build on the card title and make up
    //               the bulk of the card's content.
    //             </Card.Text>
    //             <Button variant="secondary">
    //               Going <Badge bg="secondary">20</Badge>
    //               <span className="visually-hidden">unread messages</span>
    //             </Button>
    //             <Button variant="primary">Get tickets</Button>
    //           </Card.Body>
    //         </Card>
    //       </Col>
    //       <Col>
    //         <Card style={{ width: "18rem" }}>
    //           <Card.Img
    //             variant="top"
    //             src="http://www.ljyo.ca/wp-content/uploads/2023/09/event.jpg"
    //           />
    //           <Card.Body>
    //             <Card.Title>Card Title</Card.Title>
    //             <Card.Text>
    //               Some quick example text to build on the card title and make up
    //               the bulk of the card's content.
    //             </Card.Text>
    //             <Button variant="secondary">
    //               Going <Badge bg="secondary">35</Badge>
    //               <span className="visually-hidden">unread messages</span>
    //             </Button>
    //             <Button variant="primary">Get tickets</Button>
    //           </Card.Body>
    //         </Card>
    //       </Col>
    //     </Row>
    //     <Row>
    //       <Col>
    //         <Card style={{ width: "18rem" }}>
    //           <Card.Img
    //             variant="top"
    //             src="http://www.ljyo.ca/wp-content/uploads/2023/09/event.jpg"
    //           />
    //           <Card.Body>
    //             <Card.Title>Card Title</Card.Title>
    //             <Card.Text>
    //               Some quick example text to build on the card title and make up
    //               the bulk of the card's content.
    //             </Card.Text>
    //             <Button variant="secondary">
    //               Going <Badge bg="secondary">11</Badge>
    //               <span className="visually-hidden">unread messages</span>
    //             </Button>
    //             <Button variant="primary">Get tickets</Button>
    //           </Card.Body>
    //         </Card>
    //       </Col>
    //       <Col>
    //         <Card style={{ width: "18rem" }}>
    //           <Card.Img
    //             variant="top"
    //             src="http://www.ljyo.ca/wp-content/uploads/2023/09/event.jpg"
    //           />
    //           <Card.Body>
    //             <Card.Title>Card Title</Card.Title>
    //             <Card.Text>
    //               Some quick example text to build on the card title and make up
    //               the bulk of the card's content.
    //             </Card.Text>
    //             <Button variant="secondary">
    //               Going <Badge bg="secondary">46</Badge>
    //               <span className="visually-hidden">unread messages</span>
    //             </Button>
    //             <Button variant="primary">Get tickets</Button>
    //           </Card.Body>
    //         </Card>
    //       </Col>
    //       <Col>
    //         <Card style={{ width: "18rem" }}>
    //           <Card.Img
    //             variant="top"
    //             src="http://www.ljyo.ca/wp-content/uploads/2023/09/event.jpg"
    //           />
    //           <Card.Body>
    //             <Card.Title>Card Title</Card.Title>
    //             <Card.Text>
    //               Some quick example text to build on the card title and make up
    //               the bulk of the card's content.
    //             </Card.Text>
    //             <Button variant="secondary">
    //               Going <Badge bg="secondary">15</Badge>
    //               <span className="visually-hidden">unread messages</span>
    //             </Button>
    //             <Button variant="primary">Get tickets</Button>
    //           </Card.Body>
    //         </Card>
    //       </Col>
    //     </Row>
    //   </Container>
    //   <Toast>
    //     <Toast.Header>
    //       <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
    //       <strong className="me-auto">Bootstrap</strong>
    //       <small>11 mins ago</small>
    //     </Toast.Header>
    //     <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
    //   </Toast>
    //   <Accordion>
    //     <Accordion.Item eventKey="0">
    //       <Accordion.Header>
    //         <Card style={{ width: "18rem" }}>
    //           <Card.Img
    //             variant="top"
    //             src="http://www.ljyo.ca/wp-content/uploads/2023/09/event.jpg"
    //           />
    //           <Card.Body>
    //             <Card.Title>Card Title</Card.Title>
    //             <Card.Text>
    //               Some quick example text to build on the card title and make up
    //               the bulk of the card's content.
    //             </Card.Text>
    //             <Button variant="secondary">
    //               Going <Badge bg="secondary">15</Badge>
    //               <span className="visually-hidden">unread messages</span>
    //             </Button>
    //             <Button variant="primary">Get tickets</Button>
    //           </Card.Body>
    //         </Card>
    //       </Accordion.Header>
    //       <Accordion.Body>
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //         eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    //         ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    //         aliquip ex ea commodo consequat. Duis aute irure dolor in
    //         reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    //         pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
    //         culpa qui officia deserunt mollit anim id est laborum.
    //       </Accordion.Body>
    //     </Accordion.Item>
    //     <Accordion.Item eventKey="1">
    //       <Accordion.Header>Accordion Item #2</Accordion.Header>
    //       <Accordion.Body>
    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //         eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
    //         ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    //         aliquip ex ea commodo consequat. Duis aute irure dolor in
    //         reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    //         pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
    //         culpa qui officia deserunt mollit anim id est laborum.
    //       </Accordion.Body>
    //     </Accordion.Item>
    //   </Accordion>
    // </>
  );
}

export default App;
