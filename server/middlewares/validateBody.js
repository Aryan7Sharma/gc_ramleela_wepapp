const {validationResult} = require('express-validator');

const validateBody = async (req, res, next) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    } else {
      next();
  }
}

module.exports = validateBody;