const { SlashCommandBuilder, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('send-channel')
        .setDescription('send a message to the channel')
        .addChannelOption(option => option.setName('channel').setDescription
        ('channel to send a message').addChannelTypes(ChannelType.GuildText).setRequired(true))
        .addStringOption(option => option.setName('message').setDescription
        ('the message to send.').addChoices(
            { name: 'Hello', value: 'hello' },
            { name: 'hello', value: 'hello' },
            { name: 'hello', value: 'hello' },
            { name: 'hello', value: 'hello' },
        ).setRequired(false)),
    async execute  (interaction) {
        const channel = interaction.options.getChannel('channel');

        const message = interaction.options.getString('message');

        channel.send(`${interaction.user.username}, send to this channel **${message}**`)
        interaction.reply('Successfully sent.')
    }
}