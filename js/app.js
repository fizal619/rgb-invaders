$(function() {
  console.log('loaded');

  // 'USEFUL' AND EXPLICITLY NAMED VARIABLES
  var game = true;
  var aliens = [
    '../assets/invader.gif~c100',
    '../assets/blue_invader.gif',
    '../assets/green_invader.gif'
  ];

  // a nice handy reference for keycodes
  var keys = {
    left: 37,
    right: 39,
    space: 32
  }

  // Where the goal color comes from
  var goalColor = {
    red: 0,
    green: 0,
    blue: 0,
    total: function() {
      return this.red + this.green + this.blue;
    },
    // function to generate the random color and set the goal color
    randomize: function() {
      this.red = Math.floor(Math.random() * 25) * 10;
      this.green = Math.floor(Math.random() * 25) * 10;
      this.blue = Math.floor(Math.random() * 25) * 10;
      $('#goalColor').css('background-color', this.rgb());
      console.log(this.rgb());
    },
    // returns the RGB value of this
    rgb: function() {
      return 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')';
    }

  }

  //the main scoretable for the games
  var scoreTable = {
    red: 0,
    green: 0,
    blue: 0,
    total: function() {
      return goalColor.total() - (this.red + this.green + this.blue);
    },
    // returns the RGB value of this
    rgb: function() {
      return 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')';
    }
  }

  //we'll give each new alien a unique ID from incrementing this
  var alienID = 0;

  //timer object to manage the timer on the board.
  var timer = {
    seconds: 260,
    //returns the minutes
    minutes: function() {
      if (Math.floor(this.seconds / 60) >= 10) {
        return Math.floor(this.seconds / 60);
      } else {
        return '0' + Math.floor(this.seconds / 60);
      }
    },
    // updates the page's timer
    update: function() {
      if (this.seconds % 60 >= 10) {
        $('#timer').text(this.minutes() + ':' + this.seconds % 60);
      } else {
        $('#timer').text(this.minutes() + ':0' + this.seconds % 60);
      }
      this.seconds--;

      if (testGameOver()) {
        gameOverScreen(testGameOver());
      }
    }
  }

  //END USEFUL VARIABLES

  // ALIEN ENTITY
  // function to spawn the random aliens
  function alienSpawn() {
    var div = $('<div>');
    var img = $('<img>');
    var p = $('<p>');

    // build the image tag with a random colored alien from assets folder
    img.attr('class', 'alien');
    img.attr('id', alienID++);
    var randomAlien = Math.floor(Math.random() * aliens.length);
    img.attr('src', aliens[randomAlien]);

    //spawn them at a random position but above the last 200px of the screen height
    var posX = Math.floor(Math.random() * ($('.gameScreen').width() - 221));
    var posY = Math.floor(Math.random() * ($('.gameScreen').height() - 300));
    img.css('left', posX + 'px');
    img.css('top', posY + 'px');

    //append to the game screen but make it remove itself after a delay
    $(img).appendTo('.gameScreen').fadeIn(500).delay(4000).fadeOut(500, function() {
      $(this).remove();
    });
  }
  //END ALIEN ENTITY

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
  //add event listener to document to move player
  $(document).keydown(function(event) {
    var position = $('.player').position();
    //check which key is being pressed and if the resulting position is within the gamescreen
    if (event.which == keys.left && (position.left - 10) > 32) {
      // $('.player').css('left', (position.left - 10) + 'px' );
      $('.player').animate({
          left: position.left - 20,
        },
        50,
        function() {
          /* stuff to do after animation is complete */
        });
    }
    // same as above
    if (event.which == keys.right && (position.left + 10) < ($('.gameScreen').width()) - 210) {
      // $('.player').css('left', (position.left + 10) + 'px' );
      $('.player').animate({
          left: position.left + 20,
        },
        50,
        function() {
          /* stuff to do after animation is complete */
        });
    }

  });


  //to make the player fire
  $(document).keypress(function(event) {
    // checks if the spacebar was pressed
    if (event.which == keys.space) {

      // initializes the rocket at the players current position
      var rocket = $('<img class="rocket" src="../assets/rocket.gif">');
      var playerPosition = $('.player').position();

      rocket.css('left', playerPosition.left - 8);
      rocket.css('top', playerPosition.top);

      //appends it to the gamescreen
      $(rocket).appendTo('.gameScreen');

      //fires the function to check the position of everything on the board and kill aliens on colission; every 10ms, very inefficient? TODO: figure out more efficient way of doing this.
      var rocketCheck = setInterval(function() {
        checkAllAliens($('.rocket'));
      }, 10);

      // zoom the rocket to the top
      $('.rocket').animate({
          top: '0'
        },
        1000,
        function() {
          $(this).remove();
          clearInterval(rocketCheck); //make sure to stop the interval function to save processing power.
        });
    }
  });

  // END PLAYER ENTITY

  //CHECK COLLISION


  // function from http://jsfiddle.net/nGRwt/7/
  function collision($div1, $div2) {
    var x1 = $div1.offset().left;
    var y1 = $div1.offset().top;
    var h1 = $div1.outerHeight(true);
    var w1 = $div1.outerWidth(true);
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offset().left;
    var y2 = $div2.offset().top;
    var h2 = $div2.outerHeight(true);
    var w2 = $div2.outerWidth(true);
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    //From here on out would only occur on collision.
    // update score for the appropriate alien
    if (($div2).attr('src').includes('green')) {
      scoreTable.green += 10;
    } else if (($div2).attr('src').includes('blue')) {
      scoreTable.blue += 10;
    } else {
      scoreTable.red += 10;
    }

    // if testGameover returns
    if (testGameOver()) {
      gameOverScreen(testGameOver());
    }

    // draw the score
    $('#score').text(scoreTable.total());

    // update the colors on the page
    colorBarsAndBG();

    //remove the rocket and alien entities.
    $($div1).remove();
    $($div2).remove();


  }

  // loop through Aliens and check all of them against the rocket that calls this
  function checkAllAliens(rocketElement) {
    var aliensOnBoard = $('.alien');
    var rocketsOnBoard = $('.rocket');
    for (var i = rocketsOnBoard.length - 1; i >= 0; i--) {
      for (var h = 0; i < aliensOnBoard.length; h++) {
        collision($(rocketsOnBoard[i]), $(aliensOnBoard[h]));
      }
    }
  }
  //CHECK COLLISION END

  // UPDATE COLOR BARS AND BG
  // function to update color bars and background color
  function colorBarsAndBG() {
    // select the ids of the bars then animate the change in height.
    $('#red-progress').animate({
        height: scoreTable.red
      },
      1000);
    $('#green-progress').animate({
        height: scoreTable.green
      },
      1000);
    $('#blue-progress').animate({
        height: scoreTable.blue
      },
      1000);

    //update the background color
    $('body').css('background-color', scoreTable.rgb());
  }
  // UPDATE COLOR BARS AND BG END

  //IS THE GAME OVER?
  function testGameOver() {
    // the three gameover circumstances
    if (scoreTable.red > goalColor.red) {
      return 'red';
    }
    if (scoreTable.green > goalColor.green) {
      return 'green';
    }
    if (scoreTable.blue > goalColor.blue) {
      return 'blue';
    }

    if (scoreTable.total() === 0) {
      return 'perfect';
    }

    if (timer.seconds <= 0) {
      return 'time up';
    }

    //would only return false if all of the above conditions are false
    return false;
  }

  //temp
  function gameOverScreen(reason) {
    clearInterval(gameClock);
    $('.gameScreen').fadeOut('fast', function() {
      $('.gameScreen').remove();
      $('.endScreen').fadeIn('fast', function() {
        switch (reason) {
          case 'time up':
            $('#endTitle').text('TIME UP!');
            $('#endMessage').text('Sorry you ran out of time!');
            break;
          case 'perfect':
            $('#endTitle').text('PERFECT SCORE!');
            $('#endMessage').text('DAMN! You just beat a really hard game!');
            break;
          default:
            $('#endTitle').text('WOAH THERE MIXMASTER!');
            $('#endMessage').text('Sorry, you added too much ' + reason + ' to the mix. Try again!');
            break;
        }
        $('#endScore').text('Score: ' + scoreTable.total());
      });
    });
  }

  //IS THE GAME OVER END

  // set up the board.
  $('.startScreen').fadeIn('slow', function() {
    $('#start').click(function(event) {
      $('.startScreen').remove();
      $('.gameScreen').fadeIn('slow', function() {
        spawnPlayer();
        goalColor.randomize();
        console.log(goalColor.total());
        $('#score').text(scoreTable.total()); //draw the initial score

        //set everything to a game clock that ticks every second.
        var gameClock = setInterval(function() {
          timer.update();
          alienSpawn();
        }, 1000);
      });
    });
  });

});
