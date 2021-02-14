const { client } = require('../../client');
const { MessageEmbed } = require('discord.js');
const { palette, config } = require('../../tools');

client.on('guildDelete', async (guild) => {
	const e = new MessageEmbed()
		.setTitle('I Left a Server ;n;')
		.setDescription('I have left yet again another server!')
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
		.setColor(palette.error);

	const channel = client.channels.cache.get(config.channels.guildLogs);
	if (channel) return await channel.send(e).catch(console.error);
	else return;
});
