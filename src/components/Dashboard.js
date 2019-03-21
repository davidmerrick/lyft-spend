import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { TextField, Typography, FormGroup, Button } from "@material-ui/core";

const mapStateToProps = state => ({
  ...state
});

class Dashboard extends Component {
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
            id="date"
            label="Start date"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true
            }}
          />
        </FormGroup>
        <FormGroup row>
          <TextField
            id="date"
            label="End date"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true
            }}
          />
        </FormGroup>
        <FormGroup row>
          <Button color="primary">Submit</Button>
        </FormGroup>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Dashboard);
