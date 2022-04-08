import { makeStyles } from "@material-ui/core";

const GREEN_COLOR = "#31D16D";
const BLACK_PRIMARY_COLOR = "#0A150A";
const BLACK_SECONDARY_COLOR = "#2F2F2F";
const WHITE_PRIMARY_COLOR = "#CDCDCD";
const RECHARGE_FONT = "Recharge Bold";

export default makeStyles((theme) => ({
  footerContent: {
    padding: "1rem",
    backgroundColor: BLACK_PRIMARY_COLOR,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  name: {
    color: WHITE_PRIMARY_COLOR,
    fontFamily: RECHARGE_FONT,
    marginTop: "1rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  socials: {
    margin: "1rem 0 1rem 0",
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  socialIcon: {
    marginLeft: "1rem",
    marginRight: "1rem",
    color: WHITE_PRIMARY_COLOR,
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover, &:focus": {
      color: GREEN_COLOR,
      transform: "scale(1.2)",
    },
  },
  tagline: {
    color: WHITE_PRIMARY_COLOR,
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
    minWidth: "100%",
    textTransform: "uppercase",
    fontFamily: RECHARGE_FONT,
    fontSize: "1.1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.8rem",
    },
  },
  bulletSeperator: {
    fontSize: "2rem",
    padding: "0 0.8rem 0 0.8rem",
  },
  footerSeperator: {
    backgroundColor: BLACK_PRIMARY_COLOR,
    display: "flex",
    justifyContent: "center",
  },
  greenThread: {
    width: "2rem",
    backgroundColor: GREEN_COLOR,
    height: "0.3rem",
    borderRadius: "1rem",
  },
  footerBottom: {
    backgroundColor: BLACK_SECONDARY_COLOR,
    color: WHITE_PRIMARY_COLOR,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.2rem",
  },
  cocGreen: {
    color: GREEN_COLOR,
  },
}));
