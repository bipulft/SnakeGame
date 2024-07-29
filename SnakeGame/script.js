var blocksize = 25;
var rows = 25;
var cols = 40;
var board;
var context;

//head of snake
var snakeX = blocksize * 5;
var snakeY = blocksize * 5;

var velocityX = 0;
var velocityY = 0;

//body of snake
var snakeBody = [];

// food for snake
var foodX;
var foodY;

// score
var score = 0;

// gameover
var gameOver = false;


window.onload = function(){
    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext('2d'); //used for drawing on the board
    
    spawnFood();
    document.addEventListener("keyup", changeDirection);
    //update();
    setInterval(update, 1000/10); // every 100 millisecond the update function is triggered
}

function update(){
    if(gameOver){
        return;
    }

    context.fillStyle="lightGreen";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, blocksize, blocksize);

    if(snakeX == foodX && snakeY == foodY){
        snakeBody.push([foodX, foodY])
        score++;    
        spawnFood();
    }

    for(let i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }

    if(snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle="darkGreen";
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    context.fillRect(snakeX, snakeY, blocksize, blocksize);
    for(let i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
    }

    // Display score
    context.fillStyle = "black";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, 20);

    //conditions for gameover
    if (snakeX < 0 || snakeX > cols*blocksize || snakeY < 0 || snakeY > rows*blocksize){
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++){
        if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            gameOver = true;
            alert("Game Over");
        }
    }
}

function changeDirection(e){
    if(e.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

function spawnFood(){
// math.random returns a number between 0-1
// then this function multiplies the number by column (at max 24.9999)
// math.floor to remove decimals
// multiplied by blocksize 25
// same goes for rows
foodX = Math.floor(Math.random() * cols) * blocksize;
foodY = Math.floor(Math.random() * rows) * blocksize;
}