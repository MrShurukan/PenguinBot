const fs = require("fs");
module.exports = (msg) => {
  msg.member.voiceChannel.leave();
  if (fs.existsSync("./json/PLAYLIST.JSON")) {
    let queue = JSON.parse(fs.readFileSync('./json/PLAYLIST.JSON', 'utf8'));
    queue.forEach(x => x.currentlyPlaying = false);
    fs.writeFileSync('./json/PLAYLIST.JSON', JSON.stringify(queue), 'utf8');
  }
}
