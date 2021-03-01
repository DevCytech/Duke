const { MessageEmbed } = require('discord.js');
const { NekoLifeAPI, fetchMember } = require('../../tools');

module.exports.callback = async ({ message, args }) => {
	// Pre command checks
	if (!args.length) {
		return message.reply('You need to mention someone to nuzzle with them');
	}

	// Get the member
	const target = fetchMember(message, args.join(' '));
	if (!target) {
		return message.reply('You need to mention someone to nuzzle with them');
	} else if (target === message.author) {
		return message.reply('You cannot nuzzle with yourself');
	}

	// Create embed
	const image = await NekoLifeAPI.sfw.cuddle();
	const e = new MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`${message.member.displayName} nuzzled ${target.displayName}`)
		.setImage(image.url);
	return message.channel.send(e);
};

module.exports.config = {
	name: 'nuzzle',
	aliases: 'cuddle',
	usage: '[@user]',
	category: 'actions',
	description: 'nuzzle with the mentioned user',
};
