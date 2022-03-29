import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

function wholesalerNavbar() {
  return (
    <>
      <nav>
        <div className="d-flex justify-content-between p-3">
          <h1 style={{ fontSize: "24px" }}>wholesalery</h1>
          <span>
            <FontAwesomeIcon
              icon={faCircleUser}
              style={{ height: "30px", width: "30px" }}
            />
          </span>
        </div>
        <div className="d-flex justify-content-center">
          <Link href={"/wholesaler/order"}>
            <div style={{ cursor: "pointer" }}>
              <p className="p-3 m-0">Orders</p>
            </div>
          </Link>
          <div style={{ backgroundColor: "#E9E9E9", cursor: "pointer" }}>
            <p className="p-3 m-0">Quotation Request</p>
          </div>
          <div>
            <p className="p-3 m-0">My Shop</p>
          </div>
          <div>
            <p className="p-3 m-0">Analytics</p>
          </div>
        </div>
      </nav>
    </>
  );
}

export default wholesalerNavbar;
