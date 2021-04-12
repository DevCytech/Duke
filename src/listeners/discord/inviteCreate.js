const { client } = require('../../client');
const { palette } = require('../../tools');
const { MessageEmbed } = require('discord.js');
const { getGuild } = require('../../models/guild');

client.on('inviteCreate', async (invite) => {
	// Get guild
	const guild = await getGuild(invite.guild);
	if (!guild || !guild.serverLogChannel) return;

	// Get channel
	const logChannel = await invite.guild.channels.cache.get(
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
		.setTitle('Invite Created')
		.setDescription(
			`**Created By**: ${invite.inviter.tag} \n**URL**: ${invite.url} \n**Channel**: ${invite.channel}`,
		)
		.setFooter(`Invite Code: ${invite.code}`)
		.setTimestamp();
	await logChannel.send(e);
});
