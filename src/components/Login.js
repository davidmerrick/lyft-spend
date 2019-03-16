import React, { Component } from "react";
import { Typography, Button } from "@material-ui/core";
import queryString from "query-string";

const LYFT_CLIENT_ID = process.env.REACT_APP_LYFT_CLIENT_ID;
const LYFT_CLIENT_SECRET = process.env.REACT_APP_LYFT_CLIENT_SECRET;

class Login extends Component {
  constructor() {
    super();
    this.lyftSignin.bind(this);
    this.state = {
      lyftToken: null
    };
  }
  lyftSignin(e) {
    window.open(
      `https://www.lyft.com/oauth/authorize_app?client_id=${LYFT_CLIENT_ID}&scope=rides.read&state=foo&response_type=code`
    );
  }
  getLyftToken(code) {
    console.log("Fetching Lyft token. Sec...");
    let data = {
      grant_type: "authorization_code",
      code: code
    };
    fetch("https://api.lyft.com/oauth/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(
          LYFT_CLIENT_ID + ":" + LYFT_CLIENT_SECRET
        )}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        // Todo: handle error
        if (response.status !== 200) {
          console.error("Bad response");
          console.log(response);
        }
        return response.json();
      })
      .then(jsonData => {
        console.log(jsonData);
        this.setState({
          lyftToken: jsonData.access_token
        });
      });
  }
  render() {
    if (this.state.lyftToken) {
      return <h1>Hell yeah, got token.</h1>;
    }

    const values = queryString.parse(window.location.search);
    if (values.code) {
      this.getLyftToken(values.code);
      return (
        <div>
          <Typography gutterBottom variant="h5" component="h2">
            Got code {values.code}. Fetching Lyft token.
          </Typography>
        </div>
      );
    } else {
      return (
        <div>
          <Typography gutterBottom variant="h5" component="h2">
            Please Log In
          </Typography>
          <Button onClick={this.lyftSignin}>Sign in to Lyft</Button>
        </div>
      );
    }
  }
}

export default Login;
