const { SlashCommandBuilder, Embed, EmbedBuilder } = require('discord.js');
const Nodeactyl = require('nodeactyl');
const { API_Key, API_Url, pterodactyl_img, interface_name } = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('servers')
    .setDescription('Lists all not suspended servers.'),

  async execute(interaction) {
    try {
      const application = new Nodeactyl.NodeactylApplication(API_Url, API_Key);
      const json = await application.getAllServers();
      const embed = new EmbedBuilder()
        .setColor('#FF0000')
        .setTitle('All non-suspended servers:')
        .setURL(API_Url)
        .setAuthor({ name: interface_name + '-Bot', iconURL: pterodactyl_img, url: API_Url })
        .setThumbnail(pterodactyl_img)
        .setTimestamp()
        .setFooter({ text: 'Bot created by Avoid#6906' });
        json.data.forEach(server => {
          if (server.attributes.suspended) return;
          const readable_date = new Date(server.attributes.created_at);
          embed.addFields(
            { name: server.attributes.name, value:
              `ID: ${server.attributes.id}
              description: ${server.attributes.description}
              created: ${readable_date.toLocaleDateString()}`,
            },
          );
        });
      return interaction.reply({ embeds: [ embed ] });
    } catch (error) {
      console.error(error);
      await interaction.reply('An error occurred while fetching the JSON response. Please contact the server owner.');
    }
  },
};

