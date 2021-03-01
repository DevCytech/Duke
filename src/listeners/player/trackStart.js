const { client } = require('../../client');

client.player.on('trackStart', (message, track) => {
	return message.channel.send(
		`🎶 Now playing ${track.title} into ${message.member.voice.channel.name}...`,
	);
});
