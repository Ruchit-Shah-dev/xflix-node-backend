const validateParam = (schema) => {
  return (req, res, next) => {
    // console.log(req.params);
    const { error, value } = schema.validate(req.params);
    if (error) {
      const stack = error.details
        .map(
          (detail) =>
            `Error: ${detail.message}\n    at ${detail.path.join(".")}`
        )
        .join("\n");
      console.error(stack);
      return res.status(400).json({
        code: 400,
        message: error.details.map((detail) => detail.message).join(", "),
        stack: stack,
      });
    }
    next();
  };
};

const validateQuery = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query);
    if (error) {
      const stack = error.details
        .map(
          (detail) =>
            `Error: ${detail.message}\n    at ${detail.path.join(".")}`
        )
        .join("\n");
      console.error(stack);
      return res.status(400).json({
        code: 400,
        message: error.details.map((detail) => detail.message).join(", "),
        stack: stack,
      });
    }
    next();
  };
};

module.exports = { validateParam, validateQuery };
