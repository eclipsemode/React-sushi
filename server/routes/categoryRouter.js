const Router = require('express');
const router = new Router();
const categoryRouter = require('../controllers/CategoryController');

router.post('/', categoryRouter.create);
router.get('/', categoryRouter.getAll);
router.delete('/:id', categoryRouter.delete);

module.exports = router;