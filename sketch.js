//creating global variables
var bananaImage, obstacleImage, obstacleGroup, background_img, score,background1,ground,player, foodGroup;

function preload(){
    //loading images and animations
    background_img=loadImage("jungle2[1].jpg");
        player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");

    bananaImage=loadImage("banana.png");
    obstacleImage=loadImage("stone.png");
}

function setup() {
  //adding images and animations
    createCanvas(800, 400);

  background1= createSprite(0,0,800,400);
    background1.addImage("bgimg",background_img);
  background1.scale=1.5;
  background1.x=background1.width/2;
  background1.velocityX = -4;
  
  score=0;
  
  foodGroup=new Group();
  obstacleGroup=new Group();
  
  ground=createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  player=createSprite(100,340,20,50);
  player.addAnimation("monkey",player_running);
  player.scale=0.15;
  
}

function draw() {
  background(255);
  
  if(ground.x<0){
    ground.x=ground.width/2;
  } 
  
  if(background1.x<100){
    background1.x = background1.width /2;
     }
   
  if(foodGroup.isTouching(player)){
    foodGroup.destroyEach();
    score=score+1;
  }
  
  
  switch(score){
    case 10: player.scale=0.12;
      break;
    case 20: player.scale=0.14;
      break;
    case 30: player.scale=0.16;
      break;
    case 40: player.scale=0.18;
      break;
    default: break;  
  }
  
  if(keyDown("space")){
    player.velocityY=-12;
  }
  player.velocityY=player.velocityY+0.8;
  player.collide(ground);
  
  spawnFood();
  spawnObstacles();
  
  if (obstacleGroup.isTouching(player)){
      player.scale=0.08;
      
      }
    
  drawSprites();
  
  stroke("white"); 
   textSize(20); 
   fill("white");
   text("score: "+ score,500,50);
    
}

function spawnFood() {
  if (frameCount % 80 === 0) {
    var food = createSprite(600,250,40,10);
    
    food.y = Math.round(random(120,200));
    food.addImage(bananaImage);
    food.scale = 0.05;
    food.velocityX = -5;
    
     //assign lifetime to the variable
    food.lifetime = 300;
    
    //adjust the depth
    
    player.depth = food.depth + 1;
    
    //add each cloud to the group
    foodGroup.add(food);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX =-6;
    obstacle.addImage(obstacleImage); 
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}