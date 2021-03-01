// Config
module.exports.config = require('../assets/config.json');
module.exports.palette = require('../assets/colors.json');

// File Management
module.exports.fetchFiles = require('./utils/files').fetchFiles;

// Member Management
module.exports.fetchMember = require('./utils/members').fetchMember;

// Test Management
module.exports.toTitleCase = require('./utils/text').toTitleCase;
module.exports.responses = require('../assets/responses.json');

// Message Management
module.exports.translate = require('../assets/translations.json');
module.exports.promptMessage = require('./utils/messages').promptMessage;

// Date Management
module.exports.formatDate = require('./utils/text').formatDate;

// Api
module.exports.NekoLifeAPI = new require('nekos.life')();
module.exports.KSoftAPI = new require('@ksoft/api').KSoftClient(
	process.env.KSOFT,
);
