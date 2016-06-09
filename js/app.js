$(function() {
  console.log('loaded');

  // various variables
  var game = true;
  var aliens = [
    '../assets/invader.gif~c100',
    '../assets/blue_invader.gif',
    '../assets/green_invader.gif'
  ];

  var keys = [
    65,
    83,
    68,
    70,
    74,
    75,
    76,
    186
  ];

  // function to spawn the aliens
  function alienSpawn() {
    var div = $('<div>');
    var img = $('<img>');
    var p = $('<p>');

    // build the image
    img.attr('class', 'alien');
    var randomAlien = Math.floor(Math.random()*aliens.length);
    img.attr('src', aliens[randomAlien]);



    //spawn them at a random position
    var posX = Math.floor(Math.random() * ($('.gameScreen').width() - 64));
    var posY = Math.floor(Math.random() * ($('.gameScreen').height() - 64));
    img.css('left', posX + 'px');
    img.css('top', posY + 'px');

    //append to he game screen
    $(img).appendTo('.gameScreen').fadeIn(500).delay(3000).fadeOut(500, function() {
      $(this).remove();
    });
  }




  // their keypress function


  // function to generate the random color


  // function to update score or end game if 0


  // function to fill bars


  // function to update current color



  // testing grounds
  setInterval(alienSpawn, 1200);
  $(document).keydown(function(event) {
    console.log(event.which);
  });

});
