const Nodeactyl = require('nodeactyl');
const gamedig = require('gamedig');
const { ChannelManager, EmbedBuilder } = require('discord.js');
const { guildId, pterodactyl_img, clientId } = require('../config.json');

module.exports = {
	async execute(client, game_servers) {
		try {
			game_servers.forEach(async server => {
				const channel = client.channels.cache.find(c => c == server.channel_id);
				let channel_name = channel.name;
				let server_data = 'offline';
				try {
					server_data = await gamedig.query({
						type: server.game_type,
						host: server.host,
						port: server.query_port,
					});
					channel_name = `🟢᲼${ server_data.name }`;
				} catch (error) {
					if (channel_name.includes('🟢')) {
						channel_name = channel_name.replace('🟢', '🔴');
					} else if (!channel_name.includes('🔴')) {
						channel_name = `🔴᲼${ channel_name }`;
					}
				}
				channel.setName(channel_name);
				const messages = await channel.messages.fetch({ limit: 1 });
				const message = messages.first();
				const color = channel_name.includes('🟢') ? '#0B6623' : '#8b1300';

				const embed = new EmbedBuilder()
				.setColor(color)
				.setTitle(server_data.password ? `🔒 ${channel_name}` : channel_name)
				.setThumbnail(pterodactyl_img)
				.setTimestamp()
				.setFooter({ text: 'Bot by Avoid#6906' });

				if (server_data != 'offline') {
					let formatted_players = '';
					server_data.players.forEach(p => {
						formatted_players += `${ p.name }\n`;
					});
					embed.addFields(
						{ name: 'Players: ', value: `${ server_data.players.length } / ${ server_data.maxplayers }` },
						{ name: 'Server Ping: ', value: server_data.ping.toString() },
						{ name: 'Connected Players: ', value: formatted_players },
					);
				} else {
					embed.addFields(
						{ name: 'Server is offline', value: ' ' },
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