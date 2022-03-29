import React from "react";
export const getStaticProps = async () => {
  const id = "DgPcpc8UzgtewtPEhUEc";
  // const res = await fetch(`http://localhost:8080/api/oneuser/${id}`);
  const res = await fetch(
    `http://localhost:8080/api/product/VbPAUMx1lV8yj92HL57Q`
  );
  const data = await res.json();
  console.log(data);
  return {
    props: { newData: data },
  };
};

function fetching2({ newData }) {
  console.log(newData);
  return (
    <div>
      <div className="text-center" key={newData.id}>
        {newData.name}
        {newData.email}
      </div>
      ;
    </div>
  );
}

export default fetching2;
