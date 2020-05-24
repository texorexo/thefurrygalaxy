const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../json/colours.json");

module.exports.run = async (bot, message, args) => {

    let modperm = message.member.hasPermission("BAN_MEMBERS")
    if (!modperm) return message.reply("You dont have sufficent permission to run this command.")

    let banUser = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!banUser) return message.channel.send("Please specify an user to be verified. ERR_CODE=003");

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason given."

    banUser.send(`You have been baned from The Furry Galaxy due to the cause of: ${reason}. If you think this action was a mistake, email us at thefurrygalaxy@outlook.com`)
    message.guild.ban(banUser, {reason: reason})
    
    let embed = new Discord.RichEmbed
    .setColor(colours.red_light)
    .setAuthor(`${message.guild.name} ModLogs`, message.guild.iconURL)
    .addField("Action:", "banish")
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Action Executed At:", message.createdAt.toLocaleString())

    let sChannel = message.guild.channels.find(c => c.name === "『chat-logs』")
    sChannel.send(embed)
  

}

module.exports.config = {
    name: "banish",
    description: "Bans a user in the server!",
    usage: ".banish <user> <reason>",
    accessableby: "Moderators",
    aliases: ["ban", "bhammer"]
}