const Theme = require('../models/theme');


const controller = {
    addOne: async (req, res) => {
        const newTheme = new Theme(req.body);

        try {
            await newTheme.save();

            res.json(newTheme);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },

    getAll: async (req, res) => {
        try {
            const result = await Theme.findAll();

            res.json(result);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    getOne: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const result = await Theme.findOne(id);

            res.json(result);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    delete: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const result = await Theme.delete(id); 
            
            res.json(result);
        } catch (error) {
            
        }
    }
};

module.exports = controller;