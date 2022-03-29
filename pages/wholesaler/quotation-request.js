import React from "react";

function quotationRequest() {
  return (
    <>
      <div className="text-center">
        <h1 className="p-5" style={{ color: "#535252", fontSize: "33px" }}>
          Wholesalery
        </h1>
      </div>
      <div className="w-90 mx-auto container">
        <div>
          <p> QUO #045</p>
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
                <h5>K&G Distributors</h5>
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
                <th className="col-2">Price</th>
                <th className="col-2">Quantity</th>
                <th className="col-2 text-center">Unit</th>
                <th className="col-2 text-end p-3">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3">Product name</td>
                <td>22.00 $</td>
                <td>10</td>
                <td className="text-center">Pack</td>
                <td className="text-center p-3">-</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td className="p-3">Product name</td>
                <td>22.00 $</td>
                <td>10</td>
                <td className="text-center">Piece</td>
                <td className="text-center p-3">-</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td className="p-3">Shipping Price</td>
                <td></td>
                <td></td>
                <td className="text-center"></td>
                <td className="text-center p-3">0</td>
              </tr>
            </tbody>
          </table>
          <div
            className="d-flex justify-content-between w-95 mx-auto p-2 mb-3"
            style={{ background: "#EEEEEE", borderRadius: "2px" }}
          >
            <p className=" m-0">total</p>
            <span>660.00 $</span>
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
            />
            <label className="mb-3" htmlFor="Shipping Information">
              Expexted Delivery
            </label>
            <input
              style={{ border: "0.5px solid #979797", borderRadius: "2px" }}
              className="w-100 mb-2"
              type="text"
              placeholder=""
            />
            <label className="mb-3" htmlFor="Shipping Information">
              Expire Date
            </label>
            <input
              style={{ border: "0.5px solid #979797", borderRadius: "2px" }}
              className="w-100 mb-2"
              type="text"
              placeholder=""
            />
            <label className="mb-3" htmlFor="Shipping Information">
              Note
            </label>
            <input
              style={{ border: "0.5px solid #979797", borderRadius: "2px" }}
              className="w-100 mb-2"
              type="text"
              placeholder=""
            />
            <input
              className="px-5 text-white my-5 ms-auto"
              type="submit"
              value="Confirm"
              style={{
                background: "#535252",
                borderRadius: "2px",
                float: "right",
              }}
            ></input>
          </form>
        </div>
      </div>
    </>
  );
}

export default quotationRequest;
