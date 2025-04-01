const { SlashCommandBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
// const { execute } = require('./ping');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('button-guide')
        .setDescription('this command will send an button'),
    async execute(interaction) {
        console.log(interaction)

        const button = new ButtonBuilder()
        .setCustomId('primary_button')
        .setLabel('button Text')
        .setStyle(ButtonStyle.Primary)

        const button2 = new ButtonBuilder()
        .setCustomId('secondary')
        .setLabel('button Text')
        .setStyle(ButtonStyle.Secondary)

        const button3 = new ButtonBuilder()
        .setCustomId('danger')
        .setLabel('button Text')
        .setStyle(ButtonStyle.Danger)

        const row = new ActionRowBuilder().addComponents(button);
        const row1 = new ActionRowBuilder().addComponents(button2, button3);
       
        await interaction.reply({ content: `@${interaction.user.username} Click the button.`, components: [row, row1] })
    },

    // data: new SlashCommandBuilder()
    // .setName('command_name')
    // .setDescription('command_description')
    // .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    // async execute(interaction) {
    //     await interaction.reply({ content: `nothing much here!` });
    // }
}