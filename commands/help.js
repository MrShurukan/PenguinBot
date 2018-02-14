const fs = require("fs");
module.exports = msg => msg.reply(fs.readFileSync("txt/help.txt", "utf8"));