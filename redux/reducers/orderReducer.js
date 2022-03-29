import { ORDERINFO } from "../actions/orderAction";

const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDERINFO:
      // console.log(action);
      return {
        ...state,

        data: action.payload,
        // name: action.payload.name,
        // email: action.payload.email,
      };

    default:
      return {
        ...state,
      };
  }
};

export default orderReducer;
