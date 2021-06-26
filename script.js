const playButton = document.querySelector('#play-button')
const score = document.querySelector('#score')
const highScore = document.querySelector('#high-score')
const timer = document.querySelector('#timer')

const TIMEOUT = 5000
let clicks = 0

highScore.textContent = 'High score: ' + localStorage.highScore
score.textContent = 'Current score: ' + clicks
timer.textContent = 'Click to start'



playButton.onclick = startGame

function startGame(event) {
	playButton.textContent = 'CLICK'
	

	const startTime = Date.now()

	playButton.onclick = () => score.textContent = 'Current score: ' + ++clicks

	timer.textContent = formatTime(TIMEOUT) + ' s'

	setTimeout(() => {
		playButton.onclick = null
		timer.textContent = 'Game Over'
		

		if (clicks > localStorage.highScore || !localStorage.highScore ) {
			localStorage.highScore = clicks
			timer.textContent = 'Wow, new high score! Great job'
		}

		

		setTimeout(() => {
			playButton.textContent = 'RETRY'
			playButton.onclick = startGame
		}, 1000)

		clearInterval(timerInterval)
		clicks = 0
	}, TIMEOUT)

	const timerInterval = setInterval(() => {
		const delta = Date.now() - startTime
		timer.textContent = formatTime(TIMEOUT - delta) + ' s'
	}, 100)
}

function formatTime(ms) {
	return (ms/1000).toFixed(2)
}