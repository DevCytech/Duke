const { client } = require('../../client');

client.player.on('queueEnd', (message) => {
	return message.channel.send(
		'❌ I have concluded playing all songs in the queue!',
	);
});
