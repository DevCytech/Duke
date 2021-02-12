module.exports.fetchMember = (message, user = '') => {
	if (!message || typeof message !== 'object') {
		throw new Error('No message variable provided.');
	}
	if (!user || typeof user !== 'string') throw new Error('No user provided.');

	// Simple search
	let target = message.guild.members.get(user);

	// Check if the user is a mention
	if (!target && message.mentions.members) {
		target = message.mentions.members.first();
	}

	// Match username
	if (!target) {
		target = message.guild.members.find((member) => {
			return (
				member.displayName.toLowerCase().includes(user.toLowerCase()) ||
				member.user.tag.toLowerCase().includes(user.toLowerCase())
			);
		});
	}

	// Default to user if there is no target
	if (!target) target = message.member;

	return target;
};
