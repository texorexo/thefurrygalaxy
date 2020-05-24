const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../json/colours.json");

module.exports.run = async (bot, message, args) => {

    let unmuter = message.member.hasPermission("MANAGE_MESSAGES" || "ADMINISTRATOR")
    if (!unmuter) return message.reply("You do not have sufficient permissions to run this command. ERR_CODE:002")

    let umbot = message.guild.me.hasPermission("ADMINISTRATOR")
    if (!umbot) return message.reply("An error has occured, if this problem persists, message a bot developer. ERR_CODE:001")

    //Start of unmute
    let unmutee = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!unmutee) return message.channel.send("Please specify an user to be unmuted. ERR_CODE=003");


    let umreason = args.slice(2).join(" ");
    if(!umreason) umreason = "No reason given."

    await(unmutee.removeRole('700169841012768878'))
    await(unmutee.addRole('696231002506264616'))

    message.channel.send(`<@${unmutee.id}> has now been unmuted for the reason: ${umreason}.`)

   let embed = new Discord.RichEmbed()

  .setColor(colours.green_light)
  .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
  .addField("Moderation:", "unmute")
  .addField("Partner:", unmutee.user.username)
  .addField("Administrator:", message.author.username)
  .addField("Reason:", umreason)
  .addField("Date:", message.createdAt.toLocaleString())

  let sChannel = message.guild.channels.find(c => c.name === "『chat-logs』")
  sChannel.send(embed)

}

module.exports.config = {
    name: "unmute",
    description: "Unmutes the mentiones user",
    usage: ".unmute <user> <reason>",
    accessableby: "Moderators",
    aliases: ["um", "removemute", "nomute"]
}