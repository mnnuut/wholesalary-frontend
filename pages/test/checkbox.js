import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Container, Row, Col, Table } from "react-bootstrap";

export const getStaticProps = async () => {
  const id = "DgPcpc8UzgtewtPEhUEc";
  const res = await fetch("http://localhost:8080/api/retailer-cart/" + id);

  const data = await res.json();

  return {
    props: { newData: data },
  };
};

function requestQuotation({ newData }) {
  const [selectedLists, setSelectedLists] = useState([]);

  useEffect(() => {
    setSelectedLists(
      newData.map((d) => {
        return {
          select: false,
          id: d.id,
          price: d.price,
          productName: d.productName,
          quantity: d.quantity,
        };
      })
    );
  }, []);
  const countLists = selectedLists.filter((e) => e.select === true);
  console.log("countlist is", countLists);
  console.log(selectedLists);
  const total = countLists.reduce((currentPrice, price) => {
    return price.price * price.quantity + currentPrice;
  }, 0);
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
            <Col md="8">
              <div className="d-flex">
                <div
                  className="py-2 px-5"
                  style={{
                    border: "0.2px solid #ABAFB3",
                    backgroundColor: " #ABAFB3",
                  }}
                >
                  Request quotation
                </div>
                <div
                  className="py-2 px-5"
                  style={{ border: "0.2px solid #ABAFB3" }}
                >
                  Quatation list
                </div>
              </div>
              <hr className="m-0" />
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
                      <th className="col-1"></th>
                      <th className="col-4">Product</th>
                      <th className="col-3">Price</th>
                      <th className="col-3">Quantity</th>
                      <th className="col-3 text-center">SubTotal</th>
                    </tr>
                  </thead>

                  <tbody
                    className="mt-3"
                    style={{
                      background: "#FAFAFA",
                      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {selectedLists.map((d, i) => (
                      <tr key={d.id}>
                        <th scope="row">
                          <input
                            onChange={(event) => {
                              let checked = event.target.checked;
                              setSelectedLists(
                                selectedLists.map((data) => {
                                  if (d.id === data.id) {
                                    data.select = checked;
                                  }
                                  return data;
                                })
                              );
                            }}
                            type="checkbox"
                            checked={d.select}
                          ></input>
                        </th>
                        <td>{d.productName}</td>
                        <td>{d.price}</td>
                        <td>{d.quantity}</td>
                        <td>{d.price * d.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Col>
            <Col md="4">
              <div
                className="d-flex flex-column w-100 p-5"
                style={{ border: "0.5px solid #979797" }}
              >
                <h5>Summary</h5>
                <h5>Quotation</h5>
                <div className="my-3">
                  {countLists.map((p) => {
                    return (
                      <div className="d-flex justify-content-between">
                        <span>{p.productName}</span>
                        <span>{p.price}</span>
                      </div>
                    );
                  })}
                  {/* {countLists.reduce((currentPrice, price) => {
                    return (
                      <div className="d-flex justify-content-between">
                        <span>Total:</span>
                        <span>{price.price + currentPrice}</span>
                      </div>
                    );
                  }, 0)} */}
                  <div className="d-flex justify-content-between">
                    <span>Total:</span>
                    <span>{total}</span>
                  </div>

                  {/* <div className="d-flex justify-content-between">
                    <span>Store name 1</span>
                    <span>44$</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Total:</span>
                    <span>44$</span>
                  </div> */}
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
