// Custom middleware to check for empty values
const checkEmptyValues = (req, res, next) => {
    const { body } = req;
    
    // Iterate over each property in the request body
    for (const key in body) {
      if (body.hasOwnProperty(key) && (body[key] === null || body[key] === "")) {
        return res.status(400).json({ msg: `${key} cannot be empty.` });
      }
    }
  
    // If all values are non-empty, proceed to the next middleware or route handler
    next();
  };

  module.exports = checkEmptyValues;