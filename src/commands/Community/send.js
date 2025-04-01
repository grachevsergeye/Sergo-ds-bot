const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('message1')
        .setDescription('message to user')
        .addUserOption(option => option.setName('user').setDescription
        ('select the user you want to message').setRequired(true))
        .addStringOption(option => option.setName('message').setDescription
        ('the message you want to send.').setRequired(true)),
    async execute  (interaction) {
        const user = interaction.options.getUser('user');

        const message = interaction.options.getString('message');

        await interaction.reply(`<@${user.id}>, send you a **${message}**`);
    }
}