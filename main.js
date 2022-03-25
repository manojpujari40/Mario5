function preload(){
    mario_gameover = loadSound("gameover.wav");
    mario_jump = loadSound("jump.wav");
    mario_coin = loadSound("coin.wav");
    mario_kick = loadSound("kick.wav");
    mario_die = loadSound("mariodie.wav");
    world_start = loadSound("world_start.wav");
    setSprites();
    MarioAnimation();
}

function setup(){
    canvas = createCapture(1240, 336);
    canvas.parent('canvas');

    video = createCapture(VIDEO);
    video.hide();
    video.parent('game_console');

    poseNet = ml5.poseNet(video, modeLoaded);
    poseNet.on('pose', gotPoses);
}
 
function modeLoaded(){
    console.log("model Loaded!");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
    }
}

function draw(){
    game();
}