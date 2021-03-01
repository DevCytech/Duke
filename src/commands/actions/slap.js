const { MessageEmbed } = require('discord.js');
const { NekoLifeAPI, fetchMember } = require('../../tools');

module.exports.callback = async ({ message, args }) => {
	// Pre command checks
	if (!args.length) {
		return message.reply('You need to mention someone to slap them');
	}

	// Get the member
	const target = fetchMember(message, args.join(' '));
	if (!target) {
		return message.reply('You need to mention someone to slap them');
	} else if (target === message.author) {
		return message.reply('You cannot slap yourself');
	}

	// Create embed
	const image = await NekoLifeAPI.sfw.slap();
	const e = new MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`${message.member.displayName} slapped ${target.displayName}`)
		.setImage(image.url);
	return message.channel.send(e);
};

module.exports.config = {
	name: 'slap',
	usage: '[@user]',
	category: 'actions',
	description: 'slap the mentioned user',
};
