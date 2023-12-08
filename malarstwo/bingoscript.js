const squaresNum = 25;

const texts = [
	"figuratywizm",
	"abstrakcjonizm",
	"ekspresjonizm",
	"impresjonizm",
	"kubizm",
	"modernizm",
	"klasycyzm",
	"pop art",
	"romantyzm",
	"realizm",
	"surrealizm",
	"symbolizm",
	"malarstwo akademickie",
	"szkic malarski",
	"wyrównać kolor",
	"neutralne tło",
	"barwy czyste",
	"barwy dopełniające",
	"brudne barwy",
	"czyste barwy",
	"kompozycja",
	"perspektywa",
	"[wsadzenie palca w obrazek]",
	"Wilhelm Sasnal",
	"Szkicowe malarstwo, nie realistyczne, SzKiCoWe",
	"Ten obraz jest fajny",
	"Świecące powierzchnie",
	"To bardzo ciekawa praca",
	"Zdefiniowana przestrzeń",
	"KoNtRaSt",
	"Artyzm",
	"barwy podstawowe",
	"wolałem jak wyglądało wcześniej"
];

function createWinningIndexesTable()
{
	let table = [];

	for(let i=0; i < 5; i++)
	{
		let newCombination1 = [];
		let newCombination2 = [];
		for(let j=0; j < 5; j++)
		{
			newCombination1.push("square" + (i*5 + j));
			newCombination2.push("square" + (i + j*5));
		}
		table.push(newCombination1);
		table.push(newCombination2);
	}

	table.push(["square0", "square6", "square12", "square18", "square24"])
	table.push(["square4", "square8", "square12", "square16", "square20"])

	return table;
}

// winning combinations
const bingoIndexes = createWinningIndexesTable();

let squaresToDo = [];
let doneSquares = [];

function newCard() {
	let textsCopy = texts.slice();
	doneSquares.splice(0, doneSquares.length);
	squaresToDo.splice(0, squaresToDo.length);
	
	doneSquares.push("square12");

	setBingoOrNot();

	for(var i=0; i < squaresNum; i++) {
		if(i == 12){
			let square12 = document.getElementById("square12")
			square12.className = "centerSquare";
			let img = document.createElement("img");
			img.src = "photo.jpeg";
			square12.innerHTML = '';
			square12.appendChild(img);
		}
		// else{
			textsCopy = setSquare(i, textsCopy);
		// }
	}

	localStorage.setItem('squaresToDoM', JSON.stringify(squaresToDo));
	localStorage.setItem('doneSquaresM', JSON.stringify(doneSquares));
}

function newPlay() {
	createBoard()
	if (localStorage.hasOwnProperty("squaresToDoM") 
	 && localStorage.hasOwnProperty("doneSquaresM")) 
	{ 
		loadLocalStorage();
		doneSquares.push("square12");
		setBingoOrNot(); 
	}
	else { 
		newCard();
		doneSquares.push("square12");
	 }
}

function loadLocalStorage() {
	squaresToDo = JSON.parse(localStorage.getItem('squaresToDoM'));
	doneSquares = JSON.parse(localStorage.getItem('doneSquaresM'));

	for(let i=0; i < squaresNum; i++) {
		document.getElementById("square"+i).innerHTML = squaresToDo[i];

		if(i == 12){
			let square12 = document.getElementById("square12")
			let img = document.createElement("img");
			img.src = "photo.jpeg";
			square12.innerHTML = '';
			square12.appendChild(img);
			square12.className = "centerSquare";
		}
	}
	for(let i=0; i < doneSquares.length; i++){
		let element = document.getElementById(doneSquares[i]);
		element.className = "done";
	}
	document.getElementById("square12").className = "centerSquare";
}

function setSquare(thisSquare, textsCopy) {
	let currSquare = "square" + thisSquare;
	let newNum = getRandomInt(0, textsCopy.length-1);
	let text = textsCopy.splice(newNum, 1);
	
	if(thisSquare == 12){
		document.getElementById(currSquare).className = "centerSquare";
	}
	else{
		document.getElementById(currSquare).innerHTML = text;
		document.getElementById(currSquare).className = "undone";
	}

	squaresToDo.push(text);

	return textsCopy;
}

function getNewNum() {
	return Math.floor(Math.random() * 75);
}

function markDoneUndone(id) {
	let clas = document.getElementById(id).className;
	if(clas == "undone")	{ markDone(id);   }
	else					{ markUndone(id); }
	setBingoOrNot();
	localStorage.setItem('doneSquaresM', JSON.stringify(doneSquares));
}

function setBingoOrNot()
{
	if(checkIfBingo())
	{
		document.getElementById("header_text").style.display = "block";
	}
	else
	{
		document.getElementById("header_text").style.display = "none";		
	}
}

function markDone(id) {
	if(id == "square12"){
		return;
	}
	let element = document.getElementById(id);
	element.className = "done";
	doneSquares.push(id);
}

function markUndone(id) {
	if(id == "square12"){
		return;
	}
	let element = document.getElementById(id);
	element.className = "undone";

	const index = doneSquares.indexOf(id);
	if (index > -1) {
  		doneSquares.splice(index, 1);
	}
}

function arrayContainsAll(myArray, modelArray) {
    for (let i = 0; i < modelArray.length; i++){
        if (myArray.indexOf(modelArray[i]) === -1) { return false; }
    }
    return true;
}

function checkIfBingo() {
	if(doneSquares.length >= 3)
	{
		for(let arr of bingoIndexes)
		{
			if(arrayContainsAll(doneSquares, arr)) { return true; }
		}
	}
	return false;
}

function anotherCard() {
	newCard();
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.ceil(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function createBoard() {
	const bingotable = document.getElementById("bingotable");

	for(let i=0; i < 5; i ++)
	{
		let newLine = document.createElement("tr");
		for(let j=0; j < 5; j++)
		{
			let newCell = document.createElement("td");
			newCell.className = "undone";
			let squareId = "square" + (i*5 + j);
			newCell.id = squareId;
			newCell.onclick = () => markDoneUndone(squareId);
			newLine.appendChild(newCell);
		}

		bingotable.appendChild(newLine);
	}

}
