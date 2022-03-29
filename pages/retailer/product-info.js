import React from "react";
import Navbar from "../../components/navbar/navbar";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as starThin } from "@fortawesome/free-regular-svg-icons";

function productInfo() {
  const stars = [
    <FontAwesomeIcon icon={faStar} style={{ hight: "14px", width: "14px" }} />,
    <FontAwesomeIcon icon={faStar} style={{ hight: "14px", width: "14px" }} />,
    <FontAwesomeIcon icon={faStar} style={{ hight: "14px", width: "14px" }} />,
    <FontAwesomeIcon icon={faStar} style={{ hight: "14px", width: "14px" }} />,
    <FontAwesomeIcon
      icon={starThin}
      style={{ hight: "14px", width: "14px" }}
    />,
  ];

  return (
    <>
      <Navbar />
      <div className="w-80 mx-auto mt-5">
        <Container>
          <Row>
            <Col md="6" className="d-fex flex-column">
              <div className="" style={{ width: "350px" }}>
                <div
                  className="bg-dark mb-5 w-100"
                  style={{ width: "350px", height: "350px" }}
                >
                  main
                </div>
                <div className="d-flex justify-content-between">
                  <div
                    className="bg-dark"
                    style={{ width: "75px", height: "75px" }}
                  >
                    1
                  </div>
                  <div
                    className="bg-dark"
                    style={{ width: "75px", height: "75px" }}
                  >
                    2
                  </div>
                  <div
                    className="bg-dark"
                    style={{ width: "75px", height: "75px" }}
                  >
                    3
                  </div>
                  <div
                    className="bg-dark"
                    style={{ width: "75px", height: "75px" }}
                  >
                    4
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6">
              <h2>Wooden Container Bowl</h2>
              <span className="d-flex">{stars}</span>
              <div className="d-flex">
                <h3>$96.00/</h3>
                <span className="mt-2">Pack (12pieces)</span>
              </div>
              <div>
                <form action="">
                  <div className="d-flex">
                    <div className="me-3">
                      <label htmlFor="color" className="d-flex flex-column">
                        Color
                      </label>
                      <select
                        id="cars"
                        name="carlist"
                        form="carform"
                        style={{ width: "10rem" }}
                      >
                        <option value="volvo">Blue</option>
                        <option value="saab">Red</option>
                        <option value="opel">Purple</option>
                        <option value="audi">Grean</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="size" className="d-flex flex-column">
                        Size(inch)
                      </label>
                      <select
                        id="cars"
                        name="carlist"
                        form="carform"
                        style={{ width: "10rem" }}
                      >
                        <option value="volvo">1</option>
                        <option value="saab">2</option>
                        <option value="opel">3</option>
                        <option value="audi">4</option>
                      </select>
                    </div>
                  </div>
                  <span className="my-2 d-flex" style={{ fontSize: "13px" }}>
                    Stock : 1024
                  </span>
                  <label
                    className="mb-3 d-flex flex-column"
                    htmlFor="Quantity"
                    style={{ fontSize: "12px" }}
                  >
                    Quantity
                  </label>
                  <input
                    style={{
                      border: "0.5px solid #979797",
                      borderRadius: "2px",
                    }}
                    className="w-50 mb-2"
                    type="number"
                    placeholder="Minimum is 24"
                  />
                  <div className="d-flex mt-3">
                    <input
                      className="px-4 py-1 text-white"
                      type="submit"
                      value="Order now"
                      style={{
                        background: "#535252",
                        borderRadius: "2px",
                      }}
                    ></input>
                    <input
                      className="px-4 py-1 text-white ms-2"
                      type="submit"
                      value="Pre-order"
                      style={{
                        background: "#535252",
                        borderRadius: "2px",
                      }}
                    ></input>
                    <input
                      className="px-4 py-1 text-white ms-2"
                      type="submit"
                      value="Request quotation"
                      style={{
                        background: "#535252",
                        borderRadius: "2px",
                      }}
                    ></input>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="d-flex my-5">
          <div
            className="bg-dark"
            style={{ width: "100px", height: "100px" }}
          ></div>
          <span className="my-auto ms-3">Store name</span>
        </div>
        <div className="w-100 mb-5 p-3" style={{ border: "1px solid #EEEEEE" }}>
          <h5>Lorem ipsum dolor sit amet</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
          <ul>
            <li>Irure dolor in reprehenderit in voluptate</li>
            <li>Irure dolor in reprehenderit</li>
            <li>Irure dolor in lorem</li>
          </ul>
          <p>
            Delivery from : Sunt in culpa qui officia deserunt mollit anim id
            est laborum.
          </p>
        </div>
      </div>
    </>
  );
}

export default productInfo;
