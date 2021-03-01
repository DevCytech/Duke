const { MessageEmbed } = require('discord.js');
const {
	responses: { anvil },
	fetchMember,
} = require('../../tools');

module.exports.callback = async ({ message, args }) => {
	// Pre command checks
	if (!args.length) {
		return message.reply(
			'You need to mention someone to drop an anvil on them',
		);
	}

	// Get the member
	const target = fetchMember(message, args.join(' '));
	if (!target) {
		return message.reply(
			'You need to mention someone to drop an anvil on them',
		);
	} else if (target === message.author) {
		return message.reply('You cannot drop an anvil yourself');
	}

	// Sending Messages
	message.channel
		.send('Dropping Anvil in')
		.then((msg) => msg.delete({ timeout: 4000 }));
	await setTimeout(() => {
		message.channel.send('3').then((msg) => msg.delete({ timeout: 3000 }));
	}, 1000);
	await setTimeout(() => {
		message.channel.send('2').then((msg) => msg.delete({ timeout: 2000 }));
	}, 2000);
	await setTimeout(() => {
		message.channel.send('1').then((msg) => msg.delete({ timeout: 1000 }));
	}, 3000);

	// Create embed
	const image = Math.floor(Math.random() * anvil.length);
	const e = new MessageEmbed()
		.setColor('RANDOM')
		.setTitle(
			`${message.member.displayName} dropped a giant anvil on ${target.displayName}`,
		)
		.setImage(anvil[image]);

	setTimeout(() => {
		return message.channel.send(e);
	}, 4000);
};

module.exports.config = {
	name: 'drop-anvil',
	usage: '[@user]',
	category: 'actions',
	description: 'drop an anvil on the mentioned user',
};
