module.exports.callback = async ({ message, args, client }) => {
	if (!client.player.getQueue(message)) {
		return message.reply('There is no music currently playing!');
	}

	if (args.join(' ').toLowerCase() === 'queue') {
		if (client.player.getQueue(message).loopMode) {
			client.player.setLoopMode(message, false);
			return message.channel.send(
				':white_check_mark: - Repeat mode **disabled** !',
			);
		} else {
			client.player.setLoopMode(message, true);
			return message.channel.send(
				':white_check_mark: - Repeat mode **enabled** the whole queue will be repeated endlessly !',
			);
		}
	} else if (client.player.getQueue(message).repeatMode) {
		client.player.setRepeatMode(message, false);
		return message.channel.send(
			':white_check_mark: - Repeat mode **disabled** !',
		);
	} else {
		client.player.setRepeatMode(message, true);
		return message.channel.send(
			':white_check_mark: - Repeat mode **enabled** the current music will be repeated endlessly !',
		);
	}
};

module.exports.config = {
	isVoice: true,
	name: 'loop',
	aliases: ['lp', 'queue'],
	category: 'music',
	description: 'loop the current track or queue',
};
