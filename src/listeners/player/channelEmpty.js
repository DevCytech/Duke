const { client } = require('../../client');

client.player.on('channelEmpty', (message) => {
	return message.channel.send(
		'❌ I have stopped playing music since everyone left the voice channel!',
	);
});
