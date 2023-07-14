const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("Unban a user")
        .addUserOption((option) =>
            option
                .setName("target")
                .setDescription("The member to mention")
                .setRequired(true)
        )
        .addStringOption(string =>
            string
                .setName("reason")
                .setDescription('The reason to unban')
                .setRequired(true)
        ),
    async execute(interaction) {
        const staff = interaction.guild.roles.cache.find(role => role.name === "Staff");

        if (interaction.member.roles.cache.has(staff.id)) {
            // Check if the user is banned.
            const isBanned = (user) => {
                const guildID = interaction.guild.id;
                const banList = guildID.bans;
                for (const ban of banList) {
                    if (ban.user.id === user.id) {
                        return true;
                    }
                }
                return false;
            };

            if (isBanned == true) {
                interaction.guild.members.unban(interaction.options.getUser('target'));

                return interaction.reply({
                    content: "`✅` The user has been unbanned.",
                    ephemeral: false,
                });
            } else {
                // The user is not banned.
                return interaction.reply({
                    content: "`❌` The user is not banned.",
                    ephemeral: false,
                });
            }
        } else {
            return "No permissions";
        }
    }
}