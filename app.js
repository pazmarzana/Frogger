const squares = document.querySelectorAll('.grid div')
const timeLeft = document.querySelector('#time-left')
const result = document.querySelector('#result')
const startBtn = document.querySelector('#startBtn')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const width = 9
let currentIndex = 76 //9*8+5-1 
let currentTime = 20
let timer

function drawFrog(){
    squares[currentIndex].classList.add('frog')
}

function removeFrog(){
    squares[currentIndex].classList.remove('frog')
}

function moveFrog(e){
    removeFrog()
    switch (e.key) {
        case 'ArrowLeft':
            if(currentIndex % width !== 0) currentIndex-- //if the frog isnt in the left edge
            break;
        case 'ArrowUp':
            if(currentIndex >= width ) currentIndex -= width //if the frog isnt in the top edge
            break;
        case 'ArrowRight':
            if(currentIndex % width !== width - 1) currentIndex++ //if the frog isnt in the right edge
            break;
        case 'ArrowDown':
            if(currentIndex < width * width - width ) currentIndex += width //if the frog isnt in the bottom edge
            break; 
        default:
            break;
    }
    drawFrog()
}

function autoMoveCars(){
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsRight.forEach(carRight => moveCarRight(carRight))
}

function moveCarLeft(carLeft){
    switch (true){
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
            break
    }
}

function moveCarRight(carRight){
    switch (true){
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1')
            carRight.classList.add('c3')
            break
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2')
            carRight.classList.add('c1')
            break
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3')
            carRight.classList.add('c2')
            break
    }
}

function autoMoveLogs(){
    logsLeft.forEach(logLeft => moveLogLeft(logLeft))
    logsRight.forEach(logRight => moveLogRight(logRight))
}

function moveLogLeft(logLeft){
    switch (true){
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break
        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break
        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
            break
        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break
    }
}

function moveLogRight(logRight){
    switch (true){
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
            break
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
            break
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
            break
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
            break
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
            break
    }
}

//move the frog when its on the log moving left
function moveWithLogLeft(){
    if (currentIndex >= 27 && currentIndex < 35){
        squares[currentIndex].classList.remove('frog')
        currentIndex++
        squares[currentIndex].classList.add('frog')
    }
}
//move the frog when its on the log moving right
function moveWithLogRight(){
    if (currentIndex > 18 && currentIndex <= 26){
        squares[currentIndex].classList.remove('frog')
        currentIndex--
        squares[currentIndex].classList.add('frog')
    }
}
//rules to win Frogger
function win(){
 if (squares[4].classList.contains('frog')){
     result.innerHTML = "YOU WON"
     alert("YOU WON")
     squares[currentIndex].classList.remove('frog')
     clearInterval(timer)
     document.removeEventListener('keyup', moveFrog)
 }
}

//rules to lose Frogger
function lose(){
    if ( currentTime === 0 
        || squares[currentIndex].classList.contains('c1')
        || squares[currentIndex].classList.contains('l4')
        || squares[currentIndex].classList.contains('l5')
    ){
        result.innerHTML = "YOU LOST"
        alert("YOU LOST")
        squares[currentIndex].classList.remove('frog')
        clearInterval(timer)
        document.removeEventListener('keydown', moveFrog)
    }
   }
//all the functions that move pieces
function playATurn() {
currentTime--
timeLeft.textContent = currentTime
autoMoveCars()
autoMoveLogs()
moveWithLogLeft()
moveWithLogRight()
lose()
win()
}

function startGame(){
    if(timer){
        clearInterval(timer)
        timer = null
        document.removeEventListener('keydown', moveFrog)
    } else {
        timer = setInterval(playATurn,500)
        document.addEventListener('keydown', moveFrog)
    }
}

drawFrog()
startBtn.addEventListener('click', startGame)
