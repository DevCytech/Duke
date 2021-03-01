module.exports.callback = async ({ message, client }) => {
	if (!client.player.getQueue(message)) {
		return message.reply('There is no music currently playing!');
	}

	const queue = client.player.getQueue(message);
	return message.channel.send(
		`**Server queue - ${message.guild.name} ${client.emotes.queue} ${
			client.player.getQueue(message).loopMode ? '(looped)' : ''
		}**\nCurrent : ${queue.playing.title} | ${queue.playing.author}\n\n` +
			(queue.tracks
				.map((track, i) => {
					return `**#${i + 1}** - ${track.title} | ${
						track.author
					} (requested by : ${track.requestedBy.username})`;
				})
				.slice(0, 5)
				.join('\n') +
				`\n\n${
					queue.tracks.length > 5
						? `And **${queue.tracks.length - 5}** other songs...`
						: `In the playlist **${queue.tracks.length}** song(s)...`
				}`),
	);
};

module.exports.config = {
	isVoice: true,
	name: 'clear-queue',
	aliases: 'c-q',
	category: 'music',
	description: 'Clear the guilds music queue',
};
