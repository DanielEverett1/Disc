const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with ping!'),
  async execute(interaction) {
    const pingEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Ping")
      .setDescription("Pinging...");

    const msg = await interaction.reply({
      embeds: [pingEmbed],
      fetchReply: true,
    });
    const ping = msg.createdTimestamp - interaction.createdTimestamp;

    const pongEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Pong :ping_pong:")
      .setTimestamp()
      .setDescription(`**Latency:** ${ping}ms`);

    await interaction.editReply({ embeds: [pongEmbed] });
  },
};