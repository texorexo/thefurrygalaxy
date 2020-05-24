const Discord = require("discord.js");
const botconfig = require("./botconfig.json");
const colours = require("./json/colours.json");
const superagent = require("superagent");
const ms = require("ms");
let coins = require("./json/coins.json");

const bot = new Discord.Client({disableEveryone: true});

require("./util/eventHandler")(bot)

const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js") 
    if(jsfile.length <= 0) {
         return console.log("[LOGS] Couldn't Find Commands!");
    }

    jsfile.forEach((f, i) => {
        let pull = require(`./commands/${f}`);
        bot.commands.set(pull.config.name, pull);  
        pull.config.aliases.forEach(alias => {
            bot.aliases.set(alias, pull.config.name)
        });
    });
});



bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!coins[message.author.id]){
        coins[message.author.id] = {
          coins: 0
        };
      }
    
      let coinAmt = Math.floor(Math.random() * 15) + 1;
      let baseAmt = Math.floor(Math.random() * 15) + 1;
      console.log(`${coinAmt} ; ${baseAmt}`);
    
      if(coinAmt === baseAmt){
        coins[message.author.id] = {
          coins: coins[message.author.id].coins + coinAmt
        };
      fs.writeFile("./json/coins.json", JSON.stringify(coins), (err) => {
        if (err) console.log(err)
      });
    }
    if(cmd === ["nigger", "nigga"]){
        message.delete()
        return message.reply("Oh noews! A racist! NIGGER ALARM!  https://cdn.discordapp.com/attachments/702728505141493820/710583434107420803/Alarm.webm").then(m => m.delete(5000))
    }


    if(!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot,message,args)


})

bot.login(botconfig.token);