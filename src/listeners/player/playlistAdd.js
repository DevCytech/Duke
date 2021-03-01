const { client } = require('../../client');

client.player.on('playlistAdd', (message, queue, playlist) => {
	return message.channel.send(
		`🎶 ${playlist.title} has been added to the queue (**${playlist.tracks.length}** songs) !`,
	);
});
