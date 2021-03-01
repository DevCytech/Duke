const { MessageEmbed } = require('discord.js');
const { NekoLifeAPI, fetchMember } = require('../../tools');

module.exports.callback = async ({ message, args }) => {
	// Pre command checks
	if (!args.length) {
		return message.reply('You need to mention someone to pat them');
	}

	// Get the member
	const target = fetchMember(message, args.join(' '));
	if (!target) {
		return message.reply('You need to mention someone to pat them');
	} else if (target === message.author) {
		return message.reply('You cannot pat yourself');
	}

	// Create embed
	const image = await NekoLifeAPI.sfw.pat();
	const e = new MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`${message.member.displayName} patted ${target.displayName}`)
		.setImage(image.url);
	return message.channel.send(e);
};

module.exports.config = {
	name: 'pat',
	usage: '[@user]',
	category: 'actions',
	description: 'pat the mentioned user',
};
