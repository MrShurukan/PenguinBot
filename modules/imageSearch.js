const GoogleImages = require('google-images');
const fs = require('fs');

const client = new GoogleImages(fs.readFileSync('CSE.TXT', 'utf8').trim(), fs.readFileSync('API.TXT', 'utf8').trim());

module.exports = (msg, args) => {
  // Pick the language
  if (fs.existsSync('LANG.TXT')) lang = fs.readFileSync('LANG.TXT', 'utf8').trim();
  else lang = "ENGLISH";

  // Load translation file
  if (lang == "RUSSIAN") translation = requireUncached('../translationsRussian.json');
  else translation = requireUncached('../translationsEnglish.json');

  args = args[0];     // Cut off arguments from other parts of program, we don't need them

  let wordQuery = args.join(" ");

  client.search(wordQuery).then(images => {
    if (images.length == 0) msg.reply(translation.nothingWasFound);
    else msg.reply(images[0].url);
  }).catch(e => {
    msg.reply(translation.somethingWentWrong, `\n${e}`);
  });


}

function requireUncached(module) {
    delete require.cache[require.resolve(module)]
    return require(module)
}
