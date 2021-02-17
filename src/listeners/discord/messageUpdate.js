const { client } = require('../../client');
const { palette } = require('../../tools');
const { MessageEmbed } = require('discord.js');
const { getGuild } = require('../../models/guild');

client.on('messageUpdate', async (oldMessage, newMessage) => {
	// Check if bot
	if (oldMessage.author.bot) return;

	// Get guild
	const guild = await getGuild(oldMessage.guild);
	if (!guild || !guild.logChannel) return;

	// Get channel
	const logChannel = await oldMessage.guild.channels.cache.get(
		guild.logChannel,
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
		.setColor(palette.alert)
		.setAuthor(
			oldMessage.author.tag,
			oldMessage.author
				.displayAvatarURL({ dynamic: true })
				.replace('.webp', '.png') + '?size=2048',
		)
		.setTitle(`Message Updated in #${oldMessage.channel.name}`)
		.setDescription(
			`**Old Message**: "${oldMessage.content.split(250)}${
				oldMessage.content.length > 250 ? '...' : ''
			}" \n**New Message**: "${newMessage.content.split(250)}${
				newMessage.content.length > 250 ? '...' : ''
			}"`,
		)
		.setFooter(`Message ID: ${newMessage.id}`)
		.setTimestamp();
	await logChannel.send(e);
});
