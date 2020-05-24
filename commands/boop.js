const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../json/colours.json");

module.exports.run = async (bot, message, args) => {
    let verified = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!verified) return 

    let choises = [`*<@${message.author.id}> does a little mlem and leans close into <@${verified.id}> for a boop. Tehe!*`, `*<@${message.author.id}> does a backflip and boops <@${verified.id}> midway through.*`, `*<@${message.author.id}> runs into the hospital, he talks to the receptionist, he talks to the doctor, and finally boops <@${verified.id}> laying down on the hospital bed*`, `*<@${message.author.id}> starts singing "never gonna give you up, never gonna let you down, never gonna run around, and not boop <@${verified.id}>*`, `*<@${message.author.id}> boops <@${verified.id}> a little too hard! Oops! now <@${message.author.id}> and <@${verified.id}> have bloody noses :(*`]
    let response = choises[Math.floor(Math.random() * choises.length)]

    message.channel.send (`${response}`)
}

module.exports.config = {
    name: "boop",
    description: "Does a boopie to the selected user!",
    usage: ".boop",
    accessableby: "Members",
    aliases: ["b", "boopies", "boopsies"]
}