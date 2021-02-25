module.exports = (client, message, query) => {
    message.channel.send(`❌ I could find no results on YouTube for ${query} !`);
};
