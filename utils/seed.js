// const { USVString } = require('webidl-conversions');
const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Create empty array to hold the students
  const users = [];

  // Get some random thoughts objects using a helper function that we imported from ./data
  const thoughts = getThoughts(20);

  // Loops -- add users to the users array
  for (let i = 0; i < 5; i++) {
    const names = getRandomName();
    const email = `${names}@gmail.com`;

    users.push({
      names,
      email
    });
  }

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Add thoughts to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
