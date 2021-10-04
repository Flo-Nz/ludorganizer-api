const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const SECRET = process.env.AUTH_SECRET;

const controller = {
    getUser: async (req, res) => {

        try {
            
            const user = await User.findByUsername(req.body.username);

            if (!user) {
                return res.status(404).json('Mauvais username ou password');
            }

            const validPwd = bcrypt.compareSync(req.body.password, user.password);

            if (!validPwd) {
                return res.status(400).json('Mauvais username ou password');
            }

            const token = jwt.sign({
                id: user.id
            }, SECRET, {
                algorithm: 'HS256',
                expiresIn: 60 * 60 * 24
            });
    
            res.status(200).json({
                id: user.id,
                username: user.username,
                email: user.email,
                isAdmin: user.admin,
                access_token: token
            });

        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    addOne: async (req, res) => {

        try {

            const existingUser = await User.findByUsername(req.body.username);

            if (existingUser) {
                return res.status(400).json('Ce nom d\'utilisateur existe déjà.');
            }

            const user = new User(req.body);

            const hash = bcrypt.hashSync(user.password, saltRounds);

            user.password = hash;

            await user.save();

            const token = jwt.sign({
                id: user.id
            }, SECRET, {
                algorithm: 'HS256',
                expiresIn: 60 * 60 * 24
            });
    
            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email,
                isAdmin: user.admin,
                access_token: token
            });

        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    modifyOne: async (req, res) => {

        try {
            const id = req.body.user_id;
            const { username, previous_password, password, email } = req.body;

            const user = await User.findOne(id);

            if (!user) {
                return res.status(404).json('No user with this id');
            }

            if (username) {
                user.username = username;
            }

            if (email) {
                user.email = email;
            }

            if (password) {
                const validPwd = bcrypt.compareSync(previous_password, user.password);

                if (validPwd) {
                    const hash = bcrypt.hashSync(password, saltRounds);
                    user.password = hash;
                } else {
                    return res.status(400).json('Wrong password');
                }
            }

            await user.save();

            res.status(200).json(user);

        } catch (error) {
            res.status(500).json(error.message);
        }
    },

    deleteOne: async (req, res) => {
        try {
            const id = parseInt(req.body.user_id);
            const user = await User.findOne(id);

            if (!user) {
                return res.status(404).json('No user with this id');
            }

            await user.delete();

            res.status(204).json();

        } catch (error) {
            res.status(400).json(error.message);
        }
    }
}

module.exports = controller;