const Router = require('express');
const router = new Router();
const orderController = require("../controllers/OrderController");

router.post('/create', orderController.create);

module.exports = router;