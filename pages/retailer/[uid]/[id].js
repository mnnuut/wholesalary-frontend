import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function quotationRequest() {
  const router = useRouter();
  const { id } = router.query;
  const { uid } = router.query;
  const [newData, setNewData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/api/quotations-details/${uid}/${id}`)
      // fetch("http://localhost:8080/api/quotations/" + id)
      .then((res) => res.json())
      .then((data) => {
        setNewData(data);

        setLoading(false);
      });
  }, []);
  console.log(newData);

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

  const finalPrice =
    Number(newData.offeredPrice) + Number(newData.shippingPrice);
  return (
    <>
      <div className="text-center">
        <h1 className="p-5" style={{ color: "#535252", fontSize: "33px" }}>
          Wholesalery
        </h1>
      </div>
      <div className="w-90 mx-auto container">
        <div className="d-flex justify-content-between">
          <p> QUO {newData.orderID}</p>
          <button
            className="py-2 px-6 btn mb-0 text-capitalize"
            style={{ background: "#1BD27E" }}
          >
            confirm
          </button>
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
                <th className="col-7 p-3">Item Description</th>
                <th className="col-3">Price</th>
                <th className="col-3">Quantity</th>
                <th className="col-3 text-center">Suptotal</th>
                {/* <th className="col-2 text-end p-3">Subtotal</th> */}
              </tr>
            </thead>
            {itemsToRender}
            {/* {newData.countLists.map((el) => {
              return (
                <tbody key={el.id}>
                  <tr>
                    <td className="p-3">{el.productName}</td>
                    <td>22.00 $</td>
                    <td>10</td>
                    <td className="text-center">Pack</td>
                    <td className="text-center p-3">-</td>
                  </tr>
                </tbody>
              );
            })} */}

            {/* <tbody>
              <tr>
                <td className="p-3">Product name</td>
                <td>22.00 $</td>
                <td>10</td>
                <td className="text-center">Piece</td>
                <td className="text-center p-3">-</td>
              </tr>
            </tbody> */}
            <tbody>
              <tr>
                <td className="p-3">Original Price</td>
                <td></td>

                <td className="text-center"></td>
                <td className="text-center p-3">{total}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td className="p-3">Offered price</td>
                <td></td>

                <td className="text-center"></td>
                <td className="text-center p-3">{newData.offeredPrice}</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td className="p-3">Shipping Price</td>
                <td></td>

                <td className="text-center"></td>
                <td className="text-center p-3">{newData.shippingPrice}</td>
              </tr>
            </tbody>
          </table>
          <div
            className="d-flex justify-content-between w-95 mx-auto p-2 mb-3"
            style={{ background: "#EEEEEE", borderRadius: "2px" }}
          >
            <p className=" m-0">Total</p>
            <span>{finalPrice}</span>
          </div>
        </div>
        <div>
          <h5 className="my-4">Quotation Information</h5>
        </div>
        <div className="my-4">
          <p>Shipping Information: {newData.shippingInfo} </p>
          <p>Expected Delivery: {newData.expextedDelivery}</p>
          <p>Expire Date: {newData.expireDate}</p>
          <p>Note:{newData.note} </p>
        </div>
      </div>
    </>
  );
}

export default quotationRequest;
