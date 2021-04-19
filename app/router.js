const { Router } = require('express');

const router = Router();

const bgSchema = require('./schemas/boardgame');

const validateBody = require('./services/validator');

const boardgameController = require('./controllers/boardgameController')

router.get('/', (req, res) => {
    res.json('Hello World !');
});

router.get('/boardgames', boardgameController.getAll);

router.post('/boardgames', validateBody(bgSchema), boardgameController.addOne);

module.exports = router;