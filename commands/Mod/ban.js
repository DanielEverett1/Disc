const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a user")
        .addUserOption((option) =>
            option
                .setName("target")
                .setDescription("The member to mention")
                .setRequired(true)
        )
        .addStringOption(string =>
            string
                .setName("reason")
                .setDescription('The reason to ban')
                .setRequired(true)
        ),
    async execute(interaction) {
        const staff = interaction.guild.roles.cache.find(role => role.name === "Staff");

        if (interaction.member.roles.cache.has(staff.id)) {
            const userInput = interaction.options.get('target');
            const reasonInput = interaction.options.get('reason') || 'No reason was provided';
            const user = userInput ? interaction.guild.members.cache.get(userInput.value) : null;

            if (!user) {
                return interaction.reply({
                    content: "`❌` The specified user was not found.",
                    ephemeral: false,
                });
            }

            if (!user.bannable) {
                return interaction.reply({
                    content: "`❌` The user is not bannable.",
                    ephemeral: false,
                });
            }

            try {
                user.send({
                    content: `You have been banned from **${interaction.guild.name}**. ${reasonInput}`
                }).catch(() => { });
                await interaction.guild.members.ban(user, { reason: reasonInput });
                interaction.reply({
                    content: `\`✅\` ${user} has been successfully banned!`,
                    ephemeral: true
                });

                return interaction.channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`${user} has been banned.`)
                            .setColor(0x0099ff)
                    ]
                });
            } catch (error) {
                console.error('Error occurred during ban:', error);
                return interaction.reply({
                    content: `\`❌\` Something went wrong: ${error.message}`,
                    ephemeral: true
                });
            }
        } else {
            return "No permissions";
        }
    }
}