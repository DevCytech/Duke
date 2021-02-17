const { MessageEmbed } = require('discord.js');
const {
	responses: { shoot },
	fetchMember,
} = require('../../tools');

module.exports.callback = async ({ message, args }) => {
	// Pre command checks
	if (!args.length) {
		return message.reply('You need to mention someone to shoot them');
	}

	// Get the member
	const target = fetchMember(message, args.join(' '));
	if (!target) {
		return message.reply('You need to mention someone to shoot them');
	}

	// Create embed
	const image = Math.floor(Math.random() * shoot.length);
	const e = new MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`${message.member.displayName} shot ${target.displayName}`)
		.setImage(shoot[image]);
	return message.channel.send(e);
};

module.exports.config = {
	name: 'shoot',
	usage: '[@user]',
	category: 'actions',
	description: 'shoot the mentioned user',
};
