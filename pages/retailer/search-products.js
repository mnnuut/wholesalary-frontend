import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Navbar,
  Form,
  FormControl,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faStar as starThin } from "@fortawesome/free-regular-svg-icons";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:8080/api/products");
  const data = await res.json();

  return {
    props: { products: data },
  };
};

function index({ products }) {
  const [keyword, setKeyword] = useState("");
  console.log(keyword);

  return (
    <>
      <Navbar bg="light" expand="sm" className="py-4 px-2">
        <Container fluid className="">
          <Link href={"/retailer"}>
            <Navbar.Brand href="#">wholesalery</Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Form className="d-flex">
              <FontAwesomeIcon
                className="my-auto me-2"
                icon={faMagnifyingGlass}
                style={{ width: "16px", height: "16px" }}
              />
              <FormControl
                style={{ width: "600px" }}
                type="search"
                placeholder="Search for products or stores"
                className=""
                aria-label="Search"
                onChange={(e) => setKeyword(e.target.value)}
              />
            </Form>
            <div className="ms-auto py-auto">
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
      <div
        className="w-vh-75 d-flex"
        style={{
          backgroundImage:
            "url(https://ih1.redbubble.net/image.848753907.6988/flat,750x1000,075,f.u2.jpg)",
        }}
      >
        <div className="col-3"></div>
        <div className="col-9 p-7">
          <h1>Discover Home Decoration With Famous Shop</h1>
          <p>
            You can see the best deal and wholesale price of home decoration
            product in many catagery in Whosalery platform.
          </p>
        </div>
      </div>
      <Container className="my-7">
        <Row>
          {products

            .filter((val) => {
              if (keyword === "") {
                return val;
              } else if (
                val.Productname.toLowerCase().includes(keyword.toLowerCase()) ||
                val.Description.toLowerCase().includes(keyword.toLowerCase())
              ) {
                return val;
              }
            })
            .slice(0, 16)
            .map((product) => {
              return (
                <Col lg="6" key={product.id} className="mb-3">
                  <div
                    className="d-flex w-90 mx-auto"
                    style={{ border: "1px solid #E5E5E5" }}
                  >
                    <img
                      className="col-6"
                      src={product.Image}
                      alt=""
                      style={{ maxHeight: "250px", minHeight: "250px" }}
                    />

                    <div className="col-6 p-4">
                      <h4>{product.Productname}</h4>
                      <span>${product.Price}</span>
                      <div>
                        <span>
                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ hight: "14px", width: "14px" }}
                          />

                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ hight: "14px", width: "14px" }}
                          />

                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ hight: "14px", width: "14px" }}
                          />

                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ hight: "14px", width: "14px" }}
                          />

                          <FontAwesomeIcon
                            icon={starThin}
                            style={{ hight: "14px", width: "14px" }}
                          />
                        </span>
                      </div>
                      <p
                        className="overflow-hidden"
                        style={{ maxHeight: "6.5rem" }}
                      >
                        {product.Description}
                      </p>
                      {/* <Link href="/retailer/product/"> */}
                      <Link href={`/retailer/product/${product.id}`}>
                        <Button className="btn btn-dark w-100 text-capitalize">
                          See More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Col>
              );
            })}
        </Row>
      </Container>
    </>
  );
}

export default index;
