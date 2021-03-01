module.exports.callback = async ({ message, client }) => {
	if (!client.player.getQueue(message)) {
		return message.reply('There is no music currently playing!');
	}

	// Clear the queue
	client.player.setRepeatMode(message, false);
	client.player.stop(message);
	return message.channel.send(
		':white_check_mark: - Music **stopped** into this server!',
	);
};

module.exports.config = {
	isVoice: true,
	name: 'stop',
	aliases: 'dc',
	category: 'music',
	description: 'Stop playing music in the server',
};
