const { connection } = require('mongoose');

connection.once('error', (err) => {
	return console.error(`Database Error: ${err}`);
});
