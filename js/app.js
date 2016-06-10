$(function() {
  console.log('loaded');

  // various variables
  var game = true;
  var aliens = [
    '../assets/invader.gif~c100',
    '../assets/blue_invader.gif',
    '../assets/green_invader.gif'
  ];

  var keys = {
    left: 37,
    right: 39,
    space: 32
  }

  // function to spawn the aliens
  function alienSpawn() {
    var div = $('<div>');
    var img = $('<img>');
    var p = $('<p>');

    // build the image
    img.attr('class', 'alien');
    var randomAlien = Math.floor(Math.random() * aliens.length);
    img.attr('src', aliens[randomAlien]);



    //spawn them at a random position
    var posX = Math.floor(Math.random() * ($('.gameScreen').width() - 64));
    var posY = Math.floor(Math.random() * ($('.gameScreen').height() - 300));
    img.css('left', posX + 'px');
    img.css('top', posY + 'px');


    //append to the game screen
    $(img).appendTo('.gameScreen').fadeIn(500).delay(3000).fadeOut(500, function() {
      $(this).remove();
    });
  }


  //PLAYER ENTITY
  //spawn it
  function spawnPlayer() {
    // var div = $('<div class="player">');
    var img = $('<img class="player" src="../assets/spaceship.gif">');

    // position it
    img.css('left', '50%');
    img.css('margin-left', '-32px')
    img.css('bottom', 0 + 'px');

    //append to the gameScreen
    $(img).appendTo('.gameScreen');

  }

  //move it



  // their keypress function

  //add event listener to document to move player
  $(document).keydown(function(event) {
    var position = $('.player').position();
    //check which key is being pressed and if the resulting position is within the gamescreen
    if (event.which == keys.left && (position.left - 10 ) > 32) {
      $('.player').css('left', (position.left - 10) + 'px' );
    }

    if (event.which == keys.right && (position.left + 10 ) < ($('.gameScreen').width()) - 32 ) {
      $('.player').css('left', (position.left + 10) + 'px' );
    }

    if(event.which == keys.space){

    }

  });

  // function to generate the random color


  // function to update score or end game if 0


  // function to fill bars


  // function to update current color



  // testing grounds

  spawnPlayer();



});
