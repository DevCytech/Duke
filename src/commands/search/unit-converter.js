const convert = require('convert-units');
const { MessageEmbed } = require('discord.js');

const helpEmbed = new MessageEmbed()
	.setColor('YELLOW')
	.setTitle('Converter')
	.setDescription(
		'Please provide the measurement you want to convert: <convert 10\nCommand Usage/Example: <convert 30 kg lb \n[Click here to see abbreviations of measurements](https://notcreepa.wixsite.com/dukebot/units)',
	);

const errorEmbed = new MessageEmbed()
	.setColor('RED')
	.setTitle('Converter Error')
	.setDescription(
		"I didn't understand that number (are you using thousand separators? don't) or your units are incompatible (physics says you can't convert length to mass)\n Please use the correct abbreviations which can be found in the link below. and remove any commas that are in your measurement\n [Click here to see abbreviations](https://notcreepa.wixsite.com/dukebot/units))",
	);

module.exports.callback = async ({ message, args }) => {
	if (!args[0]) {
		return message.channel.send(helpEmbed);
	}
	if (!args[1]) {
		return message.reply('Please provide the unit you want converted.');
	}
	if (!args[2]) {
		return message.reply(
			'Please provide the unit you would like to receive',
		);
	}

	// Convert Unit
	try {
		const results = convert(args[0]).from(args[1]).to(args[2]);

		// Make sure there is a proper result
		if (isNaN(results)) {
			return message.channel.send(errorEmbed);
		}

		// Get Degree
		const degree = args[2] == 'C' || args[2] == 'F' ? '°' : '';

		// Send results
		const e = new MessageEmbed()
			.setColor('ORANGE')
			.setTitle('Unit Converter')
			.setDescription(
				`${args[0]}${degree}${args[1]} is equal to ${results}${degree}${args[2]}`,
			);
		return message.channel.send(e);
	} catch (err) {
		return message.channel.send(errorEmbed);
	}
};

module.exports.config = {
	name: 'convert',
	aliases: ['converter', 'unit', 'unit-convert', 'unit-converter'],
	usage: '(Amount of Unit) (Input Unit) (Output Unit)',
	category: 'search',
	description: 'Converts units of measurement',
};
