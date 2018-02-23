const search = require('youtube-search');
const fs = require('fs');
const Discord = require('discord.js')

const searchArgs = {
  maxResults: 4,
  key: fs.readFileSync('GKEY.TXT', 'utf8').trim()
}

let lang, translation;

module.exports = (msg, args) => {
  return new Promise((resolve, reject) => {
    // Pick the language
    if (fs.existsSync('LANG.TXT')) lang = fs.readFileSync('LANG.TXT', 'utf8').trim();
    else lang = "ENGLISH";

    // Load translation file
    if (lang == "RUSSIAN") translation = requireUncached('../translationsRussian.json');
    else translation = requireUncached('../translationsEnglish.json');


    let searchPhrase = args[0].join(" ");
    let firstVideo = args[1];
    // Firstly find a link
    if (args[2] != "silent") msg.reply(translation.startingSearch);
    searchVideo(searchPhrase)
    .then((results) => {
      if (args[2] != "silent" && results.length != 0) msg.reply(translation.gotResults);
      if (results.length == 0) {
        msg.reply(translation.nothingWasFound);
        return;
      }
      let videos = results.filter(x => x.kind == "youtube#video");
      if (firstVideo === true) {
        if (videos.length == 0) reject(translation.nothingWasFound);
        else resolve([videos[0].link, videos[0].title]);
        return;
      }

      let channels = results.filter(x => x.kind == "youtube#channel");
      let playlists = results.filter(x => x.kind == "youtube#playlist");
      for (let channel of channels) {
        msg.channel.send(
          new Discord.RichEmbed()
          .setTitle(channel.title)
          .setColor(11013390)
          .setURL(channel.link)
          .addField(translation.description, modDescription(channel.description))
          .setThumbnail(channel.thumbnails.high.url)
        );
      }
      for (let playlist of playlists) {
        msg.channel.send(
          new Discord.RichEmbed()
          .setTitle(playlist.title)
          .setColor(895085)
          .setURL(playlist.link)
          .addField(translation.description, modDescription(playlist.description))
          .setThumbnail(playlist.thumbnails.high.url)
        );
      }
      let quickAccessN = 1;
      let quickAccess = {};
      for (let video of videos) {
        msg.channel.send(
          new Discord.RichEmbed()
          .setTitle(video.title)
          .setColor(881320)
          .setURL(video.link)
          .addField(translation.description, modDescription(video.description))
          .setThumbnail(video.thumbnails.high.url)
          .addField(translation.quickAccess, "```" + insTr(translation.quickAccessN, 'N', quickAccessN) + "```")
        );
        quickAccess[`@${quickAccessN}`] = {link: video.link, title: video.title};
        quickAccessN++;
      }
      fs.writeFileSync('./json/QUICKACCESS.JSON', JSON.stringify(quickAccess), 'utf8');
      // console.log(JSON.stringify(playlists, null, 2));
    })
    .catch(err => {
      console.warn("Возникла ошибка:\n", err, "\n");
      msg.reply(translation.errorOccurred + "\n```" + err + "```\n", translation.errorEmbed);
    });
  });
}

function searchVideo(title) {
  return new Promise((resolve, reject) => {
    search(title, searchArgs, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

//insertTranslation
function insTr(translation, title, content) {
	return translation.replace(new RegExp(`{${title}}`, "g"), content)
}

function modDescription(str) {
  if (str.length == 0) return translation.noDescription;

  let size = 100;
  if (str.length > size)
    str = str.substring(0, size) + "...";
  return str;
}

function requireUncached(module) {
    delete require.cache[require.resolve(module)]
    return require(module)
}
