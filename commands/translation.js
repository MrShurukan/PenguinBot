const fs = require('fs');

// Insert in Tranlation
const insTr = (translation, title, content) =>
    translation.replace(new RegExp(`{${title}}`, "g"), content)

module.exports = (property, replaceWhat = null, replaceWith = null) => {
    // Pick the language
    const lang = fs.existsSync('LANG.TXT') ?
        fs.readFileSync('LANG.TXT', 'utf8').trim() :
        "ENGLISH"

    // Load translation file
    const translation = (lang == "RUSSIAN") ?
        requireUncached('../translations/translationsRussian.json') :
        requireUncached('../translations/translationsEnglish.json')


    return replaceWhat ?
        insTr(translation[property], replaceWhat, replaceWith) :
        translation[property];
}


// Support functions
function requireUncached(module) {
    delete require.cache[require.resolve(module)]
    return require(module)
}