import React, { Component } from "react";
import { Typography, Button } from "@material-ui/core";
import queryString from "query-string";
import { Redirect } from "react-router-dom";
import * as lyft from "../models/Lyft";

class Login extends Component {
  constructor() {
    super();
    this.lyftSignin.bind(this);
  }
  lyftSignin(e) {
    window.open(
      `https://www.lyft.com/oauth/authorize_app?client_id=${
        lyft.LYFT_CLIENT_ID
      }&scope=rides.read&state=foo&response_type=code`
    );
  }
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
        <Button color="primary" onClick={this.lyftSignin}>
          Sign in to Lyft
        </Button>
      </div>
    );
  }
}

export default Login;
