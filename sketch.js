//game states
var PLAY = 1;
var END = 0;
var gameState = PLAY;

// declaring variables
var ground ,invisibleGround
var monkey , monkey_running , monkey_collided
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var survivalTime
var Background,scene
var gameOver,overI

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  scene = loadImage("Cartoon garden wallpapers (1).png");
  monkey_collided = loadImage("sprite_0.png");
  overI = loadImage("7.jpg");
 
}



function setup() {
  createCanvas(400,400);

  // creating ground
  ground = createSprite(400,350,900,10);
  ground.x = ground.width/2;
  console.log(ground.x)
  
  //creating invisible ground
  invisibleGround = createSprite(400,350,900,10);
   invisibleGround.visible = false;
  
  //creating background sprite
  Background = createSprite(0,0,400,400);
  Background.addAnimation("backgroundmove",scene);
  Background.scale = 2;
  
   //creating gameOver sprite
  gameOver = createSprite(200,200,10,10);
  gameOver.addAnimation("game",overI);
  gameOver.scale = 0.1;
  gameOver.visible = false;
  
  
  // creating monkey
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("monkey1",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale = 0.1;
  
  //creating groups
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  //declaring score
  survivalTime = 0;
  
}


function draw() {
  
  
  if(gameState === PLAY){
    
    //move the ground
    ground.velocityX = -4;
    
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
    // jump when the space key is pressed
  if(keyDown("space")&&monkey.y >= 120){
    monkey.velocityY = -10
  }
    
    //scoring
     stroke("black")
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
    
    
     //adding gravity
  monkey.velocityY = monkey.velocityY + 0.8
     
  //calling functions
  food();
  obstacles();

    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
  }
  
  
   else if (gameState === END) {
      ground.velocityX = 0;
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
    monkey.changeAnimation("collided",monkey_collided);
     obstacleGroup.setLifetimeEach(-1);
     bananaGroup.setLifetimeEach(-1);
     gameOver.visible = true;
     
   }
  
  //stop monkey from falling down
   monkey.collide(invisibleGround);

 drawSprites()
  //updating score
    text(" Survival Time: "+ survivalTime , 100,50);
}



function food(){
  
  if(frameCount % 80 ===0){
    banana = createSprite(400,450,20,20);
     banana.y = Math.round(random(120,200));
    banana.addAnimation("ban",bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 100;
    banana.velocityX = -3;
    bananaGroup.add(banana);
  }
}


function obstacles(){
  if (frameCount % 300 === 0){
   var obstacle = createSprite(400,330,10,40);
    obstacle.addAnimation("stone",obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 100;
     obstacle.velocityX = -6;
    obstacleGroup.add(obstacle);
  }
}