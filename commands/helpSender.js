const fs = require('fs');
const prefix = fs.existsSync('PREFIX.TXT') ? fs.readFileSync('PREFIX.TXT', 'utf-8') : "!";

module.exports = (msg) => {
  // Get the language
  let lang = fs.existsSync('LANG.TXT') ?
    fs.readFileSync('LANG.TXT', 'utf8').trim()
    : "ENGLISH";

    lang = (lang == "ENGLISH" ? "English" : "Russian");
  
    Promise.all([
      getAsyncContent(`./txt/help1${lang}.txt`),
      getAsyncContent(`./txt/help2${lang}.txt`)
    ])
    .then(files => {
      for (text of files)
        msg.reply(text.replace(/\$/g, prefix));
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
