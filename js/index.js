// Game Constant and Variables

let inputDir = { x: 0 , y: 0};
const foodSound = new Audio('music/food.wav');
const gameOverSound = new Audio('music/game_over.wav');
const moveSound = new Audio('music/turn.wav');
const musicSound = new Audio ('music/backgroundmusic.wav');
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
        {x: 13 , y: 15}
]
food = {x: 6 , y: 7};

// Game Function 
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);  
    musicSound.play();
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    // if You Bump into Yoursself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y ){       
            return true;
        }
    }
    // If You bump  into the wall
        if(snake[0].x >= 18 || snake[0].x<=0 || snake[0].y >= 18 || snake[0].y <= 0){
            return true;
        }
}

function gameEngine(){
    //  Part 1: Updating The snake Array and Food  
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();   
        inputDir = { x: 0 , y: 0};
        alert("Game Over. Press any key to play Again!");
        snakeArr = [{ x:13 , y: 15}];
        musicSound.play();
        score = 0;
    }

    // If You have eaten the food, increment the Score and regenerate the Food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if (score > hiscorevalue) {
            hiscorevalue = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscorevalue));
            hiscoreBox.innerHTML = "Hi-Score:" + hiscorevalue;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y: snakeArr[0].y + inputDir.y} );
        let a = 2 ;
        let b = 16 ;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake 
     for (let i = snakeArr.length -2; i >= 0 ; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2 : Display The snake and food
    // Display The snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display The Food 
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
}


// Main Logic Starts Here

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscorevalue = 0;
    localStorage.setItem("hiscore",JSON.stringify(hiscorevalue))
}
else{
    hiscorevalue = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hi-Score:" + hiscore;

}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = { x: 0, y: 1} //start The game
    // moveSound.play();
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
            
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0 ;
            break;

        default:
            break;
             
             
    }
});