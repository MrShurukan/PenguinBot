const fs = require('fs');
module.exports = (msg) => {
    Promise.all([
      getAsyncContent("./txt/help1.txt"),
      getAsyncContent("./txt/help2.txt")
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
