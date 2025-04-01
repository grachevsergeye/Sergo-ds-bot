const { Client, GatewayIntentBits, Collection, Events, PermissionsBitField, EmbedBuilder } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages ]});
client.commands = new Collection();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleCommands(commandFolders, "./src/commands");
    client.handleEvents(eventFiles, "./src/events");
    client.login(process.env.token);
})();



// autocomplite handling
client.on('interactionCreate', async interaction => {
    if(!interaction.isAutocomplete()) return;
    const command = client.commands.get(interaction.commandName);

    if(!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.autocomplete(interaction);
    } catch (error) {
        console.error(error);
    }
});

    // buttons
    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isButton()) return;

        if (interaction.customId === 'primary_button') {
            interaction.reply('you clicked the blue option')
        }
    })
    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isButton()) return;

        if (interaction.customId === 'danger') {
            interaction.reply('you clicked the red option')
        }
    })
    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isButton()) return;

        if (interaction.customId === 'secondary') {
            interaction.reply('you clicked the grey option')
        }
    })



client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    console.log(message)
    message.reply('hello')
})

// prefix

client.on('messageCreate', async (message) => {
    const prefix = '!';
    if (!message.content.startsWith(prefix)) return;

    if (message.content.includes("hello")) {
        message.reply('hey')
    }
})

// prefix command ban

client.on('messageCreate', async (message) => {
    const prefix = '!'
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ban') {
        
        const member = message.mentions.members.first();

        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return message.channel.send
        ("You dont have permission to ban member in this server.");

        if (!member) return message.reply("You must specify member to ban.");

        if (message.member === member) return message.channel.send("You can't ban yourself!");

        let reason = args.slice(1).join(" ");
        if (!reason) reason = 'No reason given.';


        const dmEmbed = new EmbedBuilder()
            .setColor("#00c7fe")
            .setDescription(`You were **banned** from ${message.guild.name} | ${reason}`)

        ;(await member.send({ embeds: [dmEmbed] })).call(err => {
            console.log("the member dms is off")
        })

        const embed = new EmbedBuilder()
            .setColor("#00c7fe")
            .setDescription(`**${member.user.tag}** has been banned | **${reason}**`)

        member.ban();

        message.reply({ embeds: [embed] });
    }
})