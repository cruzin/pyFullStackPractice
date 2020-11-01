import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { helpPageUrl, paginationUrl } from "./Routes";
import CircularProgress from "@material-ui/core/CircularProgress";
import Pagination from "@material-ui/lab/Pagination";
import PaginationItem from "@material-ui/lab/PaginationItem";
import { getPaginationPages } from "../api/apiRequests";

function Overview({
  match: {
    params: { pagination = 1 },
  },
}) {
  const [pages, setPages] = useState();
  const classes = useStyles();

  useEffect(() => {
    getPaginationPages(setPages, pagination);
  }, [pagination]);

  return !pages?.pages ? (
    <Paper className={classes.paper}>
      <CircularProgress />
    </Paper>
  ) : (
    <div className={classes.overview}>
      {pages?.pages.map((page) => {
        return (
          <div key={page.url}>
            <Link key={page.id} to={helpPageUrl(page.url)}>
              <Paper className={classes.paper}>{page.title}</Paper>
            </Link>
          </div>
        );
      })}
      {pagination < 6 && (
        <div>
          <Pagination
            count={5}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={item?.page === 1 ? "" : `${paginationUrl(item.page)}`}
                {...item}
              />
            )}
          />
        </div>
      )}
    </div>
  );
}

export default Overview;

const useStyles = makeStyles((theme) => ({
  overview: {
    paddingTop: "1rem",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    margin: "1rem",
  },
}));
