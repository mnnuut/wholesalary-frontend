import React from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { authContect } from "../../pages/test";

function retailer() {
  const { session, setSession } = useContext(authContect);
  //   const logout = async () => {
  //     await auth.signOut(() => {
  //       setSession(false);
  //     });
  //   };

  console.log(session);
  return (
    <>
      <div className="text-center">retailer</div>
      <button
        onClick={() => {
          setSession(false);
        }}
      >
        logout
      </button>
    </>
  );
}

export default retailer;
