const board = document.getElementById('game-board');
console.log(board)
//define game variables
let snake = [{ x:13, y: 13}];
let gameStarted = false

//draw game map, snake, food
function draw(){
    board.innerHTML = '';
    drawSnake();
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
document.addEventListener('keydown',(event)=>{
    if (event.code == 'Space' && !gameStarted){
        gameStarted = true;
        beginBackground.style.display ='none';
        draw();
    }
})
