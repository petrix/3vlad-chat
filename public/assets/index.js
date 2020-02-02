require('scssify');
require('./style.scss');
var $ = require('jquery');

var moment = require('moment');
moment.locale('uk');

function resize() {
    var bodyWidth = $('body').width();
    var bodyHeight = $('body').height();

    $('.mainWindow').width();
    $('.mainWindow').css({
        transform : 'scale('+bodyWidth/1920+')'
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

  $('.fa-paper-plane').click(function(){
      var aricleClass = new Date().getTime();
      $('.msgWindow').append('<article class='+aricleClass+'><div class="userIcon"></div><div><div class="userName">Gorbunov</div><div class="userMsg">'+new Date()+'</div></div></article>');
    //   console.log($('.msgWindow').height());
        var currentHeight = $('.'+aricleClass).height()+10;
         var translateVar = translateY - currentHeight-160-10;
      translateY = translateY - currentHeight;
    // console.log(currentHeight);
      $('.msgWindow').css({
         'transform': 'translate(0px,'+translateVar+'px)'
      },100);
      console.log(translateY);
  });

  $('.fa-smile').click(function(){
    // translateVar = translateY - translateSysStep-160;
    // translateY = translateY - translateSysStep;
    var aricleClass = new Date().getTime();
    $('.msgWindow').append('<p class='+aricleClass+'><b>Классный руководитель&nbsp;</b>добавил&nbsp;<b>Потапа&nbsp;</b> в беседу</p>');
    var currentHeight = $('.'+aricleClass).height()+10;
    console.log('currentHeight',currentHeight);
    var translateVar = translateY - translateSysStep-160-10;
translateY = translateY - translateSysStep;
    $('.msgWindow').css({
        'transform': 'translate(0px,'+translateVar+'px)'
     },100);
     console.log(translateY);
  });