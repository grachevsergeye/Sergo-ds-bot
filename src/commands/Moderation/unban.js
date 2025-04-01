const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
// const { execute } = require('./ban');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban the user from the server.')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user you want to unban.')
                .setRequired(true)),
    
    async execute(interaction, client) {

        const user = interaction.options.getUser('user');

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply
        ('you do not have permission to unban member in this server')

        if (interaction.guild.members.me.has(PermissionsBitField.Flags.Administrator)) return interaction.reply
        ('I do not have administration permission in this server')

        interaction.guild.members.unban(user);

        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setDescription(`Successfully unbanned **${user.username}**`);

        await interaction.reply({ embeds: [embed] });
    }
}