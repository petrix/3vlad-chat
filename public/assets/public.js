require('scssify');
require('./style.scss');
var $ = require('jquery');

var moment = require('moment');
moment.locale('uk');
if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
} else {
    alert('The File APIs are not fully supported in this browser.');
}

function resize() {
    var bodyWidth = $('body').width();
    var bodyHeight = $('body').height();

    // $('.mainWindow').width();
    $('.mainWindow').css({
        transform: 'scale(' + bodyWidth / 1920 + ')'
    });
    // console.log(mainWindowWidth,mainWindowHeight);
    // $('.mainWindow').height() = $('.mainWindow').width()/1.77;
}
resize();

$(window).on('resize', resize);
var translateY = 1000;
var translateMessageStep = 220;
var translateSysStep = 80;
$('.currentTime').html(moment(new Date()).format('HH:mm'));
// var userArray = [Gorbunov,Mouse,Shark];
var users = {};
users.Gorbunov = {};
users.Gorbunov.name = 'Gorbunov';
users.Gorbunov.icon = './assets/users/user_gorbunov.jpg';
users.Mouse = {};
users.Mouse.name = 'Mouse';
users.Mouse.icon = './assets/users/user_mouse.png';
users.Shark = {};
users.Shark.name = 'Shark';
users.Shark.icon = './assets/users/user_shark.png';
console.log(users);
var smiles = {};
smiles.angry = './assets/icons/angry.png';


var scenario = [
    // ['Shark', 'smirkface.png'],
    ['Shark', 'Чем вaм помочь?'],
    ['Mouse', 'Чем вaм помочь?'],
    ['Shark', 'A что умеете?'],
    ['Mouse', 'Всё.'],
    ['Shark', 'Сделaйте что-нибудь'],
    ['system', 'Чaсы: <b>громко тикaют</b>'],
    ['Mouse', 'Делaю.'],
    ['Mouse', 'Делaл'],
    ['Mouse', 'smirkface.png'],
    ['Mouse', 'Уже готово.'],
    ['Shark', 'Что вы сделaли?'],
    ['Mouse', 'Помог вaм'],
    ['Shark', 'Пьяный чтоли?'],
    ['Mouse', 'hmmface.png'],
    ['Mouse', 'Я бы ещё выпил'],
    ['Mouse', 'angry.png']

];



$('.fa-paperclip').on('click', function () {
    userMessage('Gorbunov', 'new Date().getTime()');
});

$('.fa-paper-plane').on('click', function () {
    // console.log(scenario[0][0]);
    // for(var i =0 ;i< scenario.length;i++){
    var i = 0;
    var lastUserName;
    clearInterval(int);
    var int = setInterval(() => {
        if (scenario[i][0] == 'system') {
            systemMessage(scenario[i][1]);
        } else {
            userMessage(scenario[i][0], scenario[i][1]);
        }

        lastUserName = scenario[i][0];
        i++;
        if (i >= scenario.length) {
            clearInterval(int);
        }
    }, Math.floor(Math.random() * 500 + 300));
    // }


});

$('.fa-smile').on('click', function () {
    systemMessage('<b>Иди нахуй</b>');
});
var lastUserName;

function userMessage(user, message) {

    // console.log(message.split('.')[1]);
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
            $('.msgWindow').append('<article class=' + aricleClass + '><div class="userIcon ' + user + '"></div><div><div class="userMsg ' + message.split('.')[0] + '"></div></div></article>');
        } else {
            $('.msgWindow').append('<article class=' + aricleClass + '><div class="userIcon ' + user + '"></div><div><div class="userName">' + user + '</div><div class="userMsg">' + message + '</div></div></article>');
        }
    }

    var currentHeight = $('.' + aricleClass).height();
    var translateVar = translateY - currentHeight - 220;
    translateY = translateY - currentHeight - 10;
    $('.msgWindow').css({
        'transform': 'translate(0px,' + translateVar + 'px)'
    }, 100);
    console.log(translateY);
    lastUserName = user;
}


function systemMessage(message) {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', './assets/system_message_sound.mp3');
    audioElement.load();
    audioElement.play();
    var aricleClass = new Date().getTime();
    $('.msgWindow').append('<div class=' + aricleClass + '>' + message + '</div>');
    var currentHeight = $('.' + aricleClass).height();
    console.log('currentHeight', currentHeight);
    var translateVar = translateY - currentHeight - 220;
    translateY = translateY - currentHeight - 10;
    $('.msgWindow').css({
        'transform': 'translate(0px,' + translateVar + 'px)'
    }, 100);
    console.log(translateY);
}