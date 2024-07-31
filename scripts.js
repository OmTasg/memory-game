let gameTile = document.getElementsByClassName("game-tile")
let things = ["🐍", "🦮", "🐬", "🦄", "🐍", "🐖", "🐬", "🦄", "🦜", "🐖", "🦜", "🦮"]
let randNum = 0
const block1 = document.getElementById("block1")
const block2 = document.getElementById("block2")
const block3 = document.getElementById("block3")
const block4 = document.getElementById("block4")
const block5 = document.getElementById("block5")
const block6 = document.getElementById("block6")
const block7 = document.getElementById("block7")
const block8 = document.getElementById("block8")
const block9 = document.getElementById("block9")
const block10 = document.getElementById("block10")
const block11 = document.getElementById("block11")
const block12 = document.getElementById("block12")
const resetBtn = document.getElementById("reset")
const bestTime = document.getElementById("best-time")
let seconds = 0
let tens = 0
const appendTens = document.getElementById("tens")
const appendSeconds = document.getElementById("seconds")
let Interval
let elementID
let count = 0
let pastEmoji
let pastID
let inPlay = true
let completed = 0
let isOver = false
let times = []

function randomFill(){
    randNum = Math.floor(Math.random() * (things.length))
    block1.innerText = things[randNum]
    things.splice(things.indexOf(things[randNum]), 1)
    block1.style.fontSize = "0px"

    for (let i = 2; i <= 12; i++) {
        randNum = Math.floor(Math.random() * (things.length))
        let currentBlock = document.getElementById(`block${i}`)
        currentBlock.innerText = things[randNum]
        currentBlock.style.fontSize = "0px"
        things.splice(things.indexOf(things[randNum]), 1)
    }
}

function handleTileClick(event) {
    let element = event.target;
    let size = element.style.fontSize;
    
    if (!isOver) {     
        if (inPlay && size === "0px") {
            timer()
            if (count === 0) {
                pastEmoji = element.innerText;
                pastID = element
                count = 1
                element.style.fontSize = "60px"
            } else if (count === 1 && (pastID !== element)) {
                if (element.innerText === pastEmoji && pastEmoji !== undefined) {
                    inPlay = false
                    element.style.fontSize = "60px"
                    console.log("correct")
                    pastID = ""
                    count = 0
                    setTimeout(function() {
                        inPlay = true
                    }, 400);
                    completed += 2
                } else {
                    inPlay = false
                    element.style.fontSize = "60px"
                    count = 0
                    setTimeout(function() {
                        pastID.style.fontSize = "0px"
                        element.style.fontSize = "0px"
                        inPlay = true;
                    }, 400)
                }
            }
        }
        checkOver()
    } 
}

Array.from(gameTile).forEach(element => {
    element.addEventListener("click", handleTileClick)
})

randomFill()

function checkOver() {
    if (completed === 12) {
        isOver = true
        stopTimer()
        let realTime = (Number(appendSeconds.innerText)*1000) + (Number(appendTens.innerText) * 10)
        times.push(realTime)
        console.log(times)
        checkBestTime()
    }
}

function resetGame() {
    console.log("clicked")

    for (let i = 1; i <= 12; i++) {
        let resetBlock = document.getElementById(`block${i}`)
        if (resetBlock) {
            resetBlock.innerText = ""
            resetBlock.style.fontSize = "0px"
        }
    }

    count = 0
    pastEmoji = undefined
    pastID = undefined
    inPlay = true
    completed = 0
    isOver = false

    things.length = 0
    things.push("🐍", "🦮", "🐬", "🦄", "🐍", "🐖", "🐬", "🦄", "🦜", "🐖", "🦜", "🦮")
    randomFill()
    
    resetTimer()

    Array.from(gameTile).forEach(element => {
        element.removeEventListener("click", handleTileClick)
        element.addEventListener("click", handleTileClick)
    })
}

function timer() {
    clearInterval(Interval)
    Interval = setInterval(startTimer, 10)
}

function stopTimer() {
    clearInterval(Interval)
}

function resetTimer() {
    clearInterval(Interval)
    tens = 0
    seconds = 0
    appendTens.innerHTML = "00"
    appendSeconds.innerHTML = "00"
}

function startTimer() {
    tens++
    if (tens <= 9) {
        appendTens.innerHTML = "0" + tens
    } else {
        appendTens.innerHTML = tens
    }
    
    if (tens > 99) {
        seconds++
        appendSeconds.innerHTML = (seconds <= 9) ? "0" + seconds : seconds
        tens = 0
        appendTens.innerHTML = "00"
    }
}

function checkBestTime(){
   let lowest = Math.min(...times)
   let lowestSec = lowest / 1000
   bestTime.innerText = `Best Time: ${lowestSec}`
}
