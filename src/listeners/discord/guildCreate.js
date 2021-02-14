const { client } = require('../../client');
const { MessageEmbed } = require('discord.js');
const { palette, config } = require('../../tools');
const { getGuild } = require('../../models/guild');

client.on('guildCreate', async (guild) => {
	// Get the guilds default channel
	let defaultChannel;
	for (let channel of guild.channels.cache) {
		channel = channel[1];
		if (
			channel.name.includes('general') ||
			channel.name.includes('lounge') ||
			channel.name.includes('chat')
		) {
			if (channel.permissionsFor(guild.me).has('SEND_MESSAGES')) {
				defaultChannel = channel;
			}
		}
	}

	// If no channel gould be found before
	if (!defaultChannel) {
		for (let channel of guild.channels.cache) {
			channel = channel[1];
			if (channel.type == 'text' && !defaultChannel) {
				if (channel.permissionsFor(guild.me).has('SEND_MESSAGES')) {
					defaultChannel = channel;
				}
			}
		}
	}

	// Send message to the default channel
	await defaultChannel
		.send('Hello there! I am Duke! please do <setup')
		.catch(console.error);

	// Add a guild to the database if there isn't one already
	await getGuild(guild);

	// Send a message back to the support channel
	const e = new MessageEmbed()
		.setTitle('New Server!')
		.setDescription('I have joined a new server!')
		.addField('Guild Name', guild.name, true)
		.addField('Guild ID', guild.id, true)
		.addField('Members', guild.memberCount, true)
		.setThumbnail(
			guild.iconURL({
				format: 'png',
				dynamic: true,
				size: 2048,
			}),
		)
		.setColor(palette.success);

	const channel = client.channels.cache.get(config.channels.guildLogs);
	if (channel) return await channel.send(e).catch(console.error);
	else return;
});
