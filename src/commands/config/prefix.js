const { MessageEmbed } = require('discord.js');

const logMessage = new MessageEmbed()
	.setColor('Random')
	.setTitle('Updated Prefix');

module.exports.callback = async ({ message, args, guildData }) => {
	// Get logging channel
	const logChannel = guildData.logChannel
		? message.guild.channels.cache.get(guildData.logChannel)
		: null;

	if (!logChannel) {
		return message.reply(
			`I had no place to log the prefix change.\nplease do \`${guildData.prefix}setup\``,
		);
	}

	// Check prefix
	if (!args[0] || args[0].length > 5) {
		return message.reply(
			'Please respond with a prefix under 5 characters long.',
		);
	}

	// Change prefix
	const oldPrefix = guildData.prefix;
	guildData.prefix = args[0].toLowerCase();
	guildData.save();

	// Alert about the change
	message.reply(
		`Changed the prefix! :D \n\nYour new prefix is ${guildData.prefix}!`,
	);

	logMessage.addField('Old Prefix', oldPrefix, true);
	logMessage.addField('New Prefix', guildData.prefix, true);
	logMessage.addField('Changed By', message.author, true);
	return logChannel.send(logMessage);
};

module.exports.config = {
	name: 'prefix',
	usage: '[prefix]',
	category: 'moderation',
	description: 'Change the prefix',
	permissions: ['MANAGE_GUILD'],
};
