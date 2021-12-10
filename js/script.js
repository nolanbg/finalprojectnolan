// Project 2 - Nolan Barton-Gomez.
//This project was inspired by my background in audiovisual generative art.
//I used the state tutorial in class to figure out how to create
//different working states.
//I also used the aquarium lessons in order to have a better understanding
//of how to control vast groups of objects using arrays.
//I tried to include as many things we learned in class as possible in this,
//including: drawing instructions, if statements, changing states, arrays,
//images, sound and user interactivity when relevant. Thank you for your time and attention.
var soundtrack;
var playbutton, stopbutton;
var analyzer;
// Preload sound file
function preload()
{
  soundtrack = loadSound('memory-nolan.mp3');
}
// Create array for the ellipses
let cloud = [];
let cloudSize = 2000;
// Title and ending text
let titleString = "Audio Reactive Particles - Use buttons to control music, press enter to start visualizer and space bar to end it. Use the mouse to move the particles";
let endingString = "Thank you for watching my audio visualizer - Nolan Barton-Gomez";
// Set the initial default state to the title screen
let state = `title`;
// Create canvas slightly less tall than the size of the screen
function setup() {
  background(0,0,0);
createCanvas(windowWidth, 600);
// loop sound
 soundtrack.loop();

 // stop sound to prevent it from playing automatically
 soundtrack.stop();

 //Create play button
 playbutton = createButton('Play');
 playbutton.position(25, 25);
 playbutton.mousePressed(playsound);

 //Create stop button
 stopbutton = createButton('Stop');
 stopbutton.position(75, 25);
 stopbutton.mousePressed(stopsound);

 //Beginning of music visualizer using analyzer node. Analyze the amplitude of the sound.
 analyzer = new p5.Amplitude();
 analyzer.setInput(soundtrack);
  for (let i = 0; i < cloudSize; i++) {
    cloud[i] = createParticle(random(0, width), random(0, height));
  }
// Parameters for title and ending screen text
  textSize(16);
  textAlign(CENTER, CENTER);
}
// createParticle(x,y)
// Creates a new JavaScript Object describing a particle and returns it
function createParticle(x, y) {
  let particle = {
    x: x,
    y: y,
    size: 15,
    vx: 0,
    vy: 0,
    speed: 2
  };
  return particle;
}

function draw() {
  // The initial state is the title screen, with a background image. The second state is the visualizer, and the final state is the ending screen. Every state except the title screen has a black background. If the state is the title screen, then my background will be set.
  if (state === `title`) {
    title();
    document.body.style.backgroundImage = "url('1078159.png')";
  }
  else {
    background(0);
  }
  if (state === `title`) {
    title();
  }
  else if (state === `animation`) {
    animation();
  }
  else if (state === `ending`) {
    ending();
  }
}
// Describes the title state
function title() {
  fill(255);
  text(titleString, width / 2, height / 2);
}
// Visualizer state, which calls the move and display functions.
function animation() {
  for (let i = 0; i < cloud.length; i++) {
    moveParticle(cloud[i]);
    displayParticle(cloud[i]);
  }
  // Use spacebar to trigger ending screen
  document.body.onkeyup = function(e){
      if(e.keyCode == 32){
          state = `ending`;
      }
  }
}
function mousePressed() {
  let fish = createParticle(mouseX,mouseY); // Create a particle at the mouse position
  cloud.push(particle); // Add the particle to the array
  // Now the school array has our new particle and it will be moved and drawn
}

// moveParticle(particle)
// Chooses whether the provided ellipse changes direction and moves it
function moveParticle(particle) {
  // Use the mouse to vaguely change the movement of the ellipses
  var vol = analyzer.getLevel();
  let change = random(0, 1);
  if (change < 0.05) {
    particle.vx = random(-particle.speed*mouseY/100, particle.speed*mouseX/100)*map(vol, 0, 1, 0, width)/1000;
    particle.vy = random(-particle.speed*mouseY/100, particle.speed*mouseX/100);
  }

  // Move the particles
  particle.x = particle.x + particle.vx;
  particle.y = particle.y + particle.vy;

  // Constrain the particles to the canvas
  particle.x = constrain(particle.x, 0, width);
  particle.y = constrain(particle.y, 0, height);
}

// displayParticle(particle)
// Displays the provided particles on the canvas
function displayParticle(particle) {
  push();
  var vol = analyzer.getLevel();
  noStroke();
    fill((Math.floor(Math.random()*mouseX + 1))*map(vol, 0, 1, 0, width)/50,0,(Math.floor(Math.random() * mouseY + 1)));
    noStroke();
    ellipse(particle.x, particle.y, (Math.floor(Math.random()*5 + 1))*map(vol, 0, 1, 0, width)/50, (Math.floor(Math.random()*5 + 1))*map(vol, 0, 1, 0, height)/50);
    pop();
}
function playsound()
{
  if(soundtrack.isPlaying() == false)
  {
    soundtrack.play();
  }
}

function stopsound()
{
  if(soundtrack.isPlaying() == true)
  {
    soundtrack.pause();
  }
}
// Ending screen
function ending() {
  fill(255, 0, 0);
  text(endingString, width / 2, height / 2)
}
// Triggers the transition from the title state to the visualizer
function keyPressed() {
  if (state === `title`) {
    state = `animation`;
  }
}
