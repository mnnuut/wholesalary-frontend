import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";

function requestQuotation({ setOrderinfo }) {
  const [selectedLists, setSelectedLists] = useState([]);
  const [newData, setNewData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const [uid, setUid] = useState(null);
  const [userName, setuserName] = useState(null);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    var item = JSON.parse(window.localStorage.getItem("retailerInfo"));
    setUid(item.id);
    setuserName(item.name);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/api/retailer-get-quotation-lists/" + uid)
      .then((res) => res.json())
      .then((data) => {
        setNewData(data);
        setLoading(false);
      });
  }, [uid, refresh]);
  // console.log(newData);
  useEffect(() => {
    setSelectedLists(
      newData.map((d) => {
        return {
          select: false,
          id: d.id,
          creatorID: d.creatorID,
          dateTime: d.dateTime,
          orderID: d.orderID,
          status: d.status,
          storeID: d.storeID,
          total: d.total,
          countLists: d.countLists,
          storeName: d.storeName,
        };
      })
    );
  }, [newData]);
  // console.log(newData);
  const countLists = selectedLists.filter((e) => e.select === true);
  const updateIdLists = countLists.map((el) => el.id);
  console.log(updateIdLists);
  console.log(newData);

  const total = countLists.reduce((currentPrice, price) => {
    return price.total + currentPrice;
  }, 0);

  const isSameStore = countLists.every((el, index, arr) => {
    if (index === 0) {
      return true;
    } else {
      return el.storeName === arr[index - 1].storeName;
    }
  });

  const isSameStatus = countLists.every((el, index, arr) => {
    if (index === 0) {
      return true;
    } else {
      return el.status === "Confirm";
    }
  });

  var today = new Date();
  var date = `${today.getDate()}-${
    today.getMonth() + 1
  }-${today.getFullYear()} `;
  var time = `${today.getHours()}:${today.getMinutes()}`;

  const dateTime = `${date} ${time}`;
  const orderID = `000${today.getHours()}${today.getMinutes()}`;
  const creatorID = uid;
  const allStoreID = countLists.map((i) => i.storeID);
  const storeID = allStoreID[0];
  // const shippingInfo = countLists;
  // console.log("this is store id", shippingInfo);
  // console.log(countLists);
  const deleteItem = async (id) => {
    const response = await fetch(
      `http://localhost:8080/api/delete-quotation-request-list/${uid}/${id}`,
      {
        method: "DELETE",
      }
    );
    setRefresh(!refresh);
  };

  const order = async () => {
    if (isSameStore === false) {
      alert("Every quotation requests must be from the same store");
    } else if (isSameStatus === false) {
      alert(
        "You can only process a transection on quotation list with status CONFIRM"
      );
    } else {
      let datas = {
        dateTime,
        orderID,
        countLists,
        creatorID,
        total,
        storeID,
        updateIdLists,
      };
      setOrderinfo(datas);
      // for (let i = 0; i < updateIdLists.length; i++) {
      //   let id = updateIdLists;
      //   const deleteOnRequest = await fetch(
      //     `http://localhost:8080/api/delete-quotation-request-list/${uid}/${id[i]}`,
      //     {
      //       method: "DELETE",
      //     }
      //   );
      // }
      // console.log(setOrderinfo);
      router.push("/retailer/payment-information");
    }
  };

  return (
    <>
      <div className="w-90 mx-auto">
        <div className="pt-6">
          <Link href={"/retailer"}>
            <FontAwesomeIcon
              // onClick={router.push("/retailer")}
              className="mb-n1"
              icon={faAngleLeft}
              style={{ height: "20", width: "10", cursor: "pointer" }}
            />
          </Link>
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
                <Link href={"/retailer/request-quotation"}>
                  <div
                    className="py-2 px-5"
                    style={{ border: "0.2px solid #ABAFB3", cursor: "pointer" }}
                  >
                    Request quotation
                  </div>
                </Link>
                <div
                  className="py-2 px-5"
                  style={{
                    border: "0.2px solid #ABAFB3",
                    backgroundColor: " #ABAFB3",
                  }}
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
                      <th className="col-3 p-2">Order ID</th>
                      <th className="col-3">Date/Time</th>
                      <th className="col-2">Store Name</th>
                      <th className="col-2">Total</th>
                      <th className="col-2 pe-2">Status</th>
                      <th className="col-2 pe-2"></th>
                    </tr>
                  </thead>
                  {selectedLists.map((d, i) => (
                    <tbody
                      key={d.id}
                      className="mt-3"
                      style={{
                        background: "#FAFAFA",
                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <tr>
                        <th scope="row">
                          <input
                            className="ms-3"
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
                        <td className="p-2">{d.orderID}</td>

                        <td>{d.dateTime}</td>
                        <td>{d.storeName}</td>
                        <td>{d.total}</td>

                        <td>
                          {d.status === "Waiting" ? (
                            <span
                              className="py-1 px-3"
                              style={{ backgroundColor: "#F6C927" }}
                            >
                              Waiting
                            </span>
                          ) : (
                            <Link href={`/retailer/${uid}/${d.id.trim()}`}>
                              <span
                                className="py-1 px-3"
                                style={{
                                  backgroundColor: "#1BD27E",
                                  cursor: "pointer",
                                }}
                              >
                                Confirm
                              </span>
                            </Link>
                          )}
                        </td>

                        <td>
                          <FontAwesomeIcon
                            className="pe-1"
                            icon={faTrashCan}
                            style={{
                              height: "30px",
                              width: "20px",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              deleteItem(d.id);
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  ))}
                  {/* </tbody> */}
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
                      <div className="d-flex justify-content-between mt-2">
                        <span>QUO#{p.orderID}</span>
                        <span>{p.total}</span>
                      </div>
                    );
                  })}

                  <div className="d-flex justify-content-between mt-3">
                    <span>Total:</span>
                    <span>{total}</span>
                  </div>
                </div>
                <button
                  className="btn btn-dark text-capitalize"
                  onClick={() => {
                    order();
                  }}
                >
                  Order
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  id: state.login.id,
  email: state.login.email,
  name: state.login.name,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setOrderinfo: (data) => {
      dispatch({
        type: "ORDERINFO",
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(requestQuotation);
