import React, { Component } from "react";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import { HashRouter, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";
import Callback from "./components/Callback";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5" color="inherit">
                Lyft Spend
              </Typography>
            </Toolbar>
          </AppBar>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/callback" component={Callback} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
