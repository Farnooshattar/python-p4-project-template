import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";

import EventsImage from "./EventsImage";

function UserEvent({ event }) {
  const { id, title, description, created_at, updated_at } = event;
  
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
          <Card.Text>{description}</Card.Text>
          <Button variant="primary" >
            Buy Ticket
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
export default UserEvent;
