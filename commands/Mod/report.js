const { AttachmentBuilder, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("report")
        .setDescription("Reports a member")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The member to report")
                .setRequired(true)
        )
        .addStringOption(string =>
            string
                .setName("reason")
                .setDescription("Reason for report")
                .setRequired(true)
        )
        .addAttachmentOption(attachment =>
            attachment
                .setName("proof")
                .setDescription('The proof to report someone')
                .setRequired(true)
        ),
    async execute(interaction) {

        let rMember = interaction.options.getUser('user');
        let reportReason = interaction.options.getString('reason')
        let reportProof = interaction.options.getAttachment('proof')
        const embed = {
            title: 'Reported Member',
            image: { url: `attachment://${reportProof.name}` },
            color: 0xff0000,
            description: stripIndents(`**> Member:** ${rMember} (${rMember.id})}
            **> Reported by:** ${interaction.member}
            **> Reported in:** ${interaction.channel}
            **> Reason:** ${reportReason}
            **> Proof:**`)
        }
        let channel = interaction.guild.channels.cache.find(channel => channel.name.toLowerCase() === "reports")

        channel.send({ embeds: [embed], files: [reportProof] })
        interaction.reply({
            content: "Your report has been submitted! Allow up to 12 hours for action to be taken.",
            ephemeral: true,
        })
    }
}