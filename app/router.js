const { Router } = require('express');

const router = Router();

const bgSchema = require('./schemas/boardgame');
const catSchema = require('./schemas/category');
const userSignupSchema = require('./schemas/signup');
const userSigninSchema = require('./schemas/signin');
const modifyUserSchema = require('./schemas/modifyUser');
const deleteUserSchema = require('./schemas/deleteUser');
const verifyJWT = require('./services/auth');

const validateBody = require('./services/validator');

const boardgameController = require('./controllers/boardgameController');
const categoryController = require('./controllers/categoryController');
const themeController = require('./controllers/themeController');
const difficultyController = require('./controllers/difficultyController');
const userController = require('./controllers/userController');

router.get('/', (req, res) => {
    res.json('Hello World !');
});

/**
 * SIGNUP / SIGNIN
 */
router.post('/signup', validateBody(userSignupSchema), userController.addOne);
router.post('/signin', validateBody(userSigninSchema), userController.getUser);
router.patch('/user', verifyJWT, validateBody(modifyUserSchema), userController.modifyOne);
router.delete('/user', verifyJWT, validateBody(deleteUserSchema), userController.deleteOne);
/**
 * BOARDGAMES
 */
router.get('/boardgames', boardgameController.getAll);
router.post('/boardgames', validateBody(bgSchema), boardgameController.addOne);
router.get('/boardgames/:id', boardgameController.getOne);
router.delete('/boardgames/:id', boardgameController.delete);
router.get('/bgbycat/:id', boardgameController.findByCat);
router.post('/boardgames/catortheme', boardgameController.gameHasCatOrTheme);

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

 /**
 * DIFFICULTIES
 */
  router.get('/difficulties', difficultyController.getAll);
  router.get('/difficulties/:id', difficultyController.getOne);
  router.delete('/difficulties/:id', difficultyController.delete);
module.exports = router;