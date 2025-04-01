const { SlashCommandBuilder } = require('discord.js');

const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reply')
        .setDescription('reply methods'),
    async execute (interaction) {

        await interaction.reply('I like blue');
        await wait(3_000);
        await interaction.editReply('No I like red')
    }
        
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emoji')
        .setDescription('Custom emoji'),
    async execute (interaction) {

        await interaction.reply("<:guard:1352079327256121364> : this is custom emoji.");
    }
        
}