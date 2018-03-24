const fs = require("fs");
const translation = require('./translation.js');

module.exports = (msg) => {
  
  msg.reply(translation('stopped'));
  if (msg.member.voiceChannel !== undefined) msg.member.voiceChannel.leave();
  else return;
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
