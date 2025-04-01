const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get info about user on server!')
        .addSubcommand(subcommand => subcommand
            .setName('user')
            .setDescription('Info about a user')
            .addUserOption(option => option.setName('target').setDescription('The user')))
        .addSubcommand(subcommand => subcommand
            .setName('server')
            .setDescription('Info about the server')),
    async execute  (interaction) {
        const subcommand = interaction.options.getSubcommand();
        let target = interaction.options.getUser('target');

        if (!target) target = interaction.user;

        if (subcommand === 'user') {
            await interaction.reply(`@${target.username} | ${target.id}`);
        }

        if (subcommand === 'server') {
            await interaction.reply(`${interaction.guild.name} | ${interaction.guild.id}`)
        }


    }
}