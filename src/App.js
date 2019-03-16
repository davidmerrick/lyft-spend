import React, { Component } from "react";
import { Typography, AppBar, Toolbar, Button } from "@material-ui/core";
import { HashRouter, Route } from "react-router-dom";
import Login from "./components/Login";
import "./App.css";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5">Lyft Spend</Typography>
            </Toolbar>
          </AppBar>
          <Route exact path="/" component={Login} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
