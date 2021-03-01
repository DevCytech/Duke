module.exports.callback = async ({ message, args, client }) => {
	if (!args.length) {
		return message.reply('❌ - Please indicate the title of a song!');
	}

	client.player.play(message, args.join(' '));
};

module.exports.config = {
	isVoice: true,
	name: 'clear-queue',
	aliases: 'c-q',
	category: 'music',
	description: 'Clear the guilds music queue',
};
