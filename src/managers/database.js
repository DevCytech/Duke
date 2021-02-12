const { connect } = require('mongoose');
const { DB_LINK: link } = process.env;

// Define our databases connection options
const options = {
	keepAlive: true,
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
};

// Make sure that we have the proper required variables
if (!link) throw new Error('No link provided for mongoDB');
if (!options) throw new Error('No options provided for mongoDB connection');

// Connect to the database
connect(link, options).catch((err) => {
	throw new Error(err);
});
