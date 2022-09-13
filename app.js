const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('.time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const circle = document.querySelector('.circle');
let time = 0;
let score = 0;

startBtn.addEventListener('click', (e) => {
	e.preventDefault()
	screens[0].classList.add('up')
})

timeList.addEventListener('click', (e) => {
	if(e.target.classList.contains('time-btn')){
		screens[1].classList.add('up')		
		time = +e.target.dataset.time
		startGame()
	}
})

function startGame(){
	int = setInterval(decreaseTime,1000)
	timeEl.innerHTML = `00:${time}`
	createRandomCircle()
}

function decreaseTime(){
	let current = --time
	current < 10 ? current = `0${current}` : false
	current <=0 ? finishGame() : false	
	timeEl.innerHTML = `00:${current}`
}

function finishGame(){
	clearInterval(int)
	timeEl.parentNode.classList.add('hide')
	board.innerHTML = `<h2>Счет: ${score} <h2>`
}

function createRandomCircle(){
	const circle = document.createElement('div')
	circle.classList.add('circle')
	let size = getRandomNumber(5,55)
	let color = getRandomColor()
	const {width, height} = board.getBoundingClientRect()
	circle.style.background = `#${color}`
	circle.style.width = `${size}px`
	circle.style.height = `${size}px`
	circle.style.left = `${getRandomNumber(0, width - size)}px`
	circle.style.top = `${getRandomNumber(0, height - size)}px`
	board.append(circle)
}

function getRandomNumber(min,max){
	return Math.round(Math.random() * (max - min) + min)
}
function getRandomColor(){
	return Math.random().toString(16).slice(-6);
}

board.addEventListener('click', (e) => {
	if(e.target.classList.contains('circle')){
		score++
		e.target.remove()
		createRandomCircle()
	}

})