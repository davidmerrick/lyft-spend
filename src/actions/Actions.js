import * as types from "./ActionTypes";

export const updateToken = newToken => dispatch => {
  dispatch({
    type: types.UPDATE_TOKEN,
    payload: {
      token: newToken
    }
  });
};

export const updateRides = (token, startDate, endDate) => dispatch =>
  new Promise((resolve, reject) => {
    dispatch({ type: types.LOADING_RIDES });
    return resolve();
  })
    .then(() => {
      const LIMIT = 50;
      return fetch(
        `https://api.lyft.com/v1/rides?start_time=${startDate}&end_time=${endDate}&limit=${LIMIT}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
    })
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
      return Promise.resolve();
    })
    .then(() => {
      dispatch({ type: types.LOADING_RIDES_DONE });
    });

export const updateDates = (startDate, endDate) => dispatch =>
  new Promise((resolve, reject) => {
    dispatch({
      type: types.RESET_RIDES
    });
    return resolve();
  })
    .then(() => {
      dispatch({
        type: types.UPDATE_DATES,
        payload: {
          startDate: startDate,
          endDate: endDate
        }
      });
    })
    .then(() => {
      if (new Date(startDate) > new Date(endDate)) {
        dispatch({
          type: types.INVALID_START_DATE
        });
      } else {
        dispatch({
          type: types.VALID_START_DATE
        });
      }
    });
