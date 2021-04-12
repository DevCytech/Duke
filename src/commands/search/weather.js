const weather = require('weather-js');
const { MessageEmbed } = require('discord.js');

module.exports.callback = async ({ message, args }) => {
	if (!args[0]) {
		return message.reply(
			"**I could not find this location. I'm sorry...**",
		);
	}

	weather.find(
		{ search: args.join(' '), degreeType: 'C' },
		function (err, results) {
			// Creepa asked for...
			if (message.content === 'mars') {
				return message.channel.send(
					'Cold and Dusty, just like your heart!',
				);
			}

			// Check for Errors
			if (err || !results || !results.length) {
				return message.reply(
					"**I could not find this location. I'm sorry...**",
				);
			}

			// Variables
			const current = results[0].current;
			const location = results[0].location;
			const imperial = Math.round((current.temperature * 9) / 5 + 32);

			// Send weather report
			const e = new MessageEmbed()
				.setColor(0x00ae86)
				.setThumbnail(current.imageUrl)
				.setAuthor(`Weather for ${current.observationpoint}`)
				.setDescription(`**${current.skytext}**`)
				.addField('Timezone', `UTC${location.timezone}`, true)
				.addField('Celsius', current.temperature, true)
				.addField('Fahrenheit', imperial, true)
				.addField('Humidity', ` ${current.humidity}%`, true)
				.addField('Winds', current.winddisplay, true)
				.addField('Day', `${current.day}`, true)
				.addField('Date', `${current.date}`, true)
				.setFooter('Weather presented from https://openweathermap.org');

			return message.channel.send(e);

			/*
				Current:
					- skytext: How the day will be
					- observationpoint: Location of the Weather
					- imageUrl: Thumbnail of the weather
			*/
		},
	);
};

module.exports.config = {
	name: 'weather',
	aliases: ['temperature', 'storms', 'w'],
	usage: '[location name]',
	category: 'search',
	description: 'Displays the Weather of the selected location you choose!',
};
