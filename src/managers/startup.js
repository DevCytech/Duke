const { client } = require('../client');

// When the bot is ready to be used
client.on('ready', async () => {
	console.log('>> Now loading...');

	// Spin up that database
	console.log('>> Connecting to the database...');
	await require('./database');

	// Load the commands
	console.log('>> Loading all the commands...');
	await require('./commands')(client);

	// Load the listeners
	console.log('>> Loading all the listeners...');
	await require('./listeners')();

	// Setup any extra variables down here!!

	// Alert us that the bot has finished loading
	console.log(
		`>> ${client.user.username} is now online and ready to be used`,
	);
	console.log('\n-- TERMINAL -- \n\n');
});
