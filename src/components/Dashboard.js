import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  TextField,
  Typography,
  Button,
  CircularProgress
} from "@material-ui/core";
import moment from "moment";
import { updateRides } from "../actions/Actions";

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  updateRides: (token, startDate, endDate) =>
    dispatch(updateRides(token, startDate, endDate))
});

const START_OF_MONTH = moment()
  .startOf("month")
  .format("YYYY-MM-DD");

const TODAY = moment().format("YYYY-MM-DD");

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: START_OF_MONTH,
      endDate: TODAY,
      startDateError: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.getRideHistory = this.getRideHistory.bind(this);
  }
  getRideHistory() {
    if (this.state.startDateError) {
      return;
    }
    this.props.updateRides(
      this.props.loginReducer.token,
      this.state.startDate,
      this.state.endDate
    );
  }
  validateStartDate() {
    if (new Date(this.state.startDate) > new Date(this.state.endDate)) {
      this.setState({
        startDateError: true
      });
    }
    if (this.state.startDateError) {
      this.setState({
        startDateError: false
      });
    }
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.validateStartDate();
  }
  getTotalCost() {
    let { rides } = this.props.ridesReducer;
    let totalCost = rides
      .map(ride => ride.price.amount)
      .reduce((a, b) => a + b);
    return (totalCost / 100).toFixed(2);
  }
  renderRides() {
    let { rides, loading } = this.props.ridesReducer;
    if (loading) {
      return <CircularProgress />;
    }
    if (rides.length > 0) {
      if (rides.length === 50) {
        return (
          <div>
            Note: this app currently doesn't support fetching more than 50
            rides. Total spend for the first 50 rides between those dates: $
            {this.getTotalCost()}
          </div>
        );
      }
      return <div>Total spend: ${this.getTotalCost()}</div>;
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
          error={this.state.startDateError}
          name="startDate"
          label="Start date"
          disabled={this.props.ridesReducer.loading}
          type="date"
          defaultValue={START_OF_MONTH}
          onChange={this.handleChange}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          name="endDate"
          label="End date"
          disabled={this.props.ridesReducer.loading}
          type="date"
          onChange={this.handleChange}
          defaultValue={TODAY}
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
