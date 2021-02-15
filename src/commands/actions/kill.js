const { MessageEmbed } = require('discord.js');
const {
	responses: { kill },
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
		return message.reply('You need to mention someone to kill them');
	} else if (target === message.author) {
		return message.reply('You cannot kill yourself');
	}

	// Create embed
	const image = Math.floor(Math.random() * kill.length);
	const e = new MessageEmbed()
		.setColor('RANDOM')
		.setTitle(
			`${target.displayName} was killed by ${message.member.displayName}`,
		)
		.setImage(kill[image]);
	return message.channel.send(e);
};

module.exports.config = {
	name: 'kill',
	usage: '[@user]',
	category: 'actions',
	description: 'goodbye, cruel world...',
};
