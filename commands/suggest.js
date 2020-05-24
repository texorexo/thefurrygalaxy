const Discord = require("discord.js")
const colours = require("../json/colours.json")

module.exports.run = async (bot, message, args) => {
    let suggestion =  args.slice(1).join()
    if (!suggestion) return message.reply("You didint add a suggestion you silly!").then(m => m.delete(5000));

    let suggestembed = new Discord.RichEmbed()
    .setTitle(`${message.guild.name} Suggestion Board`)
    .setThumbnail(message.guild.iconURL)
    .addField(`A new suggestion by ${message.author.username}`, suggestion)

    let sChannel = message.guild.channels.find(c => c.name === "suggestion-board")
    sChannel.send(suggestembed)

    message.react('✅')
    message.react('❎')
    .catch(error);

    message.reply("Suggestion posted. Thanksies ^~^.").then(m => m.delete(5000))
  
}

module.exports.config = {
    name: "suggest",
    description: "Suggest a thing",
    usage: ".suggest <suggestion>",
    accessableby: "Members",
    aliases: ["sg", "nsg"]
}