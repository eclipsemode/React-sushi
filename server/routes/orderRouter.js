const Router = require('express');
const router = new Router();
const orderController = require("../controllers/OrderController");

router.post('/create', orderController.create);
router.get('/get', orderController.getAll);

module.exports = router;