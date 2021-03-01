module.exports.callback = async ({ message, client }) => {
	if (!client.player.getQueue(message)) {
		return message.reply('There is no music currently playing!');
	}

	// Make sure queue is longer than 1
	if (client.player.getQueue(message).tracks.length <= 1) {
		return message.reply('There is only one song in the queue.');
	}

	// Clear the queue
	client.player.skip(message);
	return message.channel.send(
		':white_check_mark: - The current music has just been **skipped**!',
	);
};

module.exports.config = {
	isVoice: true,
	name: 'skip',
	aliases: 'next',
	category: 'music',
	description: 'Play the next song in the queue',
};
