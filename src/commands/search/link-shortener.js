const { MessageEmbed } = require('discord.js');

module.exports.callback = async ({ message, args }) => {};

module.exports.config = {
	name: 'link-shortener',
	aliases: ['ls', 'link', 'shorten'],
	usage: '[link] (title)',
	category: 'search',
	description: 'Shortens a link for you',
};
