const { client } = require('../../client');

client.player.on('botDisconnect', (message) => {
	return message.channel.send(
		'❌ I have finished playing music and left the voice channel!',
	);
});
