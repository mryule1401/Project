const board = document.getElementById('game-board');
console.log(board)
//define game variables
const gridSize = 25
let snake = [{ x:13  , y: 13}];
let food = generatefood();
let gameStarted = false
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
//draw game map, snake, food
function draw(){
    board.innerHTML = '';
    drawSnake();
    drawFood();
    updateScore();
}

//Draw snake
function drawSnake(){
    if (gameStarted){
        snake.forEach((segment) => {
            const snakeElement = createGameElement('div','snake');
            setPosition(snakeElement,segment)
            board.appendChild(snakeElement)
        });
    }
}

//Create a snake or food cube/div
function createGameElement(tag, className){
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

//Set the position of the snake or food
function setPosition(element, position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

const beginBackground = document.getElementById('begin-background')
function startGame(){
    gameStarted = true;
    beginBackground.style.display ='none';
    gameInterval=setInterval(() => {
        moving();
        checkCollision()
        draw();
    },gameSpeedDelay)
}

//keypress event listener
function handleKeyPress(event){
    if ((event.code == 'Space' && !gameStarted) || (event.code == ' ' && !gameStarted)){
        startGame()
    }
    else{
        switch (event.key){
            case 'ArrowUp':
            case 'w':
                if (direction != 'down'){
                    direction = 'up'; 
                } 
                break;
            case 'ArrowDown':
            case 's':
                if (direction != 'up'){
                    direction = 'down';
                } 
                break;
            case 'ArrowLeft':
            case 'a':
                if (direction != 'right'){
                    direction = 'left';
                } 
                break;
            case 'ArrowRight':
            case 'd':
                if (direction != 'left'){
                    direction = 'right';
                }
                break;
        }
    }
}
document.addEventListener('keydown',handleKeyPress)
//making food
function drawFood(){
    if (gameStarted){
        const foodElement = createGameElement('div', 'food');
        setPosition(foodElement, food);
        board.appendChild(foodElement);
    }
    }

//generating food location
function generatefood(){
    const x = Math.floor(Math.random()*gridSize)+1;
    const y = Math.floor(Math.random()*gridSize)+1;
    return {x,y};
}

//moving the snake
function moving(){
    const head = {...snake[0]};
    switch (direction){
        case 'right':
            head.x++;
            break;
        case 'up':
            head.y--;
            break;
        case 'left':;
            head.x--
            break;
        case 'down':
            head.y++;
            break;
    }

    snake.unshift(head);
    // snake.pop();
    if (head.x==food.x && head.y == food.y){
        food = generatefood();
        increaseSpeed();
        clearInterval(gameInterval);
        gameInterval = setInterval(()=>{
            moving();
            checkCollision();
            draw();
        },gameSpeedDelay);
    } else {
        snake.pop();
    }
}

function increaseSpeed(){
    if (gameSpeedDelay > 150){
        gameSpeedDelay-=5;
    }
    else if (gameSpeedDelay >100 && gameSpeedDelay<150){
        gameSpeedDelay -=3
    }
    else if (gameSpeedDelay >50 && gameSpeedDelay<100){
        gameSpeedDelay -=2
    }
    else if (gameSpeedDelay >25 && gameSpeedDelay<50){
        gameSpeedDelay -=1
    }
}

function checkCollision(){
    const head = snake[0];

    if(head.x <1|| head.x > gridSize || head.y < 1 || head.y >gridSize){
        resetGame();
    }

    for (let i = 1; i < snake.length; i++){
        if (head.x == snake[i].x && head.y == snake[i].y){
            resetGame();
        }
    }
}
function resetGame(){
    updateHighScore();
    gameOver();
    snake = [{x:13,y:13}];
    food = generatefood();
    direction = 'right';
    gameSpeedDelay = 200
    updateScore();
}

function gameOver() {
    clearInterval(gameInterval);
    gameStarted = false;
    beginBackground.style.display = 'block';
    alert(`Game Over! Score: ${snake.length - 1}.`);
}

const score = document.getElementById('score')
function updateScore(){
    const currentScore = snake.length -1;
    score.textContent = currentScore.toString().padStart(3,'0');
}

const highScoreText = document.getElementById('highest-score');
console.log(highScoreText)
let highScore = 0;
function updateHighScore(){
    const currentScore =snake.length - 1;
    if (currentScore > highScore){
        highScore =currentScore;
        highScoreText.textContent = highScore.toString().padStart(3,'0');
    }
    highScoreText.style.visibility ='visible'
}