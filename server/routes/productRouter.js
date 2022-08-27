const Router = require('express');
const router = new Router();
const productController = require('../controllers/ProductController');

router.post('/', productController.create);
router.get('/', productController.get);
router.delete('/:id', productController.delete);

module.exports = router;