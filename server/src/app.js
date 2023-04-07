require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const routes = require("./routes");
const config = require("./config");
const compression = require("compression");
const dbconnect = require("./config/dbconnect");
const rescheduler = require("./utility/eventRescheduler");

const app = express();

app.use(express.json({ limit: "10mb" }));

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // For legacy browser support
};

if (process.env.NODE_ENV === "production") {
  // corsOptions.origin = "https://communityofcoders.in";
  corsOptions.origin = "*";
}

app.use(cors(corsOptions));

app.set("view engine", "ejs");

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

routes(app);

dbconnect(rescheduler.reschedule);

app.use(compression());
app.use(express.static(path.join(__dirname, "../../new_client/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../new_client/build/index.html"));
});

let port = config.port;
if (process.env.NODE_ENV === "test") port = 8001;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
