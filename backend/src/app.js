const express = require("express");
const routes = require("./routes/videos.routes");
const app = express();
const errorHandler = require("./middlewares/error");

app.use(express.json());

app.use("/v1", routes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    error: {
      message: "Not Found",
    },
  });
});

// Error-handling middleware
app.use(errorHandler);

module.exports = app;
