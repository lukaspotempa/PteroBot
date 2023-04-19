const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Nodeactyl = require('nodeactyl');
const { API_Key, API_Url, Client_API_Key } = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server_info')
    .setDescription('Lists more detailed about a server.')
    .addStringOption(option =>
		option.setName('server_id')
			.setDescription('The server ID. Can be retrieved through the panel or using /servers command.')
      .setRequired(true)),

  async execute(interaction) {
    try {
      // nodeactyl connection
      const server_id = interaction.options.getString('server_id');
      const application = new Nodeactyl.NodeactylApplication(API_Url, API_Key);
      const client = new Nodeactyl.NodeactylClient(API_Url, Client_API_Key);

      // fetches data through nodeactyl API
      const data = await application.getServerDetails(server_id);
      const user_data = await application.getUserDetails(data.user);
      const node_data = await application.getNodeDetails(data.node);
      let usage = '';

      // conversion multiplier byte to megabytes
      const byte_to_mb = Math.pow(1024, 2);

      // Checks for status and changes the icon accordingly
      let status = '-';
      let color = '#8b1300';
      if (!data.suspended) {
        usage = await client.getServerUsages(data.identifier);
        const state = usage.current_state;
        if (state == 'running') {
          status = `🟢 ${state}`;
          color = '#0B6623';
        } else if (state == 'starting') {
          status = `🟠 ${state}`;
          color = '#ff5e00';
        } else if (state == 'offline') {
          status = `🔴 ${state}`;
        }
      } else {
        status = '⚪ suspended';
      }

      const embed = new EmbedBuilder()
       .setColor(color)
       .setTitle(data.name)
       .setURL(`${API_Url}/server/${data.identifier}`)
       .setAuthor({ name: interaction.client.user.username, iconURL: 'https://i.imgur.com/aBDbmTu.png', url: 'https://github.com/lukaspotempa/PteroBot' })
       .setThumbnail('https://i.imgur.com/aBDbmTu.png')
       .setTimestamp()
       .addFields(
        { name: 'ID: ', value: data.id.toString(), inline: true },
        { name: 'status: ', value: status, inline: true },
        { name: 'description: ', value: (data.description.length > 0 ? data.description : ' ') },
        { name: 'owner: ', value: user_data.attributes.username },
        { name: 'node: ', value: node_data.name })
        .setFooter({ text: 'Bot by Avoid#6906' });

      // creates a date string depending on how long the server was running
      if (!data.suspended) {
        let uptime = new Date(usage.resources.uptime);
        const uptime_d = uptime / (1000 * 60 * 60 * 24);
        const uptime_h = uptime / (1000 * 60 * 60);
        const uptime_m = uptime / (1000 * 60);
        uptime = `${ Math.floor(uptime_m) } minutes`;
        if (uptime_m >= 60) {
          uptime = `${ Math.floor(uptime_h) } hours and ${ Math.floor(uptime_m % 60) } minutes`;
        }
        if (uptime_h >= 24) {
          uptime = `${ Math.floor(uptime_d) } days ${ Math.floor(uptime_h % 24) } hours and ${ Math.floor(uptime_m % 60) } minutes`;
        }
        embed.addFields(
          { name: 'uptime: ', value: `${ uptime }` },
          { name: 'CPU usage: ', value: `${(usage.resources.cpu_absolute).toFixed(2)}%` },
          { name: 'RAM usage: ', value: `${(usage.resources.memory_bytes / byte_to_mb).toFixed(2)} MB` },
          { name: 'disk usage: ', value: `${(usage.resources.disk_bytes / byte_to_mb).toFixed(2)} MB` },
          { name: 'network outbound: ', value: `${usage.resources.network_rx_bytes} Bytes` },
          { name: 'network inbound: ', value: `${usage.resources.network_tx_bytes} Bytes` },
        );
      }
      return interaction.reply({ embeds: [ embed ] });
    } catch (error) {
      console.error(error);
      let message = '';
      switch (error) {
        case 404:
          message = 'The server ID could not be found.';
          break;
        default:
          message = 'An error occurred while fetching the JSON response. Please contact the server owner.';
          break;
      }
      return await interaction.reply(message);
    }
  },
};

