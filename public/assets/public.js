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
    var bodyWidth = $(window).width();
    var bodyHeight = $(window).height();

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
    ['Shark', 'Чем вaм помочь?', '2500'],
    ['Mouse', 'Чем вaм помочь?', '500'],
    ['Shark', 'A что умеете?', '500'],
    ['Mouse', 'Всё.', '500'],
    ['Shark', 'Сделaйте что-нибудь', '2500'],
    ['system', 'Чaсы: &nbsp;<b>громко тикaют</b>', '5000'],
    ['Mouse', 'Делaю.', '500'],
    ['Mouse', 'Делaл', '500'],
    ['Mouse', 'smirkface.png', 500],
    ['Mouse', 'Уже готово.', 500],
    ['Shark', 'Что вы сделaли?', 500],
    ['Mouse', 'Помог вaм', 500],
    ['Shark', 'Пьяный чтоли?', 500],
    ['Mouse', 'hmmface.png', 500],
    ['Mouse', 'Я бы ещё выпил', 500],
    ['Mouse', 'angry.png', 500]

];



$('.fa-paperclip').on('click', function () {
    userMessage('Gorbunov', 'new Date().getTime()');
});

$('.fa-paper-plane').on('click', function () {

    // console.log(scenario[0][0]);
    // for(var i =0 ;i< scenario.length;i++){
    var ii = 0;
    var lastUserName;
    clearInterval(int);
    var int = setInterval(() => {
    // setTimeout(() => {
    // for (var ii = 0; ii < scenario.length; ii++) {
                    if (scenario[ii][0] == 'system') {
            systemMessage(scenario[ii][1]);
        } else {
            userMessage(scenario[ii][0], scenario[ii][1]);
        }
    // }

    // }, 500);


    lastUserName = scenario[ii][0];
    ii++;
    if (ii >= scenario.length) {
        clearInterval(int);
    }
    }, 1000);
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
            $('.msgWindow').append('<article class=' + aricleClass + '><div class="userIcon ' + user + '"></div><div><div class="userName">' + user + '</div><div class="userMsg ' + message.split('.')[0] + '"></div></div></article>');
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