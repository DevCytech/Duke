// Config
module.exports.config = require('../assets/config.json');
module.exports.palette = require('../assets/colors.json');

// File Management
module.exports.fetchFiles = require('./utils/files').fetchFiles;

// Member Management
module.exports.fetchMember = require('./utils/members').fetchMember;

// Test Management
module.exports.toTitleCase = require('./utils/text').toTitleCase;

// Message Management
module.exports.translate = require('../assets/translations.json');
module.exports.promptMessage = require('./utils/messages').promptMessage;

// Date Management
module.exports.formatDate = require('./utils/text').formatDate;
