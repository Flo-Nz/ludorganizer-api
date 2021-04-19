const Boardgame = require('../models/boardgame');


const controller = {
    addOne: async (req, res) => {
        const newBoardgame = new Boardgame(req.body);

        console.log(newBoardgame);

        try {
            await newBoardgame.save();

            res.json(newBoardgame);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },

    getAll: async (req, res) => {
        try {
            const result = await Boardgame.findAll();

            res.json(result);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
};

module.exports = controller;