const {PermissionFlagsBits, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
// const { execute } = require('../Community/ping');

module.exports = {
    data: new SlashCommandBuilder()
      .setName('ban')
      .setDescription('Ban the user from the server.')
      .setDefaultMemberPermissions(PermissionFlagsBits.BanMember)
      .addUserOption(option =>
        option.setName('user')
            .setDescription('The user you want to ban.')
            .setRequired(true))
       .addStringOption(option =>
        option.setName('reason')
            .setDescription('The reason for banning the user.')
            .setRequired(false)),

    async execute(interaction, client) {

        const user = interaction.options.getUser('user');

        let reason = interaction.options.getString('reason');

        const userId = user.id;

        const userToBan = client.users.cache.get(userId);

        if (!reason) reason = "No reason given.";

        if (interaction.member.id === user.id)
            return await interaction.reply({ content: 'You cannot ban yourself.' });

        const embedToDM = new EmbedBuilder()
            .setColor("Yellow")
            .setDescription(`You have been **banned** from **${interaction.guild.name}** | ${reason}`);

        await userToBan.send({ embeds: [embedToDM] }).catch(err => {
            return;
        });


        await interaction.guild.bans.create(userId, { reason }).catch(err => {
            return interaction.reply({ content: 'I cannot ban this user.' });
        });


        const embed = new EmbedBuilder()
            .setColor("Red")
            .setDescription(`Successfully banned **${userToBan.username}** | ${reason}`);

        await interaction.reply({ embeds: [embed] });
    }
}