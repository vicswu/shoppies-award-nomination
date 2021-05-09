import React from "react";
import { Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import MailIcon from "@material-ui/icons/Mail";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  iconButton: {
    marginLeft: "auto",
    marginRight: "auto",
    position: "relative",
    bottom: "10vh",
    backgroundColor: "#6bb9e5",
    color: "white",
    "&:hover": {
      backgroundColor: "#3b8bb9",
      color: "white",
    },
    [theme.breakpoints.down("sm")]: {
      bottom: "12vh",
    },
  },
  blackBox: {
    width: "100vw",
    backgroundColor: "black",
    height: "8vh",
    textAlign: "center",
    justifyContent: "center",
    position: "fixed",
    bottom: 0,
    left: 0,
    [theme.breakpoints.down("sm")]: {
      height: "10vh",
    },
  },
  text: {
    color: "white",
    fontSize: "1rem",
  },
  githubIcon: {
    color: "white",
    fontSize: "1.5rem",
    marginRight: "1rem",
    marginTop: "0.25rem",
    cursor: "pointer",
    "&:hover": {
      color: "#6bb9e5",
    },
  },
  linkedInIcon: {
    color: "white",
    fontSize: "2rem",
    marginBottom: -5,
    marginRight: "1rem",
    marginTop: "0.25rem",
    cursor: "pointer",
    "&:hover": {
      color: "#6bb9e5",
    },
  },
  mailIcon: {
    color: "white",
    fontSize: "2rem",
    marginBottom: -5,
    marginTop: "0.25rem",
    cursor: "pointer",
    "&:hover": {
      color: "#6bb9e5",
    },
  },
}));

const Footer = ({ results, clickUp }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {results.length !== 0 && (
        <IconButton
          aria-label="up"
          className={classes.iconButton}
          onClick={clickUp}
        >
          <KeyboardArrowUpIcon style={{ fontSize: "1.5rem" }} />
        </IconButton>
      )}
      <div className={classes.blackBox}>
        <Typography variant="body1" className={classes.text}>
          Victor Wu &copy; 2021
        </Typography>
        <GitHubIcon
          className={classes.githubIcon}
          onClick={() => window.open("https://github.com/vicswu")}
        />
        <LinkedInIcon
          className={classes.linkedInIcon}
          onClick={() =>
            window.open("https://www.linkedin.com/in/victor-s-wu/")
          }
        />
        <a
          href="mailto: v27wu@uwaterloo.ca"
          target="_blank"
          rel="noreferrer noopener"
        >
          <MailIcon className={classes.mailIcon} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
