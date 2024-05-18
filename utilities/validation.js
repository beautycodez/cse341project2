const { body, validationResult } = require("express-validator");
const validate = {};

/*  **********************************
 *  Registration Data Validation Rules
 * ********************************* */
validate.registationRules = () => {
  return [
    // firstname is required and must be string
    body("band")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please provide a band name."),
      body("songs.*.title")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please provide an email."),
      body("songs.*.time")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 4 })
      .withMessage("Please provide an the time."),
      body("songs.*.album")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please provide an album."),
      body("songs.*.length")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Please provide the length of the song.")
        .isNumeric()
        .withMessage("Length must be a number in seconds."),
      body("songs.*.genre")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .withMessage("Please provide an album.")
  ];
};

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;
