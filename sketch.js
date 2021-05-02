var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground, groundImg;
var invisibleGround1, invisibleGround2, invisibleGround3;
var lion, lionImg;

var food, catImg, crowImg, foxImg, horseImg, zombieImg;
var enemy, elephantImg, fireImg, lightImg, snakeImg;

var gameOver, restart, gameOverImg, restartImg; 

var foodG, enemyG;

var catSound, crowSound, elephantSound, foxSound ,gameOverSound, horseSound, pointSound, snakeSound, thunderSound, zombieSound;

var score;

function preload(){
  groundImg = loadImage("Asset/Ground.png");
  lionImg = loadImage("Asset/Tiger.gif");
  
  catImg = loadImage("Asset/cat.png");
  crowImg = loadImage("Asset/crow.gif");
  foxImg = loadImage("Asset/fox.png");
  horseImg = loadImage("Asset/horse.png");
  zombieImg = loadImage("Asset/zombie.png");
  elephantImg = loadImage("Asset/Elephant.png");
  fireImg = loadImage("Asset/fire.png");
  lightImg = loadImage("Asset/light.gif");
  snakeImg = loadImage("Asset/snake.png");
  
  gameOverImg = loadImage("Asset/GameOver.png");
  restartImg = loadImage("Asset/Restart.png");
  
  catSound = loadSound("Asset/Sound/cat .m4a");
  crowSound = loadSound("Asset/Sound/crow.m4a");
  elephantSound = loadSound("Asset/Sound/elephant .m4a");
  foxSound = loadSound("Asset/Sound/fox .m4a");
  gameOverSound = loadSound("Asset/Sound/game over.m4a");
  horseSound = loadSound("Asset/Sound/horse .m4a");
  pointSound = loadSound("Asset/Sound/points .m4a");
  snakeSound = loadSound("Asset/Sound/snake .m4a");
  thunderSound = loadSound("Asset/Sound/thunder .m4a");
  zombiesSound = loadSound("Asset/Sound/zombies .m4a");

}

function setup() {
  createCanvas(600,500);
  
  invisibleGround1 = createSprite(100,334,200,2);
  invisibleGround2 = createSprite(500,421,300,1);  
  invisibleGround3 = createSprite(300,505,600,10);
  
  ground = createSprite(580,40,20,20);
  ground.addImage("ground",groundImg);
  ground.scale =2.1;
  
  lion = createSprite(60,340,20,20);
  lion.addImage("lion",lionImg);
  lion.scale =0.14;

  gameOver = createSprite(290,200,10,10);
  gameOver.addImage("gameOver", gameOverImg);
  gameOver.scale = 0.35;
  
  restart = createSprite(290,280,10,10);
  restart.addImage("restart", restartImg);
  restart.scale = 0.37;

  score = 0;
  
  lion.setCollider("circle",0,0,300)
  
  foodG = new Group();
  enemyG = new Group();

}

function draw() {
  background(0);
  
  if(gameState===PLAY) {
    gameOver.visible = false; 
    restart.visible = false; 
    lion.visible = true;
    
    lion.velocityX = 1;
    invisibleGround1.velocityX = 1;
    invisibleGround2.velocityX = 1;
    invisibleGround3.velocityX = 1;
    gameOver.velocityX = 1;
    restart.velocityX = 1;

    camera.position.x = lion.x+250;

    if(lion.x>=ground.x) {
      ground.x = ground.x+ground.width/2;
    }
  
    ground.velocityX = -(8+2*score/5);
      
    if(keyDown("down")){
      lion.velocityY = 15;
  
    }
  
    if(keyDown("up")){
      lion.velocityY = -15;
  
    }
    
    foods();
    enemys();
    
    if(enemyG.isTouching(foodG)) {
      foodG.destroyEach();
      
    }
    
    if(foodG.isTouching(invisibleGround3)) {
      foodG.destroyEach();
      
    }
    
    if(enemyG.isTouching(invisibleGround3)) {
      enemyG.destroyEach();
      
    }
    
    if(foodG.isTouching(lion)) {
      score +=1;
      foodG.destroyEach();
      pointSound.play();
      
    }
    
    if(enemyG.isTouching(lion)) {
      gameState = END;
      gameOverSound.play();
      
    }
    
  } else if(gameState===END) {
      gameOver.visible = true; 
      restart.visible = true; 
      lion.visible = false;

      ground.velocityX = 0;
      lion.velocityX = 0;
      gameOver.velocityX = 0;
      restart.velocityX = 0;
      invisibleGround1.velocityX = 0;
      invisibleGround2.velocityX = 0;
      invisibleGround3.velocityX = 0;

      foodG.setVelocityXEach(0);
      foodG.setLifetimeEach(-1);
    
      enemyG.setVelocityXEach(0);
      enemyG.setLifetimeEach(-1);
  
      if(mousePressedOver(restart)){
        reset();
        
      }
  }
  
    lion.collide(invisibleGround3);
    lion.collide(invisibleGround1);
    lion.collide(invisibleGround2);
    
  drawSprites();
  
  fill("red");
  textSize(45);
  text("Kills : "+score,lion.x+150,150);
  
}

function reset() {
  gameState = PLAY;
  score = 0;
  foodG.destroyEach();        
  enemyG.destroyEach();
  
}

function foods() {
  if(frameCount%70===0) {
    food = createSprite(lion.x+610,400,10,10);
    food.velocityX = -(9+2*score/6);
    
    var rand = Math.round(random(1,5));
      switch(rand) {
        case 1: food.addImage(catImg);
                catSound.play();
                food.scale = 0.05;
                break;
        case 2: food.addImage(crowImg);
                crowSound.play();
                food.scale = 0.41;
                break;
        case 3: food.addImage(foxImg);
                foxSound.play();
                food.scale = 0.14;            
                break;
        case 4: food.addImage(horseImg);
                horseSound.play();          
                food.scale = 0.07;            
                break;
        case 5: food.addImage(zombieImg);
                zombiesSound.play();          
                food.scale = 0.09;            
                break;
        default: break;
       
        }    

    foodG.lifetime = 200;
    food.y = Math.round(random(375,470));
    foodG.add(food);    
    foodG.collide(invisibleGround2);
    foodG.collide(invisibleGround3);
    food.setCollider("circle",0,0,70)
    
  }
}

function enemys() {
 if(frameCount%150===0) {
    enemy = createSprite(lion.x+610,400,10,10);
    enemy.velocityX = -(10+2*score/4);
    
    var r = Math.round(random(1,4));
      switch(r) {
        case 1: enemy.addImage(elephantImg);
                elephantSound.play();          
                enemy.scale = 0.17;
                break;
        case 2: enemy.addImage(fireImg);
                enemy.scale = 0.17;
                break;
        case 3: enemy.addImage(lightImg);
                thunderSound.play();
                enemy.scale = 0.45;            
                break;
        case 4: enemy.addImage(snakeImg);
                snakeSound.play();          
                enemy.scale = 0.045;            
                break;
        default: break; 
      }    

    enemyG.lifetime = 100;
    enemy.y = Math.round(random(370,470));
    enemyG.add(enemy);
    enemyG.collide(invisibleGround2);
    enemyG.collide(invisibleGround3);
    enemy.setCollider("circle",0,0,70)
   
  }
}

