const GoogleImages = require('google-images');
const fs = require('fs');

const CSE = fs.existsSync('CSE.TXT') ? fs.readFileSync('CSE.TXT', 'utf8').trim() : null;
const APT = fs.existsSync('API.TXT') ? fs.readFileSync('API.TXT', 'utf8').trim() : null;
let client;
if (CSE && API) client = new GoogleImages(fs.readFileSync('CSE.TXT', 'utf8').trim(), fs.readFileSync('API.TXT', 'utf8').trim());

const translation = require('./translation.js');

module.exports = (msg, args) => {
  args = args[0];     // Cut off arguments from other parts of program, we don't need them

  if (!CSE || !API) {
    msg.reply(translation('noCSE_data'));
    return;
  }

  let wordQuery = args.join(" ");

  client.search(wordQuery).then(images => {
    if (images.length == 0) msg.reply(translation('nothingWasFound'));
    else msg.reply(images[0].url);
  }).catch(e => {
    msg.reply(translation('somethingWentWrong'), `\n${e}`);
  });


}

function requireUncached(module) {
    delete require.cache[require.resolve(module)]
    return require(module)
}
