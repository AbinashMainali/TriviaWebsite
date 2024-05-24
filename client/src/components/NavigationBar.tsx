import { FunctionComponent } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../App.css";

const NavigationBar: FunctionComponent = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="md" fixed="top" >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/trivia" className="navLink">
              Trivia
            </Nav.Link>
            <Nav.Link as={Link} to="/score" className="navLink">
              Scoreboard
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className="navLink">
              About
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
