# Penguin Bot

*English speaking people can read this same readme [here](https://github.com/MrShurukan/PenguinBot/blob/master/README.md)*

Пожалуйста, игнорируйте сообщение сверху, если вы из России-Матушки

Это проект Дискорд Бота, который способен делать кучу разных вещей. Ну, КУЧУ, так как расширить его функционал очень легко: он может принимать файлы на JavaScript прямо на ходу (Его легко кодить и дебажить)
Этот бот работает на [Node JS (английский язык)](https://nodejs.org/en/)

Список всех фич вы можете просмотреть в файле [txt/help1](https://github.com/MrShurukan/PenguinBot/blob/master/txt/help1Russian.txt) и [txt/help2](https://github.com/MrShurukan/PenguinBot/blob/master/txt/help2Russian.txt)

## Как добавить бота на Ваш Дискорд Сервер

Сейчас это еще фича еще не доступна, так как бот находится еще в разработке и почти постоянно включается и выключается мной.
Однако, если Вы хотите опробовать фичи этого бота, то Вы можете скачать репозиторий и запустить его самостоятельно!

(Просмотрите секцию [*Внимание!*](https://github.com/MrShurukan/PenguinBot/blob/master/RUSREADME.md#%D0%92%D0%BD%D0%B8%D0%BC%D0%B0%D0%BD%D0%B8%D0%B5) для списка того, что нужно скачать/настроить и секцию [*Использование*](https://github.com/MrShurukan/PenguinBot/blob/master/RUSREADME.md#%D0%98%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5))

## Внимание!

Если вы хотите использовать этого бота, то Вам нужно установить "youtube-dl" в Вашу систему.

* Если вы на Linux, вы можете использовать `sudo apt-get install youtube-dl` или любую другую команду (*yum*, например) смотря на каком дистрибутиве Linux Вы находитесь
* Пользователям Windows нужно зайти на [официальный сайт](https://rg3.github.io/youtube-dl/download.html) и скачать его там (Windows.exe)

Что это такое? Да, прекрасный вопрос!
youtube-dl позволяет легко получать потоки (стримы) видео или звука с YouTube видео, что я и буду тут использовать
Проще говоря, Вы даете ему ссылку на YouTube видео, а он дает Вам ссылку на аудио/видео стрим

Вам также нужно создать несколько файлов в коренной папке: **TOKEN.TXT**, **GKEY.TXT**, **API.TXT** и **CSE.TXT**. Давайте разберем конкретнее, что это такое:

* Внутрь **TOKEN.TXT** Вам нужно закинуть Ваш Дискорд token (**ОБЯЗАТЕЛЬНО ДЛЯ РАБОТЫ**)
* Внутрь **GKEY.TXT** Вам нужно закинуть ваш Google Key.
Чтобы его получить, перейдите [сюда](https://developers.google.com/maps/documentation/javascript/get-api-key). Создайте проект и добавьте YouTube Data API. Теперь скопируйте API Key в этот файл. (**НЕОБЯЗАТЕЛЬНО, требуется для Youtube Проигрывателя (команда "!play")**)
*ВНИМАНИЕ!* Только что созданный Google проект требует пару минут, перед тем, как он начнет работу (до этого времени при попытке его использовать будет ошибка 403)
* Внуть **API.TXT** и **CSE.TXT** Вам нужно поместить информацию о Вашем *Google Custom Search Engine* (API Ключ и CSE соответсвенно).
[Здесь](https://www.npmjs.com/package/google-images#set-up-google-custom-search-engine) Вы можете узнать то, как это нужно сделать. (**НЕОБЯЗАТЕЛЬНО, требуется для поиска картинок в Google Images (команда "!pic")**)

Вот и все, Вы готовы Рок'н'Роллить!

Хотя, возможно Вам нужно будет настроить свой язык:
* В корневой папке есть **LANG.TXT** файл. Внутри него можно выставить свой язык, просто введите *RUSSIAN* или *ENGLISH* заглавными буквами

## Использование

### Настройка Вашего бота

Окей, я предположу, что Вы уже создали Дискорд Бота и прочитали все в секции [*Внимание!*](https://github.com/MrShurukan/PenguinBot/blob/master/RUSREADME.md#%D0%92%D0%BD%D0%B8%D0%BC%D0%B0%D0%BD%D0%B8%D0%B5).
(Если Вы не знаете как создать бота, вот [туториал](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token))

#### Шаг 1:
Выберите папку, куда Вы бы хотели сохранить файлы бота, перейдите туда и введите следующее в вашу консоль:
```
git clone https://github.com/MrShurukan/PenguinBot
cd PenguinBot
npm install
```
Это скачает проект и установит все его зависимости (ну, очевидно, что необходимо иметь *git* и *node* в системе до этого)

#### Шаг 2:
Теперь Вам нужно создать файлы в корневой папке, которые перечислены в секции [*Внимание!*](https://github.com/MrShurukan/PenguinBot/blob/master/RUSREADME.md#%D0%92%D0%BD%D0%B8%D0%BC%D0%B0%D0%BD%D0%B8%D0%B5) и заполнить их необходимыми данными

#### Шаг 3:
???????
#### Шаг 4:
`node server.js`

~~Профит!~~

Поздравляю! Вы только настроили Великого Пенгвина! Добавьте его в свой Дискорд Сервер и вы готовы!


## Содействие

Если Вы хотите, то не стесняйтесь! Любым способом;
Я просмотрю все идеи и предложения!
Вас также запишут снизу!

* **Ilya Zavyalov** - *Изначальная работа* - [MrShurukan](https://github.com/MrShurukan)



## Что нужно знать

* Если вы хотите использовать все фичи этого бота, пожалуйста просмотрите секцию [*Внимание!*](https://github.com/MrShurukan/PenguinBot/blob/master/RUSREADME.md#%D0%92%D0%BD%D0%B8%D0%BC%D0%B0%D0%BD%D0%B8%D0%B5)
* Снимаю шляпу перед теми, кто решил использовать этот код)

> Thanks, and have fun!

\- Gabe Newell
