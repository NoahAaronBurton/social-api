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
    }, //todo: populate sub-document for user
    username: { //* Mongoose will replace the author field in the result with the actual user document, making it much more convenient to work with the data. Without populating, the author field in the post document would only contain the _id of the user, not the full user document.
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // reactions: [reactionSchema], // Array of nested reaction documents
  });

const Thought = mongoose.model('Thought', thoughtSchema);

const handleError = (err) => console.error(err);


//todo: Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

module.exports = Thought;
  