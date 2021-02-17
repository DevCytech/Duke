const { client } = require('../../client');
const { getGuild } = require('../../models/guild');

client.on('guildUpdate', async (oldGuild, newGuild) => {
	// Get guild
	const guild = await getGuild(oldGuild.guild);
	if (!guild || !guild.logChannel) return;
	if (guild.name === newGuild.name) return;

	// Save the new name
	guild.name = newGuild.name;
	await guild.save();
});
