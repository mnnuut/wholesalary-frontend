import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Container, Row, Col, Table } from "react-bootstrap";

function requestQuotation() {
  return (
    <>
      <div className="w-90 mx-auto">
        <div className="pt-6">
          <FontAwesomeIcon
            className="mb-n1"
            icon={faAngleLeft}
            style={{ height: "20", width: "10" }}
          />
          <div className="text-center mt-n4">
            <h2>Wholesalery</h2>
          </div>
        </div>
        <div className="d-flex justify-content-center mt-3">
          <div className="py-2 px-5" style={{ border: "0.2px solid #ABAFB3" }}>
            Order now
          </div>
          <div className="py-2 px-5" style={{ border: "0.2px solid #ABAFB3" }}>
            Pre-order
          </div>
          <div
            className="py-2 px-5"
            style={{
              border: "0.2px solid #ABAFB3",
              backgroundColor: " #ABAFB3",
            }}
          >
            Quotation
          </div>
        </div>
        <Container fluid className="my-6">
          <Row className="d-flex">
            <Col md="9">
              <div className="">
                <table
                  style={{
                    borderCollapse: "separate",
                    borderSpacing: "0 1.5rem",
                  }}
                >
                  <thead
                    className=""
                    style={{
                      boxShadow: "1.5px 2.6px 10px rgba(119, 119, 119, 0.1)",
                    }}
                  >
                    <tr>
                      <th className="col-2 p-3">Order ID</th>
                      <th className="col-3">Order Date/Time</th>
                      <th className="col-3">Store Name</th>
                      <th className="col-2 text-center">Total</th>
                      <th className="col-2 text-center">Status</th>
                      <th className="col-2"></th>
                    </tr>
                  </thead>

                  <tbody
                    className="mt-3"
                    style={{
                      background: "#FAFAFA",
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <tr>
                      <td className="p-3">000034</td>
                      <td>08 Mar, 2018 11.34 AM </td>
                      <td>Posture inside shop</td>

                      <td className="text-end p-3">$10,000.00</td>
                      <td className="text-center">
                        <span
                          className="py-1 px-3"
                          style={{ backgroundColor: "#1BD27E" }}
                        >
                          Confirm
                        </span>
                      </td>
                      <td>
                        <span>
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            className="mt-n2"
                            style={{ height: "18px", width: "14px" }}
                          />
                        </span>
                      </td>
                    </tr>
                  </tbody>
                  <tbody
                    className="mt-3"
                    style={{
                      background: "#FAFAFA",
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <tr>
                      <td className="p-3">000034</td>
                      <td>08 Mar, 2018 11.34 AM </td>
                      <td>Posture inside shop</td>

                      <td className="text-end p-3">$10,000.00</td>
                      <td className="text-center">
                        <span
                          className="py-1 px-3"
                          style={{ backgroundColor: "#F6C927" }}
                        >
                          Waiting
                        </span>
                      </td>
                      <td>
                        <span>
                          <FontAwesomeIcon
                            icon={faTrashCan}
                            className="mt-n2"
                            style={{ height: "18px", width: "14px" }}
                          />
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
            <Col md="3">
              <div
                className="d-flex flex-column w-100 p-5"
                style={{ border: "0.5px solid #979797" }}
              >
                <h5>Summary</h5>
                <h5>Quotation</h5>
                <div className="my-3">
                  <div className="d-flex justify-content-between">
                    <span>Store name 1</span>
                    <span>44$</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Total:</span>
                    <span>44$</span>
                  </div>
                </div>
                <button className="btn btn-dark text-capitalize">
                  Request Quotation
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default requestQuotation;
