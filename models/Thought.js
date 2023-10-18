const mongoose = require('mongoose');
const User = require('./User');

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => {
        // getter to format the timestamp on query
        return new Date(timestamp).toISOString();
      },
    },
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    //reactions: [reactionSchema], // Array of nested reaction documents
  });

const Thought = mongoose.model('Thought', thoughtSchema);

const handleError = (err) => console.error(err);

//test seed purposes only
// User.findOne({ username: 'Noah' })
//   .then((user) => {
//     if (!user) {
//       console.error('User not found.');
//       return;
//     }

//     // Create a new Thought with the correct user reference
//     Thought
//       .create({
//         thoughtText: 'This is a very special thought.',
//         username: user._id, // Use the ObjectId of the user
//       })
//       .then(result => console.log('Created new thought', result))
//       .catch(err => handleError(err));
//   })
//   .catch(err => handleError(err));

//todo: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

module.exports = Thought;
  