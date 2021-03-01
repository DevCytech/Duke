const { MessageEmbed } = require('discord.js');

module.exports.callback = async ({ message, client }) => {
	if (!client.player.getQueue(message)) {
		return message.reply('There is no music currently playing!');
	}

	const track = client.player.nowPlaying(message);
	const filters = [];

	// Get active filters
	Object.keys(client.player.getQueue(message).filters).forEach((filterName) =>
		client.player.getQueue(message).filters[filterName]
			? filters.push(filterName)
			: false,
	);

	// Create embed
	const e = new MessageEmbed()
		.setColor('RED')
		.setAuthor(track.title)
		.addField('Channel', track.author, true)
		.addField('Requested by', track.requestedBy.username, true)
		.addField('From playlist', track.fromPlaylist ? 'Yes' : 'No', true)
		.addField('Views', track.views, true)
		.addField('Duration', track.duration, true)
		.addField(
			'Filters activated',
			filters.length + '/' + client.filters.length,
			true,
		)
		.addField('Volume', client.player.getQueue(message).volume, true)
		.addField(
			'Repeat mode',
			client.player.getQueue(message).repeatMode ? 'Yes' : 'No',
			true,
		)
		.addField(
			'Currently paused',
			client.player.getQueue(message).paused ? 'Yes' : 'No',
			true,
		)
		.addField(
			'Progress bar',
			client.player.createProgressBar(message, {
				timecodes: true,
			}),
			true,
		)
		.setThumbnail(track.thumbnail)
		.timestamp();

	return message.channel.send(e);
};

module.exports.config = {
	isVoice: true,
	name: 'now-playing',
	aliases: ['n-p', 'now'],
	category: 'music',
	description: 'Get the currently playing song',
};
