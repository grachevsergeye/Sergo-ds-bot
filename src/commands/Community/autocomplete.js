const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("chose-the-color")
        .setDescription('Choose the color!')
        .addStringOption(option => option
            .setName('color')
            .setDescription('The color you want to choose.')
            .setAutocomplete(true)),
    async  autocomplete(interaction) {
        const focusedValue = interaction.options.getFocused();
        
        const choices = ['Blue💙', 'Red❤️', 'Yellow💛', 'Green💚'];

        const filtered = choices.filter(choice => choice.startsWith(focusedValue));

        await interaction.respond(
            filtered.map(choice => ({ name: choice, value: choice })),
        );

    },
    async execute(interaction) {
        const option = interaction.options.getString('color');

        await interaction.reply(`You select ${option}`)
    }
}