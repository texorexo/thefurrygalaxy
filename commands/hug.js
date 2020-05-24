const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../json/colours.json");

module.exports.run = async (bot, message, args) => {
    let verified = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!verified) return message.channel.send("Please specify an user to be huggied wuggied. ERR_CODE=003");

    const responses = [`* hugged him/herself into <@${verified.id}, nuzzlin down into his/her neck.*`, `* thought <@${verified.id}> wanded an hug, so they gave one to them!*`, `*snuggled with <@${verified.id}>, they thought those creepy sounds were from their basement.*`, `*hugged and booped <@${verified.id} to give them a lil cheer-up!*`, `*embraced <@${verified.id} in a nice, warm hug.*`]
    const hugresponse = `*embraced <@${verified.id}> in a nice, warm hug.*` 
    
    message.reply(hugresponse)
}

module.exports.config = {
    name: "hug",
    description: "Hugs the person you wanna snugggies! OwO",
    usage: ".hug <user>",
    accessableby: "Members",
    aliases: []
}