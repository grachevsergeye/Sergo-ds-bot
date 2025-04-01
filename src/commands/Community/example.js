const { SlashCommandBuilder } = require('discord.js');
const exampleDatabase = require('../../schema/exampleSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('message')
        .setDescription('set and get the message')
        .addSubcommand(subcommand => subcommand
            .setName('set')
            .setDescription('the message you want to set')
            .addStringOption(option => option.setName('message').setDescription
            ('the message you want to set'))
        )
        .addSubcommand(subcommand => subcommand
            .setName('see')
            .setDescription('the message you want to see')),
            
        async execute (interaction) {
            const subcommand = interaction.options.getSubcommand();
            const guildId = interaction.guild.id;

            if (subcommand === 'set') {
                const userMessage = interaction.options.getString('message');

                let existingEntry = await exampleDatabase.findOne({ guildId });

                if (existingEntry) {
                    existingEntry.message = userMessage;
                    existingEntry.save();
                    return interaction.reply(`message updated to ${userMessage}`)
                } else {
                    const newEntry = new exampleDatabase({
                        guildId,
                        message: userMessage
                    });
                    await newEntry.save();
                    return interaction.reply(`Message set to : ${userMessage}`);
                }
            } else if (subcommand === 'see') {
                const entry = await exampleDatabase.findOne({ guildId });

                if (entry) {
                    return interaction.reply(`Current message ${entry.message}`)
                } else {
                    return interaction.reply('Please set the message first');
                }
            }
        }
}