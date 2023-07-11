const { SlashCommandBuilder } = require('discord.js');
const Client = require('../../index');
const client = Client.client

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with ping!'),
    async execute(interaction) {
        await interaction.reply(`${client.ws.ping} ms`);
    },
};