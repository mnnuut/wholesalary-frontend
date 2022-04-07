import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { connect } from "react-redux";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

function order() {
  const [newData, setNewData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [userName, setUserName] = useState(null);
  const [uid, setUid] = useState(null);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    var item = JSON.parse(window.localStorage.getItem("wholesalerInfo"));
    setUid(item.id);
    setUserName(item.name);
  }, []);
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/api/orders/" + uid)
      .then((res) => res.json())
      .then((data) => {
        setNewData(data);
        setLoading(false);
      });
  }, [uid, refresh]);
  const deleteItem = async (id) => {
    const response = await fetch(
      `http://localhost:8080/api/delete-order-wholesaler/${uid}/${id}`,
      {
        method: "DELETE",
      }
    );
    setRefresh(!refresh);
  };
  console.log(newData);
  return (
    <>
      <nav>
        <div className="d-flex justify-content-between p-3">
          <h1 style={{ fontSize: "24px" }}>wholesalery</h1>
          <span>
            <FontAwesomeIcon
              icon={faCircleUser}
              style={{ height: "30px", width: "30px" }}
            />
          </span>
        </div>
        <div className="d-flex justify-content-center">
          <div style={{ backgroundColor: "#E9E9E9" }}>
            <p className="p-3 m-0">Orders</p>
          </div>
          <Link href={"/wholesaler/quotation"}>
            <div>
              <p className="p-3 m-0">Quotation Request</p>
            </div>
          </Link>
          <div>
            <p className="p-3 m-0">My Shop</p>
          </div>
          <div>
            <p className="p-3 m-0">Analytics</p>
          </div>
        </div>
      </nav>
      <div className="my-5 w-90 mx-auto">
        <h1 style={{ fontSize: "36px" }}>Quotation Request</h1>
      </div>
      <div
        className="w-90 mx-auto"
        style={{ border: "solid 1px gray", borderRadius: "2px" }}
      >
        <form action="" className="d-flex">
          <span className="p-3">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ height: "15px", width: "15px" }}
            />
          </span>
          <input
            className="w-100 border-0"
            placeholder="Search orders"
            type="text"
          />
        </form>
      </div>
      <div className="d-flex w-90 mx-auto my-5">
        <div>
          <p className="p-3 m-0" style={{ backgroundColor: "#E9E9E9" }}>
            all
          </p>
        </div>
        <div>
          <p className="p-3 m-0">Wait for confirm order </p>
        </div>
        <div>
          <p className="p-3 m-0">Wait for payment</p>
        </div>
        <div>
          <p className="p-3 m-0">Wait for confirm payment</p>
        </div>
        <div>
          <p className="p-3 m-0">Shipped</p>
        </div>
      </div>
      <div className="w-90 mx-auto">
        <table
          style={{ borderCollapse: "separate", borderSpacing: "0 1.5rem" }}
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
              <th className="col-2 "></th>
            </tr>
          </thead>
          {newData.map((el) => {
            return (
              <tbody
                key={el.id}
                className="mt-3"
                style={{
                  background: "#FAFAFA",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <tr>
                  <td className="p-3">{el.orderID}</td>
                  {/* {el.dateTimeInfo && (
                    <td>
                      {el.dateTimeInfo.slice(0, 10)}/
                      {el.dateTimeInfo.slice(11, 16)}
                    </td>
                  )} */}
                  <td>{el.dateTimeInfo}</td>
                  <td>{el.customerName}</td>
                  <td className="text-center">
                    {el.status === "Wait for confirm payment" ? (
                      <Link
                        href={`/wholesaler/order/${uid}/${el.id}`}
                        // href={`/wholesaler/${el.storeID.trim()}/${data.id}`}
                        // href={`/wholesaler`}
                      >
                        <span
                          className="py-1 px-3"
                          style={{ backgroundColor: "#F6C927" }}
                        >
                          Wait for confirm payment
                        </span>
                      </Link>
                    ) : (
                      <span
                        className="py-1 px-3"
                        style={{ backgroundColor: "#1BD27E" }}
                      >
                        Shipped
                      </span>
                    )}
                  </td>
                  <td className="text-end p-3">{el.total}</td>
                  <td className="text-end p-3">
                    <FontAwesomeIcon
                      className="pe-1"
                      icon={faTrashCan}
                      style={{
                        height: "30px",
                        width: "20px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        deleteItem(el.id);
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            );
          })}

          {/* <tbody
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
              <td className="text-center">
                <span
                  className="py-1 px-3"
                  style={{ backgroundColor: "#F6C927" }}
                >
                  Quotation successful
                </span>
              </td>
              <td className="text-end p-3">$10,000.00</td>
            </tr>
          </tbody> */}
        </table>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  id: state.login.id,
  email: state.login.email,
  name: state.login.name,
});

export default connect(mapStateToProps)(order);
