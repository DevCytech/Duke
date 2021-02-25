module.exports = (client, message, track) => {
    message.channel.send(`🎶 Now playing ${track.title} into ${message.member.voice.channel.name}...`);
};
