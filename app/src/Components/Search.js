import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import TodayIcon from "@material-ui/icons/Today";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    width: "70vw",
    margin: "auto",
    display: "flex",
    borderRadius: 10,
    [theme.breakpoints.down("sm")]: {
      display: "block",
      textAlign: "center",
    },
    [theme.breakpoints.up("lg")]: {
      width: "50vw",
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: "1.5rem",
    color: "black",
  },
  titleSearch: {
    width: "27vw",
    [theme.breakpoints.down("sm")]: {
      width: "50vw",
      marginBottom: "1rem",
    },
    [theme.breakpoints.up("lg")]: {
      width: "20vw",
    },
    "@media (min-width: 960px) and (max-width: 1100px)": {
      width: "25vw",
    },
    "@media (min-width: 1280px) and (max-width: 1740px)": {
      width: "18vw",
    },
  },
  releaseDateSearch: {
    width: "27vw",
    marginLeft: "2rem",
    [theme.breakpoints.down("sm")]: {
      width: "50vw",
      marginLeft: 0,
    },
    [theme.breakpoints.up("lg")]: {
      width: "20vw",
    },
    "@media (min-width: 960px) and (max-width: 1100px)": {
      width: "25vw",
    },
    "@media (min-width: 1280px) and (max-width: 1740px)": {
      width: "18vw",
    },
  },
  button: {
    marginTop: "2.5rem",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#6bb9e5",
    color: "white",
    "&:hover": {
      backgroundColor: "#3b8bb9",
      color: "white",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
      marginBottom: "1rem",
    },
  },
  buttonText: {
    "@media (min-width: 960px) and (max-width: 1100px)": {
      fontSize: "0.70rem",
    },
  },
}));

const Search = ({
  title,
  setTitle,
  releaseDate,
  setReleaseDate,
  setPage,
  searchMovies,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          Search for Movie:
        </Typography>
        <form>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            className={classes.titleSearch}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchMovies(1);
                setPage(1);
              }
            }}
          />
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              autoOk
              className={classes.releaseDateSearch}
              value={releaseDate}
              onChange={(date) => {
                setReleaseDate(date);
              }}
              variant="dialog"
              format="y"
              views={["year"]}
              label="Release Date"
              inputVariant="outlined"
              fullWidth
              clearable
              disableFuture
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <TodayIcon />
                  </InputAdornment>
                ),
              }}
            />
          </MuiPickersUtilsProvider>
        </form>
      </CardContent>
      <CardActions>
        <Button
          size="medium"
          variant="contained"
          className={classes.button}
          disabled={title.length === 0}
          onClick={() => {
            searchMovies(1);
            setPage(1);
          }}
        >
          <Typography className={classes.buttonText}>Search</Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

export default Search;
