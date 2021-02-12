const { resolve } = require('path');
const { readdirSync, statSync } = require('fs');

// Get all files in a folder
module.exports.fetchFiles = (path, pattern) => {
	if (typeof path !== 'string') {
		throw new Error(
			'Unsupported path type. Please make sure you are using a string.',
		);
	}

	if (typeof pattern !== 'string') {
		throw new Error(
			'Unsupported pattern type. Please make sure you are using a string.',
		);
	}

	// File only function
	function getFiles(dir, ending) {
		let results = [];
		const res = readdirSync(dir);

		// Check each file
		for (const item of res) {
			const itm = resolve(dir, item);
			const prop = statSync(itm);

			// Check directory
			if (prop.isDirectory()) {
				results = results.concat(getFiles(itm, ending));
			}

			// Make sure file is a usable file
			if (prop.isFile() && itm.endsWith(ending)) {
				if (!itm.includes('template')) results.push(itm);
			}
		}

		// Return data
		return results;
	}

	// Get giles and return
	try {
		const files = getFiles(path, pattern);
		return files;
	} catch (err) {
		console.error(
			`An error has occurred getting command files. Error: ${err}`,
		);
		return null;
	}
};
