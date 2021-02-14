const agent = require('superagent');
const { client } = require('../../client');

// Only run this script if this is on a production client
if (client.isProd) return;

// Send a post request to update bot's stats
setInterval(async () => {
	await agent
		.post(`https://top.gg/api/bots/${client.user.id}/stats`)
		.set({ Authorization: process.env.TOPGG })
		.send({ server_count: client.guild.cache.size })
		.then(console.log('Stats Posted!'))
		.catch(console.error);
}, 30 * 60 * 1000);
