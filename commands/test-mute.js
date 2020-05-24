const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../json/colours.json");
const ms = require("ms")

module.exports.run = async (bot, message, args) => {
  //!tempmute @user 1s/m/h/d
      
  let muter = message.member.hasPermission("VIEW_AUDIT_LOG")
  if (!muter) return message.reply("You dont have sufficient power to run this command. ERR_CODE:002");
  
  let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!mutee) return message.channel.send("Please specify an user to be muted. ERR_CODE=003");
  
  let tomute = message.member.hasPermission("MANAGE_MESSAGES")
  if(!tomute) return message.reply("You are trying to mute an mod/admin, and I will obviously cant do that.");
  
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time!");
      
  let tmreason = args.slice(2).join(" ");
  if(!tmreason) tmreason = "No reason given."
    
      await(mutee.addRole('700169841012768878'));
      await(mutee.removeRole('696231002506264616'))
      message.reply(`<@${mutee.id}> has been muted for ${ms(ms(mutetime))}`);
  
    let embed = new Discord.RichEmbed()
    .setColor(colours.redlight)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "mute")
    .addField("Mutee:", mutee.user.username)
    .addField("Administrator:", message.author.username)
    .addField("Duration", mutetime)
    .addField("Reason:", tmreason)
    .addField("Date:", message.createdAt.toLocaleString())
  
    let sChannel = message.guild.channels.find(c => c.name === "『chat-logs』")
    sChannel.send(embed)
  
    mutee.send(`You have been muted in The Furry Galaxy for ${mutetime} due to the reason ${tmreason}. If you think this action was a mistake, please email us at thefurrygalaxy@outlook.com`)
  
    setTimeout(function(){
     mutee.removeRole('700169841012768878');
      mutee.addRole('696231002506264616')
      
      mutee.send("You have now been unmuted from the server, you can now talk regularly.")
    let embed = new Discord.RichEmbed()
    .setColor(colours.green_light)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "unmute")
    .addField("Mutee:", mutee.user.username)
    .addField("Administrator:", message.author.username)
    .addField("Reason:", "AutoUnmute")
    .addField("Date:", message.createdAt.toLocaleString())
  
    let sChannel = message.guild.channels.find(c => c.name === "『chat-logs』")
    sChannel.send(embed)
      }, ms(mutetime));
    
    
    //end of module
}
module.exports.config = {
  name: "softmute",
  description: "Mutes a member in the discord!",
  usage: "!mute <user> <reason>",
  accessableby: "Moderators",
  aliases: ["tm", "temp-mute"]
}