const { Collection } = require('discord.js');
const { fetchFiles } = require('../tools');

module.exports = async (client) => {
	// Setup the values
	client.categories = new Collection();
	client.commands = new Collection();
	client.aliases = new Collection();

	// Getting the command files
	const commandFiles = await fetchFiles('./src/commands', '.js');

	// Make sure files were successfully gathered
	if (commandFiles == null || !commandFiles.length) {
		return console.log('There were no commands found that can be loaded!');
	}

	// Load the commands
	for (const path of commandFiles) {
		const file = require(path);

		// Make sure we have all the necessary properties
		if (!file || !file.config || !file.callback) continue;
		if (!file.config.name) continue;

		// Load the commands onto the client
		client.commands.set(file.config.name, file);

		// Add a command instance without the -
		// Example: duke-bot-help can be used as dukebothelp
		if (file.config.name.includes('-')) {
			client.aliases.set(file.config.name.replace(/-/g, ''), file);
		}

		// If there are aliases get them
		if (file.config.aliases) {
			switch (typeof file.config.aliases) {
				case 'string':
					client.aliases.set(file.config.aliases, file);
					if (file.config.aliases.includes('-')) {
						client.aliases.set(
							file.config.aliases.replace(/-/g, ''),
							file,
						);
					}
					break;

				case 'object':
					for (const alias of file.config.aliases) {
						client.aliases.set(alias, file);
						if (alias.includes('-')) {
							client.aliases.set(alias.replace(/-/g, ''), file);
						}
					}
					break;

				default:
					throw new Error(
						`Alias type unsupported, please make sure you use a array or object with the ${file.config.name} command.`,
					);
			}
		}
	}

	console.log(
		`${client.commands.size} command${
			client.commands.size === 1 ? ' has' : 's have'
		} been loaded!`,
	);
	console.log(
		`${client.aliases.size} alias${
			client.aliases.size === 1 ? ' has' : 'es have'
		} been loaded!`,
	);
};
