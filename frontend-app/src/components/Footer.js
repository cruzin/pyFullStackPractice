import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginRight: "0",
  },
}));

function Footer(props) {
  const classes = useStyles();
  return (
    <Grid style={FooterStyle} container spacing={0}>
      <Grid item xs={12}>
        <Paper
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          className={classes.paper}
        >
          {"Click to scroll to top of page"}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Footer;

const FooterStyle = {
  bottom: "0",
  height: "6vh",
};
