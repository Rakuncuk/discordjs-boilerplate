const { readdirSync: readFolder } = require('fs')
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Bot } = require('../config.js')

const fetchCommands = () => readFolder('./commands').filter(file => file.endsWith('.js'))

const hasPerms = (userRoles, roleList) => {
    for (let i = 0; i < roleList.length; i++)
        if (userRoles.has(Bot.Roles[roleList[i]]))
            return true
    return false
}

const InitCommandListener = async client => {
    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
        const { commandName } = interaction

        const _command = client.commands.get(commandName)
        if (!_command)
            return
        if (_command.roles && !hasPerms(interaction.member.roles.cache, _command.roles))
            return await interaction.reply({ ephemeral: true, content: 'You do not have permission to use this command.' })
        _command.execute(interaction)
    })
}

const InitCommands = async client => {
    console.log("Loading commands...")
    try {
        const commandList = fetchCommands()
        commandList.forEach(file => {
            const command = require(`../commands/${file}`)
            client.commandList.push(command.data.toJSON())
            client.commands.set(command.data.name, command)
        })
    } catch (e) {
        console.log("There was an error loading the commands.", e)
    }

    const rest = new REST({ version: '9' }).setToken(Bot.Token);
    try {
        await rest.put(
            Routes.applicationGuildCommands(client.user.id, Bot.GuildID),
            { body: client.commandList },
        );
        console.log('Commands Loaded!');
    } catch (error) {
        console.error(error);
    }
    InitCommandListener(client)
}

module.exports = InitCommands