const User = require('../models/User');

async function getUsers(req, res) {
    try {
        const users = await User.find()
        // .select('-__v')
        // todo: get thoughts to populate
        // .populate('thoughts'); //* The parameter passed to .populate() should match the field name in your user schema that you want to populate

        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

async function getOneUser(req,res) {
    try {
        const user = await User.findOne({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No User with that Id....' });
        }

        res.json(user)
    } catch (err) {
        res.status(500).json(err);
    }
};

async function createUser (req, res) {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (err) {
       return res.status(500).json(err);
    }
};

async function updateUser (req,res) {
    try {
        const targetUser = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$set: req.body},
            { runValidators: true, new: true }
        );

        if (!targetUser) {
            res.status(404).json({ message: 'No User with that Id....'});
        }

        res.json(targetUser);
    } catch (err) {
        res.status(500).json(err);
    }
};

async function deleteUser (req,res) {
    try {
        const user = await User.findOneAndDelete({_id: req.params.userId });

        if (!user) {
            res.status(404).json({ message: 'No User with that Id....'});
        }

        res.json({ message: `User with Id ${req.params.userId} is now deleted!`})
    } catch (err) {
        res.status(500).json(err);
    }
}



module.exports= {getUsers, getOneUser, createUser, updateUser, deleteUser};