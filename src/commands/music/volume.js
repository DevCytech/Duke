module.exports.callback = async ({ message, args, client }) => {
	if (!client.player.getQueue(message)) {
		return message.reply('There is no music currently playing!');
	}

	if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') {
		return message.channel.send(
			`${client.emotes.error} - Please enter a valid number !`,
		);
	}
	if (
		Math.round(parseInt(args[0])) < 1 ||
		Math.round(parseInt(args[0])) > 100
	) {
		return message.channel.send(
			`${client.emotes.error} - Please enter a valid number (between 1 and 100) !`,
		);
	}

	client.player.setVolume(message, parseInt(args[0]));

	return message.channel.send(
		`:white_check_mark:- Volume set to **${parseInt(args[0])}%** !`,
	);
};

module.exports.config = {
	isVoice: true,
	name: 'volume',
	aliases: 'vol',
	usage: '[1-100]',
	category: 'music',
	description: 'change the volume of the bot',
};
