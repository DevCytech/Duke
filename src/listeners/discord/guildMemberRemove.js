const { client } = require('../../client');
const { getGuild } = require('../../models/guild');

client.on('guildMemberRemove', async (member) => {
	// Get guild
	const guild = await getGuild(member.guild);
	if (!guild || !guild.logChannel) return;

	// Update member
	guild.guildMembers = parseInt(guild.guildMembers) - 1;
	await guild.save();
});
