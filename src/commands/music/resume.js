module.exports.callback = async ({ message, client }) => {
	// Pre command checks
	if (!client.player.getQueue(message)) {
		return message.reply('There is no music currently playing!');
	}

	// Make sure queue is longer than 1
	if (client.player.getQueue(message).paused) {
		return message.reply('❌ - The music is already playing.');
	}

	// Clear the queue
	client.player.resume(message);
	return message.channel.send(
		`${client.emotes.success} - Song ${
			client.player.getQueue(message).playing.title
		} resumed !`,
	);
};

module.exports.config = {
	isVoice: true,
	name: 'clear-queue',
	aliases: 'c-q',
	category: 'music',
	description: 'Clear the guilds music queue',
};
