import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import passport from "passport";
import BearerStrategy from "passport-http-bearer";
import webpack from "webpack";
import webpackConfig from "./webpack.config.dev";
import config from "./config";
import routes from "../api/routes";

const port = process.env.PORT || 8080;
const app = express();
const compiler = webpack(webpackConfig);
const strategy = new BearerStrategy((token, done) => {
  jwt.verify(token, config.SECRET, (err, user) => {
    if (err) {
      return done("err");
    }
    if (!user) {
      return done(null, {
        success: false,
        message: "Failed to authenticate token."
      });
    }
    return done(null, user);
  });
});

mongoose.connect(config.DB_URL);

app.set("superSecret", config.SECRET);

passport.use(strategy);

app.use("/static", express.static("static"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(
  require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  })
);

// app.use(require("webpack-hot-middleware")(compiler));

console.log(`Staring web server at PORT: ${port}`);

app.use("/", routes);

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    const url = `http://localhost:${port}`;
    console.log(`Server listening at ${url}`);
  }
});
