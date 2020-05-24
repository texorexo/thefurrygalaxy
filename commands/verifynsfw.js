const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../json/colours.json");

module.exports.run = async (bot, message, args) => {

    let mod = message.member.hasPermission("MANAGE_ROLES")
    if (!mod) return message.reply("You dont have sufficient permission to run this command.")

    //start of add role

    let verified = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!verified) return message.channel.send("Please specify an user to be verified. ERR_CODE=003");


    let vnreason = args.slice(1).join(" ");
    if(!vnreason) pmreason = "No reason given."

    await(verified.addRole('696995593519628368'));
    message.reply(`<@${verified.id}> has been veried for NSFW for ${vnreason}`);

   let embed = new Discord.RichEmbed()
  .setColor(colours.green_light)
  .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
  .addField("Moderation:", "nsfw_verify")
  .addField("Verified:", verified.user.username)
  .addField("Moderator:", message.author.username)
  .addField("Reason:", vnreason)
  .addField("Date:", message.createdAt.toLocaleString())

  let sChannel = message.guild.channels.find(c => c.name === "『chat-logs』")
  sChannel.send(embed)

}

module.exports.config = {
    name: "verifysnfw",
    description: "Verifies mentioned user to gain access to NSFW Channels",
    usage: ".verifynsfw <user> <reason>",
    accessableby: "Moderators",
    aliases: ["vnsfw", "verify-nsfw", "nsfwadd"]
}