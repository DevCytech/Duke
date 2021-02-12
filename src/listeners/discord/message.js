const { client } = require('../../client');
const config = require('../../../assets/config.json');

client.on('message', async (message) => {
  const {author, member, content, channel, guild } = message;
  
  // Pre command checks
  if (author.bot || channel.type === 'dm') return;
  if (!channel.permissionsFor(client.user).has('SEND_MESSAGES')) return;
  if (!channel.permissionsFor(client.user).has('EMBED_LINKS')) {
    return message.channel.send('Many of my responses require permission to embed links.');
  };
  
  // Get guild data
  const guildData = { prefix: '!' }; // Temp Data
  
  // Get user data
  const userData = {}; // Temp Data
  
  // XP System
  
  // Define Information
  const mention = <@${client.user.id}!>;
  const perfix = guildData.prefix ? guild.prefix : config.prefix; // Update to take custom prefix with guild data
  const [cmd, ...args] = message.content.slice(prefix.length).split(/\s+\g);
  
  // Get the command
  if (!cmd) return;
  const command = client.commands.get(cmd) || client.aliases.get(cmd);
  if (!command) return;
  
  // Check the members permissions
  const clientMember = message.guild.members.cache.get(client.user.id);
  
  if (command.config.permissions) {
    const missing = [];
    
    for (const permission of command.config.permissions) {
      if (!channel.permissionsFor(messsage.author).has(permissions)) missing.push(permission);
    }
    
    if (missing.length > 0) return message.channel.send(`You are missing the following permissions: ${missing.join(', ')}`)
  }
  
  if (command.config.clientPerms) {
    const missing = [];
    
    for (const permission of command.config.clientPerms) {
      if (!channel.permissionsFor(client.user).has(permissions)) missing.push(permission);
    }
    
    if (missing.length > 0) return message.channel.send(`I am missing the following permissions: ${missing.join(', ')}`)
  }
  
  // Check NSFW
  if (command.config.isNSFW && channel.nsfw === false {
    return message.channel.send('Please use this command in an nsfw channel.')
  }
  
  // Check Dev
  if (command.config.isDev && !config.develoepers.includes(author.id)) return;
  
  // Run the command
  command.callback({client, message, args, guildData, userData}).catch((err) => {
    console.error(err);
    return message.channel.send(`An error occured while trying to run ${command.config.name}. Please try again later...`)
  }); 
};
