let txtScore = document.getElementById('score')
let canvas = document.getElementById('canvas') // canvas = "Leinwand"
let ctx = canvas.getContext('2d')  // Wir möchten in 2d auf unserer Leinwand malen
let rows = 20
let cols = 20
let snake = [
    {
        x: 20,
        y: 3
    }
]
let food
let cellWidth = canvas.width/cols
let cellHeight = canvas.height/rows
let direction = 'LEFT'
let foodCollected = false
let score = 0

placeFood()

setInterval(gameLoop,  200)
document.addEventListener('keydown', keyDown) // Eventlistener auf die gedrückten Pfeil-Tasten

draw()

function draw(){
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height) // (x-Achse, y-Achse, width, height)
    ctx.fillStyle = 'white'
    
    snake.forEach(part => add(part.x, part.y))

    ctx.fillStyle = 'red'
    add(food.x, food.y)

    requestAnimationFrame(draw)
}

function add(x, y){
    ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1)

}

function shiftSnake(){
    for(let i = snake.length -1; i > 0; i--){
        const part = snake[i]
        const lastPart = snake[i - 1]
        part.x = lastPart.x
        part.y = lastPart.y
    }
}

function gameLoop(){
    testGameOver()
    if(foodCollected){
        snake = [
            {
                x: snake[0].x,
                y: snake[0].y
            }, ...snake]
        foodCollected = false
    }
    shiftSnake()
    if(direction == 'LEFT'){
        snake[0].x--
    }
    if(direction == 'UP'){
        snake[0].y--
    }
    if(direction == 'RIGHT'){
        snake[0].x++
    }
    if(direction == 'DOWN'){
        snake[0].y++
    }

    if(snake[0].x == food.x && snake[0].y == food.y){
        foodCollected = true //Futter einsammeln
        score++
        txtScore.textContent = score
        //schlange muss größer werden
        placeFood() //futter neu platzieren
    }
}

function keyDown(e){
    if(e.keyCode == 37){
        direction = 'LEFT'
    }
    if(e.keyCode == 38){
        direction = 'UP'
    }
    if(e.keyCode == 39){
        direction = 'RIGHT'
    }
    if(e.keyCode == 40){
        direction = 'DOWN'
    }
}

function placeFood(){
    let randomX = Math.floor(Math.random()* cols)
    let randomY = Math.floor(Math.random()* rows)

    food = {
        x: randomX,
        y: randomY
    }
}

function testGameOver(){

    let firstPart = snake[0]
    let otherParts = snake.slice(1)
    let duplicatePart = otherParts.find(part => part.x == firstPart.x && part.y == firstPart.y)

    // Schlange läuft gegen Wand oder gegen sich selbst
    if(snake[0].x < 0 || snake[0].x > cols-1 || snake[0].y < 0 || snake[0].y > rows - 1 || duplicatePart){
        placeFood()
            snake = [
                {
                    x: 19,
                    y: 3
                }
            ]
        direction = 'LEFT'
        score = 0
        txtScore.textContent = score
    }

}