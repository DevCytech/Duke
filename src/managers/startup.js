const { readdirSync } = require('fs');
const { config } = require('../tools');
const { client } = require('../client');
const { Player } = require('discord-player');
client.invites = {};

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

	// Setting presence
	client.user
		.setActivity('Chase the mailman', { type: 'PLAYING' })
		.then((presence) =>
			console.log(
				`${client.user.tag} has set activity to ${presence.activities[0].name}`,
			),
		)
		.catch(console.error);

	setTimeout(() => {
		// Load invites
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

		// Setup player
		client.player = new Player(client);
		client.emotes = config.emojis;
		client.filters = config.filters;

		const player = readdirSync('./src/player/').filter((file) =>
			file.endsWith('.js'),
		);
		for (const file of player) {
			const event = require(`../player/${file}`);
			client.player.on(file.split('.')[0], event.bind(null, client));
		}
	}, 5000);

	// Setup any extra variables down here!!

	// Alert us that the bot has finished loading
	console.log(
		`>> ${client.user.username} is now online and ready to be used`,
	);
	console.log('\n-- TERMINAL -- \n\n');
});
