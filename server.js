const V = "1.2.1";

const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();

let lang;
let translation;

client.on('ready', () => {
	// Pick the language
	if (fs.existsSync('LANG.TXT')) lang = fs.readFileSync('LANG.TXT', 'utf8').trim();
	else lang = "ENGLISH";

	// Load translation file
	if (lang == "RUSSIAN") translation = requireUncached('./translationsRussian.json');
	else translation = requireUncached('./translationsEnglish.json');

	// Greet in console
	console.log(`${insTr(translation.loggedInAs, "TAG", client.user.tag)}\n${translation.version} ${V}`);
});

const prefix = "!";
const kernelPrefix = "__";
client.on('message', msg => {
	// We need to ignore a message, if it's coming from a bot
	if (msg.author.bot) return;
	let content = msg.content;

	// Pick the language
	if (fs.existsSync('LANG.TXT')) lang = fs.readFileSync('LANG.TXT', 'utf8').trim();
	else lang = "ENGLISH";

	// Load translation file
	if (lang == "RUSSIAN") translation = requireUncached('./translationsRussian.json');
	else translation = requireUncached('./translationsEnglish.json');

	// Command to us
	if (content.startsWith(prefix)) {
		let command = content.replace(prefix, "").split(" ");
		getAsyncContent("json/commands.json").then(commands => {
			commands = JSON.parse(commands);
			if (commands[command[0]] === undefined) {
				msg.reply(insTr(translation.noSuchCommand, 'COMMAND', `${prefix}${command[0]}`));
				if (msg.guild)
					msg.react(msg.guild.emojis.find(x => x.name == "hmm").id);
			}
			else {
				analizeCommand(command, msg, commands);
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

function analizeCommand(command, msg, commands) {
	// JSON might have a special command for us
	let args = command.slice(1);
	command = commands[command[0]];
	if (command.startsWith(kernelPrefix)) {
		command = command.replace(kernelPrefix, "").split(" ");
		switch (command[0]) {
			case "alias":
				command = command.slice(1);
				analizeCommand(command, msg, commands);
				break;
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
