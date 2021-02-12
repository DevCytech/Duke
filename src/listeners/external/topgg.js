const agent = require('superagent');
const { client } = require('../../client');

// Only run this script if this is on a production client
if (!client.isProd) return;

// Send a post request to update bot's stats
setInterval(async () => {
	console.log('Posting Stats!');
	agent
		.post(`https://top.gg/api/bots/${client.user.id}/stats`)
		.set('Accept', 'application/json')
		.set({ Authorization: process.env.TOPGG })
		.send({ server_count: client.guilds.cache.size });
}, 30 * 60 * 1000);
