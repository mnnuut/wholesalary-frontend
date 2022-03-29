import { CONFIRMORDER } from "../actions/confirmOrderAction";

const confirmOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CONFIRMORDER:
      return {
        ...state,

        info: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export default confirmOrderReducer;
