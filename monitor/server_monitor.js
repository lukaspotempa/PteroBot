const Nodeactyl = require('nodeactyl');
const gamedig = require('gamedig');
const { ChannelManager } = require('discord.js');
const { guildId } = require('../config.json');

module.exports = {
	async execute(client, game_servers) {
		try {
			game_servers.forEach(async server => {
				const channel = client.channels.cache.find(c => c == server.channel_id);
				let channel_name = channel.name;
				try {
					const server_data = await gamedig.query({
					type: server.game_type,
					host: server.host,
					port: server.query_port,
				});
				channel_name = `🟢᲼${ server_data.name }`;
				} catch (error) {
					channel_name = `🔴᲼${ channel_name }`;
				}
				channel.setName(channel_name);
			});
			return console.log('success');
		} catch (error) {
			return console.error(error);
		}
	},
  };