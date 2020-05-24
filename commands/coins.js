const Discord = require("discord.js")
const colours = require("../json/colours.json")
var coins = require("../json/coins.json")

module.exports.run = async (bot, message, args) => {
  if(!args[0]){
   if(!coins[message.author.id]){
     coins[message.author.id] = {
        coins: 0
        };
     }
  
        let userCoins = coins[message.author.id].coins;
  
        let coinEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor("#8e44ad")
        .setTitle(`${message.author.username}'s Balance`)
        .addField("Galaxy Tokens: ", userCoins, true)
        .setFooter("GalaxianBot | The IRS of Space", bot.user.displayAvatarURL);
        
        message.channel.send(coinEmbed);
        return;
      }
  
      let user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
      if(!user){
        return message.reply("Please mention a user.");
      }
  
   if(!coins[user.id]){
       coins[user.id] = {
        coins: 0
      };
    }
  
    let userCoins = coins[user.id].coins;
  let coinEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("#8e44ad")
    .setTitle(`${user}'s Balance`)
    .addField("Galaxy Tokens: ", userCoins, true)
    .setFooter("GalaxianBot | The IRS of Space", bot.user.displayAvatarURL);

      message.channel.send(coinEmbed);
      return;
}
module.exports.config = {
    name: "coins",
    description: "Checks the amount of coins you have!",
    usage: ".coins [user]",
    accessableby: "Members",
    aliases: ["bal", "c", "balance", "bank"]
}

