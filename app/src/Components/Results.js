import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

import ResultCard from "./ResultCard";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    width: "34vw",
    marginTop: "2rem",
    display: "flex",
    borderRadius: 10,
    [theme.breakpoints.down("sm")]: {
      width: "70vw",
    },
    [theme.breakpoints.up("lg")]: {
      width: "24vw",
    },
  },
  resultTop: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "0.5rem",
  },
  title: {
    fontSize: "1.5rem",
    color: "black",
  },
  pageNumber: {
    marginTop: "0.5rem",
  },
  arrowIcon: {
    marginTop: "0.5rem",
  },
  result: {
    fontSize: "1rem",
    fontWeight: 500,
    marginBottom: "1rem",
  },
  progress: {
    width: "31.5vw",
    textAlign: "center",
    justifyContent: "center",
    marginTop: "3rem",
    marginBottom: "3rem",
    [theme.breakpoints.up("lg")]: {
      width: "22vw",
    },
  },
}));

const Results = ({
  nominations,
  setNominations,
  results,
  progress,
  error,
  check,
  setCheck,
  page,
  setPage,
  total,
  searchMovies
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    localStorage.setItem("nominations", JSON.stringify(nominations));
  }, [nominations]);

  return (
    <Card
      className={classes.root}
      style={{
        height:
          results.length !== 0
            ? isMobile
              ? `calc((480px * ${results.length}) + 100px)`
              : `calc((510px * ${results.length}) + 100px)`
            : progress
            ? 300
            : 150,
      }}
    >
      <CardContent>
        <Typography className={classes.title}>Results:</Typography>
        {results.length !== 0 && (
          <div className={classes.resultTop}>
            <ArrowLeftIcon 
            className={classes.arrowIcon} 
            style={{cursor: page === 1 ? "default" : "pointer"}}
            color={page === 1 ? "disabled" : "inherit"}
            onClick={() => {
              if (page !== 1) {
                searchMovies(page - 1);
                setPage(page - 1);
              }
            }}/>
            <Typography className={classes.pageNumber} gutterBottom>
              {`Page ${page} of ${Math.ceil(total / 10)}`}
            </Typography>
            <ArrowRightIcon 
            className={classes.arrowIcon} 
            style={{cursor: page === (Math.ceil(total / 10)) ? "default" : "pointer"}}
            color={page === (Math.ceil(total / 10)) ? "disabled" : "inherit"}
            onClick={() => {
              if (page !== (Math.ceil(total / 10))) {
                searchMovies(page + 1);
                setPage(page + 1);
              }
            }}/>
          </div>
        )}
        {results.length === 0 && !progress && !error && (
          <div>
            <Typography
              style={{
                fontWeight: 500,
                textAlign: "center",
                marginTop: "1rem",
              }}
            >
              Simply search your favourite movies by their title and optionally
              their release date.
            </Typography>
          </div>
        )}
        {progress && (
          <div className={classes.progress}>
            <CircularProgress size={100} />
            <Typography variant="body1">Fetching Results...</Typography>
          </div>
        )}
        {error && (
          <Typography
            style={{
              fontWeight: 500,
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            {error}
          </Typography>
        )}
        {results.map((result, idx) => {
          return (
            <ResultCard
              key={idx}
              result={result}
              check={check}
              setCheck={setCheck}
              nominations={nominations}
              setNominations={setNominations}
            />
          );
        })}
      </CardContent>
    </Card>
  );
};

export default Results;
