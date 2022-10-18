const Router = require("express");
const router = new Router();
const userController = require("../controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");
const { body } = require("express-validator");

router.post("/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 8, max: 32 }),
  userController.registration);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/auth", authMiddleware, userController.auth);
router.get("/info", authMiddleware, userController.getUserData);
router.patch("/patch", userController.patchUserData);

module.exports = router;