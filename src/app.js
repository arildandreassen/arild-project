const express = require("express");
const cors = require("cors");

const moviesrouter = require("./production_companies/production_companies.router");
const genresrouter = require("./genres/genres.router");
const app = express();

app.use(cors());
app.use(express.json());

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

app.use("/production_companies", moviesrouter);
app.use("/genres", genresrouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
