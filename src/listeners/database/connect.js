const { connection } = require('mongoose');

connection.once('open', () => {
	return console.log('Database has been connected! \n');
});
