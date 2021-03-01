const { client } = require('../client');
const { Player } = require('discord-player');
client.invites = {};

// When the bot is ready to be used
client.on('ready', async () => {
	console.log('>> Now loading...');

	// Spin up that database
	console.log('>> Connecting to the database...');
	await require('./database');

	// Setup player
	console.log('>> Loading music player...');
	client.player = new Player(client);
	console.log('Music player is now up and running! \n');

	// Load the commands
	console.log('>> Loading all the commands...');
	await require('./commands')(client);

	// Load the listeners
	console.log('>> Loading all the listeners...');
	await require('./listeners')();

	// Setting presence
	client.user
		.setActivity('Chase the mailman', { type: 'PLAYING' })
		.then((presence) =>
			console.log(
				`${client.user.tag} has set activity to ${presence.activities[0].name} \n`,
			),
		)
		.catch(console.error);

	setTimeout(() => {
		// Load invites
		console.log('>> Loading invites...');
		for (const guild of client.guilds.cache) {
			try {
				if (guild[1].me.hasPermission('VIEW_AUDIT_LOG')) {
					guild[1].fetchInvites().then((invites) => {
						client.invites[guild[0]] = invites;
					});
				}
			} catch (err) {
				console.error(err);
			}
		}
		console.log(`Finished loading invites in ${client.invites.size} \n`);
	}, 5000);

	// Setup any extra variables down here!!

	// Alert us that the bot has finished loading
	console.log('>> Waiting for client information...');
	setTimeout(() => {
		console.log(
			`>> ${client.user.username} is now online and ready to be used`,
		);
		return console.log('\n-- TERMINAL -- \n\n');
	}, 10000);
});
