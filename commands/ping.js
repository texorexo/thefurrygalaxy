const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../json/colours.json");

module.exports.run = async (bot, message, args) => {

    message.channel.send("Ping measuring. Please wait..").then(m=> {
        let ping = m.createdTimestamp - message.createdTimestamp
        let respond = ["I bet ill have Hypixel Australian Ping...", "This is embarrasing reeeee!", "Ready or not, heres the ping!", "PING SPOOFING!", "I am mortalized."]
        let response = respond[Math.floor(Math.random() * respond.length)]

        m.edit(`${response} Server to API Ping: ${ping}ms, API to Client Ping: ${Math.round(bot.ping)}ms`)
    
    })

   

}

module.exports.config = {
    name: "ping",
    description: "Checks Server Ping and Discord API Latency.",
    usage: ".ping",
    accessableby: "Members",
    aliases: ["tp", "cp"]
}