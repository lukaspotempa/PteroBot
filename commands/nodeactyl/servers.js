const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Nodeactyl = require('nodeactyl');
const { API_Key, API_Url, pterodactyl_img, bot_url } = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('servers')
    .setDescription('Lists all servers fetched through Pterodactyl.'),

  async execute(interaction) {
    try {
      const application = new Nodeactyl.NodeactylApplication(API_Url, API_Key);
      const json = await application.getAllServers();

      // create the embed
      const embed = new EmbedBuilder()
        .setColor('#0000BB')
        .setTitle('All servers:')
        .setURL(API_Url)
        .setAuthor({ name: interaction.client.user.username, iconURL: pterodactyl_img, url: bot_url })
        .setThumbnail(pterodactyl_img)
        .setTimestamp()
        .setFooter({ text: 'Bot by Avoid#6906' });
        // loop over all servers and create new embed field
        json.data.forEach(server => {
          const readable_date = new Date(server.attributes.created_at);
          embed.addFields(
            { name: server.attributes.name, value:
              `ID: ${server.attributes.id}
              description: ${server.attributes.description}
              created: ${readable_date.toLocaleDateString()}
              status: ${ server.attributes.suspended ? 'suspended' : '-' }`,
            },
          );
        });
      return await interaction.reply({ embeds: [ embed ] });
    } catch (error) {
      console.error(error);
      return await interaction.reply('An error occurred while fetching the JSON response. Please contact the server owner.');
    }
  },
};

