const { Schema, model } = require('mongoose');
const { config } = require('../tools');

const memberSchema = new Schema({
	userID: String,
	guildID: String,
	username: String,
	xpc: Number,
	xp: { type: Number, default: 0 },
	level: { type: Number, default: 0 },
	timedMute: { type: Number, default: 0 },
	rankBackground: { type: String, default: config.default.rankBackground },
	rankColor: { type: String, default: config.default.rankColor },
});

module.exports.model = model('members', memberSchema);
module.exports.getMember = async (member) => {
	if (!member) throw new Error('I can not get member of undefined');
	if (typeof member !== 'object') throw new Error('Unsupported member type');

	const memberData = await this.model
		.findOne({ userID: member.user.id, guildID: member.guild.id })
		.catch(console.error);

	// Create new data if old data could not be found
	if (!memberData) {
		const newData = new this.model({
			userID: member.user.id,
			guildID: member.guild.id,
			username: member.user.tag,
		});
		return await newData.save();
	}

	return memberData;
};
