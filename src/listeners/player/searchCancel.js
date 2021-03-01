const { client } = require('../../client');

client.player.on('searchCancel', (message) => {
	return message.channel.send('❌ Please provide a valid response...');
});
