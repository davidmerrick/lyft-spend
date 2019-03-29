import * as types from "../actions/ActionTypes";
import moment from "moment";

const START_OF_MONTH = moment()
  .startOf("month")
  .format("YYYY-MM-DD");

const TODAY = moment().format("YYYY-MM-DD");

const initialState = {
  startDate: START_OF_MONTH,
  endDate: TODAY,
  startDateError: false
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_DATES:
      return Object.assign({}, state, {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate
      });
    case types.VALID_START_DATE:
      return Object.assign({}, state, {
        ...state,
        startDateError: false
      });
    case types.INVALID_START_DATE:
      return Object.assign({}, state, {
        ...state,
        startDateError: true
      });
    default:
      return state;
  }
};

export default dashboardReducer;
