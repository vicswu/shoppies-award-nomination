import React, { useState } from "react";
import { Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";

import Search from "./Components/Search";
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
  },
}));

const App = () => {
  const classes = useStyles();
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
        results={results}
        setResults={setResults}
        setProgress={setProgress}
        setError={setError}
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
