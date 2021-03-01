const { MessageEmbed } = require('discord.js');
const {
	responses: { cookies },
	fetchMember,
} = require('../../tools');

module.exports.callback = async ({ message, args }) => {
	// Pre command checks
	if (!args.length) {
		return message.reply(
			'You need to mention someone to give them cookies',
		);
	}

	// Get the member
	const target = fetchMember(message, args.join(' '));
	if (!target) {
		return message.reply('You need to mention someone to give cookies to');
	} else if (target === message.author) {
		return message.reply('You cannot give a cookie to yourself');
	}

	// Create embed
	const image = Math.floor(Math.random() * cookies.length);
	const e = new MessageEmbed()
		.setColor('RANDOM')
		.setTitle(
			`${message.member.displayName} gave some cookies to ${target.displayName}`,
		)
		.setImage(cookies[image]);
	return message.channel.send(e);
};

module.exports.config = {
	name: 'cookie',
	aliases: 'cookies',
	usage: '[@user]',
	category: 'fun',
	description: 'Give someone a cookie!',
};
