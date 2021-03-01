const filters = [
	'8D',
	'gate',
	'haas',
	'phaser',
	'treble',
	'tremolo',
	'vibrato',
	'reverse',
	'karaoke',
	'flanger',
	'mcompand',
	'pulsator',
	'subboost',
	'bassboost',
	'vaporwave',
	'nightcore',
	'normalizer',
	'surrounding',
];

module.exports.callback = async ({ message, args, client }) => {
	if (!client.player.getQueue(message)) {
		return message.reply('There is no music currently playing!');
	}

	if (!args.length) {
		return message.reply(
			'Please specify a valid filter to enable or disable !',
		);
	}

	const filter = filters.find(
		(x) => x.toLowerCase() === args[0].toLowerCase(),
	);

	if (!filter) {
		return message.channel.send(
			`:warning: - This filter doesn't exist, try for example (8D, vibrato, pulsator...) !`,
		);
	}

	const filterUpdated = {};

	filterUpdated[filter] = client.player.getQueue(message).filters[filter]
		? false
		: true;

	if (filterUpdated[filter]) {
		message.channel.send(
			`:notes: - I'm **adding** the filter to the music, please wait... Note : the longer the music is, the longer this will take.`,
		);
	} else {
		message.channel.send(
			`:notes: - I'm **disabling** the filter on the music, please wait... Note : the longer the music is playing, the longer this will take.`,
		);
	}
};

module.exports.config = {
	isVoice: true,
	name: 'filter',
	usage: '[filter name]',
	category: 'music',
	description: 'Edit the EQ or Filter of the song',
};
