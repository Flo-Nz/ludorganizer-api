const { Router } = require('express');

const router = Router();

const bgSchema = require('./schemas/boardgame');
const catSchema = require('./schemas/category');

const validateBody = require('./services/validator');

const boardgameController = require('./controllers/boardgameController');
const categoryController = require('./controllers/categoryController');

router.get('/', (req, res) => {
    res.json('Hello World !');
});

/**
 * BOARGAMES
 */
router.get('/boardgames', boardgameController.getAll);
router.post('/boardgames', validateBody(bgSchema), boardgameController.addOne);

/**
 * CATEGORIES
 */
router.get('/categories', categoryController.getAll);
router.post('/categories', validateBody(catSchema), categoryController.addOne);

module.exports = router;