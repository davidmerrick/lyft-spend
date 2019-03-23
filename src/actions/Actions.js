import * as types from "./ActionTypes";
import * as lyft from "../models/Lyft";

export const updateToken = newToken => dispatch => {
  dispatch({
    type: types.UPDATE_TOKEN,
    payload: {
      token: newToken
    }
  });
};

export const openLyftSignIn = () => dispatch => {
  window.open(
    `https://www.lyft.com/oauth/authorize_app?client_id=${
      lyft.LYFT_CLIENT_ID
    }&scope=rides.read&state=foo&response_type=code`
  );
};

export const updateRides = (token, startDate, endDate) => dispatch => {
  const LIMIT = 50;
  fetch(
    `https://api.lyft.com/v1/rides?start_time=${startDate}&end_time=${endDate}&limit=${LIMIT}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  )
    .then(response => {
      if (response.status !== 200) {
        console.error("Bad response");
        return Promise.reject();
      }
      return response.json();
    })
    .then(jsonData => {
      console.log("Fetched rides, dispatching reducer update.");
      dispatch({
        type: types.UPDATE_RIDES,
        payload: {
          rides: jsonData.ride_history
        }
      });
    });
};
