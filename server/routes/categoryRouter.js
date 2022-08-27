const Router = require('express');
const router = new Router();
const categoryRouter = require('../controllers/CategoryController');

router.post('/', categoryRouter.create);
router.get('/', categoryRouter.get);
router.delete('/:id', categoryRouter.delete);

module.exports = router;