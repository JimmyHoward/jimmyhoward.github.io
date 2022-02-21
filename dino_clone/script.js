import {setupGround, updateGround} from './ground.js'
import {setupDino, updateDino, getDinoRect, setDinoLose} from './dino.js'
import {setupCactus, updateCactus, getCactusRects} from './cactus.js'

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
const SPEED_SCALE_INCREASE = 0.00001;

const worldElem = document.querySelector('[data-world]')
const scoreElem = document.querySelector('[data-score]')
const startElem = document.querySelector('[data-start-screen]')

setPixelToWorldScale()
window.addEventListener('resize', setPixelToWorldScale)
document.addEventListener('keydown', handleStart, {once: true})


function handleStart() {
    lastTime = null;
    score = 0;
    speedScale = 1;
    setupGround()
    setupDino()
    setupCactus()
    startElem.classList.add('hide')
    window.requestAnimationFrame(update) //1st call to 'update' func
}

function setPixelToWorldScale() {
    let worldToPixelScale;
    // if width is limiting factor, scale by width
    if (window.innerWidth/window.innerHeight < WORLD_WIDTH/WORLD_HEIGHT) {
        worldToPixelScale = window.innerWidth/WORLD_WIDTH
    } else {
        worldToPixelScale = window.innerHeight/WORLD_HEIGHT
    }

    worldElem.style.width = `${WORLD_WIDTH*worldToPixelScale}px`
    worldElem.style.height = `${WORLD_HEIGHT*worldToPixelScale}px`
}


let lastTime;
let speedScale;
let score;
function update(time) {
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(update) //initialising lastTime
        return
    }

    const delta = time - lastTime
    updateGround(delta, speedScale);
    updateDino(delta, speedScale);
    updateCactus(delta, speedScale);
    updateSpeedScale(delta);
    updateScore(delta)

    if (checkLose()) return handleLose()

    lastTime = time
    window.requestAnimationFrame(update) // repeatedly calls update func
}


function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta) {
    score += delta * 0.05
    scoreElem.textContent = Math.floor(score)
}


function checkLose() {
    const dinoRect = getDinoRect()
    return getCactusRects().some(rect => isCollision(rect, dinoRect))
}

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    )
}

function handleLose() {
    setDinoLose()
    setTimeout(()=> {
        document.addEventListener('keydown', handleStart, {once: true})
        startElem.classList.remove('hide')
    }, 100)
}