const Discord = require("discord.js");
const tokenfile = require("./tokenfile.json");
const botconfig = require("./botconfig");
const weather = require("weather-js");
const bot = new Discord.Client({disableEveryone: true});

let botname = "Teszt2"



const üdvözlőId = "857624488442331166";
const szabályzat = "857624750376878090";
  bot.on('guildMemberAdd', async(member) => {
      console.log(member);

      const message = `Üvözöllek a szerveren <@${member.id}>. Nézd meg a <#${szabályzat}> szobát!`;

      member.guild.channels.cache.get(üdvözlőId).send(message);
  });
  const kilépőid = "857624535732846602";
  bot.on('guildMemberRemove', async(member) => {
     console.log(member);

     const message = `Sajnos <@${member.id}> kilépett.`;

     member.guild.channels.cache.get(kilépőid).send(message);
  });

bot.on("ready", async() => {
    console.log(`${bot.user.username} elindult!`)

    let státuszok = [
        "Prefix: !",
        "Készítő: Jonatán"
    ]
    
    setInterval(function(){
        let status = státuszok[Math.floor(Math.random()* státuszok.length)]

        bot.user.setActivity(status, {type: "WATCHING"})
    },3000)




bot.on("message", async message => {
    let MessageArray = message.content.split(" ");
    let cmd = MessageArray[0];
    let args = MessageArray.slice(1);
    let prefix = botconfig.prefix

    const Discord = require("discord.js");

if(cmd === `${prefix}weather`){
    message.delete()
    if(args[0]){
        weather.find({search: args.join(" "), degreeType: "C"}, function(err, result){
            if (err) message.reply(err);

            if(result.length === 0){
                message.reply("Adj meg egy települést!")
                return;
            }

            let current = result[0].current;
            let location = result[0].location;

            let weatherEmbed = new Discord.MessageEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`Időjárás itt: ${current.observationpoint}`)
            .setThumbnail(current.imageUrl)
            .setColor("GREEN")
            .addField("Időzóna:", `UTC${location.timezone}`, true)
            .addField("Hőfok:", `${current.temperature}C`, true)
            .addField("Hőérzet:", `${current.feelslike}C`, true)
            .addField("Szél:", `${current.winddisplay}`, true)
            .addField("Páratartalom:", `${current.humidity}%`, true)

            message.channel.send(weatherEmbed);
        })
    }else{
        message.reply("Kérlek adj meg egy település nevét!")
    }
}

    if(cmd === `${prefix}szia`){
        message.channel.send("Heló!")
    }

if(cmd === `${prefix}help`){
    //embed
    let HelpEmbed = new Discord.MessageEmbed()
    .setAuthor(message.author.username)
    .setTitle("**PARANCSOK:**")
    .addField(`Ezek a parancsok vannak: ${prefix}szia`)
    .setThumbnail(message.author.displayAvatarURL())
    .setFooter(`${botname}`)
    //küldés
    message. channel.send(HelpEmbed)
}


})



})
bot.login(tokenfile.token);