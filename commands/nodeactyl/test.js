const { SlashCommandBuilder } = require('discord.js');
const Nodeactyl = require('nodeactyl');
const { API_Key, API_Url } = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('json')
    .setDescription('Fetches a JSON response from an API.'),

  async execute(interaction) {
    try {
      const application = new Nodeactyl.NodeactylApplication(API_Url, API_Key);
      const data = await application.getAllServers();
      data.data.forEach(element => {
        console.log(element);
      });
    } catch (error) {
      console.error(error);
      await interaction.reply('An error occurred while fetching the JSON response.');
    }
  },
};

