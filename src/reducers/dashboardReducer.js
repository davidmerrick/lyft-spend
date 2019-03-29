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
    default:
      return state;
  }
};

export default dashboardReducer;
