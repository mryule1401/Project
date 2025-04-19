const board = document.getElementById('game-board');
console.log(board)
//define game variables
gridSize = 25
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
}

//Draw snake
function drawSnake(){
    snake.forEach((segment) => {
        const snakeElement = createGameElement('div','snake');
        setPosition(snakeElement,segment)
        board.appendChild(snakeElement)
    });
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
    gameInterval=setInterval(()=>{
        moving();
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
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
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
        clearInterval();
        gameInterval = setInterval(()=>{
            moving();
            draw();
        },gameSpeedDelay);
    } else {
        snake.pop();
    }
}

