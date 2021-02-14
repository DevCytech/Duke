const { client } = require('../../client');
const { MessageEmbed } = require('discord.js');
const { getGuild } = require('../../models/guild');
const { palette, toTitleCase } = require('../../tools');

client.on('roleCreate', async (role) => {
	// Get guild
	const guild = await getGuild(role.guild);
	if (!guild || !guild.logChannel) return;

	// Get channel
	const logChannel = await role.guild.channels.cache.get(guild.logChannel);
	if (
		!logChannel ||
		!logChannel.permissionsFor(client.user).has('SEND_MESSAGES') ||
		!logChannel.permissionsFor(client.user).has('EMBED_LINKS')
	) {
		return;
	}

	// Create and send embed
	const e = new MessageEmbed()
		.setColor(palette.success)
		.setTitle('Role Created')
		.setDescription(
			`**Name**: ${toTitleCase(
				role.name,
			)} \n**Color**: #${role.color.toString()} \n**Mentionable**: ${toTitleCase(
				role.mentionable.toString(),
			)}`,
		)
		.setFooter(`Role ID: ${role.id}`)
		.setTimestamp();
	await logChannel.send(e);
});
