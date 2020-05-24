const Discord = require("discord.js");
var coins = require("../json/coins.json");
const colours = require("../json/colours.json");

module.exports.run = async (bot, messages, args) => {
  // check permissions to run command
  let hasPerms = message.member.hasPermission("MANAGE_MESSAGES");
  if (!hasPerms)
    return message.reply(
      `You dont have sufficient permission to run this command!`
    );

  //checks if a user is specified

  let recipient =
    message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!recipient)
    return message.reply("Please specify the user that you want to add money.");

  //checks if a value is specified.

  let amount = args[1];
  if (!amount) return message.reply("Please specify amount to give to user.");

  let reason = args.slice(2).join(" ");
  if (!reason) reason = "No reason given.";

  coins[recipient.id] = {
    coins: coins[message.author.id].coins + amount
  };

  fs.writeFile("./json/coins.json", JSON.stringify(coins), err => {
    if (err) console.log(err);
  });

  message
    .reply(`Added ${amount} to <@${recipient.id}>'s wallet!`)
    .then(x => x.delete(10000));

  let embed = new Discord.RichEmbed()
    .setColor(colours.green_light)
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .addField("Moderation:", "coins_add_manual")
    .addField("Recipient:", recipient.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Amount", amount)
    .addField("Date:", message.createdAt.toLocaleString());

  let sChannel = message.guild.channels.find(c => c.name === "『chat-logs』");
  sChannel.send(embed);
};

module.exports.config = {
  name: "addTokens",
  description: "Gives selected user Galaxy Tokens",
  usage: ".addTokens <user> <amount> [reaspn]",
  accessableby: "Moderators",
  aliases: ["aT", "tokensadd"]
};
