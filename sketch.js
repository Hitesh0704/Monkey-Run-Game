var bananaimage,bananagroup,obstacleimage,obstaclegroup,backimage,ground,score;

var player,player_running;

var invisibleground;

function preload(){
  backimage=loadImage("jungle.jpg");
  player_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaimage=loadImage("banana.png");
  obstacleimage=loadImage("stone.png");
}

function setup() {
  createCanvas(800, 400);
  
  bananagroup= new Group();
  obstaclegroup = new Group();
  
  score=0;
  
  ground=createSprite(200,15,800,400);
  ground.addImage("ground",backimage);
  ground.scale=1.6;
  ground.velocityX = -4;
  
  player=createSprite(50,250,20,20);
  player.addAnimation("monkey",player_running);
  player.scale=0.10;
  
  invisibleground=createSprite(400,290,800,20);
  invisibleground.visible=false;

}

function draw() {
  background(220);
  

  if(keyDown("space")&&player.y>220) {
    player.velocityY = -15;
  }
   player.velocityY = player.velocityY + 0.8;
  
  if(ground.x<0){
   
   ground.x = ground.width/2;
  }
  if(obstaclegroup.isTouching(player)){
    player.scale=0.05;
  }
  if(bananagroup.isTouching(player)){
    bananagroup.destroyEach();
    score=score+2;
  }
  player.collide(invisibleground);
  
  
  
  Bananas();
  Obstacles();
  
  obstaclegroup.setLifetimeEach(-1);
  bananagroup.setLifetimeEach(-1);
  
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+ score,500,50);
  switch (score){
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
}
  
function Bananas() {
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) {
    var banana = createSprite(800,140,10,10);
    
    banana.addImage("banana",bananaimage);
    banana.scale = 0.07;
    banana.velocityX = -4;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = player.depth;
    player.depth = player.depth + 1;
    
    //add each cloud to the group
    bananagroup.add(banana);
  }
}

function Obstacles() {
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(750,260,10,40);
    obstacle.velocityX = -4;
    obstacle.addImage("stone",obstacleimage);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.17;
    obstacle.lifetime = 400;
    //add each obstacle to the group
    obstaclegroup.add(obstacle);
  }
}