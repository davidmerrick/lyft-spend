import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { TextField, Typography, FormGroup, Button } from "@material-ui/core";
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
      rides: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.getRideHistory = this.getRideHistory.bind(this);
  }
  getRideHistory() {
    this.props.updateRides(
      this.props.simpleReducer.token,
      this.state.startDate,
      this.state.endDate
    );
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  renderRides() {
    let { rides } = this.props.simpleReducer;
    if (rides.length > 0) {
      let costArray = rides.map(ride => <div>{ride.line_items.amount}</div>);
      console.log(costArray);
      return <div>Total cost: {costArray}</div>;
    }
  }
  render() {
    if (!this.props.simpleReducer.token) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <Typography gutterBottom variant="h5" component="h2">
          Calculate your Lyft spend between 2 dates
        </Typography>
        <FormGroup row>
          <TextField
            name="startDate"
            label="Start date"
            type="date"
            defaultValue={START_OF_MONTH}
            InputLabelProps={{
              shrink: true
            }}
          />
        </FormGroup>
        <FormGroup row>
          <TextField
            name="endDate"
            label="End date"
            type="date"
            defaultValue={TODAY}
            InputLabelProps={{
              shrink: true
            }}
          />
        </FormGroup>
        <FormGroup row>
          <Button color="primary" onClick={this.getRideHistory}>
            Submit
          </Button>
        </FormGroup>
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
