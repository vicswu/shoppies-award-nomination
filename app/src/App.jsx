import React, { useState } from "react";
import { Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import moment from "moment";

import Search from "./Components/Search";
import { getMoviesOMDB } from "./API/search";
import Results from "./Components/Results";
import Nominations from "./Components/Nominations";
import Footer from "./Components/Footer";
import "./styles/global.css";

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: "hidden",
    justifyContent: "center",
  },
  title: {
    fontSize: "3rem",
    textAlign: "center",
    margin: "2.5rem",
  },
  resultsNominations: {
    display: "flex",
    margin: "auto",
    marginBottom: "6rem",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      textAlign: "-webkit-center",
      marginBottom: "7rem",
    },
  },
  banner: {
    width: "70vw",
    textAlign: "center",
    margin: "auto",
    marginTop: "2rem",
    [theme.breakpoints.up("lg")]: {
      width: "50vw",
    },
  },
}));

const App = () => {
  const classes = useStyles();
  const [title, setTitle] = useState([]);
  const [releaseDate, setReleaseDate] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [results, setResults] = useState([]);
  const [check, setCheck] = useState(true);
  const [progress, setProgress] = useState(false);
  const [error, setError] = useState("");
  const [nominations, setNominations] = useState(
    JSON.parse(localStorage.getItem("nominations")) || []
  );
  const topRef = React.createRef();
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up("md"));

  const clickUp = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const searchMovies = async (page) => {
    setProgress(true);
    setError("");
    setTotal(0);
    let searchResults = moment(releaseDate).isValid()
      ? await getMoviesOMDB({
          title,
          releaseDate: moment(releaseDate).format("YYYY"),
          page,
        })
      : await getMoviesOMDB({ title, page });
    if (searchResults.length === 0 || searchResults.results.length === 0) {
      setTimeout(function () {
        setResults(searchResults.results);
        setError(searchResults.error);
        setTotal(searchResults.total);
        setProgress(false);
      }, 1000);
    } else {
      setResults(searchResults.results);
      setError(searchResults.error);
      setTotal(searchResults.total);
      setProgress(false);
    }
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return (
    <div className={classes.root}>
      <section ref={topRef}>
        <Typography variant="h1" className={classes.title}>
          {!isMobile && `🏆`} Shoppies Award Nomination 🏆
        </Typography>
      </section>
      <Search
        title={title}
        setTitle={setTitle}
        releaseDate={releaseDate}
        setReleaseDate={setReleaseDate}
        setPage={setPage}
        searchMovies={searchMovies}
      />
      {nominations.length > 4 && (
        <div className={classes.banner}>
          <Alert severity="info">
            <Typography style={{ margin: "auto" }}>
              Nomination completed! You have selected 5 mobies. Thank you for
              your time.
            </Typography>
          </Alert>
        </div>
      )}
      {isMobile ? (
        <div className={classes.resultsNominations}>
          <Nominations
            check={check}
            nominations={nominations}
            setNominations={setNominations}
          />
          <Results
            results={results}
            setCheck={setCheck}
            check={check}
            progress={progress}
            error={error}
            nominations={nominations}
            setNominations={setNominations}
            page={page}
            setPage={setPage}
            total={total}
            searchMovies={searchMovies}
          />
        </div>
      ) : (
        <div className={classes.resultsNominations}>
          <Results
            results={results}
            setCheck={setCheck}
            check={check}
            progress={progress}
            error={error}
            nominations={nominations}
            setNominations={setNominations}
            page={page}
            setPage={setPage}
            total={total}
            searchMovies={searchMovies}
          />
          <Nominations
            check={check}
            nominations={nominations}
            setNominations={setNominations}
          />
        </div>
      )}
      <Footer results={results} clickUp={clickUp} />
    </div>
  );
};

export default App;
