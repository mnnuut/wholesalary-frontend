import { useState, useEffect } from "react";
import {
  Navbar,
  Alert,
  OverlayTrigger,
  Tooltip,
  FormControl,
  Carousel,
  Container,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faStar as starThin } from "@fortawesome/free-regular-svg-icons";
import { connect } from "react-redux";
import {
  getAuth,
  signOut,
  firebase
} from "firebase/auth";
import { auth } from "../../firebase";
import { async } from "@firebase/util";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:8080/api/products");
  const data = await res.json();

  return {
    props: { newData: data },
  };
};



function index(props) {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    var item = JSON.parse(window.localStorage.getItem("retailerInfo"));
    setUserInfo(item);
  }, []);

  const logout = async () => {
    try {
      // const user = await signInWithEmailAndPassword(
      //   auth,
      //   loginEmail,
      //   loginPassword
      // );
      // console.log(user);
      // const currentUserIdentity = newData.find(
      //   (item) => item.email === loginEmail
      // );
      // console.log(currentUserIdentity);
      // setUserIdentity(currentUserIdentity);
      // window.localStorage.setItem(
      //   "wholesalerInfo",
      //   JSON.stringify(currentUserIdentity)
      // );
      // setCurrentUser(true);
      console.log("Test logout function");
    } catch (error) {
      alert(error.message);
    }
  };
  console.log("hello")
  return (
    <>
      <Navbar bg="light" expand="sm" className="py-4 px-2">
        <Container fluid className="">
          <Link href={"/retailer"}>
            <Navbar.Brand href="#">wholesalery</Navbar.Brand>
          </Link>
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
            {/* <Button
            className="w-100 text-capitalize"
            variant="dark"
            type="button"
            onClick={logout}
            >
            S
          </Button> */}
              {/* <button type="button" onClick={logout} style={{ marginTop: 0 }}>Sign Out</button> */}
              <Link href={"/retailer/quotation-list"}>
                <button
                  className="py-2 px-6 btn mb-0 text-capitalize"
                  style={{ background: "#FFFFFF", border: "1px solid #535252" }}
                >
                  Go to Order
                </button>
              </Link>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <p>{props.id}</p>
      <p>{props.name}</p>
      <p>{props.email}</p> */}
      <Carousel fade className="">
        <Carousel.Item className="max-height-vh-60">
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
        <Carousel.Item className="max-height-vh-60">
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
        <Carousel.Item className="max-height-vh-60">
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
      <Container className="my-7" fluid>
        <Row>
          <Col
            xs="10"
            md="6"
            className="py-5 d-flex"
            style={{
              backgroundImage:
                "url(https://ih1.redbubble.net/image.848753907.6988/flat,750x1000,075,f.u2.jpg)",
            }}
          >
            <div className="col-6"></div>
            <div>
              <h1>OTOP</h1>
              <p>
                Best quality of Thailand OTOP that you can buy in wholesale
                price.
              </p>
            </div>
          </Col>
          <Col
            xs="10"
            md="6"
            className="py-5 d-flex"
            style={{
              backgroundImage:
                "url(https://ih1.redbubble.net/image.848753907.6988/flat,750x1000,075,f.u2.jpg)",
            }}
          >
            <div>
              <h1>Handmade</h1>
              <p>
                Best quality of handmade product that you can buy in wholesale
                price.
              </p>
            </div>
            <div className="col-6"></div>
          </Col>
        </Row>
      </Container>
      <Container className="my-7">
        <Row>
          <Col>
            <h1>Recommend Products</h1>
          </Col>
        </Row>
        <Row>
          {props.newData.slice(0, 16).map((data) => (
            <Col className="mb-3" lg="3" key={data.id}>
              <Card
                style={{
                  // display: "grid",
                  height: "100%"
                }}
              >
                <Card.Img
                  variant="top"
                  style={{ maxHeight: "300px", minHeight: "350px" }}
                  src={data.Image}
                />
                <Card.Body
                  style={{
                    position: "relative",

                  }}
                >
                  <Card.Title>{data.Productname.substring(0,25)}...</Card.Title>


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
                  <p
                    className="overflow-hidden mb-0"
                    style={{ maxHeight: "6.5rem", textOverflow: "ellipsis"}}
                  >
                    {data.Description.substring(0,87)}.....
                  </p>
                  <Link href={`/retailer/product/${data.id}`}
                    style={{ position: 'absolute', }}
                  >
                    <Button className="btn btn-dark w-100 text-capitalize">
                      See More
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  id: state.login.id,
  email: state.login.email,
  name: state.login.name,
});

export default connect(mapStateToProps)(index);
