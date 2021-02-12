const { fetchFiles } = require('../tools');

module.exports = async () => {
	// Getting the command files
	const eventFiles = await fetchFiles('./src/listeners', '.js');

	// Make sure files were successfully gathered
	if (eventFiles == null || !eventFiles.length) {
		return console.log('There were no listeners found that can be loaded!');
	}

	// Load the commands
	for (const path of eventFiles) require(path);

	console.log(
		`${eventFiles.length} listener${
			eventFiles.length === 1 ? ' has' : 's have'
		} been loaded!`,
	);
};
