const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const categoryRouter = require('./categoryRouter');

router.use('/user', userRouter);
router.use('/product', productRouter);
router.use('/category', categoryRouter);

module.exports = router;