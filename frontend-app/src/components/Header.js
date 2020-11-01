import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

function Header() {
  const classes = useStyles();
  return (
    <div style={HeaderStyle}>
      <Grid container spacing={0}>
        <Grid item xs={10}>
          <Paper className={classes.paper}> Coding Challenge </Paper>
        </Grid>
        <Grid item xs={2}>
          <Link to={"/"}>
            <Paper className={classes.paper}>
              <HomeIcon />
            </Paper>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default Header;

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginRight: "0",
    height: "2rem",
  },
}));

const HeaderStyle = {
  top: "0",
  left: "0",
  width: "100vw",
  height: "6vh",
};
