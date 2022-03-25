var mario,bricks,cloud,mountains,enemyMushrooms,pipe,platfor,coins;

var control={
    up: "UP_ARROW",
    right: "RIGHT_ARROW",
    left: "LEFT_ARROW",
    revive: 32
}

var gameConfig={
    status:"start",
    intailzeslife:4,
    MoveSpeed:5,
    enemyMoveSpeed:1,
    gravity:1,
    gravityenemy:10,
    jump:-15,
    startingPointX:600,
    startingPointY:0,
    screenX:1240,
    screenY:336,
    timeScore:0,
    score:0
}

noseX="";
noseY="";
GameStatus="";

function game(){
    console.log("nose X = " + noseX + ", nose Y = " + noseY);
    instailizeInDraw();
    moveEnviroment(mario);
    drawSprites();

    if(gameConfig.status = "start"){
        fill(0, 0, 0, 150);
        rect(0, 0, gameConfig.screenX, gameConfig.screenY);

        fill(0, 0, 150);
        textSize(40);
        textAlign(CENTER);
        text("Press Play Button to Start The Game", gameConfig.screenX/2, gameConfig.screenY/2);
        textSize(40);

        stroke(255);
        strokeWeight(7);
        nofill();

        changeGameStatus();
    }
    if(gameConfig.status="play"){
        positionOfCharacter(mario);
        enemys(enemyMushrooms);
        checkStatus(mario);
        scores(mario);
        manualControl(mario);
    }

    if(gameConfig.status="gameover"){
        fill(0, 0, 0, 150);
        rect(0, 0, gameConfig.screenX, gameConfig.screenY);

        fill(255, 255, 255);
        textSize(40);
        textAlgin(CENTER);
        text("GAME OVER", gameConfig.screenX/2, gameConfig.screenY/2);
        textSize(15);
        text("Space to Restart", gameConfig.screenX/2, gameConfig.screenY/2);
        textSize(40);
        text(round(gameConfig.scores), gameConfig.screenX/2, gameConfig.screenY/2+135);
        text("points", gameConfig.screenX/2, gameConfig.screenY/2);

        stroke(255);
        strokeWeight(7);
        nofill();
        ellispe(gameConfig.screenX/2, gameConfig.screenY/2-30,160,160);
        changeGameStatus(mario);
    }
}

function startGame(){
    GameStatus = "start";
    document.getElementById("status").innerHTML = "Game is Loading";
}

function changeGameStatus(character){
    if(noseX != "" && gameConfig.status=="start"&& GameStatus=="start"){
        document.getElementById("status").innerHTML = "Game is Loading";
        world_start.play();
        intailizeCharacterStatus(mario);
        gameConfig.status = "play";
    }
    if(gameConfig.status == "Game Over" && keyDown(control.revive)){
        gameConfig.status = "start";
    }
}

function instailizeInSetup(character){
    frameRate(120);

    character_scale = 0.35;
    intailizeCharacterStatus(character);

    bricks.displace(bricks);
    platforms.displace(platforms);
    coins.displace(coins);
    coins.displace(platforms);
    coins.displace(bricks);
    coins.displace(pipe);

    clouds.forEach(function(element){
        element.scale=random(1,2);
    })
}

function intailizeCharacterStatus(character){
    character.status = 0.35;
    character["killing"] = 0;
    character["kill"] = 0;
    character["live"] = ture;
    character["liveNumber"] = gameConfig.intailzeslife;
    character["status"] = "live";
    character["coins"] = 0;
    character["dying"] = 0;
    character.position.X = gameConfig.startingPointX;
    character.position.Y = gameCongif.startingPointY;
}

function instailizeInDraw(){
    background(109,143,252);

    if(mario.killing > 0){
        mario.killing-=1;
    }
    else{
        mario.kiling=0;
    }
    pipes.displace(pipes);
    enemyMushrooms.displace(enemyMushrooms);
    enemyMushrooms.collide(pipes);
    clouds.displace(clouds);

    if(mario.live){
        bricks.displace(mario);
        pipes.displace(mario);
        enemyMushrooms.displace(mario);
        platforms.displace(mario);
    }
    mario["standOnObj"]="false";
    mario.velocity.x = 0;
    mario.maxspeed = 20;
}

function coinVanish(coin){
    if(coin.get){
        coin.position.x = random(50, gameConfig.screenX)+gameConfig.screenX;
        coin.get=false;
    };
}

function positionOfCharacter(character){
    if(character.live){
        platforms.forEach(function(element){standOnObjs(character, element)});
        bricks.forEach(function(element){standObjs(character)});
        pipes.forEach(function(element){standObjs(character)});

        falling(character);

        if(character.standOnObj) jumping(character);
    }

    coins.forEach(function(element){
        getCoins(element, coins);
        coinVanish(element);
    });

    enemyMushrooms.forEach(function(element){
        stepOnEnemy(character, element);
        if((element.touching.left||element.toching.right)&&character.live&&character.killing==0) die(mario);
    })

    dontGetOutOfScreen(mario);
}

function autoControl(character){
    if(character.live){
        if(noseX < 300){
            character.velocity.x-=gameConfig.moveSpeed;
            character.changeAnimation(move);
            character.mirrorX(-1);
        }
    if(noseX > 300){
        character.velocity.x+=gameConfig.moveSpeed;
        character.changeAnimation("move");
        character.mirror(1);
    }

    if(!keyDown(control.left)&&!keyDown(control.right)&&keyDown(control.up)){
        changeAnimation("stand");
    }
}

function jumping(character){
    if(noseX < 168 && character.live) || (touchIsDown&&character.live){
        character.velocity.y+gameConfig.jump;
        mario.play();
    }
}