// Setup the client (bot)
const { Client } = require('discord.js');
const client = new Client();

const { PROD, TOKEN } = process.env;
client.isProd = PROD;

// Login the client
client.login(TOKEN);

// Export the Client
module.exports.client = client;

// Wait for a response
console.log('>> Starting up the bot...');
require('./managers/startup');
