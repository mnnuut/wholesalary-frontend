import { useEffect, useState } from "react";

import Link from "next/link";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function payment({ data, setConfirmOrder }) {
  console.log("this is data", data);

  const [uid, setUid] = useState(null);
  const [userName, setuserName] = useState(null);
  // const uid = id;
  // const userName = name;
  const [imageUrl, setImageUrl] = useState(null);
  // const [transferAmount, setTransferAmount] = useState(0);
  const [transferMethod, setTransferMethod] = useState("");
  const [uploadStatus, setUploadStatus] = useState(false);
  const [updateIdLists, setUpdateIdLists] = useState(data.updateIdLists);

  const [itemid, setId] = useState(null)
  // console.log("this is ifli", updateIdLists);

  // datatime
  const [dateTimeInfomation, setDateTimeInfo] = useState(new Date());
  let dateTimeInfo;
  if (dateTimeInfomation) {
    dateTimeInfo = dateTimeInfomation.toString().slice(4, 21);
  }
  console.log("this is date", dateTimeInfo);

  const router = useRouter();
  useEffect(() => {
    var item = JSON.parse(window.localStorage.getItem("retailerInfo"));
    setUid(item.id);
    setuserName(item.name);
  }, []);
  // check for transection id
  let id;
  if (data.countLists) {
    const allID = data.countLists.map((i) => i.id);
    id = allID[0];

  }
  // console.log("id is ", id);

  const [newData, setNewData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(
      `http://localhost:8080/api/quotations-details/${uid}/${id}`
      // `http://localhost:8080/api/quotations-details/${uid}/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setId(id)
        setNewData(data);
        setLoading(false);
      });
  }, [uid]);
  // console.log(newData);

  let itemsToRender;
  if (newData.countLists) {
    itemsToRender = newData.countLists.map((item) => {
      console.log(item)
      return (
        <tbody key={item.id}>
          {/* <tr>
            <td className="p-3">{item.productName}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td className="text-center">{item.price * item.quantity}</td>
          </tr> */}
          <div className="d-flex justify-content-between">
          <span>{item.productName}&nbsp;&nbsp;&nbsp;</span>
          <span>{item.quantity}</span>
          </div>
        </tbody>
      );
    });
  }

  // const [image, setImage] = useState(null);
  const getFiles = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      uploadFiles(image);
    }
  };
  const uploadFiles = (image) => {
    //
    if (!image) return;
    const sotrageRef = ref(storage, `slip/${image.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageUrl(downloadURL);
          setUploadStatus(true);
        });
      }
    );
  };
  const allStoreName = data.countLists.map((i) => i.storeName);
  const storeName = allStoreName[0];

  var today = new Date();

  const orderID = Math.floor(Math.random() * 1000000);

  const storeID = data.storeID;

  const total = data.total;
  const shippingInfo = newData.shippingInfo;
  const customerName = userName;
  console.log(id,'Hello')
  const confirmPayment = async (id) => {
    console.log(id)
    let datas = {
      // transferAmount,
      transferMethod,
      data,
      storeName,
      userName,
      dateTimeInfo,
      imageUrl,
      orderID,
    };
    setConfirmOrder(datas);
    console.log(uid)
    const retailerresponse = await fetch(
      `http://localhost:8080/api/retailer-update-status/${uid}/${itemid}`,
      {
        method: "PUT",
        body: JSON.stringify({
          status: "Wait for confirm payment",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await fetch(
      "http://localhost:8080/api/wholesaler-order-request/" + storeID,
      {
        method: "POST",
        body: JSON.stringify({
          // transferAmount,
          transferMethod,
          data,
          dateTimeInfo,
          imageUrl,
          orderID,
          total,
          shippingInfo,
          customerName,
          status: "Wait for confirm payment",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // for (let i = 0; i < updateIdLists.length; i++) {
    //   let id = updateIdLists;
    //   const deleteOnRequest = await fetch(
    //     `http://localhost:8080/api/delete-quotation-request-list/${uid}/${id[i]}`,
    //     {
    //       method: "DELETE",
    //     }
    //   );
    // }

    router.push("/retailer/receipt-info");
  };

  return (
    <>
      <div className="w-90 mx-auto">
        <div className="text-center my-5">
          <h2>Wholesalery</h2>
        </div>
        <div className="row">
          <div className="col-6">
            <div
              className="mb-4 p-4"
              style={{
                backgroundColor: "#F9F9F9",
              }}
            >
              <h4>Shipping info</h4>
              <hr />
              <p className="mb-0">{newData.shippingInfo} </p>
            </div>
            <div
              className="mb-4 p-4"
              style={{
                backgroundColor: "#F9F9F9",
              }}
            >
              <h4>Price summary</h4>
              <hr />
              {itemsToRender}
              <div className="d-flex justify-content-between">
                <span>Total:</span>
                <span>{data.total}</span>
              </div>
            </div>
            <div
              className="mb-4 p-4"
              style={{
                backgroundColor: "#F9F9F9",
              }}
            >
              <h4>Payment </h4>
              <hr />
              <p className="mb-0">Siam Commercial Bank (SCB)</p>
              <p className="mb-0">Bank account number : 012-3-45678-9 </p>
              <p className="mb-0">Account name : Kitthawat T.</p>
            </div>
          </div>
          <div className="col-6">
            <div
              className="p-4"
              style={{ border: "1px solid #E5E5E5", borderRadius: "2px" }}
            >
              <h3>Inform payment</h3>

              <div className="d-flex justify-content-between">
                <p>Attach slip:</p>
                <div className="d-flex flex-column">
                  <input
                    type="file"
                    id="files"
                    className="d-none"
                    onChange={getFiles}
                  />
                  <label
                    for="files"
                    className="py-2 px-6 btn mb-0 text-capitalize mb-3 text-white"
                    style={{ background: "#535252" }}
                  >
                    Choose File
                  </label>
                  {uploadStatus && (
                    <span
                      className="mx-auto"
                      style={{ fontSize: "12px", color: "blue" }}
                    >
                      file uploaded
                    </span>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <p>Payment by:</p>
                <div className="">
                  <input
                    type="radio"
                    id="Internet"
                    name="fav_language"
                    value="Internet Banking"
                    onChange={(e) => setTransferMethod(e.target.value)}
                  />
                    <label for="htInternetml">Internet Banking</label>
                  <br />
                  <input
                    type="radio"
                    id="atm"
                    name="fav_language"
                    value="ATM"
                    onChange={(e) => setTransferMethod(e.target.value)}
                  />
                    <label for="atm">ATM</label>
                </div>
              </div>

              {/* <div className="d-flex justify-content-between mb-2">
                <p>Transfer amount:</p>
                <input
                  style={{ height: "30px" }}
                  type="number"
                  onChange={(e) => setTransferAmount(e.target.value)}
                />
              </div> */}
              <div className="d-flex justify-content-between mb-2">
                <p className="">Date/Time:</p>
                {/* <input type="text" value={date} className="d-none" /> */}
                <div>
                  <DatePicker
                    style={{ marginStart: "40px" }}
                    selected={dateTimeInfomation}
                    onChange={(date) => setDateTimeInfo(date)}
                    timeInputLabel="Time:"
                    dateFormat="MM/dd/yyyy h:mm aa"
                    showTimeInput
                  />
                </div>
              </div>
              {/* <div className="d-flex justify-content-between mb-2">
                <p>Time:</p>
                <input type="text" value={time} />
              </div> */}
            </div>
            <div className="d-flex flex-column mt-3" style={{ float: "right" }}>
              <button
                className="py-2 px-6 btn mb-0 text-capitalize mb-3 text-white"
                style={{ background: "#535252" }}
                onClick={confirmPayment}
              >
                Confirm payment
              </button>
              <Link href={"/retailer/request-quotation-list"}>
                <button
                  className="py-2 px-6 btn mb-0 text-capitalize"
                  style={{ background: "#FFFFFF", border: "1px solid #535252" }}
                >
                  Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
//
const mapStateToProps = (state) => ({
  data: state.order.data,
  id: state.login.id,
  email: state.login.email,
  name: state.login.name,
});
const mapDispatchToProps = (dispatch) => {
  return {
    setConfirmOrder: (data) => {
      dispatch({
        type: "CONFIRMORDER",
        payload: data,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(payment);
