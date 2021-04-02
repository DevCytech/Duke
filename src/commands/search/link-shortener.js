const shortener = require('isgd');

module.exports.callback = async ({ message, args }) => {
	if (!args[0]) {
		return message.reply(
			'Please include a url that you would like me to shorten.',
		);
	}

	if (!args[1]) {
		shortener.shorten(args[0], function (res) {
			if (res.startsWith('Error:')) {
				return message.channel.send('**Please enter a valid URL**');
			}

			message.channel.send(`**<${res}>**`);
		});
	} else {
		shortener.custom(args[0], args[1], function (res) {
			if (res.startsWith('Error:')) {
				return message.channel.send(`**${res}**`);
			}

			message.channel.send(`**<${res}>**`);
		});
	}
};

module.exports.config = {
	name: 'link-shortener',
	aliases: ['ls', 'link', 'shorten'],
	usage: '[link] (title)',
	category: 'search',
	description: 'Shortens a link for you',
};
