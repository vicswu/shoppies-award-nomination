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
  title: {
    fontSize: "1.5rem",
    color: "black",
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
              ? `calc(488px * ${results.length})`
              : `calc(518px * ${results.length})`
            : progress
            ? 300
            : 150,
      }}
    >
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          Results:
        </Typography>
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
            <Typography variant="body1">
              Fetching Results...
            </Typography>
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
        {results.map((result) => {
          return (
            <ResultCard
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
