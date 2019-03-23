import React, { Component } from "react";
import { Typography, AppBar, Toolbar, Grid, Paper } from "@material-ui/core";
import { HashRouter, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./App.css";
import Callback from "./components/Callback";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

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
          <Grid container alignContent="center">
            <Grid item xs={12}>
              <Paper className={this.props.classes.paper}>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/callback" component={Callback} />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </HashRouter>
    );
  }
}

export default withStyles(styles)(App);
