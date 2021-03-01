module.exports.callback = async ({ message, client }) => {
	// Pre command checks
	if (!client.player.getQueue(message)) {
		return message.reply('There is no music currently playing!');
	}

	if (client.player.getQueue(message).paused) {
		return message.channel.send(
			`${client.emotes.error} - The music is already paused !`,
		);
	}

	client.player.pause(message);

	message.channel.send(
		`${client.emotes.success} - Song ${
			client.player.getQueue(message).playing.title
		} paused !`,
	);
};

module.exports.config = {
	isVoice: true,
	name: 'pause',
	category: 'music',
	description: 'pause the current track',
};
