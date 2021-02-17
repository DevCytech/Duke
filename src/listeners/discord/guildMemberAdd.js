const { client } = require('../../client');
const { MessageEmbed } = require('discord.js');
const { getGuild } = require('../../models/guild');
const { palette } = require('../../tools');
const ordinal = require('ordinal');
const moment = require('moment');

client.on('guildMemberAdd', async (member) => {
	// Get guild
	const guild = await getGuild(member.guild);
	if (!guild || !guild.logChannel) return;

	// Update member
	guild.guildMembers = parseInt(guild.guildMembers) + 1;
	await guild.save();

	// Get channel
	const logChannel = await member.guild.channels.cache.get(guild.logChannel);
	if (
		!logChannel ||
		!logChannel.permissionsFor(client.user).has('SEND_MESSAGES') ||
		!logChannel.permissionsFor(client.user).has('EMBED_LINKS')
	) {
		return;
	}

	// Check invites --- The invite checking system doesn't work

	// Create and send embed
	const e = new MessageEmbed()
		.setColor(palette.success)
		.setTitle('Member Joined')
		.setDescription(
			`${member} is the ${ordinal(
				member.guild.memberCount,
			)} member to join!\nThey created their Discord account ${moment(
				member.user.createdAt,
			).fromNow()} (${moment(member.user.createdAt).format(
				'MM/D/YYYY',
			)})`,
		)
		.setFooter(`Member ID: ${member.user.id}`)
		.setTimestamp()
		.setThumbnail(
			member.user
				.displayAvatarURL({ dynamic: true })
				.replace('.webp', '.png') + '?size=2048',
		);
	await logChannel.send(e);
});
