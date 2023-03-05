const Router = require("express");
const router = new Router();
const userController = require("../controllers/UserController");
const authMiddleware = require("../middleware/authMiddleware");
const registrationSchema = require("../validation/registration-schema");

router.post("/registration", registrationSchema, userController.registration);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.get("/info", authMiddleware, userController.getUserData);
router.patch("/patch", userController.patchUserData);
router.patch('/change-email', authMiddleware, userController.changeUsersEmail)

module.exports = router;