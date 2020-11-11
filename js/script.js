var col;
var hex;
var clip;
var auto;
var speed;
var looping = false;
var lightness = "95%";

$(document).ready(function() {

  //setup copy
  clip = new Clipboard('#text');

  changeColor();

  //default values
  auto = false;
  speed = 1;

  $('#gen').click(function(e) {
    e.preventDefault();
    if (!auto) {
      if (!looping) {
        changeColor(); //if it's on manual, just change
      }
    } else {
      if (speed == 5) { //max speed value
        speed = 0;
      }
      speed++;
      setSpeedBars();
      setValues();
    }
  });

  $('#tog').click(function(e) {
    e.preventDefault();
    auto = !auto; //invert auto
    speed = 1;
    updateButtons();
  });

  clip.on('success', function(e) { //on finish copy
    $('#text').addClass('copied');
  });

  $('#clock-tog').click(function(e) {
    e.preventDefault();
    $('#clock').toggleClass('hide');
  });

  clock();
});

function clock() {
  $('#clock').html(moment().format('h:mm A'));
  setTimeout(function() { clock(); }, 500);
}

function updateButtons() {
  if (!auto) {
    $('#auto-check').html('check_box_outline_blank');
    $('#gen').html('generate');
  } else {
    $('#auto-check').html('check_box');

    setSpeedBars();

    //start loop
    if (!looping) {
      looping = true;
      changeColor();
    }
  }
}

function setSpeedBars() {
  var sbars = "|";
  sbars = sbars.repeat(speed);
  $('#gen').html('speed: ' + sbars);
}

function changeColor() {
  col = parseInt(Math.random() * 360); //randomize color

  $('body').css('background-color', 'hsl(' + col + ', 100%, ' + lightness + ')'); //set color

  hex = '#' + tinycolor('hsl(' + col + ', 100%, ' + lightness + ')').toHex(); //translate to hex
  $('#text').html(hex); //set text
  $('#text').removeClass('copied'); //clear ' - copied'

  //auto-generate colors is option is enabled
  if (auto) {
    setTimeout(function() {

      if (auto) {
        changeColor();
      } else {
        looping = false;
      }

    }, (6 - speed)*1000);
  } else {
    looping = false;
  }
}