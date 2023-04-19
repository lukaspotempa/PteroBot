const { SlashCommandBuilder, blockQuote } = require('discord.js');
const Nodeactyl = require('nodeactyl');
const { Client_API_Key, API_Key, API_Url } = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('command')
    .setDescription('This will prompt a command on the specified server.')
    .addStringOption(option =>
      option.setName('server_id')
        .setDescription('The server id. Can be retrieved through the panel or using /servers command.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('command')
        .setDescription('The command you want the server to prompt.')
        .setRequired(true)),
  async execute(interaction) {
    try {
      const server_id = interaction.options.getString('server_id');
      const cmd = interaction.options.getString('command');

      // establish nodeactyl API connection
      const application = new Nodeactyl.NodeactylApplication(API_Url, API_Key);
      const client = new Nodeactyl.NodeactylClient(API_Url, Client_API_Key);
      const data = await application.getServerDetails(server_id);

      // Sends the command to the server | TODO: try catch
      await client.sendServerCommand(data.identifier, cmd);
      const message = blockQuote(`Command ${cmd} has been executed on server ${data.name}.`);

      return interaction.reply({ content: message });
    } catch (error) {
      console.error(error);
      await interaction.reply('An error occurred while fetching the JSON response. Please contact the server owner.');
    }
  },
};

