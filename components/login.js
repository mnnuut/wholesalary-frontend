import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import auth from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function MyVerticallyCenteredModal(props) {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="modal-80w"
    >
      <div className="text-center p-7 position-relative">
        <FontAwesomeIcon
          icon={faXmark}
          style={{ hight: "14px", width: "14px" }}
          className="position-absolute top-5 end-3"
          onClick={props.onHide}
        />
        <h3>Wholesalerly</h3>
        <h1 className="opacity-6">Unlock Wholesaler Pricing</h1>
        <div className="mt-4">
          <Button
            href="/log-in"
            className="me-4 text-capitalize"
            variant="dark"
          >
            Login wholesaler
          </Button>
          <Button
            onClick={() => setModalShow(true)}
            variant="dark text-capitalize"
          >
            Login as retailer
          </Button>
          <SecondModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
      </div>
    </Modal>
  );
}
function SecondModal(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();
  signInWithEmailAndPassword(auth, userName, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  const handleLogin = (auth) => {};
  const handleUserName = (even) => {
    setUserName(even.target.value);
  };
  const handlePassword = (even) => {
    setPassword(even.target.value);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ width: "100%" }}
    >
      <Form
        className="p-2 p-md-5"
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
            onChange={handleUserName}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={handlePassword}
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
          type="button"
          onClick={handleLogin}
        >
          Submit
        </Button>
      </Form>
    </Modal>
  );
}

function App() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button
        variant="light"
        className="me-3 mb-0"
        onClick={() => setModalShow(true)}
      >
        sign-in
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default App;
