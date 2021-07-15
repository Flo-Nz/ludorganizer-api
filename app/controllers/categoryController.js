const Category = require('../models/category');


const controller = {
    addOne: async (req, res) => {
        const newCategory = new Category(req.body);

        try {
            await newCategory.save();

            res.json(newCategory);
        } catch (err) {
            res.status(500).json(err.message);
        }
    },

    getAll: async (req, res) => {
        try {
            const result = await Category.findAll();

            res.json(result);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    getOne: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const result = await Category.findOne(id);

            res.json(result);
        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    delete: async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const result = await Category.delete(id); 
            
            res.json(result);
        } catch (error) {
            
        }
    }
};

module.exports = controller;