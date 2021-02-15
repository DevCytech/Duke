const { MessageEmbed } = require('discord.js');
const {
	responses: { boop },
	fetchMember,
} = require('../../tools');

module.exports.callback = async ({ message, args }) => {
	// Pre command checks
	if (!args.length) {
		return message.reply('You need to mention someone to kill them');
	}

	// Get the member
	const target = fetchMember(message, args.join(' '));
	if (!target) {
		return message.reply('You need to mention someone to boop them');
	} else if (target === message.author) {
		return message.reply('You cannot boop yourself');
	}

	// Create embed
	const image = Math.floor(Math.random() * boop.length);
	const e = new MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`${message.member.displayName} booped ${target.displayName}`)
		.setImage(boop[image]);
	return message.channel.send(e);
};

module.exports.config = {
	name: 'boop',
	usage: '[@user]',
	category: 'actions',
	description: 'boop the mentioned user',
};
