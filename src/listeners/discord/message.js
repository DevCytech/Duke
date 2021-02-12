const { config } = require('../../tools');
const { client } = require('../../client');

client.on('message', async (message) => {
	const { author, content, channel } = message;

	// Pre command checks
	if (author.bot || channel.type === 'dm') return;
	if (!channel.permissionsFor(client.user).has('SEND_MESSAGES')) return;
	if (!channel.permissionsFor(client.user).has('EMBED_LINKS')) {
		return channel.send(
			'Many of my responses require permission to embed links.',
		);
	}

	// Get guild data
	const guildData = { prefix: '!' };
	// Temp Data

	// Get user data
	const userData = {};
	// Temp Data

	// XP System

	// Define Information
	// const mention = `<@${client.user.id}!>`;
	const prefix = guildData.prefix ? guildData.prefix : config.prefix;
	const [cmd, ...args] = content.slice(prefix.length).split(/\s+/g);

	// Get the command
	if (!cmd) return;
	const command = client.commands.get(cmd) || client.aliases.get(cmd);
	if (!command) return;

	// Check the members permissions
	if (command.config.permissions) {
		const missing = [];

		for (const permission of command.config.permissions) {
			if (!channel.permissionsFor(author).has(permission)) {
				missing.push(permission);
			}
		}

		if (missing.length > 0) {
			return channel.send(
				`You are missing the following permissions: ${missing.join(
					', ',
				)}`,
			);
		}
	}

	if (command.config.clientPerms) {
		const missing = [];

		for (const permission of command.config.clientPerms) {
			if (!channel.permissionsFor(client.user).has(permission)) {
				missing.push(permission);
			}
		}

		if (missing.length > 0) {
			return channel.send(
				`I am missing the following permissions: ${missing.join(', ')}`,
			);
		}
	}

	// Check NSFW
	if (command.config.isNSFW && channel.nsfw === false) {
		return channel.send('Please use this command in an nsfw channel.');
	}

	// Check Dev
	if (command.config.isDev && !config.developers.includes(author.id)) return;

	// Run the command
	command
		.callback({ client, message, args, guildData, userData })
		.catch((err) => {
			console.error(err);
			return channel.send(
				`An error occured while trying to run ${command.config.name}. Please try again later...`,
			);
		});
});
