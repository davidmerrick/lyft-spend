import * as types from "./ActionTypes";

export const updateToken = newToken => dispatch => {
  dispatch({
    type: types.UPDATE_TOKEN,
    payload: {
      token: newToken
    }
  });
};
