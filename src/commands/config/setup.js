const { MessageEmbed } = require('discord.js');
const { promptMessage } = require('../../tools');

module.exports.callback = async ({ message, args, guildData }) => {
	// Setup our filter
	const filter = (msg) => {
		msg.author.id === message.author.id && !msg.author.bot;
	};

	// Send message
	const e = new MessageEmbed()
		.setColor('RANDOM')
		.setTitle(`Duke | Setup for ${message.guild.name}`)
		.setThumbnail(message.author.avatarURL)
		.setDescription(`Press ▶ to continue.\n\nPress ❌ to cancel setup.`)
		.setFooter(
			`${message.author.username}#${message.author.discriminator} | This will expire in 60 seconds`,
		)
		.setTimestamp();
	const msg = await message.channel.send(e);

	// Wait for reaction to start
	const reaction = await promptMessage(msg, message.author, 60, ['❌', '▶']);
	await msg.reactions.removeAll();

	if (!reaction) {
		e.setDescription(
			'An error has occurred while waiting for a reaction. :(\n\nType `${guildData.prefix}setup` again to restart!',
		);
		return msg.edit(e);
	} else if (reaction === '❌') {
		e.setDescription(
			`Cancelled setup :(\n\nType \`${guildData.prefix}setup\` again to restart!`,
		);
		return msg.edit(e);
	} else {
		e.setDescription(
			"Alright, let's continue!\n\nType the channel in which you'd like `mod logs` sent!\n\nExample: `#duke-mod-logs`",
		);
		e.setThumbnail();
		await msg.edit(e);
	}

	// Collector function
	async function getChannel(type, callback) {
		await message.channel
			.createMessageCollector(filter, {
				time: 60000,
				errors: ['time'],
				max: 10,
				maxMatches: 10,
			})
			.on('collect', async (m) => {
				console.log(m);
				// Delete message
				m.delete({ timeout: 500 });

				// Get channel
				let channel = m.content.split(' ')[0];
				if (!channel) {
					const deleteMsg = message.reply(
						`\`${m}\` is not a real channel, *try again*`,
					);
					deleteMsg.delete({ timeout: 5000 });
				}

				if (!channel.startsWith('<#')) {
					// Get channel via search
					const foundChannel = message.guild.channels.cache.find(
						(c) => c.id === channel,
					);
					channel = foundChannel.id ? foundChannel.id : null;
				} else {
					// Get channel ID and make sure it is just numbers
					channel = channel.replace(/<#/g, '').replace(/>/g, '');
				}

				console.log(channel);
				// Make sure ID is a number and channel exists
				if (
					isNaN(channel) ||
					!message.guild.channels.cache.get(channel)
				) {
					const deleteMsg = message.reply(
						`\`${m}\` is not a real channel, *try again*`,
					);
					return deleteMsg.delete({ timeout: 5000 });
				}

				// Save channel
				if (type === 'logs') {
					guildData.logChannel = channel;
				} else if (type === 'reports') {
					guildData.reportChannel = channel;
				} else if (type === 'server') {
					guildData.serverLogChannel = channel;
				}
				await guildData.save();
				collector.stop('valid');
			})
			.on('end', (collected, reason) => {
				// If ended for errors or time
				if (reason !== 'valid') {
					e.setDescription('Time has ran out!');
					e.setFooter(
						`Please type ${guildData.prefix}setup to restart setup!`,
					);
					msg.edit(e);
					return callback(false);
				}

				// If the result if valid
				return callback(false);
			});
	}

	// Received value
	let received = false;

	// Get channel
	getChannel('logs', function (res) {
		console.log(res);
		if (!res) {
			return;
		}
		received = true;
	});

	do {
		setTimeout(function () {
			console.log('waiting...');
		}, 1000);
	} while (received === false);

	// Setup reports
	e.setDescription(
		`K, I'll send modlogs to <#${guildData.logChannel}>\n\nRespond to this message with the channel you'd like me to send **reports** to!\n\nExample: \`#duke-reports\``,
	);
	e.setTimestamp();
	msg.edit(e);

	if (!(await getChannel('reports'))) {
		return;
	}

	// Get server logs
	e.setDescription(
		`Sounds great! Reports will be sent to <#${guild.reportChannel}>!\n\nRespond to this message with the channel you'd like me to send **Server Logs** to\n\nExample: \`#duke-logs\``,
	);
	e.setTimestamp();
	msg.edit(e);

	if (!(await getChannel('server'))) {
		return;
	}

	// Get muted role
	e.setDescription(
		`Sounds great! Server Logs will be sent to <#${guild.serverLogChannel}>!\n\nRespond to this message with the role you'd like me to give **Muted** users\n\nExample: \`@Muted\`\n\n**Respond with \`none\` and Duke will create a "Muted" role for you!**`,
	);
	e.setTimestamp();
	msg.edit(e);

	const collector = message.channel.createMessageCollector(filter, {
		time: 60000,
		errors: ['time'],
	});

	collector.on('collect', async (m) => {
		// Delete message
		m.delete({ timeout: 500 });

		// Get the role
		let role = m.content.split(' ')[0];
		if (role.toLowerCase() === 'none') {
			// Create a role
			try {
				const createdRole = await message.guild.roles.create({
					data: {
						name: 'Muted',
						color: 'RED',
						permissions: [],
					},
					reason: 'Mute Time ayyy!',
				});

				// Add to database
				role = createdRole.id;

				// Edit permissions for channels
				for (const channel of message.guild.channels.cache) {
					await channel.updateOverwrite(createdRole.id, {
						SEND_MESSAGES: false,
						ADD_REACTIONS: false,
						SPEAK: false,
					});
				}
			} catch (e) {
				console.log(e.stack);
			}

			// Send confirmation
			message.reply(
				`Successfully created the role, read the original embed for more information regarding setup!`,
			);
		} else {
			if (!role.startsWith('<@&')) {
				// Get channel via search
				const foundRole = message.guild.roles.cache.find(
					(r) => r.id === role,
				);
				role = foundRole.id ? foundRole.id : null;
			} else {
				// Get channel ID and make sure it is just numbers
				role = role.replace(/<@&/g, '').replace(/>/g, '');
			}
		}

		// Make sure ID is a number and make sure role exists
		if (isNaN(role) || !message.guild.roles.cache.get(role)) {
			const deleteMsg = message.reply(
				`\`${m}\` is not a real role, *try again*`,
			);
			return deleteMsg.delete({ timeout: 5000 });
		}

		// Save role
		guildData.mutedRole = role;
		await guildData.save();
		collector.stop('valid');
	});

	collector.on('end', (collected, reason) => {
		// If ended for errors or time
		if (reason !== 'valid') {
			e.setDescription('Time has ran out!');
			e.setFooter(
				`Please type ${guildData.prefix}setup to restart setup!`,
			);
			return msg.edit(e);
		} else {
			// If the result if valid
			e.setTitle('Duke | Setup Complete');
			e.setDescription(
				`Sounds great! Muted people will be given the <@&${guild.mutedRole}> role!\n\n*More per-guild options will be added in the future!*`,
			);
			e.setFooter(
				`${message.author.username}#${message.author.discriminator}`,
			);
			return m.edit(e);
		}
	});
};

module.exports.config = {
	name: 'setup',
	usage: '[prefix]',
	category: 'moderation',
	description: 'Change the prefix',
	permissions: ['MANAGE_GUILD'],
	clientPerms: ['ADD_REACTIONS', 'MANAGE_ROLES'],
};
