import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Overview from "./pages/Overview";
import DetailView from "./pages/DetailView";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router>
        <Header />
        <Grid className={classes.mainGrid} container>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <Switch>
              <Route exact path="/" component={Overview} />
              <Route path="/help-page/:id" component={DetailView} />
              <Route path="/:pagination" component={Overview} />
            </Switch>
          </Grid>
          <Grid item xs={1} />
        </Grid>
        <Footer />
      </Router>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontSize: "18px",
  },
  mainGrid: {
    backgroundColor: "lightgray",
    minHeight: "88vh",
    padding: "2rem",
  },
}));

export default App;
