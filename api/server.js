const express = require("express");
// const recipeRouter = require("./recipe/recipe-router");

const server = express();
server.use(express.json());

// server.use("/api/recipe", recipeRouter);

module.exports = server;