import React from "react";
import { Button } from "react-bootstrap";

function index() {
  return (
    <>
      <div
        className="vh-100 position-relative"
        style={{ background: "#E9E9E9" }}
      >
        <div
          className="w-90 w-md-50 bg-white text-center py-5 h-50  position-absolute top-0 end-0 bottom-0 start-0 m-auto"
          style={{
            borderRadius: "8.33px",
          }}
        >
          <h3>Wholesalerly</h3>
          <h1 className="opacity-6">Unlock Wholesaler Pricing</h1>
          <div className="mt-5">
            <Button
              href="/login/wholesaler-login"
              className="me-4 text-capitalize"
              variant="dark"
            >
              Login wholesaler
            </Button>
            <Button href="/login/retailer-login" variant="dark text-capitalize">
              Login as retailer
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
