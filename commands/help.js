const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../json/colours.json");
const metadata = require("../metadata.json")

module.exports.run = async (bot, message, args) => {
    message.reply("Sorry, this command is not usable yet, go to the general documentation located at the rules for the command list. :]")
}

module.exports.config = {
    name: "help",
    description: "This!",
    usage: ".help <args>",
    accessableby: "Members",
    aliases: ["h"]
}