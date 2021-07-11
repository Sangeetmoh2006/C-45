var spaceship, shot, asteroid, satellite;
var asteroidImg, satelliteImg, shotImg, spacebaseImg, spaceshipImg, spacebgImg;
var asteroidGroup, satelliteGroup;
var gameState = "serve";
var timer = 500;
function preload() {
  asteroidImg = loadImage('Asteroid.jpg');
  satelliteImg = loadImage('Satellite.jpg');
  shotImg = loadImage('Shot.png');
  spacebaseImg = loadImage('Spacebase.jpg');
  spaceshipImg = loadImage('Spaceship.png');
  spacebgImg = loadImage('spacebg.jpg');
}

function setup() {
  createCanvas(800,500);

  backg = createSprite(0, 0, 800, 500);
  backg.addImage(spacebgImg);
  backg.scale = 2.6;

  spaceship = createSprite(400, 330, 50, 50);
  spaceship.addImage(spaceshipImg);

  shot = createSprite(400, 200, 50, 50);
  shot.addImage(shotImg);

  shot.depth = spaceship.depth;
  spaceship.depth += 1;

  asteroidGroup = createGroup();
  satelliteGroup = createGroup();
}

function draw() {
  textSize(16);
  fill('white');
  background("black");
  

  if(gameState === "serve"){
    text("Your spaceship is low on fuel!", 20, 120);
    text("You must reach the space base without crashing into asteroids or satellites.", 20, 140);
    text("Your spaceship is equipped with a blaster. Use it to shoot the asteroids.", 20, 160);
    text("DO NOT SHOOT THE SATELLITES OTHERWISE YOUR TIME WILL BE DEDUCTED BY ____ SECONDS!", 20, 180);
    text("You have ____ seconds", 20, 200);
    text("Press 's' to start and 'space' to shoot", 20, 220);

    if(keyDown('s')){
      gameState = "play";
    }
  }

  else if(gameState === "play"){
    backg.velocityY = 3;
    timer = timer - Math.round(getFrameRate()/60);
    if(backg.y < 0){
    backg.y = background.height/2;
  }
    if(keyDown("LEFT_ARROW")){
      spaceship.x = spaceship.x - 8;
    }
    if(keyDown("RIGHT_ARROW")){
      spaceship.x = spaceship.x + 8;
    }
    if(keyDown("space")){
      shot.velocityY = -9;
      shot.x = spaceship.x;
      shot.y = spaceship.y-30;
    }

    if(asteroidGroup.isTouching(shot)){
      asteroidGroup.destroyEach();
    }
    if(satelliteGroup.isTouching(shot)){
      timer = timer - 5;
    }

    if(spaceship.y > 50 && timer === 0){
      gameState = "end"
    }
  }
  else if(gameState === "end"){
    fill("black");
    backg.velocityY = 0;
    backg.addImage(spacebaseImg);
    backg.scale = 5.5;
    spaceship.destroy();
    shot.destroy();
  }
  spawnAsteroids();
  spawnSatellites();
  drawSprites();
  text("Timer: " + timer, 550, 50);
}

function spawnAsteroids(){
  if(frameCount%30===0 && gameState === "play"){
    asteroid = createSprite(200, 50);
    asteroid.addImage(asteroidImg);
    asteroid.scale = 0.8;

    asteroid.x = Math.round(random(120,400));
    asteroid.velocityY = 4;
    asteroid.lifetime = 500;

    asteroidGroup.add(asteroid);
  }
}

function spawnSatellites(){
  if(frameCount%70===0 && gameState === "play"){
    satellite = createSprite(200, 50);
    satellite.addImage(satelliteImg);
    satellite.scale = 0.4;

    satellite.x = Math.round(random(200,400));
    satellite.velocityY = 4;
    satellite.lifetime = 500;

    satelliteGroup.add(satellite);
  }
}