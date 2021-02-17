const { client } = require('../../client');
const { palette } = require('../../tools');
const { MessageEmbed } = require('discord.js');
const { getGuild } = require('../../models/guild');

client.on('messageDelete', async (message) => {
	// Check if bot
	if (message.author.bot) return;

	// Get guild
	const guild = await getGuild(message.guild);
	if (!guild || !guild.logChannel) return;

	// Get channel
	const logChannel = await message.guild.channels.cache.get(guild.logChannel);
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
		.setAuthor(
			message.author.tag,
			message.author
				.displayAvatarURL({ dynamic: true })
				.replace('.webp', '.png') + '?size=2048',
		)
		.setTitle(`Message Deleted in #${message.channel.name}`)
		.setDescription(
			`"${message.content.split(250)}${
				message.content.length > 250 ? '...' : ''
			}"`,
		)
		.setFooter(`Message ID: ${message.id}`)
		.setTimestamp();

	// If there is an attachment
	if (message.attachments.first()) {
		await e.setImage(message.attachments.first().proxyURL);
		await e.addField(
			'Attachment:',
			`${message.attachments.first().name}`,
			true,
		);
	}
	await logChannel.send(e);
});
