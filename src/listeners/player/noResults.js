const { client } = require('../../client');

client.player.on('noResults', (message, query) => {
	return message.channel.send(
		`❌ I could find no results on YouTube for ${query} !`,
	);
});
