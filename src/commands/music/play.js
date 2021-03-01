module.exports.callback = async ({ message, args, client }) => {
	// Pre command checks
	if (!message.member.voice.channel) {
		return message.reply('Please join a voice channel to play music.');
	}
	if (!args.length) {
		return message.reply('Please indicate the title of a song!');
	}

	client.player.play(message, args.join(' '), { firstResult: true });
};

module.exports.config = {
	name: 'play',
	aliases: 'p',
	usage: '[name/URL]',
	category: 'music',
	description: 'play a song',
};
