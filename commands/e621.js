const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../json/colours.json");
const metadata = require("../metadata.json")

module.exports.run = async (bot, message, args) => {
    message.reply("Oppsies, I cannot find this command. Maybe its a work in progress?")
}

module.exports.config = {
    name: "e621",
    description: "Searches things on the e621 library",
    usage: ".e621 <args>",
    accessableby: "Members",
    aliases: ["yiff", "yiffporn"]
}

