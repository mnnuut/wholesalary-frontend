import { useState, useEffect } from "react";
import Link from "next/link";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";

function receiptInfo({ data }) {
  console.log(data);

  let productItems = [];
  if (data.data.countLists) {
    for (let i = 0; i < data.data.countLists.length; i++) {
      productItems.push(...data.data.countLists[i].countLists);
    }
  }
  // console.log("this is countlists", data.data.countLists);
  // console.log("this is productlists", productItems);

  let itemsToRender;
  if (data.data.countLists) {
    itemsToRender = productItems.map((el, index) => {
      return (
        <tr key={el.id}>
          <td>{1 + index}</td>
          <td>{el.productName}</td>
          <td>{el.quantity}</td>
          <td>{Number(el.quantity) + Number(el.price)}</td>
        </tr>
      );
    });
  }

  //
  return (
    <>
      <div className="w-90 mx-auto">
        <div className="text-center my-5">
          <h2>Wholesalery</h2>
        </div>
        <div className="mb-3" style={{ background: "#F9F9F9" }}>
          <h4 className="mb-0 py-3 ps-5">Order information</h4>
        </div>
        <div className="row">
          <div className="col-5">
            <p className="text-bold ms-10">Seller:</p>
            <p className="text-bold ms-10">Purchaser:</p>
            <p className="text-bold ms-10">Order Number:</p>
            <p className="text-bold ms-10">Date/Time</p>
            <p className="text-bold ms-10">Transfer amount</p>
            <p className="text-bold ms-10">Slip</p>
          </div>
          <div className="col-7">
            <p>{data.storeName}</p>
            <p>{data.userName}</p>
            <p>{data.orderID}</p>
            <p>{data.dateTimeInfo}</p>
            <p>{data.transferAmount}</p>
            <img src={data.imageUrl} alt="" />
          </div>
        </div>
        <div className="mb-3" style={{ background: "#F9F9F9" }}>
          <h4 className="mb-0 py-3 ps-5">Order Details</h4>
        </div>
        <div className="my-5 w-100">
          <Table bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {itemsToRender}
              {/* {productItems.map((el) => {
                return (
                  <tr key={el.id}>
                    <td>{}</td>
                    <td>{el.productName}</td>
                    <td>{el.quantity}</td>
                    <td>{Number(el.quantity) + Number(el.price)}</td>
                  </tr>
                );
              })} */}

              <tr className="d-none">
                <td>3</td>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="text-center mb-5">
          <Link href={"/retailer"}>
            <button
              className="py-2 px-6 btn mb-0 text-capitalize  "
              style={{ background: "#FFFFFF", border: "1px solid #535252" }}
            >
              Go to Homepage
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  data: state.confirm.info,
});

export default connect(mapStateToProps)(receiptInfo);
