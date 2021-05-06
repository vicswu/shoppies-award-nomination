import React, { useState } from "react";
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
import moment from "moment";
import MomentUtils from "@date-io/moment";
import TodayIcon from "@material-ui/icons/Today";
import SearchIcon from "@material-ui/icons/Search";
import { getMoviesOMDB } from "../API/search";

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
  },
  releaseDateSearch: {
    width: "27vw",
    marginLeft: "2rem",
    [theme.breakpoints.down("sm")]: {
      width: "50vw",
      marginLeft: 0,
    },
  },
  button: {
    marginTop: "2.5rem",
    marginLeft: "1rem",
    backgroundColor: "#6bb9e5",
    color: "white",
    "&:hover": {
      backgroundColor: "#3b8bb9",
      color: "white",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 0,
      marginLeft: "30%",
      marginBottom: "1rem",
    },
  },
}));

const Search = ({ setProgress, setError, setResults, results }) => {
  const classes = useStyles();
  const [title, setTitle] = useState([]);
  const [releaseDate, setReleaseDate] = useState(null);

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
            onKeyDown={async (e) => {
              if (e.keyCode === 13) {
                setProgress(true);
                setError("");
                let searchResults = moment(releaseDate).isValid()
                  ? await getMoviesOMDB({
                      title: title,
                      releaseDate: moment(releaseDate).format("YYYY"),
                    })
                  : await getMoviesOMDB({ title: title });
                if (results.length === 0) {
                  setTimeout(function () {
                    setResults(searchResults.results);
                    setError(searchResults.error);
                    setProgress(false);
                  }, 1000);
                } else {
                  setResults(searchResults.results);
                  setError(searchResults.error);
                  setProgress(false);
                }
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
          onClick={async () => {
            setProgress(true);
            setError("");
            let searchResults = moment(releaseDate).isValid()
              ? await getMoviesOMDB({
                  title: title,
                  releaseDate: moment(releaseDate).format("YYYY"),
                })
              : await getMoviesOMDB({ title: title });
            if (results.length === 0) {
              setTimeout(function () {
                setResults(searchResults.results);
                setError(searchResults.error);
                setProgress(false);
              }, 1000);
            } else {
              setResults(searchResults.results);
              setError(searchResults.error);
              setProgress(false);
            }
          }}
        >
          Search
        </Button>
      </CardActions>
    </Card>
  );
};

export default Search;
