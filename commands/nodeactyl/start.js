const { SlashCommandBuilder, blockQuote } = require('discord.js');
const Nodeactyl = require('nodeactyl');
const { Client_API_Key, API_Key, API_Url } = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Sends a start server request.')
    .addStringOption(option =>
		option.setName('server_id')
			.setDescription('The server id. Can be retrieved through the panel or using /servers command.')
      .setRequired(true)),

  async execute(interaction) {
    try {
      const server_id = interaction.options.getString('server_id');
      const application = new Nodeactyl.NodeactylApplication(API_Url, API_Key);
      const client = new Nodeactyl.NodeactylClient(API_Url, Client_API_Key);
      const data = await application.getServerDetails(server_id);
      try { await client.startServer(data.identifier); }
      catch (error) { console.error(error); return await interaction.reply('The server could not be started.'); }
      const message = blockQuote(`Server ${data.name} will start shortly...`);

      return await interaction.reply({ content: message });
    } catch (error) {
      console.error(error);
      return await interaction.reply('An error occurred while fetching the JSON response. Please contact the server owner.');
    }
  },
};

