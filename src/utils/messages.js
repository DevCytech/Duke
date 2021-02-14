const { MessageEmbed } = require('discord.js');
const { palette, translate } = require('../tools');

// Prompt for message reactions
module.exports.promptMessage = async (
	message,
	author,
	time,
	validReactions,
) => {
	// We put in the time as seconds, with this it's being transfered to MS
	time *= 1000;

	// For every emoji in the function parameters, react in the good order.
	for (const reaction of validReactions) await message.react(reaction);

	// Only allow reactions from the author,
	// and the emoji must be in the array we provided.
	const filter = (reaction, user) =>
		validReactions.includes(reaction.emoji.name) && user.id === author.id;

	// And ofcourse, await the reactions
	return message
		.awaitReactions(filter, { max: 1, time: time })
		.then((collected) => collected.first() && collected.first().emoji.name);
};

// Embeds
module.exports.categoryDisabled = (category, guild) => {
	const e = new MessageEmbed()
		.setColor(palette.error)
		.setTitle(
			`${translate.categories[category]} commands are currently disabled in ${guild.guildName}`,
		)
		.setDescription(
			`To enable ${translate.categories[category]} commands, do \`${guild.prefix}toggle-categories\``,
		);
	return e;
};
