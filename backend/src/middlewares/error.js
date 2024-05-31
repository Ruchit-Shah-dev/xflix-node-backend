const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace for debugging
  const statusCode = err.statusCode || 500;
  const message = err.message;

  // console.log(statusCode, message);
  res.status(statusCode).json({
    code: statusCode,
    message,
    stack: err.stack,
  });
};

module.exports = errorHandler;
