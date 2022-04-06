const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    correct = true
    arrayQuote.forEach((characterElement, index) => {
        const character = arrayValue[index]
        if (character == null) {
            characterElement.classList.remove('correct')
            characterElement.classList.remove('incorrect')
            correct = false
        } else if (characterElement.innerText === character) {
            characterElement.classList.add('correct')
            characterElement.classList.remove('incorrect')
        } else {
            characterElement.classList.add('incorrect')
            characterElement.classList.remove('correct')
            correct = false
        }
    })
    if (correct) renderNewQuote()
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
    .then(res => res.json())
    .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerText = ''
    quote.split('').forEach(character => {
        const characterElement = document.createElement('span')
        characterElement.innerText = character
        quoteDisplayElement.appendChild(characterElement)
    })
    quoteDisplayElement.value = null
    startTimer()
}

let startTime;
function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(()=> {
        timerElement.innerText = getTimerTime()
    })
}

function getTimerTime() {
    return Math.floor((new Date() - startTime)/1000)
}

renderNewQuote()