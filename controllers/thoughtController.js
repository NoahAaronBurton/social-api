const Thought = require('../models/Thought');

async function getThoughts (req, res) {
    try {
        const thoughts = await Thought.find();

        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {getThoughts};