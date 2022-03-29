import React from "react";
import { useState } from "react";
import { connect } from "react-redux";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:8080/api/user");
  const data = await res.json();

  return {
    props: { newData: data },
  };
};

function fetching({ newData }) {
  //   const [post, setPost] = useState({
  //     name: "",
  //     email: "",
  //     age: 12,
  //     location: "bangkok",
  //     date: new Date(),
  //   });
  //   const [item, setItem] = useState({
  //     name: "muaz",
  //     email: "hayee@gmail.com",
  //     age: 12,
  //     location: "bangkok",
  //     date: new Date(),
  //   });
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const addUser = async () => {
    const response = await fetch("http://localhost:8080/api/adduser", {
      method: "POST",
      body: JSON.stringify({ email, name }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const deleteUser = async (id) => {
    const response = await fetch(`http://localhost:8080/api/deleteuser/${id}`, {
      method: "DELETE",
    });
  };
  return (
    <>
      <div className="text-center">
        <div>
          {newData.map((data) => (
            <div key={data.id}>
              <p>{data.name}</p>
              <p>{data.id}</p>
              <p>{data.email}</p>
              <button
                className="btn btn-danger"
                onClick={() => {
                  deleteUser(data.id);
                }}
              >
                delete
              </button>
            </div>
          ))}
        </div>
        <div>
          <form action="" method="post">
            <input
              type="text"
              placeholder="name"
              onChange={(e) => {
                setName(e.target.value);
                // setPost({ name: e.target.value });
              }}
            />
            <input
              type="text"
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value);
                // setPost({ email: e.target.value });
              }}
            />
            <button onClick={addUser}>add user</button>
          </form>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  counter: state.counter.value,
});

export default connect(mapStateToProps)(fetching);
