const mongoose = require('mongoose');

//todo: finsish user model
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true}
})



const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);

User
    .create({
        username: 'Noah'
    })
    .then(result => console.log('Created new document', result))
    .catch(err => handleError(err));

module.exports = User;