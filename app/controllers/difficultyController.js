const Difficulty = require('../models/difficulty');


const controller = {

    getAll: async (req, res) => {
        try {
            const result = await Difficulty.findAll();

            res.json(result);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    getOne: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const result = await Difficulty.findOne(id);

            res.json(result);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    delete: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const result = await Difficulty.delete(id); 
            
            res.json(result);
        } catch (error) {
            
        }
    }
};

module.exports = controller;