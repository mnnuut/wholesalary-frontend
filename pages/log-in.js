import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function logIn() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      if (login) {
        console.log("successfully");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div
        className="vh-100 position-relative"
        style={{ background: "#E9E9E9" }}
      >
        <Form
          className="w-90 w-md-50 bg-white p-2 p-md-5 h-75 position-absolute top-0 end-0 bottom-0 start-0 m-auto"
          style={{
            borderRadius: "8.33px",
          }}
        >
          <div className="text-center">
            <h1>Login</h1>
            <p>Welcome back to wholesalery</p>
          </div>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group
            className="mb-3 d-flex justify-content-between"
            controlId="formBasicCheckbox"
          >
            <Form.Check type="checkbox" label="Remember me" />
            <Form.Text>Forgot password?</Form.Text>
          </Form.Group>
          <Button
            className="w-100"
            variant="dark"
            type="submit"
            onClick={login}
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default logIn;
