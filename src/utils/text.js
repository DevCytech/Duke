// Format Dates
module.exports.formatDate = (date) => {
	return new Intl.DateTimeFormat('en-US').format(date);
};
