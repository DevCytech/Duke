const { Schema, model } = require('mongoose');
const { config } = require('../tools');

const userSchema = new Schema({
	userID: String,
	username: String,
	rankBackground: { type: String, default: config.default.rankBackground },
	rankColor: { type: String, default: config.default.rankColor },
});

module.exports.model = model('users', userSchema);
module.exports.getUser = async (user) => {
	if (!user) throw new Error('I can not get user of undefined');
	if (typeof user !== 'object') throw new Error('Unsupported user type');

	const userData = await this.model
		.findOne({ userID: user.id })
		.catch(console.error);

	// Create new data if old data could not be found
	if (!userData) {
		const newData = new this.model({
			userID: user.id,
			username: user.tag,
		});
		return await newData.save();
	}

	return userData;
};
