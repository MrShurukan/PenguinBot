const fs = require("fs");
module.exports = (msg) => {

  // Pick the language
  if (fs.existsSync('LANG.TXT')) lang = fs.readFileSync('LANG.TXT', 'utf8').trim();
  else lang = "ENGLISH";

  // Load translation file
  if (lang == "RUSSIAN") translation = requireUncached('../translationsRussian.json');
  else translation = requireUncached('../translationsEnglish.json');

  msg.reply(translation.stopped);
  msg.member.voiceChannel.leave();
  if (fs.existsSync("./json/PLAYLIST.JSON")) {
    let queue = JSON.parse(fs.readFileSync('./json/PLAYLIST.JSON', 'utf8'));
    queue.forEach(x => x.currentlyPlaying = false);
    fs.writeFileSync('./json/PLAYLIST.JSON', JSON.stringify(queue), 'utf8');
  }
}

function requireUncached(module) {
    delete require.cache[require.resolve(module)]
    return require(module)
}
