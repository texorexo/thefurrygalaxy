const Discord = require("discord.js")


module.exports = bot => {
     console.log(`${bot.user.username} is online`)
    // bot.user.setActivity("Hello", {type: "STREAMING", url:"https://twitch.tv/Strandable"});

    let statuses = [
        `the beautiful stars`,
        ".help for commands!",
        `over ${bot.users.size} users!`,
        "the sun go by",
        "your beautiful smile :)",
        "the happy inhabitants of the ship."
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING"});

    }, 5000)

}