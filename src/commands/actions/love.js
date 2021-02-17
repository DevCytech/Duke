const { palette } = require('../../tools');
const { MessageEmbed } = require('discord.js');

module.exports.callback = async ({ message, args, guildData }) => {
	if (!args[0] || !args[1]) {
		return message.channel.send(
			`Usage: ${guildData.prefix}love Thing1 Thing2`,
		);
	}

	// Calculate the love affinity
	const love = Math.random() * 100;
	const loveIndex = Math.floor(love / 10);
	const loveLevel = '💖'.repeat(loveIndex) + '💔'.repeat(10 - loveIndex);
	const personOne = message.mentions.members.get(0) || args[0];
	const personTwo = message.mentions.members.get(1) || args[1];

	// Create the embed
	const e = new MessageEmbed()
		.setColor(palette.success)
		.setDescription(
			`☁ **${personOne}** loves **${personTwo}** this much\n💟 ${Math.floor(
				love,
			)}%\n\n${loveLevel}`,
		);
	return message.channel.send(e);
};

module.exports.config = {
	name: 'love',
	aliases: 'affinity',
	usage: '[@user/entry1] [@user/entry2]',
	category: 'actions',
	description: 'Calculates the love affinity you have for another person.',
};
