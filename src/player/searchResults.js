const { MessageEmbed } = require('discord.js');

module.exports = (client, message, query, tracks) => {
    const e = new MessageEmbed()
        .setColor('BLUE')
        .setAuthor(`Here are your search results for ${query}`)
        .setDescription(`${tracks.map((t,i) => `**${i + 1}** - ${t.title}`).join('\n')}`)
        .setTimestamp();
    return message.channel.send(e);
};
