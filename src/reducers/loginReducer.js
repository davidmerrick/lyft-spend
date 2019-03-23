import * as types from "../actions/ActionTypes";

const initialState = {
  token: null
};

const simpleReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_TOKEN:
      return Object.assign({}, state, {
        ...state,
        token: action.payload.token
      });
    default:
      return state;
  }
};

export default simpleReducer;
