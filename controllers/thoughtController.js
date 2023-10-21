const Thought = require('../models/Thought');

async function getThoughts (req, res) {
    try {
        const thoughts = await Thought.find();

        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
};

async function getOneThought(req,res) {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId}) //! where is the req body defined?

        if (!thought) {
            return res.status(404).json({message : 'No thoughts with that Id...'});

        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
};

async function createThought (req,res) {
    try {
        const newThought = await Thought.create(req.body);

        res.json(newThought)
    } catch (err) {
        return res.status(500).json(err);
    }
}

async function updateThought (req, res) {
    try {
        const targetThought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        );

        if (!targetThought) {
            return res.status(404).json({message : 'No thoughts with that Id...'});
        }

        res.json(targetThought);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {getThoughts, getOneThought, createThought, updateThought};