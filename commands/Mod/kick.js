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
                .setName('reason')
                .setDescription('The reason to kick')
                .setRequired(true)
        ),
    async execute(message, interaction) {
        const staff = message.guild.roles.cache.find(role => role.name === "staff");
        const authorUser = message.guild.members.cache.get(interaction.message.author.id);

        if (authorUser.roles.cache.get(`${staff}`) === staff) {
            const userInput = interaction.options.get('user').value;
            const reasonInput = interaction.options.get('reason')?.value || 'No reason was provided';

            const user = message.guild.members.cache.get(userInput);

            if (!user) return interaction.reply({
                content: `\`❌\` The user is not in the guild.`,
                ephemeral: true
            });

            if (!user.kickable) return interaction.reply({
                content: `\`❌\` The user is not kickable.`,
                ephemeral: true
            });

            try {
                await interaction.guild.members.kick(userInput, { reason: reasonInput });

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
                            .setColor('Yellow')
                    ]
                });
            } catch {
                return interaction.reply({
                    content: `\`❌\` Something went wrong!`,
                    ephemeral: true
                });
            }
        }
    }
}