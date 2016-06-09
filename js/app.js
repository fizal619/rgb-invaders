$(function() {
  console.log('loaded');

  // various variables
  var game = true;

  // function to spawn the aliens
  function alienSpawn() {
    var img = $('<img>');
    img.attr('class', 'alien');
    img.attr('src', "http://rs345.pbsrc.com/albums/p386/WackoWeasel/invader1.gif~c100"); //'/assets/invader.gif~c100'

    var posX = Math.floor(Math.random() * ($('.gameScreen').width() - 32));
    var posY = Math.floor(Math.random() * ($('.gameScreen').height() - 32));
    img.css('left', posX + 'px');
    img.css('top', posY + 'px');

    $(img).appendTo('.gameScreen').fadeIn(500).delay(2500).fadeOut(500, function() {
      $(this).remove();
    });
  }




  // their keypress function


  // function to generate the random color


  // function to update score or end game if 0


  // function to fill bars


  // function to update current color



  // testing grounds
  setInterval(alienSpawn, 1000);


});
