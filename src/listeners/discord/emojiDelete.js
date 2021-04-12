const { client } = require('../../client');
const { MessageEmbed } = require('discord.js');
const { getGuild } = require('../../models/guild');
const { palette, toTitleCase } = require('../../tools');

client.on('emojiDelete', async (emoji) => {
	// Get guild
	const guild = await getGuild(emoji.guild);
	if (!guild || !guild.serverLogChannel) return;

	// Get channel
	const logChannel = await emoji.guild.channels.cache.get(
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
		.setColor(palette.error)
		.setTitle('Emoji Deleted')
		.setDescription(`**Name**: ${toTitleCase(emoji.name)}`)
		.setFooter(`Emoji ID: ${emoji.id}`)
		.setThumbnail(emoji.url)
		.setTimestamp();
	await logChannel.send(e);
});
