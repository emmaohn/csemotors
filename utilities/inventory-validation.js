// const invModel = require("../models/inventory-model")
const utilities = require(".")
const { body, validationResult } = require("express-validator")
const validate = {}

/*  **********************************
 *  Add Class Validation Rules
 * ********************************* */
validate.classRules = () => {
  return [
    body("classification_name")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Name must be longer than 3 characters")
    .isAlpha()
    .withMessage("Please use only letters in the name"),
  ]
}

/* ******************************
 * Check class data and return errors or continue to registration
 * ***************************** */
validate.checkClassData = async (req, res, next) => {
  const { classification_name } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    res.render("./inventory/addclass", {
      errors,
      title: "Add Classification",
      nav,
      classification_name,
    })
    return
  }
  next()
}

/*  **********************************
 *  Add Class Validation Rules
 * ********************************* */
validate.vehicleRules = () => {
  return [
    body("inv_make")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Make must be longer than 3 characters"),

    body("inv_model")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Model must be longer than 3 characters"),

    body("inv_year")
    .trim()
    .isNumeric({ no_symbols: true })
    .withMessage("Year must be digits only")
    .isLength({ min: 4, max: 4 })
    .withMessage("Year must be 4 digits"),

    body("inv_description")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please provide a description"),

    body("inv_image")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please provide an image path"),

    body("inv_thumbnail")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please provide an thumbnail path"),

    body("inv_price")
    .trim()
    .isNumeric()
    .withMessage("Please input valid price"),

    body("inv_miles")
    .trim()
    .isNumeric({ no_symbols: true })
    .withMessage("Please input miles without commas or decimals"),

    body("inv_color")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Please provide a vehicle color"),
  ]
}

/* ******************************
 * Check class data and return errors or continue to registration
 * ***************************** */
validate.checkVehicleData = async (req, res, next) => {
  const { classification_id, inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color } = req.body
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav()
    let classSelect = await utilities.getClassSelect()
    res.render("./inventory/addvehicle", {
      errors,
      title: "Add Vehicle",
      nav,
      classSelect,
      // classification_id, 
      inv_make, 
      inv_model, 
      inv_year, 
      inv_description, 
      inv_image, 
      inv_thumbnail, 
      inv_price, 
      inv_miles, 
      inv_color
    })
    return
  }
  next()
}

// /*  **********************************
//  *  Registration Data Validation Rules
//  * ********************************* */
// validate.registationRules = () => {
//   return [
//     // firstname is required and must be string
//     body("account_firstname")
//       .trim()
//       .isLength({ min: 1 })
//       .withMessage("Please provide a first name."), // on error this message is sent.

//     // lastname is required and must be string
//     body("account_lastname")
//       .trim()
//       .isLength({ min: 2 })
//       .withMessage("Please provide a last name."), // on error this message is sent.

//     // valid email is required and cannot already exist in the DB
//     body("account_email")
//     .trim()
//     .isEmail()
//     .normalizeEmail() // refer to validator.js docs
//     .withMessage("A valid email is required.")
//     .custom(async (account_email) => {
//       const emailExists = await accountModel.checkExistingEmail(account_email)
//       if (emailExists){
//         throw new Error("Email exists. Please log in or use different email")
//       }
//     }),

//     // password is required and must be strong password
//     body("account_password")
//       .trim()
//       .isStrongPassword({
//         minLength: 12,
//         minLowercase: 1,
//         minUppercase: 1,
//         minNumbers: 1,
//         minSymbols: 1,
//       })
//       .withMessage("Password does not meet requirements."),
//   ]
// }

// /* ******************************
//  * Check data and return errors or continue to registration
//  * ***************************** */
// validate.checkRegData = async (req, res, next) => {
//   const { account_firstname, account_lastname, account_email } = req.body
//   let errors = []
//   errors = validationResult(req)
//   if (!errors.isEmpty()) {
//     let nav = await utilities.getNav()
//     res.render("account/register", {
//       errors,
//       title: "Registration",
//       nav,
//       account_firstname,
//       account_lastname,
//       account_email,
//     })
//     return
//   }
//   next()
// }

module.exports = validate