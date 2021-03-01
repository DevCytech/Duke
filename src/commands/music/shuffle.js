module.exports.callback = async ({ message, client }) => {
	// Pre command checks
	if (!client.player.getQueue(message)) {
		return message.reply('There is no music currently playing!');
	}

	// Make sure queue is longer than 1
	if (client.player.getQueue(message).tracks.length <= 1) {
		return message.reply('There is only one song in the queue.');
	}

	// Clear the queue
	client.player.shuffle(message);
	return message.channel.send(
		`:white_check_mark: - Queue shuffled **${
			client.player.getQueue(message).tracks.length
		}** song(s) !`,
	);
};

module.exports.config = {
	isVoice: true,
	name: 'shuffle',
	aliases: 's-h',
	category: 'music',
	description: 'Shuffle the guilds music queue',
};
