const request = require('request');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');
const Discord = require('discord.js');

const translation = require('./translation.js');

let ArtistName;
let TrackName;

const TOKEN = fs.existsSync('MUSIXTOKEN.TXT') ? fs.readFileSync('MUSIXTOKEN.TXT', 'utf8').trim() : null;

module.exports = (msg, ARGS) => {
    const alreadyReversed = ARGS[1];
    let args = ARGS[0];


    if (!TOKEN) {
        msg.reply(translation('noMusixToken'));
        return;
    }

    // msg.reply(translation('loadingLyrics'));
    

    ArtistName = args.slice(0, args.indexOf('-')).join(" ");
    TrackName = args.slice(args.indexOf('-') + 1).join(" ");

    if (!ArtistName || !TrackName) {
        msg.reply(translation('nothingWasFound'));
        return;
    }

    console.log(`Searching for ${ArtistName} - ${TrackName}`);
    msg.reply(translation("searchingFor", "NAME", `${ArtistName} - ${TrackName}`));
    
    let url = `https://api.musixmatch.com/ws/1.1/track.search?format=json&callback=callback&q_track=${TrackName}&q_artist=${ArtistName}&s_artist_rating=desc&s_track_rating=desc&quorum_factor=1&page_size=1&page=1&apikey=${TOKEN}`;    
    fetch(url).then(response => {
        response.json().then(x => {
            // console.log(JSON.stringify(x, null, " "))
            if (x.message.body.track_list.length == 0) {
                msg.reply(translation('nothingWasFound'));
                // Try searching backwards
                if (alreadyReversed === undefined) {
                    msg.reply(translation('backwardsSearchAttempt'));
                    requireUncached(`./lyricsStealer`)(msg, [[TrackName, '-', ArtistName], true]);
                }
                return;
            }
            url = x.message.body.track_list[0].track.track_share_url;
            request(url, (error, response, html) => {

                if (!error) {
                    // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
                    const $ = cheerio.load(html);

                    // const LyricsArray = $('.mxm-lyrics__content').text().match(/(.|[\r\n]){1,1000}/g);
                    let LyricsArray = [];
                    let linesArray = $('.mxm-lyrics__content').text().split(/\r?\n/);
                    
                    for (let i = 0; i < linesArray.length; i += 10)
                        LyricsArray.push(linesArray.slice(i, i + 9).join('\n'));

                    let message = new Discord.RichEmbed();
                    for (let i in LyricsArray)
                        message.addField(i == 0 ? translation('lyrics') : "___ ___ ___ ___", LyricsArray[i]);

                    msg.channel.send(message);
                }
            });
        }).catch(err => {
            console.warn("Возникла ошибка:\n", err, "\n");
            msg.reply(translation('errorOccurred') + "\n```" + err + "```\n", translation('errorEmbed'));
        });
    }).catch(err => {
        console.warn("Возникла ошибка:\n", err, "\n");
        msg.reply(translation('errorOccurred') + "\n```" + err + "```\n", translation('errorEmbed'));
    });
}

function requireUncached(module) {
    delete require.cache[require.resolve(module)]
    return require(module)
}