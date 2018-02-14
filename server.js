/*import Discord from "discord.js"
import fs from "fs"*/
function requireUncached(module){
    delete require.cache[require.resolve(module)]
    return require(module)
}

const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

client.on('ready', () => {
	console.log(`Залогинен как ${client.user.tag}!`);
});

const prefix = "!";
const kernelPrefix = "__";
client.on('message', msg => {
	if (msg.author.bot) return;		//Если это бот (в том числе и мы), то сообщение нужно проигнорировать
	let content = msg.content;
	
	if (content.startsWith(prefix)) {	//Это команда нам
		let command = content.replace(prefix, "");
		getAsyncContent("json/commands.json").then(commands => {
			commands = JSON.parse(commands);
			if (commands[command] === undefined)
				msg.reply(`Poyasni za bazar, ${prefix}${command} ne sushestvuet`);
			else {
				command = commands[command];
				if (command.startsWith(kernelPrefix)) {			//В JSON может быть указание на то, что необходимо что-то сделать
					command = command.replace(kernelPrefix, "").split(" ");
					switch (command[0]) {
						case "read":
							getAsyncContent(command[1])
							.then(cont => msg.reply(cont))
							.catch(err => console.warn(`Problem while reading command:\n${err}\n`));
							break;
						case "execute":
							requireUncached(`./${command[1]}`)(msg);
							break;
					}
				}
				else msg.reply(command);
			}
		}).catch(err => 
			console.warn(`Hey, that is indeed a problem:\n${err}\n\nYo, be careful next time`));
		
		
	}
});

client.on('guildMemberAdd', member => {
	// Send the message to a designated channel on a server:
	const channel = member.guild.channels.find('name', 'member-log');
	// Do nothing if the channel wasn't found on this server
	if (!channel) return;
	channel.send(`Nu che, ${member}, bratuha, dobro pojalovat`);
});

client.login(fs.readFileSync("TOKEN.TXT", "utf8"));

//Helper functions
function getAsyncContent(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, "utf8", (err, data) => {
			if (err) reject(err);
			resolve(data);
		});
	});
}