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




module.exports= {getUsers};