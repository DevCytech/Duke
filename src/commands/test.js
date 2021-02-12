module.exports.callback = async ({ message }) => {
	message.channel.send('Hello');
};

module.exports.config = {
	name: 'test',
	aliases: [],
};
