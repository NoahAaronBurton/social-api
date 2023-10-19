const mongoose = require('mongoose');

//todo: finish user model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true},
    email: { type : String, require: true, unique: true, match: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/},
    thoughts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thought',
        }
    ]

})



const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);

module.exports = User;