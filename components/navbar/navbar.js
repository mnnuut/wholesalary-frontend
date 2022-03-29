import React from "react";
import {
  Navbar,
  Container,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
} from "react-bootstrap";
// import Login from "../login";

function navbar() {
  return (
    <>
      <Navbar bg="light" expand="sm" className="py-4 px-2">
        <Container fluid className="">
          <Navbar.Brand href="#">wholesalery</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Form className="d-flex">
              <FormControl
                style={{ width: "600px" }}
                type="search"
                placeholder="Search for products or stores"
                className=""
                aria-label="Search"
              />
            </Form>
            <div className="ms-auto py-auto">
              {/* <Login /> */}
              <Button
                href="/login"
                variant="dark"
                className="mb-0 text-capitalize"
              >
                Login
              </Button>
              <Button variant="dark" className="mb-0 ms-3 text-capitalize">
                register
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default navbar;
