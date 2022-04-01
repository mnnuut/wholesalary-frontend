import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { faStar as starThin } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import { stars } from "../stars";

function recommendedProduct({ products }) {
  // console.log(stars);
  let itemsToRender;
  if (products) {
    products.map((data) => {
      if (data.Rating === 1) {
        itemsToRender = stars.oneStar;
      } else if (data.Rating === 1.5) {
        itemsToRender = stars.oneHalfStar;
      } else if (data.Rating === 2) {
        itemsToRender = stars.twoStar;
      } else if (data.Rating === 2.5) {
        itemsToRender = stars.twoHalfStar;
      } else if (data.Rating === 3) {
        itemsToRender = stars.threeStar;
      } else if (data.Rating === 3.5) {
        itemsToRender = stars.threeHalfStar;
      } else if (data.Rating === 4) {
        itemsToRender = stars.fourStar;
      } else if (data.Rating === 4.5) {
        itemsToRender = stars.fourHalfStar;
      } else if (data.Rating === 5) {
        itemsToRender = stars.fiveStar;
      }
    });
  }
  // const information = {
  //   stars: [
  //     <FontAwesomeIcon
  //       icon={faStar}
  //       style={{ hight: "14px", width: "14px" }}
  //     />,
  //     <FontAwesomeIcon
  //       icon={faStar}
  //       style={{ hight: "14px", width: "14px" }}
  //     />,
  //     <FontAwesomeIcon
  //       icon={faStar}
  //       style={{ hight: "14px", width: "14px" }}
  //     />,
  //     <FontAwesomeIcon
  //       icon={faStar}
  //       style={{ hight: "14px", width: "14px" }}
  //     />,
  //     <FontAwesomeIcon
  //       icon={starThin}
  //       style={{ hight: "14px", width: "14px" }}
  //     />,
  //   ],
  // };
  return (
    <>
      <Container className="my-7">
        <Row>
          <Col>
            <h1>Recommend Products</h1>
          </Col>
        </Row>
        <Row>
          {products.slice(0, 16).map((data) => (
            <Col lg="3" key={data.id} className="mb-3">
              <Card>
                <Card.Img
                  variant="top"
                  style={{ maxHeight: "300px", minHeight: "350px" }}
                  src={data.Image}
                />
                <Card.Body>
                  <Card.Title>{data.Productname}</Card.Title>
                  {/* <span className="d-fex" key={data.id}>
                    {information.stars}
                  </span> */}
                  <span>
                    {itemsToRender}
                    {/* <FontAwesomeIcon
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
                    /> */}
                  </span>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        {/* <Row>
          <Col xs="6" md="4" lg="3">
            <Card>
              <Card.Img
                variant="top"
                src="https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg"
              />
              <Card.Body>
                <Card.Title>Product name</Card.Title>
                <span className="d-fex">{information.stars}</span>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="6" md="4" lg="3">
            <Card>
              <Card.Img
                variant="top"
                src="https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg"
              />
              <Card.Body>
                <Card.Title>Product name</Card.Title>
                <span className="d-fex">{information.stars}</span>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="6" md="4" lg="3">
            <Card>
              <Card.Img
                variant="top"
                src="https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg"
              />
              <Card.Body>
                <Card.Title>Product name</Card.Title>
                <span className="d-fex">{information.stars}</span>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="6" md="4" lg="3">
            <Card>
              <Card.Img
                variant="top"
                src="https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg"
              />
              <Card.Body>
                <Card.Title>Product name</Card.Title>
                <span className="d-fex">{information.stars}</span>
              </Card.Body>
            </Card>
          </Col>
        </Row> */}
      </Container>
    </>
  );
}

export default recommendedProduct;
