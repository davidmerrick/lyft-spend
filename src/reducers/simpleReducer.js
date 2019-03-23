import * as types from "../actions/ActionTypes";

const initialState = {
  token: null,
  rides: []
};

const simpleReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_TOKEN:
      return Object.assign({}, state, {
        ...state,
        token: action.payload.token
      });
    case types.UPDATE_RIDES:
      return Object.assign({}, state, {
        ...state,
        rides: action.payload.rides
      });
    default:
      return state;
  }
};

export default simpleReducer;
