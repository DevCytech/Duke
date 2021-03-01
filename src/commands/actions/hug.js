const { MessageEmbed } = require('discord.js');
const { NekoLifeAPI, fetchMember } = require('../../tools');

module.exports.callback = async ({ message, args }) => {
	// Pre command checks
	if (!args.length) {
		return message.reply('You need to mention someone to hug them');
	}

	// Get the member
	const target = fetchMember(message, args.join(' '));
	if (!target) {
		return message.reply('You need to mention someone to hug them');
	}

	// Create embed
	const image = await NekoLifeAPI.sfw.hug();
	const e = new MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`${message.member.displayName} hugged ${target.displayName}`)
		.setImage(image.url);
	return message.channel.send(e);
};

module.exports.config = {
	name: 'hug',
	usage: '[@user]',
	category: 'actions',
	description: 'hug the mentioned user',
};
