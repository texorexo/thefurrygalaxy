const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("../json/colours.json");



module.exports.run = async (bot, message, args) => {

console.log("Attempting to run Partner.")

// check if the command caller has permission to use the command
if(!message.member.hasPermission("ADMINISTRATOR") || !message.guild.owner) return message.channel.send("You dont have permission to use this command.");

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to add roles!")

console.log("Partner command has been triggered.")

//define the reason and mutee
let partneree = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!partneree) return message.channel.send("No mentioned user has been selected to be a partner. Please specify a user and try again");

let preason = args.slice(1).join(" ");
if(!preason) preason = "No reason given"

//define mute role and if the mute role doesnt exist then create one
let partnerole = message.guild.roles.find(r => r.name === "Partners")
if(!partnerole) return(message.channel.send("Sorry, but the `Partners` role returned as `null`. Please create one and try again."))

//add role to the mentioned user and also send the user a dm explaing where and why they were muted
partneree.addRole(partnerole.id).then(() => {
    message.delete()
    partneree.send(`Hello, you have been added as a partner in ${message.guild.name} for: ${preason}. You can now add your server on the partners channel.`).catch(err => console.log(err))
    message.channel.send(`${partneree.user.username} was successfully added as a partner.`)
})

//send an embed to the modlogs channel
let embed = new Discord.RichEmbed()
.setColor(colours.green_light)
.setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
.addField("Administartion:", "new_partner")
.addField("Partner:", partneree.user.username)
.addField("Administrator:", message.author.username)
.addField("Reason:", preason)
.addField("Date:", message.createdAt.toLocaleString())

let sChannel = message.guild.channels.find(c => c.name === "『chat-logs』")
sChannel.send(embed)
}

module.exports.config = {
    name: "partner",
    description: "Adds a user as a partner in this server, giving him rights to advertise in <#706703597739442247>. And other permissions",
    usage: ".partner <user> <reason>",
    accessableby: "Administrators",
    aliases: ["ap", "p"]
}