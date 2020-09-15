const express = require("express");
const webpack = require("webpack");
const middle = require("webpack-dev-middleware");

const app = express();
const config = require("./webpack.config");

app.use(middle(webpack(config)));

app.get("/api/user", (req, res) => {
  res.json({ name: "axtlive", age: "23" });
});

app.listen(3000);
