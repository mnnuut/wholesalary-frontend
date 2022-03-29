//action type
export const SETUSER_IDENTITY = "SETUSER_IDENTITY";

// Action Create
export const setUserIdentity = () => ({
  type: SETUSER_IDENTITY,
  payload: { id: "", name: "", password: "" },
});
