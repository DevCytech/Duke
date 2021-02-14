const { Schema, model } = require('mongoose');

const globalSchema = new Schema({
	guildCount: Number,
	totalUsers: Number,
	suggestionCount: Number,
	clientID: String,
});

module.exports = new model('global', globalSchema);
