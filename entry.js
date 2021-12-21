const { Bot, Database } = require('./config.js')
const { Client, Intents, Collection } = require('discord.js');

const { commandHandler: loadCommands } = require('./utils/dist.js')
// Create the bot client 
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES] });

client.commandList = []
client.commands = new Collection()

client.on('ready', async _ => {
    loadCommands(client)
    console.log(`Logged in as ${client.user.tag}!`);
})

client.login(Bot.Token)
