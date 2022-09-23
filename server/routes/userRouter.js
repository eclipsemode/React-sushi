const Router = require('express');
const router = new Router();
const userController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.auth);
router.get('/info', authMiddleware, userController.getUserData)


module.exports = router;