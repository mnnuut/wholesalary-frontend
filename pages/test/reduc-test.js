import React from "react";
import { connect } from "react-redux";
import { setUserIdentity } from "../../redux/actions/loginAction";
import {
  incrementCounter,
  decrementCounter,
} from "../../redux/actions/conterActions";
import { useDispatch } from "react-redux";
import { useState } from "react";

function reduc(props) {
  const [first, setfirst] = useState({ name: "", password: "", id: "" });
  console.log();
  const dispatchItem = () => {
    props.setUserIdentity(first);
  };

  return (
    <div className="text-center">
      <p>{props.name}</p>
      <p>{props.password}</p>
      <p>{props.id}</p>
      <p>{props.count}</p>
      <div className="w-100 p-7">
        <form action="">
          <input
            type="text"
            onChange={(e) => setfirst({ name: e.target.value })}
          />
          <input
            type="text"
            onChange={(e) => setfirst({ password: e.target.value })}
          />
          <input
            type="text"
            onChange={(e) => setfirst({ id: e.target.value })}
          />
          <button
            onClick={dispatchItem}
            type="button"
            className="btn btn-success"
          >
            click
          </button>
          <div>
            <button
              className="btn btn-dark"
              type="button"
              onClick={props.incrementCounter}
            >
              click
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={props.decrementCounter}
            >
              click
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  id: state.login.id,
  password: state.login.password,
  name: state.login.name,
  count: state.counter.value,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setUserIdentity: (data) => {
      dispatch({ type: "SETUSER_IDENTITY", payload: data });
    },
    incrementCounter: incrementCounter,
    decrementCounter: decrementCounter,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(reduc);
