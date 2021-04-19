const validateBody = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (!error) {
        next();
    } else {
        res.status(400).json(error);
    }
}

module.exports = validateBody;