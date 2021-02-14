/* eslint-disable space-before-function-paren */
// Format Dates
module.exports.formatDate = (date) => {
	return new Intl.DateTimeFormat('en-US').format(date);
};

// To Title Case
module.exports.toTitleCase = (text) => {
	return text
		.toLowerCase()
		.split(' ')
		.map(function (word) {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(' ');
};
