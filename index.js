// Setup the environment
require('dotenv').config();

// Start up the bot
// I am starting the bot this way to leave room for sharding later
require('./src/client');
