import React from "react";
import { Carousel } from "react-bootstrap";

function carousel() {
  return (
    <>
      <Carousel fade className="">
        <Carousel.Item className="max-height-vh-85">
          <img
            className="d-block w-100"
            src="https://ih1.redbubble.net/image.848753907.6988/flat,750x1000,075,f.u2.jpg"
            alt="First slide"
          />
          <Carousel.Caption
            style={{
              tranform: "translateY(-50)",
              bottom: "initial",
              top: "50%",
            }}
          >
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="max-height-vh-85">
          <img
            className="d-block w-100"
            src="https://ih1.redbubble.net/image.848753907.6988/flat,750x1000,075,f.u2.jpg"
            alt="Second slide"
          />

          <Carousel.Caption
            style={{
              tranform: "translateY(-50)",
              bottom: "initial",
              top: "50%",
            }}
          >
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="max-height-vh-85">
          <img
            className="d-block w-100"
            src="https://ih1.redbubble.net/image.848753907.6988/flat,750x1000,075,f.u2.jpg"
            alt="Third slide"
          />

          <Carousel.Caption
            style={{
              tranform: "translateY(-50)",
              bottom: "initial",
              top: "50%",
            }}
          >
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default carousel;
