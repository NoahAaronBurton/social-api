const User = require('../models/User');

async function getUsers(req, res) {
    try {
        const users = await User.find()
       .populate({ path: 'thoughts', select: '-__v' }) //* The parameter passed to .populate() should match the field name in your user schema that you want to populate

        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

async function getOneUser(req,res) {
    try {
        const user = await User.findOne({ _id: req.params.userId })
        .populate({ path: 'thoughts', select: '-__v' });

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
};

async function addFriend (req,res) {
    try {
        const userId = req.params.userId;
        const friendId = req.body.friendId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'error finding User: No User with that id....'})
        }

        // Chat GPT helped with this check
        if (user.friends.includes(friendId)) {
        return res.status(400).json({ message: 'Friend already added.' });
        }

        user.friends.push(friendId);
        await user.save();

        const friend = await User.findByIdAndUpdate(
            {_id: friendId},
            {$addToSet: {friends: userId}},
            { runValidators: true, new: true}
        );

        if (!friend) {
            return res.status(404).json({message: 'Cant find friend: No User with that Id....'})
        }


        


       
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}



module.exports= {getUsers, getOneUser, createUser, updateUser, deleteUser, addFriend};