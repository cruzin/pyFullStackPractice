import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import ComboBox from "../components/ComboBox";
import BrowsePages from "./BrowsePages";
import { getAllPages } from "../api/apiRequests";

function Overview({ match, history: { push } }) {
  const [allPages, setAllPages] = useState();
  const classes = useStyles();

  useEffect(() => {
    getAllPages(setAllPages);
  }, []);

  return !allPages?.allPages ? (
    <Paper className={classes.paper}>
      <CircularProgress />
    </Paper>
  ) : (
    <div className={classes.overview}>
      <Paper className={classes.paper}>
        <ComboBox optionsArray={allPages.allPages} redirect={push} />
      </Paper>
      <div className={classes.subheader}>Or just browse</div>
      <BrowsePages match={match} />
    </div>
  );
}

export default Overview;

const useStyles = makeStyles((theme) => ({
  overview: {
    paddingTop: "1rem",
  },
  subheader: {
    fontSize: "1.5rem",
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: "1rem",
  },
}));
