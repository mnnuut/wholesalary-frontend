import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function quotationRequest() {
  const router = useRouter();
  const { id } = router.query;
  const { uid } = router.query;
  const updateID = id;
  const [newData, setNewData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [shippingInfo, setShippingInfo] = useState("");
  const [expextedDeliveryInfo, setExpextedDelivery] = useState(new Date());
  const [expireDateInfo, setExpireDate] = useState(new Date());
  const [note, setNote] = useState("");
  const [offeredPrice, setOfferedPrice] = useState();

  const expireDate = expireDateInfo.toString().slice(4, 16);
  const expextedDelivery = expextedDeliveryInfo.toString().slice(4, 16);

  console.log("this is time", expextedDelivery, expireDate);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/api/quotations/${uid}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setNewData(data);

        setLoading(false);
      });
  }, []);
  // check transection id to update
  const [transectionInfo, setTransectionInfo] = useState([]);
  useEffect(() => {
    const id = newData.creatorID;
    fetch(`http://localhost:8080/api/get-retailer-transectoin-info/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTransectionInfo(data);
      });
  }, [newData]);
  const transectionID = transectionInfo.find(
    (item) => item.orderID === newData.orderID
  );
  // console.log(transectionID);

  let itemsToRender;
  if (newData.countLists) {
    itemsToRender = newData.countLists.map((item) => {
      return (
        <tbody key={item.id}>
          <tr>
            <td className="p-3">{item.productName}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td className="text-center">{item.price * item.quantity}</td>
          </tr>
        </tbody>
      );
    });
  }

  let total;
  if (newData.countLists) {
    total = newData.countLists.reduce((currentPrice, price) => {
      return price.price * price.quantity + currentPrice;
    }, 0);
  }
  const totalPrice = Number(offeredPrice) + Number(shippingPrice);

  // update quotation status
  const updateQuotationStatus = async () => {
    const secondUid = newData.storeID;
    const secondId = updateID;
    const secondResponse = await fetch(
      `http://localhost:8080/api/wholesaler-update-status/${secondUid}/${secondId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          status: "Quotation successful",
          total: totalPrice,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const uid = newData.creatorID;
    const id = transectionID.id;
    const response = await fetch(
      `http://localhost:8080/api/retailer-update-status/${uid}/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          status: "Confirm",
          shippingPrice,
          shippingInfo,
          expextedDelivery,
          expireDate,
          note,
          offeredPrice,
          total: totalPrice,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    router.push("/wholesaler/quotation");
  };
  // console.log(id, newData.storeID);
  return (
    <>
      <div className="text-center">
        <h1 className="p-5" style={{ color: "#535252", fontSize: "33px" }}>
          Wholesalery
        </h1>
      </div>
      <div className="w-90 mx-auto container">
        <div>
          <p> QUO #{newData.orderID}</p>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 col-md-6">
            <p>from</p>
            <div className="d-flex p-3" style={{ backgroundColor: "#DDDFE1" }}>
              <div
                className="bg-white me-3"
                style={{ width: "200px", hight: "130px" }}
              ></div>
              <div>
                <h5>{newData.storeName}</h5>
                <span>+66 97-347-38xx</span>
                <p>
                  Small Air Office Great Bldg, 2nd Fl. Soi Lat Phrao 110, Lat
                  Phrao Rd Klong Chan, Bang Kapi Bangkok Thailand 10240
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <p>bill to</p>
            <div className="d-flex p-3" style={{ backgroundColor: "#DDDFE1" }}>
              <div
                className="bg-white me-3"
                style={{ width: "200px", hight: "130px" }}
              ></div>
              <div>
                <h5>Kritsana Shop</h5>
                <span>+66 64-757-72xx</span>
                <p>42 Moo 1 Baan Sang Kae Sadao Buached Surin 32230</p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-5" style={{ border: "1px solid #E5E5E5" }}>
          <table
            style={{ borderCollapse: "separate", borderSpacing: "2rem 1.5rem" }}
          >
            <thead>
              <tr>
                <th className="col-5 p-3">Item Description</th>
                <th className="col-3">Price</th>
                <th className="col-3">Quantity</th>
                <th className="col-5 text-center">Original Price</th>
              </tr>
            </thead>

            {itemsToRender}

            <tbody>
              <tr>
                <td className="p-3">The sumation of Original Prices</td>
                <td></td>
                <td className="text-center"></td>
                <td className="text-center p-3">{total}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td className="p-3">Offered Price</td>
                <td></td>
                <td className="text-center"></td>
                <td className="text-center p-3">
                  <input
                    type="text"
                    style={{ width: "70px" }}
                    onChange={(e) => setOfferedPrice(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td className="p-3">Shipping Price</td>
                <td></td>
                {/* <td></td> */}
                <td className="text-center"></td>
                <td className="text-center p-3">
                  <input
                    type="text"
                    style={{ width: "70px" }}
                    onChange={(e) => setShippingPrice(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div
            className="d-flex justify-content-between w-95 mx-auto p-3 mb-3"
            style={{ background: "#EEEEEE", borderRadius: "2px" }}
          >
            <p className=" m-0">Total</p>
            <span>{totalPrice ? totalPrice : 0}</span>
          </div>
        </div>
        <div>
          <h5 className="my-4">Quotation Information</h5>
        </div>
        <div className="my-5">
          <form action="">
            <label className="mb-3" htmlFor="Shipping Information">
              Shipping Information
            </label>
            <input
              style={{ border: "0.5px solid #979797", borderRadius: "2px" }}
              className="w-100 mb-2"
              type="text"
              placeholder=""
              onChange={(e) => setShippingInfo(e.target.value)}
            />
            <label className="mb-3" htmlFor="Shipping Information">
              Note
            </label>
            <input
              style={{ border: "0.5px solid #979797", borderRadius: "2px" }}
              className="w-100 mb-2"
              type="text"
              placeholder=""
              onChange={(e) => setNote(e.target.value)}
            />
            <div className="d-flex mt-5">
              <label className="mb-3" htmlFor="Shipping Information">
                Expexted Delivery
              </label>
              <DatePicker
                className="ms-5"
                selected={expextedDeliveryInfo}
                onChange={(date) => setExpextedDelivery(date)}
                dateFormat="MM/dd/yyyy"
              />

              <label className="mb-3" htmlFor="Shipping Information">
                Expire Date
              </label>
              <DatePicker
                className="ms-5"
                selected={expireDateInfo}
                onChange={(date) => setExpireDate(date)}
                dateFormat="MM/dd/yyyy"
              />
            </div>

            <input
              className="px-5 text-white my-5 ms-auto"
              type="button"
              value="Confirm"
              style={{
                background: "#535252",
                borderRadius: "2px",
                float: "right",
              }}
              onClick={updateQuotationStatus}
            ></input>
          </form>
        </div>
      </div>
    </>
  );
}

export default quotationRequest;
