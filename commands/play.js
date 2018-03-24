const search = require('youtube-search');
const fs = require('fs');
const exec = require('child-process-promise').exec;
const qALiteral = "^";
// const ytdl = require('youtube-dl');

const translation = require('./translation.js');

module.exports = (msg, args) => {
  // Voice only works in guilds
  if (!msg.guild) {
    msg.reply(translation('youMustBeInGroup'));
    return;
  }

  let appArgs = args.slice(1);
  args = args[0];

  let quickAccess = args[0].startsWith(qALiteral) ? args[0] : null;
  let searchPhrase = quickAccess ? null : args.join(" ");
  let link, title;

  if (quickAccess) {
    if (fs.existsSync("./json/QUICKACCESS.JSON")) {
      let qA = JSON.parse(fs.readFileSync("./json/QUICKACCESS.JSON"));
      link = qA[quickAccess].link;
      title = qA[quickAccess].title;
    }
    else {
      msg.reply(translation('somethingWentWrong') + " " + translation('quickAccessDoesntExist'));
      return;
    }
  }

  if (searchPhrase.startsWith('http')) link = searchPhrase;

  if (!link) {
    // Firstly find a link
    const mySearch = requireUncached('./search.js');
    mySearch(msg, [[searchPhrase], true, appArgs[1]]).then(
      (args) => {
        startVideo(args[0], msg, args[1], appArgs);
      }
    ).catch(err => {
      console.warn("Возникла ошибка:\n", err, "\n");
      msg.reply(translation('errorOccurred') + "\n```" + err + "```\n", translation('errorEmbed'));
    });
  }
  else startVideo(link, msg, title, appArgs);

}

function startVideo(link, msg, title, appArgs) {
  // We need to get stream of video (URL), so we can play it back
  // Executing youtube-dl
  let queue = [];
  if (fs.existsSync('./json/PLAYLIST.JSON')) queue = JSON.parse(fs.readFileSync('./json/PLAYLIST.JSON', 'utf8'));
  
  exec(`youtube-dl -g -x ${link}`)
    .then(result => {
        let resultLink = result.stdout.trim();
        if (msg.member.voiceChannel) {
          let justAdded = false;
          msg.member.voiceChannel.join()
            .then(connection => { // Connection is an instance of VoiceConnection
              if (appArgs[0] == "playlist") {
                queue.forEach(x => {x.currentlyPlaying = false; x.last = false;});
                console.log(link);
                let v = queue.find(x => x.link == link);
                v.currentlyPlaying = true;
                v.last = true;
              }
              else {
                queue.forEach(x => {x.currentlyPlaying = false; x.last = false;});
                queue = queue.filter(x => x.title !== title);
                queue.push({link: link, title: title, currentlyPlaying: true, last: true});
              }
              justAdded = true;
              setTimeout(() => {justAdded = false}, 5000);
              fs.writeFileSync('./json/PLAYLIST.JSON', JSON.stringify(queue), 'utf8');
              if (appArgs[1] != "silent") msg.reply(translation('connectedPlaying', "LINK", link));
              try {
                connection.playArbitraryInput(resultLink).on('end', () => {
                  // console.log("I ended");
                  if (!justAdded) {
                    let queue = JSON.parse(fs.readFileSync('./json/PLAYLIST.JSON', 'utf8'));
                    queue.forEach(x => x.currentlyPlaying = false);
                    fs.writeFileSync('./json/PLAYLIST.JSON', JSON.stringify(queue), 'utf8');
                  }
                  else justAdded = false;
                });
              }
              catch (e) {
                console.log(1, e);
                msg.reply(translation('somethingWentWrong') + `\n${e}`);
                msg.member.voiceChannel.leave();
              }
            }).catch(e => {
              console.log(2, e);
              msg.reply(translation('somethingWentWrong') + `\n${e}`);
              msg.member.voiceChannel.leave();
            });
        } else
          msg.reply(translation('youMustBeInGroup'));
    }).catch(err => {
      console.warn("Возникла ошибка:\n", err, "\n");
      msg.reply(translation('errorOccurred') + "\n```" + err + "```\n");
      msg.member.voiceChannel.leave();
    });
}

function requireUncached(module) {
    delete require.cache[require.resolve(module)]
    return require(module)
}