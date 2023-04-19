const { SlashCommandBuilder } = require('discord.js');
const { pterodactyl_img, game_types } = require('../../config.json');
const fs = require('fs');
const gamedig = require('gamedig');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('register')
    .setDescription('Registers a server to the game monitoring config.')
    .addStringOption(option =>
      option.setName('host')
        .setDescription('The server host, ip of the targeting server. (e.g. minecraft.server.net).')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('query_port')
        .setDescription('The query port.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('channel_id')
        .setDescription('Discord channel ID for a channel, the bot will use, to post new data.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('game_type')
          .setDescription('The game, the server will watch. If not listed, check gamedig docs.')
          .addChoices(
            { name: 'ARK: Survival Evolved', value: 'arkse' },
            { name: 'ARMA: 3', value: 'arma3' },
            { name: 'Battlefield: 4', value: 'bf4' },
            { name: 'Conan Exiles', value: 'conanexiles' },
            { name: 'Counter-Strike 1.6', value: 'cs16' },
            { name: 'Counter-Strike: Global Offensive', value: 'csgo' },
            { name: 'Counter-Strike: Source', value: 'css' },
            { name: 'DayZ', value: 'dayz' },
            { name: 'Garrys Mod', value: 'garrysmod' },
            { name: 'Grand-Theft-Auto: V FiveM', value: 'fivem' },
            { name: 'Insurgency', value: 'insurgency' },
            { name: 'Insurgency: Sandstorm', value: 'insurgencysandstorm' },
            { name: 'Minecraft', value: 'minecraft' },
            { name: 'Minecraft: Bedrock Edition', value: 'minecraftbe' },
            { name: 'No More Room in Hell', value: 'nmrih' },
            { name: 'Rust', value: 'rust' },
            { name: 'Squad', value: 'squad' },
            { name: 'The Forest', value: 'forrest' },
            { name: 'Valheim', value: 'valheim' },
            )
          .setRequired(true)),

  async execute(interaction) {
    try {
        const host = interaction.options.getString('host');
        const query_port = interaction.options.getString('query_port');
        const game_type = interaction.options.getString('game_type');
        const channel_id = interaction.options.getString('channel_id');

        try {
          const server_data = await gamedig.query({
            type: game_type,
            host: host,
            port: query_port,
          });
        } catch (error) {
          console.error(error);
          return await interaction.reply('The server did not respond. Verify the data you provided.');
        }

        const json = fs.readFileSync('config.json', 'utf8');
        const data = JSON.parse(json);

        data.game_servers.push({
          host: host, query_port: query_port, game_type: game_type, channel_id: channel_id,
        });

        const new_json = JSON.stringify(data);
        fs.writeFileSync('config.json', new_json, 'utf8');

        const message = 'A new server was registered to server monitoring. Bot needs to be restarted.';
        return await interaction.reply({ content: message });
    } catch (error) {
        console.error(error);
        return await interaction.reply('An error occurred while fetching the JSON response. Please contact the server owner.');
    }
  },
};

