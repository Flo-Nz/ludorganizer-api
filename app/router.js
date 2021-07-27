const { Router } = require('express');

const router = Router();

const bgSchema = require('./schemas/boardgame');
const catSchema = require('./schemas/category');

const validateBody = require('./services/validator');

const boardgameController = require('./controllers/boardgameController');
const categoryController = require('./controllers/categoryController');
const themeController = require('./controllers/themeController');

router.get('/', (req, res) => {
    res.json('Hello World !');
});

/**
 * BOARDGAMES
 */
router.get('/boardgames', boardgameController.getAll);
router.post('/boardgames', validateBody(bgSchema), boardgameController.addOne);
router.get('/boardgames/:id', boardgameController.getOne);
router.delete('/boardgames/:id', boardgameController.delete);
router.get('/bgbycat/:id', boardgameController.findByCat);

/**
 * CATEGORIES
 */
router.get('/categories', categoryController.getAll);
router.post('/categories', validateBody(catSchema), categoryController.addOne);
router.get('/categories/:id', categoryController.getOne);
router.delete('/categories/:id', categoryController.delete);

/**
 * THEMES
 */
 router.get('/themes', themeController.getAll);
 router.post('/themes', validateBody(catSchema), themeController.addOne);
 router.get('/themes/:id', themeController.getOne);
 router.delete('/themes/:id', themeController.delete);

module.exports = router;