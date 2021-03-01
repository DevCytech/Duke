const { MessageEmbed } = require('discord.js');
const { NekoLifeAPI, fetchMember } = require('../../tools');

module.exports.callback = async ({ message, args }) => {
	// Pre command checks
	if (!args.length) {
		return message.reply('You need to mention someone to poke them');
	}

	// Get the member
	const target = fetchMember(message, args.join(' '));
	if (!target) {
		return message.reply('You need to mention someone to poke them');
	} else if (target === message.author) {
		return message.reply('You cannot poke yourself');
	}

	// Create embed
	const image = await NekoLifeAPI.sfw.poke();
	const e = new MessageEmbed()
		.setColor('RANDOM')
		.setTitle(
			`${message.member.displayName} has poked ${target.displayName}`,
		)
		.setImage(image.url);
	return message.channel.send(e);
};

module.exports.config = {
	name: 'poke',
	usage: '[@user]',
	category: 'actions',
	description: 'poke the mentioned user',
};
