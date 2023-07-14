const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { inspect } = require("util");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("eval")
        .setDescription("owner's only")
        .addStringOption((option) =>
            option
                .setName("code")
                .setDescription("The member to mention")
                .setRequired(true)
        ),
    async execute(client, interaction) {
        const denied = new EmbedBuilder()
            .setTitle("EVAL")
            .setColor(0x0099ff)
            .setDescription("❌ You don't have perms to use this command. Only Owner's can use this command")
            .setThumbnail(interaction.member.user.displayAvatarURL())
            .setFooter(interaction.member.user.tag)

        if (!client.config.owner.includes(interaction.member.user.id)) return interaction.followUp({
            embeds: [denied]
        });

        let toEval = interaction.options.getString("code")


        try {
            const emptyEmbed = new EmbedBuilder()
                .setTitle("EVAL")
                .setColor(0x0099ff)
                .setDescription("❌ Error: `Cannot evaluate nothing`")
                .setThumbnail(interaction.member.user.displayAvatarURL())
                .setFooter(interaction.member.user.tag)
            let evaluated = inspect(eval(toEval, {
                depth: 0
            }))
            if (!toEval) return interaction.followUp({
                embeds: [emptyEmbed]
            });

            let hrDiff = process.hrtime(process.hrtime());
            const embed2 = new EmbedBuilder()
                .setTitle("EVAL")
                .setColor(0x0099ff)
                .setDescription(`Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.*\`\`\`javascript\n${evaluated}\n\`\`\``)
                .setThumbnail(interaction.member.user.displayAvatarURL())
                .setFooter(interaction.member.user.tag)
            interaction.followUp({
                embeds: [embed2]
            })
        } catch (e) {
            interaction.followUp({
                content: `An error occurred : \`${e.message}\``
            });
        }

    }
}