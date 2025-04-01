const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { execute } = require('./ping'); // questionable
const { timeStamp } = require('console');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embed-guide')
        .setDescription('this command will send an embed'),
    async execute(interaction, client) {

        // COPY OF EMBED IN JSON
        // const embed1 = {
        //     color: 0x0099ff,
        //     title: 'Some title',
        //     url: 'https://discord.js.org',
        //     author: {
        //         name: "Grachev Sergey",
        //         icon_url: 'https://i.imgur.com/AfFp7pu.png',
        //         url: 'https://discord.js.org',
        //     },
        //     description: 'This bot is for you surely',
        //     thumbnail: {
        //         url: 'https://i.imgur.com/AfFp7pu.png',
        //     },
        //     fields: [
        //         {
        //             name: 'This is my title',
        //             value: 'There is a value here',
        //         },
        //         {
        //             name: 'The title',
        //             value: 'The value',
        //             inline: true,
        //         },
        //         {
        //             name: 'The title',
        //             value: 'The value',
        //             inline: true,
        //         },
        //         {
        //             name: 'The title',
        //             value: 'The value',
        //             inline: false,
        //         },
        //     ],
        //     image: {
        //         url: 'https://i.imgur.com/AfFp7pu.png',
        //     },
        //     timeStamp: new Date().toISOString(),
        //     footer: {
        //         text: 'This is footer',
        //         iconURL: 'https://i.imgur.com/AfFp7pu.png'
        //     },
        // };

        const userAvatar = interaction.user.displayAvatarURL({ dynamic: true })
        const userFetch = await client.users.fetch(interaction.user.id, { force: true} )
        const guildIcon = interaction.guild.iconURL({ dynamic: true });

        const embed1 = new EmbedBuilder()
            .setColor('Aqua')
            .setTitle('Some title')
            .setURL('https://discord.js.org/')
            .setAuthor({ name: 'Some name', iconURL: userAvatar})
            .setDescription('Some description here')
            .setThumbnail(guildIcon)
            .addFields(
                { name: 'This is my title', value: 'There is a value here' },
                { name: '\u2008', value: '\u2008' },
                { name: 'The title', value: 'The value', inline: true },
                { name: 'The title', value: 'The value', inline: true }
            )
            .addFields({ name: 'The title', value: 'The value', inline: true })
            .setImage(userAvatar)
            .setTimestamp()
            .setFooter({ text: 'This is footer', iconURL: userAvatar });


        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Some title')
            .setURL('https://discord.js.org/')
            .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org'})
            .setDescription('Some description here')
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .addFields(
                { name: 'This is my title', value: 'There is a value here' },
                { name: '\u2008', value: '\u2008' },
                { name: 'The title', value: 'The value', inline: true },
                { name: 'The title', value: 'The value', inline: true }
            )
            .addFields({ name: 'The title', value: 'The value', inline: true })
            .setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter({ text: 'This is footer', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

            await interaction.reply({ content: 'this is message', embeds: [embed1] })
    }
}