const { Schema, model } = require('mongoose');
const { config } = require('../tools');

const guildSchema = new Schema({
	guildID: String,
	guildName: String,
	guildOwnerID: String,
	createdDate: String,
	guildMembers: Number,
	// Leveling
	xpCoolDown: { type: Number, default: 30000 },
	// Suggestions
	suggestionCount: { type: Number, default: 0 },
	// Settings
	prefix: { type: String, default: config.prefix },
	// Logging
	logChannel: String,
	reportChannel: String,
	serverLogChannel: String,
	// Moderation
	mutedRole: String,
	// Disabled
	disabled: { type: Array, default: [] },
});

module.exports.model = model('guilds', guildSchema);
module.exports.getGuild = async (guild) => {
	switch (typeof guild) {
		case 'string': {
			const guildData = await this.model
				.findOne({ guildID: guild })
				.catch(console.error);

			return guildData;
		}

		case 'object': {
			const guildData = await this.model
				.findOne({ guildID: guild.id })
				.catch(console.error);

			// If there is no guild data
			if (!guildData) {
				const newGuild = new this.model({
					guildID: guild.id,
					guildName: guild.name,
					guildOwnerID: guild.ownerId,
					createdDate: guild.createdAt,
					guildMembers: guild.memberCount,
				});
				return await newGuild.save();
			}

			// If the guild name is out of date
			if (guildData.name !== guild.name) {
				guildData.name = guild.name;
				await guildData.save();
			}

			return guildData;
		}

		default:
			throw new Error('Unsupported guild type.');
	}
};
