import * as types from "../actions/ActionTypes";

const initialState = {
  rides: [],
  loading: false
};

const ridesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_RIDES:
      return Object.assign({}, state, {
        ...state,
        rides: action.payload.rides
      });
    case types.RESET_RIDES:
      return Object.assign({}, state, {
        ...state,
        rides: []
      });
    case types.LOADING_RIDES:
      return Object.assign({}, state, {
        ...state,
        loading: true
      });
    case types.LOADING_RIDES_DONE:
      return Object.assign({}, state, {
        ...state,
        loading: false
      });
    default:
      return state;
  }
};

export default ridesReducer;
