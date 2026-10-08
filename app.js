// sudokuBoard = [
//     5, 3, "", "", 7, "", "", "", "",
//     6, "", "", 1, 9, 5, "", "", "",
//     "", 9, 8, "", "", "", "", 6, "",

//     8, "", "", "", 6, "", "", "", 3,
//     4, "", "", 8, "", 3, "", "", 1,
//     7, "", "", "", 2, "", "", "", 6,

//     "", 6, "", "", "", "", 2, 8, "",
//     "", "", "", 4, 1, 9, "", "", 5,
//     "", "", "", "", 8, "", "", 7, 9
// ];

let sudokuBoard = [];
let sudokuBoardCorrect = [];



async function board() {
    const data = await fetch("https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value,solution,difficulty},results,message}}")
    var j = await data.json()
    var difficulty = j.newboard.grids[0].difficulty
    console.log(difficulty, "difficulty")


    sudokuBoard = [];
    sudokuBoardCorrect = [];

    for(let arr = 0;arr<=8;arr++){
        let a = j.newboard.grids[0].value[arr]

        for(let box = 0;box<=8;box++){
            if(a[box]==0){
                sudokuBoard.push("")
            }
            else{
                sudokuBoard.push(a[box])
            }
        }
    }
    console.log("------")
    for(let arr = 0;arr<=8;arr++){

        let a = j.newboard.grids[0].solution[arr]

        for(let box = 0;box<=8;box++){
            sudokuBoardCorrect.push(a[box])
        }
        
    }


    sudokuBoard[0] = ""
    sudokuBoard[1] = ""
}

var empty = 0
var selectedID = "ignore"
var menuOpened = false
var idN

var firstFill = true
var timeStart = 0
var timeStop = 0
var anyError = false

async function start(){
    empty = 0
    selectedID = "ignore"
    menuOpened = false
    idN = null
    firstFill = true
    timeStart = 0
    timeStop = 0
    anyError = false

    await board()
    document.getElementById('winScreen').classList.add('d-none')


    document.getElementById("boardContainer").innerHTML = ""
    document.getElementById("numberButtonRow").innerHTML = `<div class="cellC p-1 m-1 " onclick="eraseNumber()"><i class="bi bi-eraser"></i></div><br class="d-md-none">`

    for(let i=9;i>=1;i--){
        
        document.getElementById("numberButtonRow").insertAdjacentHTML('afterbegin',`<div class="cellC p-1 m-1" onclick="addNumber('${i}')">${i}</div>`)
        document.getElementById("boardContainer").insertAdjacentHTML('afterbegin',`<div id="row-${i}" class="row justify-content-center mx-auto"></div>`)
        i==6? document.getElementById("numberButtonRow").insertAdjacentHTML('afterbegin',`<br class="d-md-none">`) : console.log('')
    }
        
    for (let i = 1; i <= 9; i++) {
        for (let cell = 1; cell <= 9; cell++) {
            var index = (((i - 1) * 9) + cell) - 1
            document.getElementById("row-" + i).insertAdjacentHTML("beforeend",
    
                sudokuBoard[index] == "" ? `<div id="${i}-${cell}" class="col-1 cell cell${cell} row${i} fillCell " onclick="boxSelected(this)">${sudokuBoard[index]}</div>` : `<div id="${i}-${cell}" class="col-1 cell cell${cell} row${i} fixedCell" >${sudokuBoard[index]}</div>`,
                sudokuBoard[index] == "" ? empty += 1 : empty += 0
            )
        }
    
    }

    console.log(empty)
    if(empty>55){
        start() //ik we can see it change but dekhne mai bdiya lgta toh i will keep haha
    }
}
window.start = start
await start()


const light = {
    "--primary": "rgb(235, 235, 235)",
    "--secondary": "white",
    "--shadow": "rgb(205, 205, 205)",
    "--cellBorder": "rgb(240, 240, 240)",
    "--outlineBorder": "black",
    "--text": "black",
    "--selectBG": "rgb(250, 250, 250)",
    "--fillHover": "rgb(247, 247, 247)",
    "--fixedCellText": "rgb(155,155,155)",


}

const dark = {
    "--primary": "rgb(25,25,25)",
    "--secondary": "rgb(41,41,41)",
    "--shadow": "rgb(25, 25, 25)",
    "--cellBorder": "rgb(65, 65, 65)",
    "--outlineBorder": "rgb(110, 110, 110)",
    "--text": "rgb(230, 230, 230)",
    "--selectBG": "rgb(65, 65, 65)",
    "--fillHover": "rgb(51, 51, 51)",
    "--fixedCellText": "rgb(155,155,155)",


}

var theme = localStorage.getItem("themes")

if (theme == null) {
    localStorage.setItem("themes", "dark")
    for (let i in dark) {
        document.documentElement.style.setProperty(i, dark[i]);
    }
}
if (theme == "dark") {
    document.getElementById("dark").classList.remove("d-none")
    document.getElementById("light").classList.add("d-none")
    for (let i in dark) {
        document.documentElement.style.setProperty(i, dark[i]);
    }
}
if (theme == "light") {

    for (let i in light) {
        document.documentElement.style.setProperty(i, light[i]);
    }
}




function menuOpen(btn) {

    document.getElementById("menu").classList.add("menuInAnim")
    document.getElementById("menu").classList.remove("d-none")
    document.getElementById("bb").classList.add("blurBG")
    menuOpened = true


}
window.menuOpen = menuOpen

function menuClose() {
    document.getElementById("menu").classList.add("menuOutAnim")
    menuOpened = false

    setTimeout(() => {
        document.getElementById("menu").classList.remove("menuOutAnim")
        document.getElementById("menu").classList.add("d-none")
        document.getElementById("bb").classList.remove("blurBG")
    }, 500);
}
window.menuClose = menuClose

function themeChange(themeStr, btn) {
    let themeData
    themeStr == "light"? themeData=light:themeData=dark

    for (let i in themeData) {
        document.documentElement.style.setProperty(i, themeData[i]);
    }
    localStorage.setItem("themes", themeStr)

    btn.classList.add("d-none")
    document.getElementById(themeStr).classList.remove("d-none")
}
window.themeChange = themeChange


function buttonClick(btn){
    btn.classList.add('btnPress')
    setTimeout(() => {
        btn.classList.remove('btnPress')
    }, 310);
}
window.buttonClick = buttonClick





function boxSelected(box) {
    document.getElementById(selectedID).classList.remove("fillCellSelected")
    selectedID = box.id
    box.classList.add("fillCellSelected")
}
window.boxSelected = boxSelected


addEventListener("keydown", (event) => {
    if (event.key == "Escape" && menuOpened == true) {
        menuClose()
    }


    //only playtesting pe on krna
    // if (event.key == "r") {
    //     start()
    // }
    if ((event.key == "m" || event.key == "M")){
        if(menuOpened){
            menuClose()
        }
        else{
            menuOpen()
        }
    }
        
    if (!isNaN(event.key)) {  //gives true if a number
        if(event.key != 0){
            addNumber(event.key)
        }
    }

    if (event.key == "Backspace") {  //gives true if a number
        eraseNumber()
    }

    if (event.key == "ArrowDown") {

        idN = `${Number(selectedID[0]) + 1}-${selectedID[2]}`

        if (idN[1] == "0") {  //if last row then idN = 10-x then idN[1] = 0 wrna idN[1] normally = "-"
            idN = `1-${selectedID[2]}`
        }

        while (document.getElementById(`${Number(idN[0])}-${idN[2]}`).classList.contains("fixedCell")) {
            idN = `${Number(idN[0]) + 1}-${idN[2]}`
            if (idN[1] == "0") {  //if last row then idN = 10-x then idN[1] = 0 wrna idN[1] normally = "-"
                idN = `1-${selectedID[2]}`
            }
        }
        boxSelected(document.getElementById(idN))
    }

    if (event.key == "ArrowUp") {
        idN = `${Number(selectedID[0]) - 1}-${selectedID[2]}`


        if (idN[0] == "0") { //if first row se go up then new row = 0, toh reset to row = 9 and then since cell will be <9 at top row, add 9 to get back to cell for 
            idN = `9-${selectedID[2]}`
        }

        while (document.getElementById(`${Number(idN[0])}-${idN[2]}`).classList.contains("fixedCell")) {
            idN = `${Number(idN[0]) - 1}-${idN[2]}`
            if (idN[0] == "0") { //if first row se go up then new row = 0, toh reset to row = 9 and then since cell will be <9 at top row, add 9 to get back to cell for 
                idN = `9-${selectedID[2]}`
            }
        }

        boxSelected(document.getElementById(idN))
    }

    if (event.key == "ArrowLeft") {


        idN = `${selectedID[0]}-${Number(selectedID[2]) - 1}` //same row, cell 1 towards left

        if (idN[2] == "0") { //if first column (cell=1) se go left then new cell = 0, toh set to col = 9
            idN = `${idN[0]}-${9}`
        }

        while (document.getElementById(`${Number(idN[0])}-${idN[2]}`).classList.contains("fixedCell")) {
            idN = `${idN[0]}-${Number(idN[2]) - 1}`
            if (idN[2] == "0") { //if first column (cell=1) se go left then new cell = 0, toh set to col = 9
                idN = `${idN[0]}-${9}`
            }
        }

        boxSelected(document.getElementById(idN))
    }

    if (event.key == "ArrowRight") {


        idN = `${selectedID[0]}-${Number(selectedID[2]) + 1}` //same row, cell 1 towards right

        if (idN[3] == "0") { //if last column (cell=9) se go right then new cell = 10, toh set to col = 1
            idN = `${idN[0]}-${1}`
        }

        while (document.getElementById(`${Number(idN[0])}-${idN[2]}`).classList.contains("fixedCell")) {
            idN = `${idN[0]}-${Number(idN[2]) + 1}`
            if (idN[3] == "0") { //if last column (cell=9) se go right then new cell = 10, toh set to col = 1
                idN = `${idN[0]}-${1}`
            }
        }

        boxSelected(document.getElementById(idN))
    }

});


// new commit test



function addNumber(num) {
    let index = (Number((selectedID[0] - 1) * 9)) + Number(selectedID[2])
    sudokuBoard[index - 1] = num

    if(firstFill){
        firstFill = false
        timeStart = new Date()
    }

    if (document.getElementById(selectedID).innerHTML == "") {
        empty -= 1
    }
    clearWrong(document.getElementsByClassName(`cell${selectedID[2]}`)) //column clear
    clearWrong(document.getElementsByClassName(`row${selectedID[0]}`)) //row clear
    clearWrongBox()

    
    document.getElementById(selectedID).innerHTML = num
    
    for(let n=1;n<10;n++){ //choose number 1-9
        for(let colRow=1;colRow<10;colRow++){ //checking column/row number
            checkWrong(n,document.getElementsByClassName(`cell${colRow}`)) //columnChecking for number
            checkWrong(n,document.getElementsByClassName(`row${colRow}`)) //rowChecking for number
            checkWrongBox(n)// box checking
        }   
    }

    if (empty == 0) {
        boardCompleteCheck()
    }

}
window.addNumber = addNumber

function eraseNumber() {
    let index = (Number((selectedID[0] - 1) * 9)) + Number(selectedID[2])
    sudokuBoard[index - 1] = ""
    if (!(document.getElementById(selectedID).innerHTML == "")) {
        empty += 1
    }
    if (empty == 0) {
        boardCompleteCheck()
    }

    clearWrong(document.getElementsByClassName(`cell${selectedID[2]}`)) //column clear
    clearWrong(document.getElementsByClassName(`row${selectedID[0]}`)) //row clear
    clearWrongBox()

    document.getElementById(selectedID).innerHTML = ""
    
    for(let n=1;n<10;n++){ //choose number 1-9
        for(let colRow=1;colRow<10;colRow++){ //checking column/row number
            checkWrong(n,document.getElementsByClassName(`cell${colRow}`)) //columnChecking for number
            checkWrong(n,document.getElementsByClassName(`row${colRow}`)) //rowChecking for number
            checkWrongBox(n)// box checking
        }   
    }

}
window.eraseNumber = eraseNumber




//jab number changed toh remove the red wala filter (if red wala changed)
function clearWrong(cells){
    anyError = false
    for(let i=0;i<=8;i++){
        cells[i].classList.remove('cellWrong')
    }
}

function checkWrong(num,cells){

    let duplicate = 0
    let wrong = []

    //iterate each col to see if koi same numbers hai
    for(let j=0;j<=8;j++){
        if(Number(cells[j].innerHTML) == num){
            duplicate+=1
            wrong.push(cells[j])
        }
    }
    //if same numbers hai toh make all red
    if(duplicate>=2){
        //add to sirif wrong wale cells
        for(let i=0;i<=(wrong.length - 1);i++){
            wrong[i].classList.add('cellWrong')
            anyError = true
        }

        //add to all cells in column
        // for(j=0;j<=8;j++){

        //     cells[j].classList.add('cellWrong')
        // }
    }
    
}


const box1 = ["1-1", "1-2", "1-3", "2-1", "2-2", "2-3", "3-1", "3-2", "3-3"]
const box2 = ["1-4", "1-5", "1-6", "2-4", "2-5", "2-6", "3-4", "3-5", "3-6"]
const box3 = ["1-7", "1-8", "1-9", "2-7", "2-8", "2-9", "3-7", "3-8", "3-9"]
const box4 = ["4-1", "4-2", "4-3", "5-1", "5-2", "5-3", "6-1", "6-2", "6-3"]
const box5 = ["4-4", "4-5", "4-6", "5-4", "5-5", "5-6", "6-4", "6-5", "6-6"]
const box6 = ["4-7", "4-8", "4-9", "5-7", "5-8", "5-9", "6-7", "6-8", "6-9"]
const box7 = ["7-1", "7-2", "7-3", "8-1", "8-2", "8-3", "9-1", "9-2", "9-3"]
const box8 = ["7-4", "7-5", "7-6", "8-4", "8-5", "8-6", "9-4", "9-5", "9-6"]
const box9 = ["7-7", "7-8", "7-9", "8-7", "8-8", "8-9", "9-7", "9-8", "9-9"]
const boxes = [box1, box2, box3, box4, box5, box6, box7, box8, box9]


function clearWrongBox(){
    anyError = false
    for(let box in boxes){
        for(let c in boxes[box]){
            document.getElementById(boxes[box][c]).classList.remove('cellWrong')
        }
    }
}

function checkWrongBox(num){
    
    for (let box in boxes){ //goes by each box 1,2,3,4 aage 

        let duplicate = 0
        let wrong = []

        for(let c in boxes[box]){ //goes for each cell in the box
            if(Number(document.getElementById(boxes[box][c]).innerHTML) == num){
                duplicate+=1
                wrong.push(document.getElementById(boxes[box][c]))
        }

        if(duplicate>=2){
            for(let i in wrong){
                wrong[i].classList.add('cellWrong')
                anyError = true
            }
            }
        }
    }


    

}

function boardCompleteCheck(){    
    console.log("anyerrorrr",anyError)

    if(anyError == false){
        let timeStop = new Date()
        let difference = timeStop - timeStart
        let secondsTotal = Math.floor(difference/1000) //all minutes plus seconds 
        let minutes = Math.floor(secondsTotal/60) //only the minutes
        let seconds = secondsTotal - (minutes*60)   //only the seconds

        

        document.getElementById('minsTime').innerHTML = minutes
        document.getElementById('secsTime').innerHTML = seconds
        document.getElementById('winScreen').classList.remove('d-none')

    }
}






//row col box wala
// function checkRowColBox() {

//     box1 = ["1-1", "1-2", "1-3", "2-1", "2-2", "2-3", "3-1", "3-2", "3-3"]
//     box2 = ["1-4", "1-5", "1-6", "2-4", "2-5", "2-6", "3-4", "3-5", "3-6"]
//     box3 = ["1-7", "1-8", "1-9", "2-7", "2-8", "2-9", "3-7", "3-8", "3-9"]

//     box4 = ["4-1", "4-2", "4-3", "5-1", "5-2", "5-3", "6-1", "6-2", "6-3"]
//     box5 = ["4-4", "4-5", "4-6", "5-4", "5-5", "5-6", "6-4", "6-5", "6-6"]
//     box6 = ["4-7", "4-8", "4-9", "5-7", "5-8", "5-9", "6-7", "6-8", "6-9"]

//     box7 = ["7-1", "7-2", "7-3", "8-1", "8-2", "8-3", "9-1", "9-2", "9-3"]
//     box8 = ["7-4", "7-5", "7-6", "8-4", "8-5", "8-6", "9-4", "9-5", "9-6"]
//     box9 = ["7-7", "7-8", "7-9", "8-7", "8-8", "8-9", "9-7", "9-8", "9-9"]
//     boxes = [box1, box2, box3, box4, box5, box6, box7, box8, box9]


//     boxPresent = ""

//     for (i in boxes) {
//         for (cell in boxes[i]) {
//             if (boxes[i][cell] == selectedID) {
//                 boxPresent = boxes[i]
//             }
//         }
//     }

//     console.log(boxPresent)
//     row = selectedID[0]
//     col = selectedID[2]
//     console.log(row, col)

//     //box
//     for (i in boxPresent) {
//         if ((document.getElementById(boxPresent[i]).innerHTML == document.getElementById(selectedID).innerHTML) && (boxPresent[i] != selectedID)) {
//             document.getElementById(boxPresent[i]).classList.add("cellWrong")
//         }
        

//     }

//     //row
//     for (let i = 1; i < 10; i++) {

//         if (!document.getElementById(row + "-" + i).classList.contains("fixedCell")) {
//             console.log(i)

//             if ((document.getElementById(row + "-" + i).innerHTML == document.getElementById(selectedID).innerHTML) && ((row + "-" + i) != selectedID)) {
//                 document.getElementById(row + "-" + i).classList.add("cellWrong")
//                 console.log("wrong")
//             }
//         }

//     }

//     //col
//     for (let i = 1; i < 10; i++) {

//         if (!document.getElementById(i + "-" + col).classList.contains("fixedCell")) {
//             if ((document.getElementById(i + "-" + col).innerHTML == document.getElementById(selectedID).innerHTML) && ((i + "-" + col) != selectedID)) {
//                 document.getElementById(i + "-" + col).classList.add("cellWrong")
//             }
//         }

//     }

// }

//original wala

// function checkBoard() {
//     passed = ""
//     console.log("checkcccc")


//     //rows
//     for (let i = 1; i <= 9; i++) {
//         usedNums = []
//         for (let cell = 1; cell <= 9; cell++) {

//             num = Number(document.getElementById(`${i}-${cell}`).innerHTML)


//             if (!(usedNums.indexOf(num) == -1)) {
//                 passed = false
//             }


//             usedNums.push(num)

//         }
//     }

//     //column 
//     for (let i = 1; i <= 9; i++) {
//         usedNums = []
//         for (let row = 1; row <= 9; row++) {

//             num = Number(document.getElementById(`${row}-${i}`).innerHTML)


//             if (!(usedNums.indexOf(num) == -1)) {
//                 passed = false
//             }

//         }

//         usedNums.push(num)

//     }

//     box1 = ["1-1", "1-2", "1-3", "2-1", "2-2", "2-3", "3-1", "3-2", "3-3"]
//     box2 = ["1-4", "1-5", "1-6", "2-4", "2-5", "2-6", "3-4", "3-5", "3-6"]
//     box3 = ["1-7", "1-8", "1-9", "2-7", "2-8", "2-9", "3-7", "3-8", "3-9"]

//     box4 = ["4-1", "4-2", "4-3", "5-1", "5-2", "5-3", "6-1", "6-2", "6-3"]
//     box5 = ["4-4", "4-5", "4-6", "5-4", "5-5", "5-6", "6-4", "6-5", "6-6"]
//     box6 = ["4-7", "4-8", "4-9", "5-7", "5-8", "5-9", "6-7", "6-8", "6-9"]

//     box7 = ["7-1", "7-2", "7-3", "8-1", "8-2", "8-3", "9-1", "9-2", "9-3"]
//     box8 = ["7-4", "7-5", "7-6", "8-4", "8-5", "8-6", "9-4", "9-5", "9-6"]
//     box9 = ["7-7", "7-8", "7-9", "8-7", "8-8", "8-9", "9-7", "9-8", "9-9"]

//     boxes = [box1, box2, box3, box4, box5, box6, box7, box8, box9]


//     for (i in boxes) {
//         usedNums = []
//         for (cell in boxes[i]) {

//             num = Number(document.getElementById(boxes[i][cell]).innerHTML)

//             if (!(usedNums.indexOf(num) == -1)) {
//                 passed = false

//             }

//             usedNums.push(num)

//         }

//     }


// }

