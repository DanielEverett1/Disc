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
            const guild = interaction.client.guild.cache.get();
            const userID = interaction.options.get('target');
            // Check if the user is banned.
            const isBanned = guild.bans.cache.find((ban) => ban.user.id === userID);
            console.log(isBanned)

            if (isBanned) {
                // Unban the user.
                interaction.guild.unban(userID);

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