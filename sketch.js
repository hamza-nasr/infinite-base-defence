var ground, backgroundImage, backgroundImage2, backgroundImage3;
var knight, knightWalking, knightJump, knightIdle, knightAttacking, knightAttackingExtra;
var enemy, enemyWalking, enemyGroup;
var mage, mageWalking, mageGroup;
var wraith, wraithFlying, wraithGroup;
var counter;
var score;
var gameMode;
var endWall;
var gameState;
function preload(){
  backgroundImage=loadImage("images/backgroud/Battleground1.png");
  backgroundImage2=loadImage("images/backgroud/Battleground2.png");
  backgroundImage3=loadImage("images/backgroud/Battleground3.png");
  knightWalking=loadAnimation("images/knight/walk1.png", "images/knight/walk2.png",
  "images/knight/walk3.png", "images/knight/walk4.png", 
  "images/knight/walk5.png", "images/knight/walk6.png");
  knightIdle=loadImage("images/knight/walk1.png");
  knightJump=loadAnimation("images/knight/jump1.png","images/knight/jump2.png", 
  "images/knight/jump3.png","images/knight/jump4.png","images/knight/jump5.png",
  "images/knight/jump6.png","images/knight/jump7.png");
  knightAttacking=loadAnimation("images/knight/attack0.png", "images/knight/attack1.png",
  "images/knight/attack2.png", "images/knight/attack3.png", 
  "images/knight/attack4.png");
  knightAttackingExtra=loadAnimation("images/knight/attack_extra1.png", "images/knight/attack_extra2.png",
  "images/knight/attack_extra3.png", "images/knight/attack_extra4.png", 
  "images/knight/attack_extra5.png", "images/knight/attack_extra6.png", "images/knight/attack_extra7.png",
  "images/knight/attack_extra8.png")
  enemyWalking=loadAnimation("images/enemy/walk1.png","images/enemy/walk2.png",
  "images/enemy/walk3.png","images/enemy/walk4.png","images/enemy/walk5.png",
  "images/enemy/walk6.png");
  mageWalking=loadAnimation("images/enemy/walk1 (2).png","images/enemy/walk2 (2).png",
  "images/enemy/walk3 (2).png","images/enemy/walk4 (2).png","images/enemy/walk5 (2).png",
  "images/enemy/walk6 (2).png");
  wraithFlying=loadAnimation(
  "images/wraith/Wraith_02_Moving Forward_000.png",
  "images/wraith/Wraith_02_Moving Forward_001.png",
  "images/wraith/Wraith_02_Moving Forward_002.png",
  "images/wraith/Wraith_02_Moving Forward_003.png",
  "images/wraith/Wraith_02_Moving Forward_004.png",
  "images/wraith/Wraith_02_Moving Forward_005.png",
  "images/wraith/Wraith_02_Moving Forward_006.png",
  "images/wraith/Wraith_02_Moving Forward_007.png",
  "images/wraith/Wraith_02_Moving Forward_008.png",
  "images/wraith/Wraith_02_Moving Forward_009.png",
  "images/wraith/Wraith_02_Moving Forward_010.png",
  "images/wraith/Wraith_02_Moving Forward_011.png");
  gameOver=loadImage("images/Game Over.jpg");
}

function setup() {
  createCanvas(900,600);
  ground=createSprite(450,480,900,60);
  endWall=createSprite(10,300,20,600);
  endWall.visible=false;
  ground.visible=false;
  knight=createSprite(50,460,10,10);
  knight.addImage("idle", knightIdle);
  knight.addAnimation("walking", knightWalking);
  knight.addAnimation("attacking", knightAttacking);
  knight.addAnimation("extraAttack", knightAttackingExtra);
  knight.addAnimation("jump", knightJump);
  gameOverSprite=createSprite(450,350);
  gameOverSprite.addImage(gameOver);
  gameOverSprite.visible=false;
  
  //knight.debug=true
  knight.setCollider("rectangle", -10,0,50,80)
  knight.scale=1.5;
  enemyGroup=new Group();
  mageGroup=new Group();
  wraithGroup=new Group();
  gameState="play";
  score=0;
  counter = 10;
  gameMode="idle";
}

function draw() {
  background(backgroundImage);  
  if(gameState === "play"){

  
  knight.velocityY=knight.velocityY+0.5;
  knight.collide(ground);
  
  if(mouseWentUp("leftButton")){
    knight.changeAnimation("attacking", knightAttacking);
    gameMode="attack";
  }
  else{
    gameMode="idle";
  }
  if(keyWentUp(69)){
    knight.changeAnimation("extraAttack", knightAttackingExtra);
    gameMode="attack2";
  }
  if(gameMode==="attack" && enemyGroup.isTouching(knight)){
    enemyGroup.destroyEach();
    score=score+5;

  }else if(gameMode==="attack2" && mageGroup.isTouching(knight)){
    mageGroup.destroyEach();
    score=score+10;
  }else if(gameMode==="attack" && wraithGroup.isTouching(knight)){
    wraithGroup.destroyEach();
    score=score+15;
    
  }
  spawnEnemy();
  spawnMage();
  spawnWraith();
  changeBackground();
  if(enemyGroup.isTouching(endWall)){
    enemyGroup.destroyEach();
    counter--
  }
  if(mageGroup.isTouching(endWall)){
    mageGroup.destroyEach();
    counter--
  }
  if(wraithGroup.isTouching(endWall)){
    wraithGroup.destroyEach();
    counter--
  }
  if(counter === 0){
    gameState="end";
  }
}else if(gameState === "end"){
  gameOverSprite.visible=true;
  if(keyIsDown(82)){
    reset();
  }
}

  
  drawSprites();
  
  textSize(35);
  fill("red");
  text("score = " + score, 650,50);
  text("lives = " + counter, 50, 50);
}
function reset(){
  gameState="play";
  gameOverSprite.visible=false
  score=0;
  counter=10;
}
function keyPressed(){
if(keyIsDown(65)){
  knight.changeAnimation("walking", knightWalking);
  knight.velocityX=-8;
}
else if(keyIsDown(68)){
  knight.changeAnimation("walking", knightWalking);
  knight.velocityX=8;

}else if(keyIsDown(32)){
  knight.changeAnimation("jump", knightJump);
  knight.velocityY=-10;
}

}

function keyReleased(){
  knight.changeAnimation("idle", knightIdle);
  knight.velocityX=0;

}
function spawnEnemy(){
  if(frameCount%200===0){
    enemy=createSprite(900,395,10,10);
    enemy.addAnimation("enemy1", enemyWalking);
    enemy.setCollider("circle", 0,0,30);
    enemy.mirrorX(enemy.mirrorX()*-1)
    enemy.scale=1.5;
    enemy.velocityX=-9.5;
    enemy.lifetime=110;
    enemyGroup.add(enemy);

  }
}
function spawnMage(){
  if(frameCount%290===0){
    mage=createSprite(900,395,10,10);
    mage.addAnimation("mage1", mageWalking);
    mage.setCollider("circle", 0,0,40);
    mage.mirrorX(mage.mirrorX()*-1)
    mage.scale=1.5;
    mage.velocityX=-7;
    mage.lifetime=140;
    mageGroup.add(mage);
  }
}
function spawnWraith(){
  if(frameCount%380===0){
    wraith=createSprite(900,200,10,10);
    wraith.y=Math.round(random(100, 300))
    wraith.addAnimation("wraith", wraithFlying);
    //wraith.debug=true;
    wraith.setCollider("rectangle", 0,0,200,200);
    wraith.mirrorX(wraith.mirrorX()*-1)
    wraith.scale=0.32;
    wraith.velocityX=-5;
    wraith.lifetime=190;
    wraithGroup.add(wraith);
  }
}
function changeBackground(){
  if(score > 200 && score < 350){
    background(backgroundImage3);
  }else if(score >= 350){
    background(backgroundImage2);
  }
}