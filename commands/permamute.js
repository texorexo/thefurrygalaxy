const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../json/colours.json");

module.exports.run = async (bot, message, args) => {

    //Checks if the user executing the command has perms.
    let muter = message.member.hasPermission("MANAGE_MESSAGES")
    if (!muter) return message.reply("You dont have permissions to run the command. ErrCode: 002")

    //Check if the bot has permissions 
    let pmbotaction = message.guild.me.hasPermission("MANAGE_ROLES", "ADMINISTRATOR")
    if (!pmbotaction) return message.channel.send("Sorry, an error has occured, if the problem persists, please message the bot developers.")

    //Start of the perma mute

    let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!mutee) return message.channel.send("Please specify an user to be muted. ERR_CODE=003");


    let pmreason = args.slice(2).join(" ");
    if(!pmreason) pmreason = "No reason given."

    await(mutee.addRole('700169841012768878'));
    await(mutee.removeRole('696231002506264616'))
    message.reply(`<@${mutee.id}> has been muted for ${pmreason}`);

   let embed = new Discord.RichEmbed()
  .setColor(colours.red_light)
  .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
  .addField("Moderation:", "mute")
  .addField("Mutee:", mutee.user.username)
  .addField("Administrator:", message.author.username)
  .addField("Reason:", pmreason)
  .addField("Date:", message.createdAt.toLocaleString())

  let sChannel = message.guild.channels.find(c => c.name === "『chat-logs』")
  sChannel.send(embed)

  mutee.send(`You have been muted in The Furry Galaxy permanently due to the reason ${pmreason}. If you think this action was a mistake, please email us at thefurrygalaxy@outlook.com`)

}

module.exports.config = {
    name: "permute",
    description: "Permanently mutes the mentioned user.",
    usage: ".permute <user> <reason>",
    accessableby: "Moderators",
    aliases: ["permsush", "pm", "troll", "raider"]
}