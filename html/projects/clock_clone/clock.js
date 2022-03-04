setInterval(setClock, 1)

const hourHand = document.querySelector('[data-hour]')
const minuteHand = document.querySelector('[data-minute]')
const secondHand = document.querySelector('[data-second]')

function setClock() {
    const currentDate = new Date()
    const secondsRatio = (currentDate.getSeconds() + currentDate.getMilliseconds()/1000) / 60
    const minutesRatio = (currentDate.getMinutes() + secondsRatio) / 60
    const hoursRatio = (currentDate.getHours() + minutesRatio) / 12

    rotate(hourHand, hoursRatio)
    rotate(minuteHand, minutesRatio)
    rotate(secondHand, secondsRatio)
}  

function rotate(hand, ratio) {
    hand.style.setProperty('--rotation', ratio*360)
}