import React, { useEffect } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import NominationCard from "./NominationCard";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    width: "34vw",
    marginTop: "2rem",
    display: "flex",
    marginLeft: "2rem",
    borderRadius: 10,
    [theme.breakpoints.down("sm")]: {
      marginLeft: "0",
      width: "70vw",
    },
  },
  title: {
    fontSize: "1.5rem",
    color: "black",
  },
  confetti: {
    textAlign: "center",
  },
}));

const Nominations = ({ check, nominations, setNominations }) => {
  const classes = useStyles();

  useEffect(() => {
    setNominations(JSON.parse(localStorage.getItem("nominations")));
  }, [check, setNominations]);

  useEffect(() => {
    localStorage.setItem("nominations", JSON.stringify(nominations));
  }, [nominations]);

  return (
    <Card
      className={classes.root}
      style={{
        height:
          nominations.length === 0
            ? 150
            : `calc((115px * ${nominations.length}) + 125px)`,
      }}
    >
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          Nominations:
        </Typography>
        {nominations.length === 0 ? (
          <Typography
            style={{ fontWeight: 500, textAlign: "center", marginTop: "1rem" }}
          >
            Please nominate 5 movies for the Shoppies, the Movie Award for
            Entrepreneurs!
          </Typography>
        ) : nominations.length === 5 ? (
          <Typography
            style={{ fontWeight: 500, textAlign: "center", marginTop: "1rem" }}
          >
            You've reached the nomination limit!
          </Typography>
        ) : (
          <Typography
            style={{ fontWeight: 500, textAlign: "center", marginTop: "1rem" }}
          >
            {`${5 - nominations.length} nominations left!`}
          </Typography>
        )}
        {nominations.map((nomination) => {
          return (
            <NominationCard
              nomination={nomination}
              nominations={nominations}
              setNominations={setNominations}
            />
          );
        })}
      </CardContent>
    </Card>
  );
};

export default Nominations;
