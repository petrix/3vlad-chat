require('scssify');
require('./style.scss');
var $ = require('jquery');

var moment = require('moment');
moment.locale('uk');
if (window.File && window.FileReader && window.FileList && window.Blob) {} else {
    alert('The File APIs are not fully supported in this browser.');
}

var synth = window.speechSynthesis;

var lang = window.navigator.languages ? window.navigator.languages[0] : null;
    lang = lang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
if (lang.indexOf('-') !== -1)
    lang = lang.split('-')[0];
if (lang.indexOf('_') !== -1)
    lang = lang.split('_')[0];
console.log(lang);

// var translateY = $(window).height();
// $('.mainWindow').width($(window).width());
// var translateY = $('.mainWindow').height();

// $('.mainWindow').height($(window).width()/2.4);
function resize() {
    // $('.mainWindow').width($(window).width());
    // $('.mainWindow').height($(window).width()/2.4);

    // var bodyWidth = $(window).width();
    // var bodyHeight = $(window).height();
    translateY = $('.mainWindow').height();
    // console.log(bodyWidth/bodyHeight);
    $('.mainWindow').width($(window).width());
    $('.mainWindow').height($(window).width()/2.4);
    $('.sendMsgWindow').css({'bottom':($(window).height()-$(window).width()/2.4)/2+'px'})
    $('.msgWindow').children().remove();
    ii = 0; 
}
resize();

$(window).on('resize', resize);
// var translateY = $(window).height();
// console.log(translateY);
var translateMessageStep = 100;
var translateSysStep = 80;
$('.currentTime').html(moment(new Date()).format('HH:mm'));

var scenario = [
    {"userAlias":"ДП","userValue":"Денис «БЭТМЕН» Поздняков",           "message":"Всем привет! С пятницей, коллеги!"},
    {"userAlias":"АВ","userValue":"Алена Власюк HR",	                "message":"waving.png"},
    {"userAlias":"АЗ","userValue":"Александр «СУПЕРМЕН» Злобин",	    "message":"giphy.png"},
    {"userAlias":"ЕБ","userValue":"Елена Билобородько КОММЕРЦИЯ",       "message":"dance.png"},
    {"userAlias":"АК","userValue":"Александр Крупка РАЗВИТИЕ",	        "message":"champagne.png"},
    {"userAlias":"АГ","userValue":"Андрей Герц СЛУЖБА БЕЗОПАСНОСТИ",	"message":"Кто-то уже пьет на рабочем месте?"},
    {"userAlias":"АГ","userValue":"Андрей Герц СЛУЖБА БЕЗОПАСНОСТИ",	"message":"Я по камерам везде проверю!"},
    {"userAlias":"АГ","userValue":"Андрей Герц СЛУЖБА БЕЗОПАСНОСТИ",	"message":"Даже в туалете!"},
    {"userAlias":"ДП","userValue":"Денис «БЭТМЕН» Поздняков",	        "message":"Несмотря на пятницу, чатик рабочий."},
    {"userAlias":"АК","userValue":"Александр Крупка РАЗВИТИЕ",	        "message":"fire.png"},
    {"userAlias":"ДП","userValue":"Денис «БЭТМЕН» Поздняков",	        "message":"Есть актуальные вопросы."},
    {"userAlias":"ДП","userValue":"Денис «БЭТМЕН» Поздняков",	        "message":"Их надо решить в кратчайшие сроки!"},
    {"userAlias":"МИ","userValue":"Михаил Иванцов МАРКЕТИНГ",	        "message":"sad.png"},
    {"userAlias":"АМ","userValue":"Александр Магдык ФИНАНСЫ",	        "message":"sad2.png"},
    {"userAlias":"СГ","userValue":"Сергей Галаса «Гадкий я!» IT-ОТДЕЛ",	"message":"sad8.png"},
    {"userAlias":"ДП","userValue":"Денис «БЭТМЕН» Поздняков",	        "message":"Итак, главный вопрос на повестке дня."},
    {"userAlias":"ДП","userValue":"Денис «БЭТМЕН» Поздняков",	        "message":"Коллеги, нас с вами ждет открытие нового магазина!"},
    {"userAlias":"ДП","userValue":"Денис «БЭТМЕН» Поздняков",	        "message":"У кого есть настроение свалить из Киева в командировку?"},
    {"userAlias":"СО","userValue":"Сергей ОТДЕЛ ПРОДАЖ",	            "message":"У меня!"},
    {"userAlias":"ВО","userValue":"Валерий ОТДЕЛ ПРОДАЖ",	            "message":"Я хочу!"},
    {"userAlias":"КО","userValue":"Константин ОТДЕЛ ПРОДАЖ",	        "message":"Можно я поеду?"},
    {"userAlias":"ЕО","userValue":"Евгений ОТДЕЛ ПРОДАЖ",	            "message":"У меня уже собрана сумка."},
    {"userAlias":"АЗ","userValue":"Александр «СУПЕРМЕН» Злобин",	    "message":"Я на ЖД, куда ехать?"},
    {"userAlias":"ДП","userValue":"Денис «БЭТМЕН» Поздняков",	        "message":"Новый магазин будет открываться в пгт. Черный Папоротник."},
    {"userAlias":"ДП","userValue":"Денис «БЭТМЕН» Поздняков",	        "message":"Старозабытого района" },
    {"userAlias":"ДП","userValue":"Денис «БЭТМЕН» Поздняков",	        "message":"Луганской области."},
    {"userAlias":"СО","userValue":"Сергей ОТДЕЛ ПРОДАЖ",	            "message":"Я не могу, у меня теща приезжает. Я ее очень люблю."},
    {"userAlias":"ВО","userValue":"Валерий ОТДЕЛ ПРОДАЖ",	            "message":"Я заболел. Если надо принесу больничный."},
    {"userAlias":"system","userValue":"system",	                        "message":"Константин ОТДЕЛ ПРОДАЖ удалился из чата."},
    {"userAlias":"ЕО","userValue":"Евгений ОТДЕЛ ПРОДАЖ",	            "message":"У меня украли сумку. Только что."},
    {"userAlias":"АЗ","userValue":"Александр «СУПЕРМЕН» Злобин",	    "message":"ЖД заминировали. Все поезда отменили."},
    {"userAlias":"ДП","userValue":"Денис «БЭТМЕН» Поздняков",	        "message":"Жаль... За открытие полагается премия в размере двух окладов."},
    {"userAlias":"ДП","userValue":"Денис «БЭТМЕН» Поздняков",	        "message":"Желающих все-таки нет?"},
    {"userAlias":"СО","userValue":"Сергей ОТДЕЛ ПРОДАЖ",	            "message":"Я!"},
    {"userAlias":"ВО","userValue":"Валерий ОТДЕЛ ПРОДАЖ",	            "message":"Я!"},
    {"userAlias":"system","userValue":"system",	                        "message":"Константин ОТДЕЛ ПРОДАЖ вернулся в чат."},
    {"userAlias":"КО","userValue":"Константин ОТДЕЛ ПРОДАЖ",	        "message":"Я!"},
    {"userAlias":"ЕО","userValue":"Евгений ОТДЕЛ ПРОДАЖ",	            "message":"Я!"},
    {"userAlias":"АЗ","userValue":"Александр «СУПЕРМЕН» Злобин",	    "message":"Я! Я уже в городе! "},
    {"userAlias":"АЗ","userValue":"Александр «СУПЕРМЕН» Злобин",	    "message":"На какой улице будет магазин?"},
    {"userAlias":"АЗ","userValue":"Александр «СУПЕРМЕН» Злобин",	    "message":"Тут их просто две."},
    {"userAlias":"system","userValue":"system",	                        "message":"Денис «Бэтмен» Поздняков добавил в чат МЕЛИК-МАМЕД."},
    {"userAlias":"ДП","userValue":"Денис «БЭТМЕН» Поздняков",	        "message":"Встречайте нашего нового акционера!"},
    {"userAlias":"ДП","userValue":"Денис «БЭТМЕН» Поздняков",	        "message":"И нового супергероя!"},
    {"userAlias":"КГ","userValue":"Карен Галустян",	                    "message":"А из какой он страны?"},
    {"userAlias":"ДП","userValue":"Денис «БЭТМЕН» Поздняков",	        "message":"flag.png"},
    {"userAlias":"system","userValue":"system",	                        "message":"Карен Галустян покинул чат."},
    {"userAlias":"АЗ","userValue":"Александр «СУПЕРМЕН» Злобин",	    "message":"Ребят, добавьте в чат регионалов!"},
    {"userAlias":"system","userValue":"system",	                        "message":"Николай Азаров добавлен в чат."},
    {"userAlias":"system","userValue":"system",	                        "message":"Виктор Янукович добавлен в чат."},
    {"userAlias":"НА","userValue":"Николай Азаров",		                "message":"Здоровеньки були!"},
    {"userAlias":"НА","userValue":"Николай Азаров",		                "message":"Всем привет от ригионалов!"},
    {"userAlias":"НА","userValue":"Николай Азаров",		                "message":"Витя, ты где?"},
    {"userAlias":"ВЯ","userValue":"Виктор Янукович",		            "message":"Я тут!"},
    {"userAlias":"ВЯ","userValue":"Виктор Янукович",		            "message":"Не могу увимк..."},
    {"userAlias":"ВЯ","userValue":"Виктор Янукович",		            "message":"Не могу увикнмнм..."},
    {"userAlias":"ВЯ","userValue":"Виктор Янукович",		            "message":"Уивнкнмнмуты..."},
    {"userAlias":"ВЯ","userValue":"Виктор Янукович",		            "message":"Не могу увимкнуты оповещения!"},
    {"userAlias":"system","userValue":"system",	                        "message":"Виктора Януковича удалили из чата."},
    {"userAlias":"НА","userValue":"Николай Азаров",		                "message":"Витя, куда ты ушел?"},
    {"userAlias":"system","userValue":"system",	                        "message":"Николай Азарова удалили из чата."},
    {"userAlias":"АЗ","userValue":"Александр «СУПЕРМЕН» Злобин",	    "message":"Вы не тех регионалов в чат добавили!"},
    {"userAlias":"ДП","userValue":"Денис «БЭТМЕН» Поздняков",	        "message":"Это у нас «чат» глючит."},
    {"userAlias":"АГ","userValue":"Андрей Герц СЛУЖБА БЕЗОПАСНОСТИ",	"message":"Да, это проблемы с сервером."},
    {"userAlias":"СГ","userValue":"Сергей Галаса «Гадкий я!» IT-ОТДЕЛ",	"message":"impossible_meme.png"},
    {"userAlias":"ОК","userValue":"Отдел продаж КИЕВ",		            "message":"Ребята, пришлите новые модели Айфонов в магазин на Крещатике!"},
    {"userAlias":"ОП","userValue":"Отдел продаж Пырятын",		        "message":"Вышлите модели телефонов с фонариками в Пырятын!"},
    {"userAlias":"ОП","userValue":"Отдел продаж Пырятын",		        "message":"У нас на улице света нет! Модели с фонариками заканчиваются!"},
    {"userAlias":"СГ","userValue":"Сергей Галаса «Гадкий я!» IT-ОТДЕЛ",	"message":"impossible_meme.png"},
    {"userAlias":"АВ","userValue":"Алена Власюк HR",	                "message":"Кто потратил «золотую овацию» отправив менеджера за пивом?"},
    {"userAlias":"ДП","userValue":"Денис «БЭТМЕН» Поздняков",	        "message":"Ахаха, смешно!"},
    {"userAlias":"АЗ","userValue":"Александр «СУПЕРМЕН» Злобин",	    "message":"Не смешно, это не нормально!"},
    {"userAlias":"СГ","userValue":"Сергей Галаса «Гадкий я!» IT-ОТДЕЛ",	"message":"norma_meme.png"},
    {"userAlias":"СЧ","userValue":"СЧАСТЛИВЧИК",	                    "message":"Ребята, завтра все будут на корпоративе?"},
    {"userAlias":"ДП","userValue":"Денис «БЭТМЕН» Поздняков",	        "message":"Да!"},
    {"userAlias":"ЕБ","userValue":"Елена Билобородько КОММЕРЦИЯ",	    "message":"Да!"},
    {"userAlias":"СЧ","userValue":"СЧАСТЛИВЧИК",	                    "message":"Я вам из отпуска подарки везу!"},
    {"userAlias":"АГ","userValue":"Андрей Герц СЛУЖБА БЕЗОПАСНОСТИ",	"message":"А где ты был?"},
    {"userAlias":"СЧ","userValue":"СЧАСТЛИВЧИК",	                    "message":"В Китае!"},
    {"userAlias":"system","userValue":"system",	                        "message":"Лена Билобородько КОММЕРЦИЯ удалилась из чата."},
    {"userAlias":"system","userValue":"system",	                        "message":"Андрей Герц СЛУЖБА БЕЗОПАСНОСТИ удалился из чата."},
    {"userAlias":"СЧ","userValue":"СЧАСТЛИВЧИК",	                    "message":"Я немного кашляю, но выпью терафлю и буду в порядке!"},
    {"userAlias":"system","userValue":"system",	                        "message":"Денис «Бэтмен» Поздняков удалил чат."}
    ];

$('.fa-paperclip').on('click', function () {
isPlaying=false;
});
var ii;
var int;
var isPlaying = false;
$('.fa-paper-plane').on('click', function () {
    isPlaying = true;
    $('.mainWindow').width($(window).width());
    $('.mainWindow').height($(window).width()/2.4);
    $('.sendMsgWindow').css({'bottom':($(window).height()-$(window).width()/2.4)/2+'px'})
    $('.msgWindow').children().remove();
    ii = 0; 
    firstCicle();
});

    function firstCicle() {
if(isPlaying){
        function voiceStartCallback() {
            console.log("Voice started");
        }
         
        var parameters = {
            onstart: voiceStartCallback,
            onend: voiceEndCallback
        }

        if (scenario[ii].userAlias == 'system') {

            systemMessage(scenario[ii].message);
            speak(scenario[ii].message).then(function (x) {
                console.log(x);
            });
        } else {

            userMessage(scenario[ii].userAlias,scenario[ii].userValue, scenario[ii].message);
            speak(scenario[ii].message);
        }
        }
    //         setTimeout(() => {
    //             ii++;
    //     firstCicle();
    // }, 1000);
    } 

        function voiceEndCallback() {
            console.log("Voice ended");
            lastUserName = scenario[ii].userValue;
            ii++;
            firstCicle();
        }

$('.fa-smile').on('click', function () {
    systemMessage('Системное сообщение');
});
var lastUserName;

function userMessage(userID, user, message) {

    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', './assets/new_message_sound.mp3');
    audioElement.load();
    audioElement.play();
    var aricleClass = new Date().getTime();
    if (lastUserName == user) {
        if (message.split('.')[1] == 'png') {
            $('.msgWindow').append('<article class=' + aricleClass + '><div class="userPlace"></div><div><div class="userMsg ' + message.split('.')[0] + '"></div></div></article>');
        } else {
            $('.msgWindow').append('<article class=' + aricleClass + '><div class="userPlace"></div><div><div class="userMsg">' + message + '</div></div></article>');
        }
    } else {
        if (message.split('.')[1] == 'png') {
            $('.msgWindow').append('<article class=' + aricleClass + '><div class="userIcon">'+userID+'</div><div><div class="userName">' + user + '</div><div class="userMsg ' + message.split('.')[0] + '"></div></div></article>');
        } else {
            $('.msgWindow').append('<article class=' + aricleClass + '><div class="userIcon">'+userID+'</div><div><div class="userName">' + user + '</div><div class="userMsg">' + message + '</div></div></article>');
        }
    }

    var currentHeight = $('.' + aricleClass).height();
    var translateVar = translateY - currentHeight - translateMessageStep;
    translateY = translateY - currentHeight - 10;
    $('.msgWindow').css({
        'transform': 'translate(0px,' + translateVar + 'px)'
    }, 100);
    console.log(user);
    lastUserName = user;
}


function systemMessage(message) {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', './assets/system_message_sound.mp3');
    audioElement.load();
    audioElement.play();
    var aricleClass = new Date().getTime();
    $('.msgWindow').append('<div class="'  +aricleClass + ' systemMessage">' + message + '</div>');
    var currentHeight = $('.' + aricleClass).height();
    var translateVar = translateY - currentHeight - translateMessageStep;
    translateY = translateY - currentHeight - 10;
    $('.msgWindow').css({
        'transform': 'translate(0px,' + translateVar + 'px)'
    }, 100);
    lastUserName == "system";
    console.log(translateY);
}


var voiceSelect = document.querySelector('select');

function populateVoiceList() {
    voices = synth.getVoices().sort(function (a, b) {
    //   console.log(a, b);
  
      const aname = a.name.toUpperCase(),
        bname = b.name.toUpperCase();
      if (aname < bname) return -1;
      else if (aname == bname) return 0;
      else return +1;
    });
    var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
    voiceSelect.innerHTML = '';
    for (i = 0; i < voices.length; i++) {
    //   console.log(voices[i].lang);
      if (voices[i].lang === 'ru-RU') {
  var option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
            option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
          voiceSelect.appendChild(option);
      }
    }
    voiceSelect.selectedIndex = selectedIndex;
  }


  populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak(inputTxt) {
    if (synth.speaking) {
      console.error('speechSynthesis.speaking');
      return;
    }
    if (inputTxt !== '') {
      var utterThis = new SpeechSynthesisUtterance(inputTxt);
      utterThis.onend = function (event) {
        console.log( event.elapsedTime + ' milliseconds.');
        voiceEndCallback();
      }
    
      utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
      }
      var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
      for (i = 0; i < voices.length; i++) {
        if (voices[i].name === selectedOption) {
          utterThis.voice = voices[i];
          break;
        }
      }
      utterThis.pitch = 1;
      utterThis.rate = 0.8;
      utterThis.lang = "ru-RU";
      utterThis.volume = 1;
      synth.speak(utterThis);
    }
  }