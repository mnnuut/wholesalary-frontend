import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function payment() {
  const router = useRouter();
  const { uidOrder } = router.query;
  const { idOrder } = router.query;

  const [newData, setNewData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [uid, setUid] = useState(null)
  const [itemid, setItemID] = useState(null)
  // const [selectedLists, setSelectedLists] = useState([])

  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:8080/api/order/${uidOrder.trim()}/${idOrder.trim()}`
    )
      .then((res) => res.json())
      .then((data) => {
        setNewData(data);
        this.state({
          itemid: data.status
        })
        setLoading(false);
      });
  }, []);

  useEffect(() => {
      if(newData.hasOwnProperty('data')) {
          setUid(newData['data']['creatorID'])
          setItemID(newData['data']['updateIdLists'][0])
      }
  }, [newData]);

  const confirmOrder = async () => {
    const update = await fetch(
      `http://localhost:8080/api/wholesaler-orderupdate-status/${uidOrder}/${idOrder}`,
      {
        method: "PUT",
        body: JSON.stringify({ status: "Wait for confirm payment" }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const updateretaielr = await fetch(
      `http://localhost:8080/api/retailer-update-status/${uid}/${itemid}`,
      {
        method: "PUT",
        body: JSON.stringify({
          status: "Shipped",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    router.push("/wholesaler/order");
  };

  return (
    <>
      <div className="text-center">
        <h1 className="p-5" style={{ color: "#535252", fontSize: "33px" }}>
          Wholesalery
        </h1>
      </div>
      <div className="w-80 mx-auto">
        <div
          className="text-bold py-4 ps-5 mb-5"
          style={{ background: "#F9F9F9" }}
        >
          Payment Information
        </div>
        <div className="row">
          <div className="col-7">
            <div
              className="mb-4 p-4"
              style={{
                backgroundColor: "#F9F9F9",
              }}
            >
              <h4>Shipping info</h4>
              <hr />
              <p className="mb-0">{newData.shippingInfo}</p>
            </div>
            <div
              className="mb-4 p-4"
              style={{
                backgroundColor: "#F9F9F9",
              }}
            >
              <h4>Payment info</h4>
              <hr />
              <p className="mb-0">Payment by: {newData.transferMethod}</p>
              <p className="mb-0">Transfer amount: {newData.transferAmount} </p>
              {newData.dateTimeInfo && (
                <p className="mb-0">
                  Date: {newData.dateTimeInfo.slice(0, 11)}
                </p>
              )}
              {newData.dateTimeInfo && (
                <p className="mb-0">
                  Time: {newData.dateTimeInfo.slice(11, 17)}
                </p>
              )}
            </div>
            <div
              className="mb-4 p-4"
              style={{
                backgroundColor: "#F9F9F9",
              }}
            >
              <h4>Price summary</h4>
              <hr />
              <div className="d-flex justify-content-between">
                <span>Total:</span>
                <span>{newData.total}</span>
              </div>
            </div>
          </div>
          <div className="col-5">
            <img className="w-100" src={newData.imageUrl} alt="" />
          </div>
        </div>
        <div className="text-center my-5">
          <button
            onClick={confirmOrder}
            className="py-2 px-6 btn mb-0 text-capitalize  text-white "
            style={{ background: "#535252", border: "1px solid #535252" }}
          >
            Confirm
          </button>
        </div>

        {/* <div className="text-center">
          <button className="btn btn-dark">Confirm</button>
        </div> */}
      </div>
    </>
  );
}

export default payment;
