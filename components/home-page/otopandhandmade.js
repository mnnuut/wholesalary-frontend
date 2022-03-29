import React from "react";
import { Container, Row, Col } from "react-bootstrap";
function otopandhandmade() {
  return (
    <>
      <Container className="my-7" fluid>
        <Row>
          <Col
            xs="12"
            md="6"
            className="py-5 d-flex"
            style={{
              backgroundImage:
                "url(https://ih1.redbubble.net/image.848753907.6988/flat,750x1000,075,f.u2.jpg)",
            }}
          >
            <div className="col-6"></div>
            <div>
              <h1>OTOP</h1>
              <p>
                Best quality of Thailand OTOP that you can buy in wholesale
                price.
              </p>
            </div>
          </Col>
          <Col
            xs="12"
            md="6"
            className="py-5 d-flex"
            style={{
              backgroundImage:
                "url(https://ih1.redbubble.net/image.848753907.6988/flat,750x1000,075,f.u2.jpg)",
            }}
          >
            <div>
              <h1>Handmade</h1>
              <p>
                Best quality of handmade product that you can buy in wholesale
                price.
              </p>
            </div>
            <div className="col-6"></div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default otopandhandmade;
