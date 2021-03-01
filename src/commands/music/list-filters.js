const { MessageEmbed } = require('discord.js');

module.exports.callback = async ({ message, client }) => {
	if (!client.player.getQueue(message)) {
		return message.reply('There is no music currently playing!');
	}

	const filtersStatuses = [[], []];

	client.filters.forEach((filterName) => {
		const array =
			filtersStatuses[0].length > filtersStatuses[1].length
				? filtersStatuses[1]
				: filtersStatuses[0];
		array.push(
			filterName.charAt(0).toUpperCase() +
				filterName.slice(1) +
				' : ' +
				(client.player.getQueue(message).filters[filterName]
					? client.emotes.success
					: client.emotes.off),
		);
	});

	// Clear the queue
	const e = new MessageEmbed()
		.setColor('ORANGE')
		.addField('Filters', filtersStatuses[0].join('\n'), true)
		.addField('** **', filtersStatuses[1].join('\n'), true)
		.setTimestamp()
		.setDescription(
			'List of all filters enabled or disabled.\nUse `<filter` to add a filter to a song.',
		);
	return message.channel.send(e);
};

module.exports.config = {
	isVoice: true,
	name: 'list-filters',
	aliases: ['w-filters', 'filters'],
	category: 'music',
	description: 'View all filters on in the guild',
};
