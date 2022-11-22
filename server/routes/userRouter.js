const Router = require("express");
const router = new Router();
const userController = require("../controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");
const { check } = require("express-validator");

router.post("/registration",
  [
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
      .trim(),
    check('surname')
      .isLength({ min: 2, max: 20 })
      .withMessage('Фамилия должна содержать не меньше 2 и не больше 20 символов.')
      .trim(),
  ],
  userController.registration);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/auth", authMiddleware, userController.auth);
router.get("/info", authMiddleware, userController.getUserData);
router.patch("/patch", userController.patchUserData);

module.exports = router;