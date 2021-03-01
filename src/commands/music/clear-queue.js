module.exports.callback = async ({ message, client }) => {
	if (!client.player.getQueue(message)) {
		return message.reply('There is no music currently playing!');
	}

	// Make sure queue is longer than 1
	if (client.player.getQueue(message).tracks.length <= 1) {
		return message.reply('There is only one song in the queue.');
	}

	// Clear the queue
	client.player.clearQueue(message);
	return message.channel.send(
		':white_check_mark: - The queue has just been **cleared**!',
	);
};

module.exports.config = {
	isVoice: true,
	name: 'clear-queue',
	aliases: 'c-q',
	category: 'music',
	description: 'Clear the guilds music queue',
};
