import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./style.css";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import logo from "../media/Festival-Events_Web_1200x600.jpg";
// import { useNavigate } from "react-router-dom";
const Authenticate = ({ updateUser }) => {
  const [signUp, setSignUp] = useState(false);
  const [userdata, setUserData] = useState({ username: "", email: "" });
  const history = useHistory();
  const handleSignUpClick = () => setSignUp((signUp) => !signUp);
  //   const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(signUp ? userdata : { username: userdata.username }),
    };
    fetch(signUp ? "/signup" : "/login", config)
      .then((resp) => resp.json())
      .then((user) => {
        updateUser(user);
        history.push("/eventspage");
      });
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    const userDataCopy = { ...userdata };
    userDataCopy[name] = value;
    setUserData(userDataCopy);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Row>
            <h1>Welcome to Events Master!</h1>
          </Row>
          <Row>
            <Image src={logo} fluid />;
          </Row>
          <Row>
            <h1>We invite you to explore our world of Events!</h1>
          </Row>
        </Col>
        <Col>
          <Row>
            <div className="auth-errors-switch-wrapper">
              {/* <h2 className="auth-errors">{"Errors here!!"}</h2> */}
              <h2>
                {signUp ? "Already have an account?" : "New to Events Master?"}
              </h2>
              <button onClick={handleSignUpClick}>
                {signUp ? "Log In!" : "Register now!"}
              </button>
            </div>
          </Row>
          <Row>
            <form onSubmit={handleSubmit}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={userdata.username}
                onChange={handleChange}
              />
              {signUp && (
                <>
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    value={userdata.email}
                    onChange={handleChange}
                  />
                </>
              )}
              <input type="submit" value={signUp ? "Sign Up!" : "Log In!"} />
            </form>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
export default Authenticate;
