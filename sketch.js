var PLAY = 1;
var END = 0;

var gameState = PLAY;
var backgroundImg
var trex, trex_running, trex_collided;
var Score =0

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var cactus
var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
 //ground
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
  finishImg=loadImage("1.png")
  backgroundImg=loadImage("Untitled.png")
}

function setup() {
  createCanvas(600, displayHeight);
  bg=createSprite(displayWidth-750,displayHeight-displayHeight/2)
  bg.addImage(backgroundImg)
  var message = "Ok"+"OkOkokokok";
  console.log(message)
  cactus1=createSprite(440,displayHeight+60)
  cactus1.addImage(obstacle2)

  cactus2=createSprite(680,displayHeight+60)
  cactus2.addImage(obstacle2)

  cactus3=createSprite(880,displayHeight+60)
  cactus3.addImage(obstacle2)
  

  cactus4=createSprite( 1080,displayHeight+60)
  cactus4.addImage(obstacle2)
  

 
  trex = createSprite(50,displayHeight-160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;

   linet=createSprite(50,displayHeight+90,100,1)
   linet.shapecolor="#888888"
  
  gameOver = createSprite(displayWidth-750,displayHeight-300);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(displayWidth-750,gameOver.y+30);
  restart.addImage(restartImg);
  
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(200,displayHeight+100,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  fish=createSprite(1252,displayHeight+80,50,50)
  fish.addImage(finishImg)
  fish.scale=0.2
  trex.setCollider("rectangle",0,0,20,trex.height-5);
  //trex.debug=true
  //ground
  
  score = 0;
  console.log(displayWidth)
}

function draw() {
  
  background(backgroundImg);
  linet.visible=false
  //displaying score
  drawSprites();
  
  
  camera.y=540
  
  
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
    
    if(trex.isTouching(fish)){
      gameState="Win"
    }
    //scoring
   
    
   
    
    console.log(trex.x)
    
     
    
  
   if(keyDown(RIGHT_ARROW)){
    camera.x=camera.x+8
    trex.x=trex.x+8
    invisibleGround.x=invisibleGround.x+8
    Score=Score+1
    linet.x=trex.x
   }
   if(trex.isTouching(linet)){
  if(keyDown("space")){
    trex.velocityY=-12
   }
  }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.6
  
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles on the ground
    
    
   
    if(cactus1.isTouching(trex)){
      //trex.velocityY = -12;
      jumpSound.play();
      gameState = END;
      dieSound.play()
    
  }
  if(cactus2.isTouching(trex)){
    //trex.velocityY = -12;
    jumpSound.play();
    gameState = END;
    dieSound.play()
  
}
if(cactus3.isTouching(trex)){
  //trex.velocityY = -12;
  jumpSound.play();
  gameState = END;
  dieSound.play()

}
if(cactus4.isTouching(trex)){
  //trex.velocityY = -12;
  jumpSound.play();
  gameState = END;
  dieSound.play()

}
  }
   else if (gameState === END) {
     gameOver.x=trex.x+200
     restart.x=trex.x+200
      gameOver.visible = true;
      restart.visible = true;
     

     //change the trex animation
      trex.changeAnimation("collided", trex_collided);
    
     
     
      
      trex.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    
   
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);  
     
      if(mousePressedOver(restart)) {
      
    }
   }
   else if(gameState==="Win"){
    textSize(100)
    
    text("You Win !!!",trex.x,displayHeight-100)
    textSize(30)
    //change the trex animation
     trex.changeAnimation("collided", trex_collided);
   
    
    
     
     trex.velocityY = 0
     
    
     //set lifetime of the game objects so that they are never destroyed
   
  
    
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);  
    
   }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  
 

  
  text("x: "+mouseX+" y: "+mouseY,mouseX,mouseY)
  textSize(30)
  text("distance: "+Score,trex.x,displayHeight-500)
}







function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(displayWidth-20,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.8;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = displayWidth/3;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}