import * as types from "./ActionTypes";
import { fetchAllRides } from "../models/LyftApi";

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
      return fetchAllRides([], token, startDate, endDate);
    })
    .then(rides => {
      console.log("Fetched rides, dispatching reducer update.");
      dispatch({
        type: types.UPDATE_RIDES,
        payload: {
          rides: rides
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
