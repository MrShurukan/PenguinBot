# Penguin Bot

*Русскоязычные пользователи могут прочесть эту же инструкцию на русском [здесь](https://github.com/MrShurukan/PenguinBot/blob/master/RUSREADME.md)*

Please ignore the text above if you are not connected to Mother Russia

This is a project of a Discord Bot, that is able to do a lot of different stuff. Like, literally A LOT, because of it's ability to accept JS files on fly (It's really easy to code and debug)
This bot works on [Node JS](https://nodejs.org/en/)

List of all feautures can be found in [txt/help1](https://github.com/MrShurukan/PenguinBot/blob/master/txt/help1English.txt) и [txt/help2](https://github.com/MrShurukan/PenguinBot/blob/master/txt/help2English.txt)

## How to add bot to your Discord Server

Currently this feauture is not here yet, since I'm developing the bot and it's almost constantly turning off and on.
However, if you want to try it out, you might want to download repo and start it yourself!

(Check [*Attention!*](https://github.com/MrShurukan/PenguinBot/blob/master/README.md#attention) section for stuff you need to download/setup and [*Usage*](https://github.com/MrShurukan/PenguinBot/blob/master/README.md#usage) section)

## Attention!

If you want to use this bot, you'll have to install "youtube-dl" to your system

* If you are on Linux, you may use `sudo apt-get install youtube-dl` or any other command (*yum*, for example) depending on your Linux Distro that will let you download it
* Windows users will have to go to [the official website](https://rg3.github.io/youtube-dl/download.html) and download it from there (Windows.exe)

What is it? Ah, great question:
youtube-dl allows you to easily grab streams of video or sound of youtube videos, which I'll be using here
Basically, you give it YouTube link, it gives you the link of audio/video stream

You also need to create few files in the root folder: **TOKEN.TXT**, **GKEY.TXT**, **API.TXT** and **CSE.TXT**. Let's break this down:

* Inside **TOKEN.TXT** you need to put your Discord bot token (**REQUIRED TO WORK AT ALL**)
* Inside **GKEY.TXT** you need to put your Google Key.
To get it you need to go [there](https://developers.google.com/maps/documentation/javascript/get-api-key). Create a project, add YouTube Data API to it and copy the API Key to a file. (**OPTIONAL, needed for Youtube Player ("!play" command)**)
*ATTENTION!* Freshly created Google project needs a few minutes before it (using it while it's getting ready will result in 403 error)
* Inside **API.TXT** and **CSE.TXT** you need to put details of your Google Custom Search Engine (API Key and CSE respectively).
[Here](https://www.npmjs.com/package/google-images#set-up-google-custom-search-engine) you can see how to do that. (**OPTIONAL, needed for Google Image Search ("!pic" command)**)

And that's it, you are ready to Rock'n'Roll!

Although, you might need to setup your language:
* In the root folder there is a **LANG.TXT** file. Inside you can set your language, just put all-capitals *RUSSIAN* or *ENGLISH*

## Usage

### Setting up your own bot

Alright, let's assume you already created a Discord Bot and read everything in [*Attention!*](https://github.com/MrShurukan/PenguinBot/blob/master/README.md#attention) section.
(In case you have no idea on how to create the bot, here's the [tutorial](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token))

#### Step 1:
Choose a folder where you want to save a repo, go there and type following in your console:

```
git clone https://github.com/MrShurukan/PenguinBot
cd PenguinBot
npm install
```

This will download the project and install all dependencies for it (well, obviously you need to install *git* and *node* beforehand)

#### Step 2:
Now you need to create various files, that are listed in [*Attention!*](https://github.com/MrShurukan/PenguinBot/blob/master/README.md#attention) section and fill them with required data

#### Step 3:
???????
#### Step 4:
`node server.js`

~~Profit!~~

Congratulations! You've just set up a Great Penguin Bot! Add it to your Discord Server and you are ready to go!


## Contributing

If you want to, feel free to do so! In any ways;
I'll look into any ideas or suggestions!
You will also be listed down below!

* **Ilya Zavyalov** - *Initial work* - [MrShurukan](https://github.com/MrShurukan)



## Acknowledgments

* If you want to use all feautures of this bot, please check [*Attention!*](https://github.com/MrShurukan/PenguinBot/blob/master/README.md#attention) section
* Hat tip to anyone who's using this code

> Thanks, and have fun!

\- Gabe Newell
