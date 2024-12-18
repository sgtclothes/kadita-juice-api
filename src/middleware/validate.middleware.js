const ResponseUtil = require('../utils/response.util');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return ResponseUtil.error(res, 'Validation error', 400, error.details);
    }
    next();
  };
};

module.exports = validate;