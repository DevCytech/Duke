const { MessageEmbed } = require('discord.js');
const { KSoftAPI } = require('../../tools');

module.exports.callback = async ({ message, args }) => {
	if (!args.length) {
		return message.reply(
			'Please provide a song you would like me to get the lyrics for.\nBeing Descriptive with the author is very helpful aswell.',
		);
	}

	const response = await KSoftAPI.lyrics.get(args.slice(0).join(' '));
	const lyrics = response.lyrics;
	const { name, artist } = response;
	const artwork =
		response.artwork === 'https://cdn.ksoft.si/images/Logo1024%20-%20W.png'
			? ''
			: response.artwork;

	const splitLyrics = {
		1: lyrics.slice(0, 2048),
		2: lyrics.slice(2048, 4096),
	};

	if (lyrics.length < 2048) {
		const e = new MessageEmbed()
			.setTitle(`${name} by ${artist.name}`)
			.setThumbnail(artwork)
			.setDescription(lyrics)
			.setColor('ORANGE')
			.setFooter('Lyrics are provided by Ksoft.si');
		message.channel.send(e);

		// Toggle Hint
		const hint = new MessageEmbed()
			.setAuthor(
				'Having Problems Finding The Song You Wanted?',
				'https://cdn.discordapp.com/emojis/705102656909344858.png',
			)
			.setDescription(
				`try being more descriptive by adding the **Artist** to the search. If that still doesn\'t find the song you wanted, Type \`${guild.prefix}lyricadder\` to submit it to the API!`,
			)
			.setColor('ORANGE');
		message.channel.send(hint).then((m) => m.delete({ timeout: 15000 }));
	} else {
		const right = '▶';
		const left = '◀';
		const e = new MessageEmbed()
			.setTitle(`${name} by ${artist.name}`)
			.setThumbnail(artwork)
			.setDescription(splitLyrics[1])
			.setColor('ORANGE')
			.setFooter(`Lyrics are provided by Ksoft.si`);
		const m = await message.channel.send(e);

		const hint = new MessageEmbed()
			.setAuthor(
				'Having Problems Finding The Song You Wanted?',
				'https://cdn.discordapp.com/emojis/705102656909344858.png',
			)
			.setDescription(
				`try being more descriptive by adding the **Artist** to the search. If that still doesn\'t find the song you wanted, Type \`${guild.prefix}lyricadder\` to submit it to the API!`,
			)
			.setColor('ORANGE');
		message.channel
			.send(hint)
			.then((msg) => msg.delete({ timeout: 15000 }));

		await m.react(left);
		await m.react(right);

		const filter = (reaction, user) => {
			return (
				(reaction.emoji.name === right &&
					user.id === message.author.id) ||
				(reaction.emoji.name === left && user.id === message.author.id)
			);
		};

		const collector = m.createReactionCollector(filter, {
			time: 120000,
		});
		collector.on('collect', async (reaction) => {
			if (reaction.emoji.name === right) {
				e.setDescription(splitLyrics[2]);
				e.setFooter('Lyrics are provided by Ksoft.si');
				await m.edit(e);
				await m.reactions
					.resolve(right)
					.users.remove(message.author.id);
			} else if (reaction.emoji.name === left) {
				e.setDescription(splitLyrics[1]);
				e.setFooter('Lyrics are provided by Ksoft.si');
				await m.edit(e);
				await m.reactions.resolve(left).users.remove(message.author.id);
			} else {
				return;
			}
		});
	}
};

module.exports.config = {
	name: 'lyrics',
	aliases: ['song-lyrics', 'ly', 'lyr'],
	usage: '[song name]',
	category: 'music',
	description: 'Display the lyrics for a song',
};
