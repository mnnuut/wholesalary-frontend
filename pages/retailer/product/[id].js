import React, { useState, useEffect } from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as starThin } from "@fortawesome/free-regular-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import Link from "next/link";

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:8080/api/products");
  const data = await res.json();

  const paths = data.map((path) => {
    return {
      params: { id: path.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch("http://localhost:8080/api/product/" + id);
  const data = await res.json();
  console.log(data)
  return {
    props: { product: data },
  };
};

function productInfo({ product }) {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);
  if (userInfo) {
    console.log(userInfo.email);
  }
  const stars = [
    <FontAwesomeIcon icon={faStar} style={{ hight: "14px", width: "14px" }} />,
    <FontAwesomeIcon icon={faStar} style={{ hight: "14px", width: "14px" }} />,
    <FontAwesomeIcon icon={faStar} style={{ hight: "14px", width: "14px" }} />,
    <FontAwesomeIcon icon={faStar} style={{ hight: "14px", width: "14px" }} />,
    <FontAwesomeIcon
      icon={starThin}
      style={{ hight: "14px", width: "14px" }}
    />,
  ];
  const [price, setprice] = useState(product.Price);
  const [storeName, setStoreName] = useState(product.Storename);
  const [creatorID, setCreatorID] = useState();
  const [storeID, setStoreID] = useState(product.StoreID);
  const [productName, setProductName] = useState(product.Productname);
  const [quantity, setQuantity] = useState(0);
  const requestQuotation = async () => {
    if (quantity < 24 && quantity != null) {
      alert("Quantity must more than or equal 24");
    } else {
      const response = await fetch(
        "http://localhost:8080/api/retailer-addproducts",
        {
          method: "POST",
          body: JSON.stringify({
            product,
            price,
            storeName,
            creatorID,
            productName,
            quantity,
            storeID,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      router.push("/retailer/request-quotation");
    }
  };
  useEffect(() => {
    var item = JSON.parse(window.localStorage.getItem("retailerInfo"));
    setUserInfo(item);
    setCreatorID(item.id);
  }, []);

  return (
    <>
      <Navbar bg="light" expand="sm" className="py-4 px-2">
        <Container fluid className="">
          <Navbar.Brand href="/retailer">wholesalery</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <div className="ms-auto py-auto">
              <Link href={"/retailer/search-products"}>
                <FontAwesomeIcon
                  className="my-auto me-2"
                  icon={faMagnifyingGlass}
                  style={{ width: "30px", height: "30px" }}
                />
              </Link>
              <Link href={"/retailer/request-quotation"}>
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="ms-4"
                  style={{ width: "30px", height: "30px" }}
                />
              </Link>
              <FontAwesomeIcon
                icon={faCircleUser}
                className="ms-4"
                style={{ width: "30px", height: "30px" }}
              />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="w-80 mx-auto mt-5">
        <Container key={product.id}>
          <Row>
            <Col md="6" className="d-fex flex-column">
              <div className="" style={{ width: "350px" }}>
                <img
                  className="mb-5 w-100"
                  src={product.Image}
                  alt=""
                  style={{ width: "350px", height: "350px" }}
                />

                <div className="d-flex justify-content-between">
                  <div
                    className="bg-dark"
                    style={{ width: "75px", height: "75px" }}
                  >
                    <img
                      style={{ width: "75px", height: "75px" }}
                      src={product.Image1}
                    />
                  </div>
                  <div
                    className="bg-dark"
                    style={{ width: "75px", height: "75px" }}
                  >
                    <img
                      style={{ width: "75px", height: "75px" }}
                      src={product.Image2}
                    />
                  </div>
                  <div
                    className="bg-dark"
                    style={{ width: "75px", height: "75px" }}
                  >
                    <img
                      style={{ width: "75px", height: "75px" }}
                      src={product.Image3}
                    />
                  </div>
                  <div
                    className="bg-dark"
                    style={{ width: "75px", height: "75px" }}
                  >
                    <img
                      style={{ width: "75px", height: "75px" }}
                      src={product.Image4}
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col md="6">
              <h2>{product.Productname}</h2>
              <span className="d-flex">{stars}</span>
              <div className="d-flex">
                <h3>${product.Price}/</h3>
                <span className="mt-2">{product.Unit} (12pieces)</span>
              </div>
              <div>
                <form action="">
                  <div className="d-flex">
                    <div className="me-3">
                      <label htmlFor="color" className="d-flex flex-column">
                        Color
                      </label>
                      <select
                        id="cars"
                        name="carlist"
                        form="carform"
                        style={{ width: "10rem" }}
                      >
                        <option value="volvo">{product.Option[0]}</option>
                        <option value="volvo">{product.Option[1]}</option>
                        <option value="volvo">{product.Option[2]}</option>
                        <option value="volvo">{product.Option[3]}</option>
                        {/* <option value="saab">Red</option>
                        <option value="opel">Purple</option>
                        <option value="audi">Grean</option> */}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="size" className="d-flex flex-column">
                        Size(inch)
                      </label>
                      <select
                        id="cars"
                        name="carlist"
                        form="carform"
                        style={{ width: "10rem" }}
                      >
                        <option value="volvo">1</option>
                        <option value="saab">2</option>
                        <option value="opel">3</option>
                        <option value="audi">4</option>
                      </select>
                    </div>
                  </div>
                  <span className="my-2 d-flex" style={{ fontSize: "13px" }}>
                    Stock : {product.CountInStock}
                  </span>
                  <label
                    className="mb-3 d-flex flex-column"
                    htmlFor="Quantity"
                    style={{ fontSize: "12px" }}
                  >
                    Quantity
                  </label>
                  <input
                    style={{
                      border: "0.5px solid #979797",
                      borderRadius: "2px",
                    }}
                    className="w-30 mb-2"
                    type="number"
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder=""
                  />
                  {quantity < 24 ? (
                    <>
                      <span className="ms-2">
                        24 is minimum order(unit) of product
                      </span>
                    </>
                  ) : null}
                  <div className="d-flex mt-3">
                    <input
                      className="px-4 py-1 text-white"
                      type="submit"
                      value="Order now"
                      style={{
                        background: "#535252",
                        borderRadius: "2px",
                      }}
                    ></input>
                    <input
                      className="px-4 py-1 text-white ms-2"
                      type="submit"
                      value="Pre-order"
                      style={{
                        background: "#535252",
                        borderRadius: "2px",
                      }}
                    ></input>
                    <input
                      className="px-4 py-1 text-white ms-2"
                      type="button"
                      value="Request quotation"
                      style={{
                        background: "#535252",
                        borderRadius: "2px",
                      }}
                      onClick={() => {
                        requestQuotation();
                      }}
                    ></input>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="d-flex my-5">
          <div
            className="bg-dark"
            style={{ width: "70px", height: "70px" }}
          >
            <img
                      style={{ width: "70px", height: "70px" }}
                      src={product.Storeimage}
                    />
          </div>
          <span className="my-auto ms-3">{product.Storename}</span>
        </div>
        <div className="w-100 mb-5 p-3" style={{ border: "1px solid #EEEEEE" }}>
          <h5 className="mb-3">Description</h5>
          <p>{product.Description}</p>
          {/* <p>{product.StoreID}</p> */}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  id: state.login.id,
  email: state.login.email,
  name: state.login.name,
});

export default connect(mapStateToProps)(productInfo);
