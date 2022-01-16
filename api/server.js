const express = require("express");

const { logger } = require("./middleware/middleware");
const userRouter = require("./users/users-router");

const server = express();

server.use(express.json());
// server.use(logger);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use("*", (req, res) => {
  res.status(404).json({ message: `${req.method} ${req.baseUrl} not found.` });
});

server.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    error: err.message,
  });
});

module.exports = server;
