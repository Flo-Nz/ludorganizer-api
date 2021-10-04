const Boardgame = require('../models/boardgame');


const controller = {
    addOne: async (req, res) => {
        const newBoardgame = new Boardgame(req.body);

        try {
            await newBoardgame.save();

            res.json(newBoardgame);
        } catch (err) {
            if (err.message.includes('already exists')) {
                res.status(409).json('Ce jeu existe déjà.');
            } else {
                res.status(500).json(err.message);
            }
        }
    },

    getAll: async (req, res) => {
        try {
            const result = await Boardgame.findAll();

            res.json(result);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    getOne: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const result = await Boardgame.findOne(id);

            res.json(result);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    findByCat: async (req, res) => {
        try {
            const catId = parseInt(req.params.id);
            const result = await Boardgame.findByCat(catId);

            res.json(result);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    gameHasCatOrTheme: async (req, res) => {
        try {
            const result = await Boardgame.gameHasCatOrTheme(req.body);

            res.json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    delete: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const result = await Boardgame.delete(id); 
            
            res.json(result);
            
        } catch (error) {
            
        }
    }
};

module.exports = controller;