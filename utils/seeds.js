const mongoose = require('mongoose');
const { User, Thought } = require('../models');
const connection = require('../config/connection');


const randomUsernames = [
    'Alpha',
    'Beta',
    'Charlie',
    'Delta',
    'Echo',
    'Foxtrot',
    'Gamma',
    'Hotel',
    'India',
    'Juliet',
    'Kilo',
    'Lima',
    'Mike',
    'November',
    'Oscar',
    'Papa',
    'Quebec',
    'Romeo',
    'Sierra',
    'Tango',
    'Uniform',
    'Victor',
    'Whiskey',
    'X-Ray',
    'Yankee',
    'Zulu'
];

const sentencesArray = [
    "Apples are delicious fruits.",
    "Bananas are a great source of potassium.",
    "Cats are cute and furry animals.",
    "Dogs are known as man's best friend.",
    "Elephants are the largest land animals.",
    "Flowers bloom in the spring.",
    "Giraffes have long necks and legs.",
    "Hiking is a wonderful outdoor activity.",
    "Ice cream is a tasty treat on a hot day.",
    "Jazz music is known for its improvisation.",
    "Kangaroos are marsupials from Australia.",
    "Lions are often called the kings of the jungle.",
    "Mountains offer breathtaking views.",
    "Ninjas are skilled in the art of stealth.",
    "Octopuses are intelligent marine creatures.",
    "Penguins are flightless birds that swim.",
    "Quilting is a traditional form of sewing.",
    "Rainbows are beautiful meteorological phenomena.",
    "Sailing is a relaxing water sport.",
    "Tigers are magnificent big cats.",
    "Umbrellas keep you dry in the rain.",
    "Volcanoes can be both destructive and majestic.",
    "Wolves are known for their pack behavior.",
    "Xylophones produce melodic sounds.",
    "Yogurt is a healthy dairy product.",
    "Zebras have distinctive black and white stripes."
];

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected...');


    // Drop the existing "Users" collection
  try {
    await User.collection.drop();
    console.log('Dropped the "Users" collection.');
  } catch (error) {
    console.error('Error dropping "Users" collection:', error);
  }

    const users = [];

    for (let i = 0; i < randomUsernames.length; i++) {
        const username = randomUsernames[i];
        const email = `${randomUsernames[i]}@example.com`;
        users.push({
            username,
            email
        })
    }

    await User.collection.insertMany(users);

    console.table(users);
    console.info('Seeding complete!');
    process.exit(0);
})

  
