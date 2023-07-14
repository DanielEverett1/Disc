const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a user")
        .addUserOption((option) =>
            option
                .setName("target")
                .setDescription("The member to mention")
                .setRequired(true)
        )
        .addStringOption(string =>
            string
                .setName("reason")
                .setDescription('The reason to kick')
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

            if (!user.kickable) {
                return interaction.reply({
                    content: "`❌` The user is not kickable.",
                    ephemeral: false,
                });
            }

            try {
                await interaction.guild.members.kick(user, { reason: reasonInput });

                user.send({
                    content: `You have been kicked from **${interaction.guild.name}**. ${reasonInput}`
                }).catch(() => { });

                interaction.reply({
                    content: `\`✅\` ${user} has been successfully kicked!`,
                    ephemeral: true
                });

                return interaction.channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`${user} has been kicked.`)
                            .setColor(0x0099ff)
                    ]
                });
            } catch (error) {
                console.error('Error occurred during kick:', error);
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