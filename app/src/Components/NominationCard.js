import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  IconButton,
  Tooltip,
  Zoom,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 100,
    width: "31.5vw",
    marginBottom: "1rem",
    marginTop: "1rem",
    borderRadius: 10,
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      width: "65vw",
    },
    [theme.breakpoints.up("lg")]: {
      width: "22.25vw",
    },
    "@media (max-width: 290px)": {
      width: "85vw",
    },
  },
  movieTitle: {
    fontSize: "1rem",
    fontWeight: 500,
    color: "black",
    textAlign: "center",
  },
  buttons: {
    margin: "auto",
    marginLeft: "2rem",
  },
  icon: {
    color: "#6bb9e5",
    "&:hover": {
      color: "#3b8bb9",
    },
  },
  tooltip: {
    fontSize: "0.75rem",
  },
}));

const NominationCard = ({ nomination, setNominations, nominations }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea
        style={{ width: "75%" }}
        onClick={() =>
          window.open(`https://www.imdb.com/title/${nomination.imdbID}`)
        }
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.movieTitle}
          >
            {`${nomination.Title} (${nomination.Year})`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div className={classes.buttons}>
        <Tooltip
          placement="right"
          arrow
          TransitionComponent={Zoom}
          title={
            <Typography variant="body1" className={classes.tooltip}>
              Remove Nomination
            </Typography>
          }
        >
          <IconButton
            variant="contained"
            size="medium"
            style={{ marginRight: "1rem" }}
            onClick={() => {
              setNominations(nominations.filter((nom) => nom !== nomination));
            }}
            className={classes.icon}
          >
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Card>
  );
};

export default NominationCard;
