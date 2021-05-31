const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

const app = express();

const indexRouter = require("./src/routes/indexRouter");
const clientRouter = require("./src/routes/clientRouter");
const providerRouter = require("./src/routes/providerRouter");

app.use("/api-documentation", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_HOST || "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

app.use("/", indexRouter);
app.use("/client", clientRouter);
app.use("/provider", providerRouter);

app.use((err, req, res, next) => {
  if (err.code && err.code == 11000) {
    const field = Object.keys(err.keyValue);
    const code = 409;
    const error = `${field} has already been taken`;
    return res.status(code).json({ error: [{ msg: error }] });
  }

  res.status(500).json({ error: [{ msg: "Something went wrong" }] });
});

module.exports = app;
