let bird = document.getElementById("bird");
let game = document.querySelector(".game");
let speedDown = 1;
let gravityAcc = speedDown;
let maxGravity = 10;
let upforce = 5;
let upforceAcc = 0;
let maxUpforce = 15;
let colMoveSpeed = 4;
var interval // переменные для setInterval
var ColInterval // переменные для setInterval
var spawnCols // переменные для setInterval
let gameStartedFlag = false;

// общая функция постоянного движения вниз
function gravity () {
	let birdStyle = window.getComputedStyle(bird)
	let curentFromTop = parseInt(birdStyle.getPropertyValue("top"));
	let birdHeight = parseInt(birdStyle.getPropertyValue("height"))
	let curentFromBottom = parseInt(birdStyle.getPropertyValue("bottom"))
	// меняем отдаление .bird от потолка
	bird.style = `top:${curentFromTop+gravityAcc-upforceAcc}px`;

	// добавление ускорения вниз
	if (gravityAcc < maxGravity) {gravityAcc += speedDown};

	// убираем движение вверх
	if (upforceAcc > 0) {decreaseUpforce()}

		//проверка на задетый пол и потолок
	if (checkIfFloorOrRoof(curentFromTop,curentFromBottom)) {return}
}

//проверка на задетый пол и потолок
function checkIfFloorOrRoof (curentFromTop,curentFromBottom) {
	if ((curentFromTop  <= 0) || (curentFromBottom <= 0)) {
		StopTheGame()
		return true
	}
	return false
}
function decreaseUpforce() {
	upforceAcc -= speedDown
}

function StopTheGame () {
	clearInterval(interval)
	clearInterval(spawnCols)
	callRestart()
}
function callRestart() {
	document.querySelector("#gameEnd").style.display = "flex"
}


// добавление пробела
document.body.onkeyup = function (e) {
	if (e.keyCode == 32) {
		if(!gameStartedFlag) {
			gameStartedFlag = true;
			interval = setInterval(intervals40,40)
			spawnCols = setInterval(addColumn,3000);

			return
		}
		gravityAcc = speedDown;
		upforceAcc +=upforce;
	}
}
document.querySelector(".restart").addEventListener("click",function() {
	document.querySelector("#gameEnd").style.display = "none"
	clearBoard()
})

function clearBoard() {
	bird.style.top = "calc(50% - 25px)"
	bird.style.left = "150px"
	document.querySelectorAll(".column").forEach((item) => item.remove());
	gameStartedFlag = false;
	addColumn(colsArr[0])
	upforceAcc = 0;
	gravityAcc = speedDown;
}

function intervals40 () {
	gravity()
	moveCols()
	CollisionCheck()
}



let colsArr = [
{
	top : 120,
	bottom : 120,
	width : 20
},
{
	top : 150,
	bottom : 100,
	width : 40
},
{
	top : 200,
	bottom : 50,
	width : 30
},
{
	top : 150,
	bottom : 150,
	width : 25
},
{
	top : 50,
	bottom : 250,
	width : 30
},

]


// добавление препятствий 
function addColumn () {
	let random = Math.floor(Math.random() * colsArr.length)
	let obj = colsArr[random]
	let stringToAdd = `<div class="column" style="width:${obj.width}px"><div class="col-top" style="height:${obj.top}px"></div> <div class="col-bot" style="height:${obj.bottom}px"></div></div>`;
	game.insertAdjacentHTML("beforeEnd",stringToAdd)
}
addColumn(colsArr[0])

// move cols 
function moveCols() {
	let allColls = document.querySelectorAll(".column").forEach((item)=>{
		let itemStyle = window.getComputedStyle(item);
		let itemCurRight = parseInt(itemStyle.getPropertyValue("right"))
		let itemCurLeft = parseInt(itemStyle.getPropertyValue("left"))
		item.style.right = `${itemCurRight + colMoveSpeed}px`;
		if (itemCurLeft <=0) {
			item.remove()
		}
	})
}


// Collision Check
function CollisionCheck (obj = document.querySelector(".column")) {
	let birdStyles = window.getComputedStyle(bird);
	let birdTop = parseInt(birdStyles.getPropertyValue("top"));
	let birdBottom = parseInt(birdStyles.getPropertyValue("bottom"));
	let birdLeft = parseInt(birdStyles.getPropertyValue("left"));
	let birdRight = parseInt(birdStyles.getPropertyValue("right"));

	let objStyles = window.getComputedStyle(obj);
	let objLeft = parseInt(objStyles.getPropertyValue("left"));
	let objRight = parseInt(objStyles.getPropertyValue("right"));
	let objWidth = parseInt(objStyles.getPropertyValue("width"));
	
	
	if (((birdLeft + 50 >= objLeft) && (birdRight <= objRight + objWidth)) && (birdRight + 50 >= objRight) && (birdLeft <= objLeft + objWidth)) {
		let objTopFigure = obj.childNodes[0]
		let objBottomFigure = obj.childNodes[2]

		let topFigureStyles = window.getComputedStyle(objTopFigure);
		let topFigureHeight = parseInt(topFigureStyles.getPropertyValue("height"))

		let bottomFigureStyles = window.getComputedStyle(objBottomFigure);
		let bottomFigureHeight = parseInt(bottomFigureStyles.getPropertyValue("height"))
		if (birdTop < topFigureHeight || birdBottom < bottomFigureHeight) {
			StopTheGame()
		}

	}
	return
}
var CollisionInterval;

