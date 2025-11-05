import { Container, Nav, Navbar as BsNavbar, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/UseAppDispatch";
import { useState } from "react";

export default function NavBar() {
  const [expanded, setExpanded] = useState(false);

  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <BsNavbar
      bg="dark"
      variant="dark"
      expand="lg"
      expanded={expanded}
      onToggle={setExpanded}
      className="shadow-sm py-3 fixed-top"
    >
      <Container>
        <BsNavbar.Brand as={Link} to="/">
          Pj's Big Barn of Everything
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="main-navbar" />
        <BsNavbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              className="mx-2"
              onClick={() => setExpanded(false)}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/products"
              className="mx-2"
              onClick={() => setExpanded(false)}
            >
              Products
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/cart"
              className="mx-2"
              onClick={() => setExpanded(false)}
            >
              Cart{" "}
              {cartCount > 0 && (
                <Badge bg="light" text="dark" className="ms-1">
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}
