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
    fetch("http://localhost:8080/api/retailer-get-quotation-lists-confirm/" + uid)
      .then((res) => res.json())
      .then((data) => {
        setNewData(data);
        setLoading(false);
      });
  }, [uid, refresh]);
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
  const countLists = selectedLists.filter((e) => e.select === true);
  console.log(selectedLists);
  const updateIdLists = countLists.map((el) => el.id);
  // console.log(updateIdLists);
  // console.log(newData);

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
        <Container fluid className="my-6">
          <Row className="d-flex">
            <Col md="12">
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
                    <th className="col-2 p-3">Order ID</th>
                    <th className="col-3">Order Date/Time</th>
                    <th className="col-2">Customer</th>
                    <th className="col-5 text-center">Status</th>
                    <th className="col-2 text-end p-3">Total</th>
                    <th className="col-2 text-end p-3"></th>
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
                        <td className="p-2">{d.orderID}</td>
                        <td>{d.dateTime}</td>
                        <td>{d.storeName}</td>
                        <td className="text-center" >
                          {
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
                          }
                        </td>
                        <td>{d.total}</td>
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
                </table>
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
