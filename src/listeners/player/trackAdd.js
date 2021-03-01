const { client } = require('../../client');

client.player.on('trackAdd', (message, queue, track) => {
	return message.channel.send(
		`🎵 ${track.title} has been added to the queue!`,
	);
});
