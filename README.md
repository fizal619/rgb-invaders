# rgb-invaders
![](http://i.imgur.com/7O8onoE.gif)

Kill the invaders in order to fill the color bars! Try to get as close as possible to make the goal color. Or better yet, a perfect score!


## The Game

Putting a personal mathematical twist on the classic space invaders i loved growing up. As you kill the invaders, their respective colors would increment the comparable colorbar/meter. <br>
Try as best you can to match the goal color that is randomly generated, or just best your last score. Scoring is the combined RGB difference between your current color and the goal color. **THE CLOSER YOU ARE TO ZERO THE BETTER.** <br>
Every 100 points you score, it adds a minute to the clock.

#Installation
You can find the live version [here](http://fizal.me/rgb-invaders). Cloning this repository to your server should work fine on the root directory, however if you're cloning this to a subdirectory; make sure to update the links to the gifs in `js/app.js` as follows.
<br>
` "../assets/green_invader.gif" ---> "../<subdirectory_name>/assets/green_invader.gif" `

## User Stories
* As a user I would like to move the spaceship. √
* As a user I would like to see my score in real time. √ 
* As a user I would like to see the color bar move up and down as I score. √
* As a user I would like to shoot the aliens to score. √
* As a user I wold like to reset my game at the end. √

Bonus Features:

* If possible add a live timer to the game. √
* As a user I would like to share my score with my friends on facebook. x


## Wire Frame
![](http://i.imgur.com/tO6FJiY.png)

 Very rough sketch, still need to decide on share screen layout. 
 
##Technology Used
This game was built with HTML, CSS, and JavaScript. It uses JQuery for manipulating the DOM elements as well as spawning new ones. It also uses Animate.css for some of the animations. 

##Aproach Taken
At first my idea was very intimidating. I couldn't imagine tackling the common problems in game design such as **collision detection** or **player movement**. But after looking at a few youtube videos of people making games in vanilla JavaScript, as well as reading a few tutorials, I decided to stick with this idea (even though I did falter a little for a few hours and gave up on it). <br>
I first tried using a game framework called melonJS. But it abstracted too much of the coding for the game. <br>
Starting back from fresh, and doing the needed research; I got my hands dirty with just JQuery. Which turns out to be all I needed. 

##Unresolved Problems

* It kind of half works on mobile. The scaling is a bit off and movement is choppy with the touch screen.
* The collision system is sloppy at best, but the player should *double tap* to compensate.  
* The game will load correctly. However resizing the window will break the positioning of enemies. 
* Currently the start screen and the end screen are very misaligned. 
* Sometimes the start screen's text will overflow. 


## Some of the Important Notes:
* Shoutout to Trevor Preston and [this link](http://stackoverflow.com/questions/4796743/random-position-of-divs-in-javascript) for helping me understand random element spawning.  
* I also got the function for identifying collisions from [here](http://stackoverflow.com/questions/5419134/how-to-detect-if-two-divs-touch-with-jquery). 
* I got the meta tag to stop phones from zooming with multiple taps from [Here](https://davidwalsh.name/zoom-mobile-browsers).
* The [function](http://magentohostsolution.com/3-ways-detect-mobile-device-jquery/) to check if the page is being loaded on a mobile phone. 
* [And of course for all my centering problems.](https://codemyviews.com/blog/how-to-center-anything-with-css)

