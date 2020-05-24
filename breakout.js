// initialize board variables
let board = document.getElementById("gameboard");
let ctx = board.getContext("2d");
// BOARD
let boardWidth = 650;
let boardHeight = 450;
// OBJECTS
// brick
let brickHeight = 20;
let brickLength = 65;
let brickOffsetLeft = boardWidth * 0.05;
let brickOffsetTop = boardHeight * 0.05;
let brickPadding = 10;
let bricks = [];
// Paddle
let paddleLength = 65;
let paddleHeight = 10;
let dxPad = 6;
let xPad = (boardWidth - paddleLength) * 0.5;
let yPad = boardHeight * (15/16);
// ball
let ballRadius = 5;
let dxBall = 0;
let dyBall = 1;
let startX;
let startY;
let xBall = boardWidth/2;
let yBall = boardHeight/2 * 1.5;
// KEYS
let keys = [];
// SCORBOARD
let score = 0;
let lives = 3;

// create the brick array
for (let col = 0; col < 9; col++) {
    bricks[col] = [];
    for (let row = 0; row < 5; row++) {
        bricks[col][row] = { x:0, y:0, status : 1}; // x-, y-coordinates and display status 1 = on
    }
}
// function to draw all bricks from array
function drawBricks() {
    for (let col = 0; col < 8; col++) {
        for (let row = 0; row < 5; row++) {
            if (bricks[col][row].status == 1) {
                let brickX = (col * (brickLength + brickPadding)) + brickOffsetLeft;
                let brickY = (row * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[col][row].x = brickX; // assigns x-coordinate to brick
                bricks[col][row].y = brickY; // assigns y-coordinate to brick
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickLength, brickHeight);
                ctx.fillStyle = "green";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
// detection for the collision of ball and brick
function collisionDetection() {
    for (let col = 0; col < 8; col++) {
        for (let row = 0; row < 5; row++) {
            let b = bricks[col][row];
            if (b.status == 1){
                if (xBall > b.x + ballRadius && xBall < b.x + brickLength + ballRadius && yBall > b.y + ballRadius && yBall < b.y + brickHeight + ballRadius) {
                    dyBall = -dyBall;
                    b.status = 0; // turns brick off = deletes brick
                    score++;
                    if (score == 8 * 5){
                        alert("YOU HAVE WON!");
                        document.location.reload();
                        clearInterval(interval);
                    }
                }
            }
        }
    }
}
// ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(xBall, yBall, ballRadius, 0,  2*Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}
// overall movement of the ball on the board
function moveBall() {
    drawBall()
    yBall += dyBall;
    xBall += dxBall;
    // bounce off of left and right wall
    if (xBall + dxBall - ballRadius < 0 || xBall + dxBall + ballRadius > boardWidth){
        dxBall = -dxBall;
    }
    // bounce off of top wall
    if (yBall + dyBall - ballRadius < 0 ){
        dyBall = -dyBall;
    }
    // collision logic with the Paddle 
    else if (yBall + dyBall > boardHeight - ballRadius - boardHeight * (1/16) && xBall > xPad && xBall < xPad + paddleLength * (4/9)) {
            dyBall = -dyBall;
            dxBall = -0.5;
    }
    else if (yBall + dyBall > boardHeight - ballRadius - boardHeight * (1/16) && xBall > xPad + paddleLength * (4/9) && xBall < xPad + paddleLength * (6/9)) {
        dyBall = -dyBall;
    }
    else if (yBall + dyBall > boardHeight - ballRadius - boardHeight * (1/16) && xBall > xPad + paddleLength * (6/9) && xBall < xPad + paddleLength) {
        dyBall = -dyBall;
        dxBall = 0.5;
    }
    // collision with bottom wall 
    else if (yBall + dyBall > boardHeight - ballRadius) {
        lives--;
        xBall = boardWidth/2;
        yBall = boardHeight/2 * 1.5;
        dxBall = 0;
        dyBall = 1;
        xPad = (boardWidth - paddleLength) * 0.5;
        if (!lives) {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);

        }
    }
}
// Paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(xPad, yPad, paddleLength, paddleHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}
// displays a frame
function drawWall() {
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.rect(0, 0, boardWidth, boardHeight);
    ctx.stroke();
}
// key controls
window.addEventListener("keydown", keysPressed, false);
window.addEventListener("keyup", keysReleased, false);

function keysPressed(e) {
    keys[e.keyCode] = true;

    // left
    if (keys[37]) {
        xPad -= dxPad;
        if ( xPad < 0 ){
            xPad = 0;
        }
    }
    // right
    if (keys[39]) {
        xPad += dxPad;
        if ( xPad + paddleLength > boardWidth ){
            xPad = boardWidth - paddleLength;
        }
    }

    e.preventDefault();

    drawPaddle();
}

function keysReleased(e) {
    // mark keys that were released
    keys[e.keyCode] = false;
}
//  sweeps the canvas
function clearCanvas() {
    ctx.clearRect(0,0, boardWidth, boardHeight);
}
/* score and lives can also be displayed on the canvas inside the fram
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Lives: "+lives, boardWidth - 70, 20);
}*/
// updates the displayed canvas image
function update() {
    clearCanvas()
    drawBricks()
    drawPaddle()
    collisionDetection()
    //drawScore()
    //drawLives()
    drawWall()
    moveBall()
    document.getElementById("header").innerHTML = "Score: "+score+" Lives: "+lives; 
}
// displaying the board without loading lag
drawWall()
drawBall()
drawPaddle()
drawBricks()
// update interval every 0.01 seconds
let interval = setInterval(update, 10);
// with a little help from https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Finishing_up