const Router = require('express');
const router = new Router();
const userController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.auth);
router.post('/info', authMiddleware, userController.getUserData)
router.patch('/patch', userController.patchUserData)

module.exports = router;