const { check } = require("express-validator");
const registrationSchema = [
  check('email')
    .isEmail()
    .withMessage('Неправильный email.')
    .normalizeEmail(),
  check('password')
    .isLength({ min: 8, max: 16 })
    .withMessage('Пароль должен быть не меньше 8 и не больше 16 символов.')
    .matches(/\d/)
    .withMessage("Пароль должен иметь по меньшей мере 1 цифру."),
  check('name')
    .isLength({ min: 2, max: 10 })
    .withMessage('Имя должно содержать не меньше 2 и не больше 10 символов.')
    .trim()
]

module.exports = registrationSchema;