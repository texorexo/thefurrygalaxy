const Discord = require("discord.js");
const botconfig = require("../botconfig.json");
const colours = require("..//json/colours.json");
const metadata = require("../metadata.json")

module.exports.run = async (bot, message, args) => {
    let sEmbed = new Discord.RichEmbed()
    .setColor(colours.blue_dark)
    .setTitle("Bot Info")
    .setThumbnail(message.guild.me.displayAvatarURL)
    .setAuthor(`${message.guild.me.username} Info`, message.guild.me.displayAvatarURL)
    .addField("About", metadata.about)
    .addField("Made possible by", metadata.created_with)
    .addField("Bot current version:", metadata.bot_version)
    .addField("Developer", metadata.dev)
    .addField("Testers", `${metadata.testers}`)
    .addField("Contributor/s", metadata.contributors)
    .addField("Latest version release date", metadata.update_latest)
    .addField("Bot creaation date", metadata.created_date)
    .addField("Running on:", metadata.server_location)
    .setFooter(`GalaxianBot | The AI that leads the ship into its journey!`, bot.user.displayAvatarURL);
    message.channel.send({embed: sEmbed});
}

module.exports.config = {
    name: "botinfo",
    description: "Pulls the latest information about the bot!",
    usage: ".botinfo",
    accessableby: "Members",
    aliases: ["bi", "botdesc"]
}