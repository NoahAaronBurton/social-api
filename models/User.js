const mongoose = require('mongoose');

//* There are two primary ways to create associations:

//* Embedding Documents (Subdocuments): In this approach, you nest one document within another.
//* Referencing Documents: In this approach, you create a reference from one document to another using an identifier like _id. 




const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true},
    email: { type : String, require: true, unique: true, match: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/},
    thoughts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thought',
        }
    ],
    friends: [
        {
            // Array of _id values referencing the User model (self-reference)
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ]

})



const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);

module.exports = User;