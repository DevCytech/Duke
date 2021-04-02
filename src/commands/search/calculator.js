const math = require('mathjs');
const { MessageEmbed } = require('discord.js');

module.exports.callback = async ({ message, args }) => {
	if (!args[0]) {
		return message.reply(
			'Please input an equation for Duke to calculate!\nFor future reference, You can use `*` `+` `/` `-` `()` and `^`',
		);
	}

	// Evaluating
	const calculate = args.slice(0).join(' ');
	try {
		let results = null;
		if (calculate.includes('x')) {
			results = math.derivative(calculate.replace(/π/g, Math.PI), 'x');
		} else {
			results = math.evaluate(calculate.replace(/π/g, Math.PI));
		}

		// Send Message
		const e = new MessageEmbed()
			.setColor('ORANGE')
			.setTitle('Calculating ...');
		const msg = await message.channel.send(e);

		// Edit Message
		setTimeout(() => {
			e.setTitle('Calculated!');
			e.setDescription(
				`**Equation**: \`${calculate}\` \n**Answer**: ${results}`,
			);
			msg.edit(e);
		});
	} catch (err) {
		return message.reply(
			"I'm sorry, that equation is either not an equation, or too complicated for my algorithm to figure out.\nFor future reference, You can use `*` `+` `/` `-` `()` and `^`",
		);
	}
};

module.exports.config = {
	name: 'calculator',
	aliases: ['calc', 'math', '9+10=21!?!'],
	usage: '(Amount of Unit) (Input Unit) (Output Unit)',
	category: 'search',
	description: 'Perform Math Problems with Ease!',
};
