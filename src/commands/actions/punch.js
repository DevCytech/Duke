const { MessageEmbed } = require('discord.js');
const {
	responses: { punch },
	fetchMember,
} = require('../../tools');

module.exports.callback = async ({ message, args }) => {
	// Pre command checks
	if (!args.length) {
		return message.reply('You need to mention someone to punch them');
	}

	// Get the member
	const target = fetchMember(message, args.join(' '));
	if (!target) {
		return message.reply('You need to mention someone to punch them');
	}

	// Create embed
	const image = Math.floor(Math.random() * punch.length);
	const e = new MessageEmbed()
		.setColor('RANDOM')
		.setTitle(
			`${message.member.displayName} sucker punched ${target.displayName}`,
		)
		.setImage(punch[image]);
	return message.channel.send(e);
};

module.exports.config = {
	name: 'punch',
	usage: '[@user]',
	category: 'actions',
	description: 'punch the mentioned user',
};
