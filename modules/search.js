const search = require('youtube-search');
const fs = require('fs');
const Discord = require('discord.js')

//Load translation file
const translation = require('../translations.json');

const searchArgs = {
  maxResults: 4,
  key: fs.readFileSync('GKEY.TXT', 'utf8').trim()
}

module.exports = (msg, args) => {
  return new Promise((resolve, reject) => {
    let searchPhrase = args[0].join(" ");
    let firstVideo = args[1];
    // Firstly find a link
    msg.reply(translation.startingSearch);
    searchVideo(searchPhrase)
    .then((results) => {
      msg.reply(translation.gotResults);
      // console.log(results);
      let videos = results.filter(x => x.kind == "youtube#video");
      if (firstVideo === true) {
        resolve(videos[0].link);
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
          .setDescription(channel.description)
          .setThumbnail(channel.thumbnails.high.url)
        );
      }
      for (let playlist of playlists) {
        msg.channel.send(
          new Discord.RichEmbed()
          .setTitle(playlist.title)
          .setColor(895085)
          .setURL(playlist.link)
          .setDescription(playlist.description)
          .setThumbnail(playlist.thumbnails.high.url)
        );
      }
      for (let video of videos) {
        msg.channel.send(
          new Discord.RichEmbed()
          .setTitle(video.title)
          .setColor(881320)
          .setURL(video.link)
          .setDescription(video.description)
          .setThumbnail(video.thumbnails.high.url)
        );
      }
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
