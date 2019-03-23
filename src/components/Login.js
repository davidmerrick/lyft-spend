import React, { Component } from "react";
import { Typography, Button } from "@material-ui/core";
import queryString from "query-string";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as lyft from "../models/Lyft";

const mapStateToProps = state => ({
  ...state
});

class Login extends Component {
  render() {
    const values = queryString.parse(window.location.search);
    if (values.code) {
      return <Redirect to="/callback" />;
    }
    return (
      <div>
        <Typography gutterBottom variant="h5" component="h2">
          Please Log In
        </Typography>
        <p>This app needs permissions to access your ride history in Lyft.</p>
        <Button
          color="primary"
          href={`https://www.lyft.com/oauth/authorize_app?client_id=${
            lyft.LYFT_CLIENT_ID
          }&scope=rides.read&state=foo&response_type=code`}
        >
          Sign in to Lyft
        </Button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Login);
