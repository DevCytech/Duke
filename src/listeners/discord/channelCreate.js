const { client } = require('../../client');
const { MessageEmbed } = require('discord.js');
const { getGuild } = require('../../models/guild');
const { palette, toTitleCase } = require('../../tools');

client.on('channelCreate', async (channel) => {
	// Get guild
	const guild = await getGuild(channel.guild);
	if (!guild || !guild.serverLogChannel) return;

	// Get channel
	const logChannel = await channel.guild.channels.cache.get(
		guild.serverLogChannel,
	);
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
		.setTitle(`${toTitleCase(channel.type)} Channel Created`)
		.setDescription(
			`**Name**: ${toTitleCase(channel.name)} ${
				channel.parent.name
					? `\n**Category**: ${channel.parent.name}`
					: ''
			}`,
		)
		.setFooter(`Channel ID: ${channel.id}`)
		.setTimestamp();
	await logChannel.send(e);
});
