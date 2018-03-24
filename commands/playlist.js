const fs = require('fs');
const Discord = require('discord.js');
const play = requireUncached("./play.js");

const translation = require('./translation.js');

module.exports = (msg, args) => {
  args = args[0];     // Cut off args from different parts of program

  let queue;
  if (fs.existsSync('./json/PLAYLIST.JSON')) queue = JSON.parse(fs.readFileSync('./json/PLAYLIST.JSON', 'utf8'));
  else queue = [];
  switch(args[0]) {
    case undefined:
      getAsyncContent(language == "ENGLISH" ? "./txt/playlistInfoEnglish.txt" : "./txt/playlistInfoRussian.txt")
      .then(content => {
        msg.reply(content);
      })
      .catch(err => {
        console.warn("Возникла ошибка:\n", err, "\n");
        msg.reply(translation('errorOccurred') + "\n```" + err + "```\n");
      });
      break;
    case "show":
      let message;
      if (queue.length == 0) message = `\`${translation('queueIsEmpty')}\``;
      else {
        message = new Discord.RichEmbed().setTitle(translation('queue'));
        for (let i = queue.length - 25 < 0 ? 0 : queue.length - 25; i < queue.length; i++)
          message.addField(`#${~~i + 1}`,
          `***${queue[i].title};***${translation('playlistN', "N", ~~i + 1)}\n${queue[i].link}${queue[i].currentlyPlaying ? translation('currentlyPlaying') : ""}\n`);
      }
      msg.reply(typeof message === "string" ? message : {embed: message});
      // console.log(message);
      break;
    case "jump":
      play(msg, [[queue[args[1] - 1].link], 'playlist']);
      break;

    case "replay":
      let video = queue.find(x => x.last);
      if (video)
        play(msg, [[video.link], 'playlist']);
      else
        msg.reply(translation(noCurrentVideo));
      break;
    case "clear":
      queue = [];
      fs.writeFileSync('./json/PLAYLIST.JSON', JSON.stringify(queue), 'utf8');
      msg.reply(translation('queueWasCleared'));
      break;
    case "delete":
      queue.splice(args[1] - 1, 1);
      msg.reply(translation('wasDeletedFromQueue'));
      break;

    default:
      msg.reply(translation('noSuchCommand', "COMMAND", `!playlist ${args[0]}`));
      break;
  }
}

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
