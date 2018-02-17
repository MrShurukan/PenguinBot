const V = "1.0.0";

const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

//Load translation file
const translation = require('./translations.json');

client.on('ready', () => {
	console.log(`Залогинен как ${client.user.tag}!\nВерсия ${V}`);
});

const prefix = "!";
const kernelPrefix = "__";
client.on('message', msg => {
	// We need to ignore a message, if it's coming from a bot
	if (msg.author.bot) return;
	let content = msg.content;

	// Command to us
	if (content.startsWith(prefix)) {
		let command = content.replace(prefix, "").split(" ");
		getAsyncContent("json/commands.json").then(commands => {
			commands = JSON.parse(commands);
			if (commands[command[0]] === undefined)
				//msg.reply(`Poyasni za bazar, ${prefix}${command[0]} ne sushestvuet`);
				msg.reply(insTr(translation.noSuchCommand, 'COMMAND', `${prefix}${command[0]}`));
			else {
				let args = command.slice(1);
				command = commands[command[0]];
				// JSON might have a special command for us
				if (command.startsWith(kernelPrefix)) {
					command = command.replace(kernelPrefix, "").split(" ");
					switch (command[0]) {
						case "read":
							getAsyncContent(command[1])
							.then(cont => msg.reply(cont));
							//.catch(err => console.warn(`Problem while reading command:\n${err}\n`));
							break;
						case "execute":
							requireUncached(`./${command[1]}`)(msg, [args]);
							break;
					}
				}
				else msg.reply(command);
			}
		}).catch(err => {
      console.warn("Возникла ошибка:\n", err, "\n");
      msg.reply(translation.errorOccurred + "\n```" + err + "```\n", translation.errorEmbed);
    });


	}
});

client.on('guildMemberAdd', member => {
	// Send the message to a designated channel on a server:
	const channel = member.guild.channels.find('name', 'member-log');
	// Do nothing if the channel wasn't found on this server
	if (!channel) return;
	channel.send(insTr(translation.newMemberJoined, "NAME", member));
});

client.login(fs.readFileSync("TOKEN.TXT", "utf8").trim());

//Helper functions
function getAsyncContent(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, "utf8", (err, data) => {
			if (err) reject(err);
			resolve(data);
		});
	});
}

function requireUncached(module) {
    delete require.cache[require.resolve(module)]
    return require(module)
}

//insertTranslation
function insTr(translation, title, content) {
	return translation.replace(new RegExp(`{${title}}`, "g"), content)
}
