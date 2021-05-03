var trex,trex_running;
var ground,groundImage;
var invisibleGround
var cloudImage;
var cloudGroup;

var ob1,ob2,ob3,ob4,ob5,ob6;
var obstaclesGroup;

var bgImg;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var gameover,restart,gameoverImage,restartImage;

var trexCollided;

var score = 0;

//load all images,animation,sounds
function preload()
{

    trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
    groundImage= loadImage("ground2.png");
    cloudImage=loadImage("cloud.png");
    ob1=loadImage("obstacle1.png");
    ob2=loadImage("obstacle2.png");
    ob3=loadImage("obstacle3.png");
    ob4=loadImage("obstacle4.png");
    ob5=loadImage("obstacle5.png");
    ob6=loadImage("obstacle6.png");
    bgImg = loadImage("bg.jpg");
    gameoverImage = loadImage("gameOver.png");
    restartImage  = loadImage("restart.png");
    trexCollided = loadImage("trex_collided.png");
}


//all sprits created here
function setup()
{
  createCanvas(1200,400);

trex=createSprite(100,320,40,50);
trex.addAnimation("running",trex_running);

trex.addImage("collided",trexCollided)
trex.scale = 0.8;
ground=createSprite(600,200,1200,20);
ground.addImage(groundImage);

ground.velocityX=-4;

invisibleGround=createSprite(600,390,1200,20);
invisibleGround.visible=false;

cloudGroup= new Group();
obstaclesGroup= new Group();

gameover = createSprite(600,200);
gameover.addImage(gameoverImage);
gameover.visible = false;

restart = createSprite(600,300);
restart.addImage(restartImage);
restart.visible = false;

textSize(18);

}


//complete logic
function draw()
{
  background(255);
  
  if (gameState == PLAY){
        score = score + Math.round(getFrameRate()/60);
    if(keyDown("space"))
    {
        trex.velocityY=-10;
    }
    trex.velocityY+=0.5;
  
    trex.collide(invisibleGround);
  
    if(ground.x<0)
    {
        ground.x=ground.width/2;
    }
    drawClouds();
    drawObstacles();
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    } 
  }
  
  else if ( gameState == END){
     gameover.depth = trex.depth+1;
     restart.depth = trex.depth+1;
     ground.velocityX = 0;
     trex.velocityY = 0;

     trex.changeAnimation("collided");
     
     gameover.visible = true;
     restart.visible = true;

     obstaclesGroup.setVelocityXEach(0);
     cloudGroup.setVelocityXEach(0);

     obstaclesGroup.setLifetimeEach(-1);
     cloudGroup.setLifetimeEach(-1);

     if(mousePressedOver(restart)){
         reset();
     }

  }
  
  drawSprites();
  fill(0);
  text("Score :"  + score,800,50);
}

function drawClouds()
{
    if(World.frameCount%100===0)
    {
        var cloud=createSprite(1200,200,40,30);
        cloud.y=Math.round(random(60,250));
        cloud.scale=random(1,2.5);
        cloud.addImage(cloudImage);
        cloud.velocityX=-5;
        cloud.depth=trex.depth;
        trex.depth++;

        cloudGroup.lifetime=240;
        cloudGroup.add(cloud);
    }
}

function drawObstacles()
{
    if(World.frameCount%60===0)
    {
        var obstacle=createSprite(1200,370,20,40);
        obstacle.velocityX=-4;
        var rand=Math.round(random(1,6));
        switch(rand)
        {
            case 1: obstacle.addImage(ob1);break;
            case 2: obstacle.addImage(ob2);break;
            case 3: obstacle.addImage(ob3);break;
            case 4: obstacle.addImage(ob4);break;
            case 5: obstacle.addImage(ob5);break;
            case 6: obstacle.addImage(ob6);break;
        }
        obstacle.scale=0.7;
        obstacle.lifetime=300;
        obstaclesGroup.add(obstacle);

    }
}

function reset(){
    gameState = PLAY;

    gameover.visible  = false;
    restart.visible = false;

    ground.velocityX=-4;

    trex.changeAnimation("running");
    obstaclesGroup.destroyEach();
    cloudGroup.destroyEach();

    score = 0;
}