import React, { Component } from "react";
import { Typography, Button } from "@material-ui/core";
import queryString from "query-string";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { openLyftSignIn } from "../actions/Actions";

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  openLyftSignIn: () => dispatch(openLyftSignIn())
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
        <Button color="primary" onClick={this.props.openLyftSignIn}>
          Sign in to Lyft
        </Button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
