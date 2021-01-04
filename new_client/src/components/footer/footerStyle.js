import { makeStyles } from "@material-ui/core";

export default makeStyles(() => ({
  footerContent: {
    padding: "1rem",
    backgroundColor: "#111111",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  name: {
    color: "#fff",
    fontFamily: "Recharge Bold",
  },
  socials: {
    marginTop: "1rem",
    display: "flex",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  socialIcon: {
    marginLeft: "1rem",
    marginRight: "1rem",
    color: "#fff",
    cursor: "pointer",
    "&:hover, &:focus": {
      color: "#00cc00",
    },
  },
  tagline: {
    color: "white",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    minWidth: "100%",
    textTransform: "uppercase",
    justifyContent: "space-evenly",
  },
  taglineWord: {
    fontFamily: "Recharge Bold",
  },
  footerBottom: {
    backgroundColor: "#222222",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cocGreen: {
    color: "#00cc00",
  },
}));
