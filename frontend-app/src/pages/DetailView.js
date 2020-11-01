import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { getPage } from "../api/apiRequests";

function DetailView({
  match: {
    params: { id },
  },
}) {
  const [page, setPage] = useState();
  const classes = useStyles();

  useEffect(() => {
    getPage(setPage, id);
  }, [id]);

  return !page?.html ? (
    <Paper className={classes.paper}>
      <CircularProgress />
    </Paper>
  ) : (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {page.title}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {"Products: " + JSON.parse(page.products)} <br />
            {"Topics: " + JSON.parse(page.topics)}
          </Typography>
          <Typography variant="body2" component="p">
            {page.summary}
          </Typography>
        </CardContent>
      </Card>
      <Paper className={classes.paper}>
        {page?.html && (
          <div dangerouslySetInnerHTML={{ __html: page.html }}></div>
        )}
      </Paper>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: "1rem",
  },
  title: {
    fontSize: "1.5rem",
  },
}));

export default DetailView;
