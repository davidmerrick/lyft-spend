import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  TextField,
  Typography,
  Button,
  CircularProgress
} from "@material-ui/core";
import { updateRides, updateDates } from "../actions/Actions";

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  updateRides: (token, startDate, endDate) =>
    dispatch(updateRides(token, startDate, endDate)),
  updateDates: (startDate, endDate) => dispatch(updateDates(startDate, endDate))
});

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.updateStartDate = this.updateStartDate.bind(this);
    this.updateEndDate = this.updateEndDate.bind(this);
    this.getRideHistory = this.getRideHistory.bind(this);
  }
  getRideHistory() {
    if (this.props.dashboardReducer.startDateError) {
      return;
    }
    this.props.updateRides(
      this.props.loginReducer.token,
      this.props.dashboardReducer.startDate,
      this.props.dashboardReducer.endDate
    );
  }
  updateStartDate(e) {
    this.props.updateDates(e.target.value, this.props.dashboardReducer.endDate);
  }
  updateEndDate(e) {
    this.props.updateDates(
      this.props.dashboardReducer.startDate,
      e.target.value
    );
  }
  getTotalCost() {
    let { rides } = this.props.ridesReducer;
    let totalCost = rides
      .map(ride => ride.price.amount)
      .reduce((a, b) => a + b);
    return totalCost / 100;
  }
  renderRides() {
    let { rides, loading } = this.props.ridesReducer;
    if (loading) {
      return <CircularProgress />;
    }
    if (rides.length > 0) {
      return <div>Total spend: ${this.getTotalCost().toLocaleString()}</div>;
    }
  }
  render() {
    if (!this.props.loginReducer.token) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <Typography gutterBottom variant="h5" component="h2">
          Calculate your Lyft spend between 2 dates
        </Typography>
        <TextField
          error={this.props.dashboardReducer.startDateError}
          name="startDate"
          label="Start date"
          disabled={this.props.ridesReducer.loading}
          type="date"
          defaultValue={this.props.dashboardReducer.startDate}
          onChange={this.updateStartDate}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          name="endDate"
          label="End date"
          disabled={this.props.ridesReducer.loading}
          type="date"
          onChange={this.updateEndDate}
          defaultValue={this.props.dashboardReducer.endDate}
          InputLabelProps={{
            shrink: true
          }}
        />
        <br />
        <Button
          disabled={this.props.ridesReducer.loading}
          color="primary"
          onClick={this.getRideHistory}
        >
          Submit
        </Button>
        <br />
        {this.renderRides()}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
