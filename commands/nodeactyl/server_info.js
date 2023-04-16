const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Nodeactyl = require('nodeactyl');
const { API_Key, API_Url, pterodactyl_img } = require('../../config.json');

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
        const server_id = interaction.options.getString('server_id');
        const application = new Nodeactyl.NodeactylApplication(API_Url, API_Key);
        const data = await application.getServerDetails(server_id);
        const user_data = await application.getUserDetails(data.user);
        const node_data = await application.getNodeDetails(data.node);
         const embed = new EmbedBuilder()
          .setColor('#FF0000')
          .setTitle(data.name)
          .setURL(`${API_Url}/server/${data.identifier}`)
          .setAuthor({ name: interaction.client.user.username, iconURL: pterodactyl_img, url: API_Url })
          .setThumbnail(pterodactyl_img)
          .setTimestamp()
          .addFields(
            { name: 'ID: ', value: data.id.toString(), inline: true },
            { name: 'status: ', value: data.suspended ? 'suspended' : 'active', inline: true },
            { name: 'Description: ', value: (data.description.length > 0 ? data.description : ' ') },
            { name: 'Owner: ', value: user_data.attributes.username },
            { name: 'Node: ', value: node_data.name },
          )
          .setFooter({ text: 'Bot by Avoid#6906' });

          return interaction.reply({ embeds: [ embed ] });
    } catch (error) {
      console.error(error);
      await interaction.reply('An error occurred while fetching the JSON response. Please contact the server owner.');
    }
  },
};
