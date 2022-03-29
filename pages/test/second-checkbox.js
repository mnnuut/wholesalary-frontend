import React, { useState, useEffect } from "react";

export const getStaticProps = async () => {
  const id = "DgPcpc8UzgtewtPEhUEc";
  const res = await fetch("http://localhost:8080/api/retailer-cart/" + id);

  const data = await res.json();

  return {
    props: { newData: data },
  };
};

function Student({ newData }) {
  const [selectedLists, setSelectedLists] = useState([]);

  useEffect(() => {
    setSelectedLists(
      newData.map((d) => {
        return {
          select: false,
          id: d.id,
          price: d.price,
          productName: d.productName,
          quantity: d.quantity,
        };
      })
    );
  }, []);
  const countLists = selectedLists.filter((e) => e.select === true);
  console.log("countlist is", countLists);
  console.log(selectedLists);
  return (
    <div className="container">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">
              <input
                type="checkbox"
                onChange={(e) => {
                  let checked = e.target.checked;
                  setSelectedLists(
                    selectedLists.map((d) => {
                      d.select = checked;
                      return d;
                    })
                  );
                }}
              ></input>
            </th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {selectedLists.map((d, i) => (
            <tr key={d.id}>
              <th scope="row">
                <input
                  onChange={(event) => {
                    let checked = event.target.checked;
                    setSelectedLists(
                      selectedLists.map((data) => {
                        if (d.id === data.id) {
                          data.select = checked;
                        }
                        return data;
                      })
                    );
                  }}
                  type="checkbox"
                  checked={d.select}
                ></input>
              </th>
              <td>{d.price}</td>
              <td>{d.quantity}</td>
              <td>{d.productName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Student;
