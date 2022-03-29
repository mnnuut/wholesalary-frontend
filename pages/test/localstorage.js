import React from "react";
import { useEffect, useState } from "react";

function localstorage() {
  // localStorage for objects, arrays or any data type
  const [data, setData] = useState(null);
  useEffect(() => {
    var obj = {
      firstName: "muaz",
      lastName: "hayee",
      age: 13,
    };
    window.localStorage.setItem("itemname", JSON.stringify(obj)); // Save the obj as string
    var item = JSON.parse(window.localStorage.getItem("itemname"));
    setData(item);
  }, []);
  console.log(data);
  // ^^ Parse string then set `item` as the obj
  return (
    <>
      <h1>this is localstorage</h1>
      {data && (
        <div>
          <p>{data.firstName}</p>
          <p>{data.lastName}</p>
          <p>{data.age}</p>
        </div>
      )}
    </>
  );
}

export default localstorage;
