import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  CardActions,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HelpIcon from "@material-ui/icons/Help";
import StarIcon from "@material-ui/icons/Star";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 480,
    width: "31.5vw",
    marginBottom: "2rem",
    borderRadius: 10,
    [theme.breakpoints.down("sm")]: {
      width: "65vw",
      height: 525,
    },
  },
  media: {
    height: 350,
  },
  movieTitle: {
    fontSize: "1rem",
    fontWeight: 500,
    color: "black",
    textAlign: "center",
  },
  buttons: {
    margin: "auto",
  },
  button: {
    backgroundColor: "#6bb9e5",
    color: "white",
    "&:hover": {
      backgroundColor: "#3b8bb9",
      color: "white",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "1rem",
    },
  },
  iconButton: {
    color: "#ffc302",
    "&:hover": {
      color: "#ffc302",
    },
  },
}));

const ResultCard = ({
  result,
  setNominations,
  nominations,
  setCheck,
  check,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={() =>
          window.open(`https://www.imdb.com/title/${result.imdbID}`)
        }
      >
        <CardMedia
          className={classes.media}
          image={result.Poster}
          title="Movie Poster"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.movieTitle}
          >
            {`${result.Title} (${result.Year})`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            size="medium"
            className={classes.button}
            style={{ marginRight: "1rem" }}
            onClick={() =>
              window.open(`https://www.imdb.com/title/${result.imdbID}`)
            }
            endIcon={<HelpIcon />}
          >
            Learn More
          </Button>
          <Button
            variant="contained"
            size="medium"
            className={classes.button}
            style={{ marginRight: "1rem" }}
            onClick={() => {
              setNominations([...nominations, result]);
              setCheck(!check);
            }}
            disabled={
              nominations.length > 4 ||
              nominations
                .map((nomination) => nomination.Title)
                .includes(result.Title)
            }
            endIcon={<StarIcon />}
          >
            Nominate
          </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default ResultCard;
