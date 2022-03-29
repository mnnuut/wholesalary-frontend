import { SETUSER_IDENTITY } from "../actions/loginAction";

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case SETUSER_IDENTITY:
      console.log(action);
      return {
        ...state,
        // name: action.payload.name,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
      };

    default:
      return {
        ...state,
      };
  }
};

export default loginReducer;
