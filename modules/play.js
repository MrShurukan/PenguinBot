const search = require('youtube-search');
const fs = require('fs');

//Load translation file
const translation = require('../translations.json');

module.exports = (msg, args) => {
  args = args[0];   //We don't need any additional args, so we just cut them (We need only words)
  let link = args[0].startsWith("http") ? args[0] : null;
  let searchPhrase = link ? null : args.join(" ");
  if (link) {
    // Directly use a link
  }
  else {
    // Firstly find a link
    // msg.reply(translation.startingSearch);
    const mySearch = requireUncached('./search.js');
    mySearch(msg, [[searchPhrase], true]).then((link) => {
      msg.reply(`I'm going to play ${link}`);
    }).catch(err => {
      console.warn("Возникла ошибка:\n", err, "\n");
      msg.reply(translation.errorOccurred + "\n```" + err + "```\n", translation.errorEmbed);
    });
  }
}

function requireUncached(module) {
    delete require.cache[require.resolve(module)]
    return require(module)
}
