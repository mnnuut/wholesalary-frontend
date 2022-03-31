import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import { setUserIdentity } from "../../redux/actions/loginAction";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:8080/api/user");
  const data = await res.json();

  return {
    props: { newData: data },
  };
};

function logIn({ newData, setUserIdentity }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      const currentUserIdentity = newData.find(
        (item) => item.email === loginEmail
      );
      console.log(currentUserIdentity);
      setUserIdentity(currentUserIdentity);
      window.localStorage.setItem(
        "wholesalerInfo",
        JSON.stringify(currentUserIdentity)
      );
      setCurrentUser(true);
    } catch (error) {
      alert(error.message);
    }
  };
  console.log(newData);

  if (currentUser) {
    const router = useRouter();
    router.push("/wholesaler/quotation");
  }
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
            <h1>Login as wholesaler</h1>
            <p>Welcome back to wholesalery</p>
          </div>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event) => setLoginEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(event) => setLoginPassword(event.target.value)}
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
            className="w-100 text-capitalize"
            variant="dark"
            type="button"
            onClick={login}
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

// mapStateToProps
// รับฟังก์ชันจาก store มาใช้งาน
const mapStateToProps = (state) => ({
  setUserIdentity: state.setUserIdentity,
});

// mapDispatchToProps
// ส่งค่าไปยัง store เป็น object
const mapDispatchToProps = (dispatch) => {
  return {
    setUserIdentity: (data) => {
      dispatch({
        type: "SETUSER_IDENTITY",
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(logIn);
