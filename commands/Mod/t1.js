const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

let codeShare = new EmbedBuilder()
    .setColor(0x0099ff)
    .setAuthor({ name: "Moderation Team" })
    .setDescription("Please use **ONE** of these links to share your long codes.")
    .addFields(
        { name: "Pastebin", value: "https://pastebin.com/" },
        { name: "SrcShare", value: "https://srcshare.io/" },
        { name: "Hastebin", value: "https://www.toptal.com/developers/hastebin" },
        { name: "Sourcebin", value: "https://sourceb.in/" }
        // { name: '\u200B', value: '\u200B' },
    )
    .setTimestamp()
    .setFooter({ text: "Thank you for complying!" });

module.exports = {
    data: new SlashCommandBuilder()
        .setName("t1")
        .setDescription("Gives custom tag")
        .addUserOption((option) =>
            option
                .setName("target")
                .setDescription("The member to mention")
                .setRequired(true)
        ),
    async execute(interaction) {
        const userInput = interaction.options.get("target").value;
        const user = interaction.guild.members.cache.get(userInput);

        await interaction.reply({
            content: `${user}! Please read below embed:`,
            embeds: [codeShare],
        });
    },
};