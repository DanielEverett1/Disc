const { time, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("../../functions.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("whois")
        .setDescription("Returns user information")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The member to get info on")
                .setRequired(true)
        ),
    async execute(interaction) {
        const user = interaction.options.getUser('user') || interaction.user;
        const member = await interaction.guild.members.fetch(user.id);
        const icon = user.displayAvatarURL();
        const tag = user.tag

        const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setAuthor({ name: tag, iconURL: icon })
            .setThumbnail(icon)
            .addFields({ name: "Member", value: `${user}`, inline: false })
            .addFields({ name: "Roles", value: `${member.roles.cache.map(r => r).join(' ')}`, inline: false })
            .addFields({ name: "Joined Server", value: `${time(user.createdAt)}`, inline: true })
            .addFields({ name: "Joined Discord", value: `${time(member.joinedAt)}`, inline: true })
            .setFooter({ text: `User ID: ${user.id}` })
            .setTimestamp()

        await interaction.reply({ embeds: [embed] })
    }
}