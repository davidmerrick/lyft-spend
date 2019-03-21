import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";
import * as lyft from "../models/Lyft";
import { Redirect } from "react-router-dom";
import { updateToken } from "../actions/Actions";
import queryString from "query-string";

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  updateToken: newToken => dispatch(updateToken(newToken))
});

class Callback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }
  componentWillMount() {
    const values = queryString.parse(window.location.search);
    if (values.code) {
      this.getLyftToken(values.code);
    } else {
      this.setState({ error: true });
    }
  }
  getLyftToken(code) {
    let data = {
      grant_type: "authorization_code",
      code: code
    };
    fetch("https://api.lyft.com/oauth/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(
          lyft.LYFT_CLIENT_ID + ":" + lyft.LYFT_CLIENT_SECRET
        )}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status !== 200) {
          console.error("Bad response");
          return Promise.reject();
        }
        return response.json();
      })
      .then(jsonData => {
        this.props.updateToken(jsonData.access_token);
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }
  render() {
    if (this.props.simpleReducer.token) {
      return <Redirect to="/" />;
    }

    // Todo: display some sort of error message
    if (this.state.error) {
      window.location.href = window.location.origin + window.location.pathname;
    }

    return (
      <div>
        <Typography gutterBottom variant="h5" component="h2">
          Handling callback...
        </Typography>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Callback);
