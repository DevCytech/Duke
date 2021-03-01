const { client } = require('../../client');
const { config, palette } = require('../../tools');
const { categoryDisabled } = require('../../utils/messages');
const { getMember } = require('../../models/member');
const { getGuild } = require('../../models/guild');
const { getUser } = require('../../models/user');
const { MessageEmbed } = require('discord.js');

client.on('message', async (message) => {
	const { author, content, channel, guild, member } = message;

	// Pre command checks
	if (author.bot || channel.type === 'dm') return;
	if (!channel.permissionsFor(client.user).has('SEND_MESSAGES')) return;

	// Get guild data
	const guildData = await getGuild(guild);

	// Get user data
	const userData = await getUser(author);
	const memberData = await getMember(member);

	// XP System
	if (!guildData.disabled.includes('leveling')) {
		if (!memberData.xpc || memberData.xpc <= Date.now()) {
			// Update the users xp
			const exp = Math.round(Math.random() * 9) + 1;
			if (message.guild.id === '264445053596991498') return;
			memberData.xp = parseInt(memberData.xp) + parseInt(exp);

			// Get xp until next level
			const multi =
				memberData.level * 1.25 === 0 ? 1 : memberData.level * 1.25;
			const expToLevel = 150 * multi;

			// Check level
			if (expToLevel <= memberData.xp) {
				// Add to their level and remove xp
				memberData.xp = parseInt(memberData.xp) - parseInt(expToLevel);
				memberData.level = parseInt(memberData.level) + 1;

				// Send Message
				if (channel.permissionsFor(client.user).has('EMBED_LINKS')) {
					const e = new MessageEmbed()
						.setColor(palette.alert)
						.setTitle('Level Up!')
						.setDescription(
							`*Woof Woof* ${message.author} you have leveled up to level ${memberData.level} in ${message.guild.name}`,
						);
					message.channel.send(e);
				}
			}

			// Reset cool down
			parseInt(Date.now()) + parseInt(guildData.xpCoolDown);

			// Save data
			await memberData.save();
		}
	}

	// Define Information
	const mention = `<@!${client.user.id}>`;
	const prefix = guildData.prefix ? guildData.prefix : config.prefix;
	const [cmd, ...args] = content.slice(prefix.length).split(/\s+/g);

	// Remove spaces in arguments
	for (const arg of args) {
		if (arg === '') args.splice(args.indexOf(arg), 1);
	}

	// If it starts with a ping
	const dukeEmoji = '<:Duke:705102656909344858>';
	if (content.startsWith(mention)) {
		message.channel.send(
			`${dukeEmoji} Hello there, I am Duke! Type (${prefix}help) to explore my commands! *woof woof* ${dukeEmoji}`,
		);
	}

	// Get the command
	if (!cmd) return;
	const command = client.commands.get(cmd) || client.aliases.get(cmd);
	if (!command) return;

	// Check if duke can send embeds
	if (!channel.permissionsFor(client.user).has('EMBED_LINKS')) {
		return channel.send(
			'Most of my commands use embeds, if this pops up it is because I do not have permissions to embed links in your server, please adjust my role settings to continue.',
		);
	}

	// Check if command is disabled
	if (guildData.disabled.includes(command.config.category)) {
		return channel.send(
			categoryDisabled(command.config.category, guildData),
		);
	}

	// Check the members permissions
	if (command.config.permissions) {
		const missing = [];

		for (const permission of command.config.permissions) {
			if (!channel.permissionsFor(author).has(permission)) {
				missing.push(permission);
			}
		}

		if (missing.length > 0) {
			return channel.send(
				`You are missing the following permissions: ${missing.join(
					', ',
				)}`,
			);
		}
	}

	if (command.config.clientPerms) {
		const missing = [];

		for (const permission of command.config.clientPerms) {
			if (!channel.permissionsFor(client.user).has(permission)) {
				missing.push(permission);
			}
		}

		if (missing.length > 0) {
			return channel.send(
				`I am missing the following permissions: ${missing.join(', ')}`,
			);
		}
	}

	// Check NSFW
	if (command.config.isNSFW && channel.nsfw === false) {
		return channel.send('Please use this command in an nsfw channel.');
	}

	// Check Dev
	if (command.config.isDev && !config.developers.includes(author.id)) return;

	// Check Voice
	if (
		(command.config.isVoice && !member.voice.channel) ||
		(command.config.isVoice &&
			message.member.voice.channel.id !==
				message.guild.me.voice.channel.id)
	) {
		return message.channel.send(
			`:warning: - Please join the same voice channel as me! If I am not in one please use ${
				guildData.prefix ? guildData.prefix : prefix
			}`,
		);
	}

	// Run the command
	try {
		command.callback({
			client,
			message,
			args,
			guildData,
			memberData,
			userData,
		});
	} catch (err) {
		console.error(err);
	}
});
