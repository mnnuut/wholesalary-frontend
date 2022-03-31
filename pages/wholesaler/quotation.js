import { useState, useEffect } from "react";
import WholesalerNavbar from "../../components/navbar/wholesaler-navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import Link from "next/link";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

function quotation() {
  const [newData, setNewData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [userName, setUserName] = useState(null);
  const [uid, setUid] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    var item = JSON.parse(window.localStorage.getItem("wholesalerInfo"));
    setUid(item.id);
    setUserName(item.name);
  }, [uid,refresh]);
  useEffect(() => {
    if (uid != null){
    setLoading(true);
    fetch("http://localhost:8080/api/quotations/" + uid)
      .then((res) => res.json())
      .then((data) => {
        setNewData(data);
        setLoading(false);
      }
      );
    }
  }, [uid, refresh]);
  const deleteItem = async (id) => {
    const response = await fetch(
      `http://localhost:8080/api/delete-quotation-wholesaler/${uid}/${id}`,
      {
        method: "DELETE",
      }
    );
    setRefresh(!refresh);
  };
  console.log(newData + " second");
  console.log(uid + " second");
  return (
    <>
      <WholesalerNavbar />
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
          <p className="p-3 m-0">Wait for quotation detail </p>
        </div>
        <div>
          <p className="p-3 m-0">Quotation successful</p>
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
              <th className="col-2 p-3">Order ID{newData.id}</th>
              <th className="col-3">Order Date/Time</th>
              <th className="col-2">Customer</th>
              <th className="col-5 text-center">Status</th>
              <th className="col-2 text-end p-3">Total</th>
              <th className="col-2 text-end p-3"></th>
            </tr>
          </thead>
          {newData.map((data) => {
            return (
              <tbody
                className="mt-3"
                key={data.id}
                style={{
                  background: "#FAFAFA",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <tr>
                  <td className="p-3">{data.orderID}</td>
                  <td>{data.dateTime}</td>
                  <td>{data.userName}</td>
                  <td className="text-center">
                    {data.status === "Quotation successful" ? (
                      <span
                        className="py-1 px-3"
                        style={{ backgroundColor: "#1BD27E" }}
                      >
                        Quotation successful
                      </span>
                    ) : (
                      <Link
                        href={`/wholesaler/${data.storeID.trim()}/${data.id}`}
                      >
                        <button
                          className="py-1 px-3 border-0"
                          type="button"
                          style={{ backgroundColor: "#F6C927" }}
                        >
                          Wait for quotation detail
                        </button>
                      </Link>
                    )}
                  </td>
                  <td className="text-end p-3">{data.total}</td>
                  <td className="text-end p-3">
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      style={{
                        height: "15px",
                        width: "15px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        deleteItem(data.id);
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            );
          })}
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

export default connect(mapStateToProps)(quotation);
