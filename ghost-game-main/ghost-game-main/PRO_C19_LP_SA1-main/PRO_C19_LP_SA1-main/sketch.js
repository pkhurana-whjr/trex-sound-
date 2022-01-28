var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"



function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,400,10,20);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.3;

   climbersGroup = new Group();
   doorsGroup = new Group();
   invisibleBlockGroup = new Group();
   //spookySound.play();
   
}

function draw() {
  background(0);
  if (gameState == "play")
{
  //to reduce the volume of the music
  spookySound.setVolume(0.02);
  //play the sound till the gamestate is play
  spookySound.play();

  if(tower.y > 400  ){
      tower.y = 300
    }
    spawnDoors();
  
 if (keyDown("space"))
 {
   ghost.velocityY = -5;
 }

  ghost.velocityY += 0.8;

 if(keyDown("right"))
 {
   ghost.x += 7;
 }

 if(keyDown("left"))
 {
   ghost.x -= 7;
 }

 if(ghost.y > 600 || ghost.isTouching(invisibleBlockGroup))
 {
   ghost.destroy();
   //stop the sound as soon as the game comes to an end
   spookySound.stop();
   gameState="end";
 }
 
if(ghost.isTouching(climbersGroup))
{
  ghost.velocityY = 0;
}

  drawSprites();
}
if (gameState == "end")
{
  textSize(30);
  fill("yellow");
  stroke("orange");
  text("Game Over",200,300);
  
  

}
}

function spawnDoors()
{
  if(frameCount % 250 === 0)
  {
    door = createSprite(Math.round(random(100,500)),-35 );
    door.addImage("door",doorImg);
    door.velocityY = 2;
    door.scale = 0.8;
    door.lifetime = 300;
    doorsGroup.add(door);
    
    climber = createSprite(door.x, 0);
    climber.addImage("climber",climberImg);
    climber.velocityY = 2;
    climber.scale = 0.6;
    climber.lifetime = 300;
    climbersGroup.add(climber);
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;

    invisibleBlock = createSprite(climber.x, climber.y + 5, climber.width-10, 2);
    invisibleBlock.velocityY = 2;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.lifetime = 300;
    invisibleBlock.debug = true;
    invisibleBlock.visible=false;
    
  }
 
}


