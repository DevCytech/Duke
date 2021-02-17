const { MessageEmbed } = require('discord.js');
const {
	responses: { pinky },
	fetchMember,
} = require('../../tools');

module.exports.callback = async ({ message, args }) => {
	// Pre command checks
	if (!args.length) {
		return message.reply(
			'You need to mention someone to make a pinky promise with them',
		);
	}

	// Get the member
	const target = fetchMember(message, args.join(' '));
	if (!target) {
		return message.reply(
			'You need to mention someone to make a pinky promise with them',
		);
	}

	// Create embed
	const image = Math.floor(Math.random() * pinky.length);
	const e = new MessageEmbed()
		.setColor('RANDOM')
		.setTitle(
			`${message.member.displayName} just formed a pinky promise with ${target.displayName}`,
		)
		.setImage(pinky[image]);
	return message.channel.send(e);
};

module.exports.config = {
	name: 'pinky-promise',
	usage: '[@user]',
	category: 'actions',
	description: 'Make a Pinky Promise with the Mentioned User',
};
