const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    // The data object is what we are going to feed the discord.js, so it can announce the command to the Discord API
    data: new SlashCommandBuilder()
        .setName("example")
        .setDescription("Your first command!"),        
    // The roles object is what we are going to check against the user's roles, so it can determine if the user has permission to use the command
    // You can set the role ids and their names in the config.js file.
    roles: ["Admin"],
    execute: async interaction => {
        await interaction.reply("Hey!")
    }
}