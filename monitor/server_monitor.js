const Nodeactyl = require('nodeactyl');
const gamedig = require('gamedig');
const { EmbedBuilder } = require('discord.js');
const { clientId } = require('../config.json');

module.exports = {
	async execute(client, game_servers) {
		try {
			game_servers.forEach(async server => {
				// query for the channel by id
				const channel = client.channels.cache.find(c => c == server.channel_id);
				if (!channel) { return console.error('No channel has been found with the correspondig ID: %d', server.channel_id); }
				// checks whether the entry has a custom name set, and if so, use it
				let channel_name = server.channel_name ? server.channel_name : channel.name;
				let server_data = 'offline';
				// ping the server and get the data
				try {
					server_data = await gamedig.query({
						type: server.game_type,
						host: server.host,
						port: server.query_port,
					});
					// if server responds, add green status circle to name
					channel_name = server.channel_name ? `🟢᲼${ channel_name }` : `🟢᲼${ server_data.name }`;
				} catch (error) {
					// if server doesn't respond replace green with red status circle
					if (channel_name.includes('🟢')) {
						channel_name = channel_name.replace('🟢', '🔴');
					} else if (!channel_name.includes('🔴')) {
						channel_name = `🔴᲼${ channel_name }`;
					}
				}
				// Set the channel name if it's not the same
				if (channel.name != channel_name) { channel.setName(channel_name); }
				const messages = await channel.messages.fetch({ limit: 1 });
				const message = messages.first();
				// checks if status is green to set embed color to either green or red
				const color = channel_name.includes('🟢') ? '#0B6623' : '#8b1300';
				// create status embed for in-channel info
				const embed = new EmbedBuilder()
				.setColor(color)
				.setTitle(server_data.password ? `🔒 ${channel_name}` : channel_name)
				.setThumbnail('https://i.imgur.com/aBDbmTu.png')
				.setAuthor({ name: client.user.username, iconURL: 'https://i.imgur.com/aBDbmTu.png', url: 'https://github.com/lukaspotempa/PteroBot' })
				.setTimestamp()
				.setFooter({ text: 'Bot by Avoid#6906' });

				if (server_data != 'offline') {
					let formatted_players = ' ';
					server_data.players.forEach(p => {
						formatted_players += `${ p.name }\n`;
					});
					embed.addFields(
						{ name: 'Players: ', value: `${ server_data.players.length } / ${ server_data.maxplayers }` },
						{ name: 'Ping: ', value: server_data.ping.toString() },
						{ name: 'Connected Players: ', value: formatted_players },
					);
				} else {
					embed.addFields(
						{ name: 'Server is not responding.', value: ' ' },
					);
				}
				if (message) {
					if (message.author.id == clientId) {
						return await message.edit({ embeds: [ embed ] });
					}
				} else {
					return await channel.send({ embeds: [ embed ] });
				}
			});
		} catch (error) {
			return console.error(error);
		}
	},
  };