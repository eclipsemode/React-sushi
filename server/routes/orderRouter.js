const Router = require('express');
const router = new Router();
const orderController = require("../controllers/OrderController");
const authMiddleware = require("../middleware/authMiddleware");

router.post('/create', orderController.create);
router.get('/get', orderController.getAll);
router.post('/get-by-id', authMiddleware, orderController.getAllByUserId )

module.exports = router;