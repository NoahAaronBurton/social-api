const express = require('express');
const db = require('./config/connection');
const {User, Thought} = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//todo: sample get route for testing. it will move later to its own folder.
app.get('/', async (req, res) => {
    try {
        const result = await User.find({});
        res.status(200).json(result);
    } catch {
        res.status(500).send({message: 'internal server error'})
    }
})


db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
  