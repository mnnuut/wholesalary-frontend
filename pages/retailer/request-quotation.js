import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Table } from "react-bootstrap";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
// import { connectStorageEmulator } from "firebase/storage";
// import router from "next/router";

function requestQuotation() {
  const [selectedLists, setSelectedLists] = useState([]);
  const [newData, setNewData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const [uid, setUid] = useState(null);
  const [userName, setuserName] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [quantity, setQuantity] = useState(null);
  const [cartid, setChangeid] = useState(null);

  useEffect(() => {
    var item = JSON.parse(window.localStorage.getItem("retailerInfo"));
    setUid(item.id);
    setuserName(item.name);
    setLoading(true);
    fetch("http://localhost:8080/api/retailer-cart/" + uid)
      .then((res) => res.json())
      .then((data) => {
        setNewData(data);
        setLoading(false);
      });
  }, [uid, refresh]);
  useEffect(() => {
  }, [quantity]);
  useEffect(() => {
    setSelectedLists(
      newData.map((d) => {
        return {
          select: false,
          id: d.id,
          price: d.price,
          productName: d.productName,
          quantity: d.quantity,
          storeName: d.storeName,
          storeID: d.storeID,
          creatorID: d.creatorID,
        };
      })
    );
  }, [newData]);
  const countLists = selectedLists.filter((e) => e.select === true);
  const updateIdLists = countLists.map((el) => el.id);
  console.log("countlist is", countLists);
  console.log("update id lists", updateIdLists);
  console.log(updateIdLists.length, updateIdLists[0]);

  const total = countLists.reduce((currentPrice, price) => {
    return price.price * price.quantity + currentPrice;
  }, 0);

  const isSameStore = countLists.every((el, index, arr) => {
    if (index === 0) {
      return true;
    } else {
      return el.storeName === arr[index - 1].storeName;
    }
  });

  var today = new Date();
  var date = `${today.getDate()}-${
    today.getMonth() + 1
  }-${today.getFullYear()} `;
  var time = `${today.getHours()}:${today.getMinutes()}`;

  // const dateTime = `${date} ${time}`;
  const dateTime = today.toLocaleString({ timeZone: 'UTC'});
  const orderID = Math.floor(Math.random() * 1000000);
  const creatorID = uid;
  const allStoreID = countLists.map((i) => i.storeID);
  const storeID = allStoreID[0];
  const allStoreName = countLists.map((i) => i.storeName);
  const storeName = allStoreName[0];

  const updateCartAmount = async (a) => {
    const updateres = await fetch(
      "http://localhost:8080/api/retailer-update-cart/" + uid +"/" +cartid,
      {
        method : "PUT",
        body: JSON.stringify({
          quantity : quantity
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    setTimeout(function() {
      router.reload(window.location.pathname)
   }, 1000);

    // router.push("/retailer/request-quotation");
  }
  const requestQuotation = async () => {
    if (storeID != null){
      alert(storeID);
      if (isSameStore === false) {
        alert("Every quotation requests must be from the same store ");
      } else {
        const response = await fetch(
          "http://localhost:8080/api/wholesaler-quotation-request/" + storeID,
          {
            method: "POST",
            body: JSON.stringify({
              dateTime,
              orderID,
              countLists,
              creatorID,
              total,
              status: "Wait for quotation detail",
              storeID,
              storeName,
              userName,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response)
        const secondResponse = await fetch(
          "http://localhost:8080/api/retailer-quotation-list/" + uid,
          {
            method: "POST",
            body: JSON.stringify({
              dateTime,
              orderID,
              countLists,
              creatorID,
              total,
              status: "Waiting",
              // name,
              storeID,
              storeName,
              userName,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        for (let i = 0; i < updateIdLists.length; i++) {
          let id = updateIdLists;
          const deleteOnRequest = await fetch(
            `http://localhost:8080/api/delete-quotation-request/${uid}/${id[i]}`,
            {
              method: "DELETE",
            }
          );
        }
        router.push("/retailer/request-quotation-list");
      }
    } else {
      alert("StoreID is Null")
    }

  };
  const deleteItem = async (id) => {
    const response = await fetch(
      `http://localhost:8080/api/delete-quotation-request/${uid}/${id}`,
      {
        method: "DELETE",
      }
    );
    setRefresh(!refresh);
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
                <div
                  className="py-2 px-5"
                  style={{
                    border: "0.2px solid #ABAFB3",
                    backgroundColor: " #ABAFB3",
                  }}
                >
                  Request quotation
                </div>
                <Link href={"/retailer/request-quotation-list"}>
                  <div
                    className="py-2 px-5"
                    style={{ border: "0.2px solid #ABAFB3", cursor: "pointer" }}
                    // style={{ cursor:"pointer" }}
                  >
                    Quatation list
                  </div>
                </Link>
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
                      <th className="col-4 p-2">Product</th>
                      <th className="col-3">Store Name</th>
                      <th className="col-2">Price</th>
                      <th className="col-2">Quantity</th>
                      <th className="col-2">SubTotal</th>
                      <th className="col-1 pe-2"></th>
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
                        <td className="p-2">{d.productName}</td>

                        <td>{d.storeName}</td>
                        <td>{d.price}</td>
                        <td>
                        <input
                            style={{
                              border: "0.5px solid #979797",
                              borderRadius: "2px",
                            }}
                            className="w-50 mb-2"
                            onChange={
                              (e) => {
                                setQuantity(e.target.value + "0")
                                setChangeid(d.id)
                                updateCartAmount()
                              }
                            }
                            defaultValue = {d.quantity}
                        />
                        </td>
                        <td>{d.price * d.quantity}</td>
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
                        <span>{p.productName}</span>
                        <span>{p.price * p.quantity}</span>
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
                    requestQuotation();
                  }}
                >
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

const mapStateToProps = (state) => ({
  id: state.login.id,
  email: state.login.email,
  name: state.login.name,
});

export default connect(mapStateToProps)(requestQuotation);
