const fs = require('fs');

let lang, translation;

module.exports = (msg) => {
  // Pick the language
  if (fs.existsSync('LANG.TXT')) lang = fs.readFileSync('LANG.TXT', 'utf8').trim();
  else lang = "ENGLISH";

  // Load translation file
  if (lang == "RUSSIAN") translation = requireUncached('../translationsRussian.json');
  else translation = requireUncached('../translationsEnglish.json');

    Promise.all([
      getAsyncContent(lang == "ENGLISH" ? "./txt/help1English.txt" : "./txt/help1Russian.txt"),
      getAsyncContent(lang == "ENGLISH" ? "./txt/help2English.txt" : "./txt/help2Russian.txt")
    ])
    .then(files => {
      for (text of files)
        msg.reply(text);
    });
}

//Helper functions
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
