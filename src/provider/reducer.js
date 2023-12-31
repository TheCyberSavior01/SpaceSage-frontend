export const actionType = {
  SET_USER: "SET_USER",
  SET_LOADING: "SET_LOADING"
};

 const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionType.SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      }
    default:
      return state;
  }
};

export default reducer;
