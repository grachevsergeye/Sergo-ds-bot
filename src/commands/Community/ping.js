const { SlashCommandBuilder } = require("@discordjs/builders");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('this is ping command.'),
    execute (interaction) {
        interaction.reply( 'pong!' );
    }
}