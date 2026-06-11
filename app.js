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
sudokuBoard = [
    5, 3, "", "", 7, "", "", "", "",
    6, "", "", 1, 9, 5, "", "", "",
    "", 9, 8, "", "", "", "", 6, "",

    8, "", "", "", 6, "", "", "", 3,
    4, "", "", 8, "", 3, "", "", 1,
    7, "", "", "", 2, "", "", "", 6,

    "", 6, "", "", "", "", 2, 8, "",
    "", "", "", 4, 1, 9, "", "", 5,
    "", "", "", "", 8, "", "", 7, 9
];


sudokuBoardCorrect = [
    5, 3, 4, 6, 7, 8, 9, 1, 2,
    6, 7, 2, 1, 9, 5, 3, 4, 8,
    1, 9, 8, 3, 4, 2, 5, 6, 7,

    8, 5, 9, 7, 6, 1, 4, 2, 3,
    4, 2, 6, 8, 5, 3, 7, 9, 1,
    7, 1, 3, 9, 2, 4, 8, 5, 6,

    9, 6, 1, 5, 3, 7, 2, 8, 4,
    2, 8, 7, 4, 1, 9, 6, 3, 5,
    3, 4, 5, 2, 8, 6, 1, 7, 9
];

empty = 0


for(i=9;i>=1;i--){
    document.getElementById("numberButtonRow").insertAdjacentHTML('afterbegin',`<div class="cellC p-1 m-1" onclick="addNumber('${i}')">${i}</div>`)
    document.getElementById("boardContainer").insertAdjacentHTML('afterbegin',`<div id="row-${i}" class="row justify-content-center mx-auto"></div>`)
}


for (let i = 1; i <= 9; i++) {
    for (let cell = 1; cell <= 9; cell++) {
        index = (((i - 1) * 9) + cell) - 1
        document.getElementById("row-" + i).insertAdjacentHTML("beforeend",

            sudokuBoard[index] == "" ? `<div id="${i}-${cell}" class="col-1 cell cell${cell} row${i} fillCell " onclick="boxSelected(this)">${sudokuBoard[index]}</div>` : `<div id="${i}-${cell}" class="col-1 cell cell${cell} row${i} fixedCell" >${sudokuBoard[index]}</div>`,
            sudokuBoard[index] == "" ? empty += 1 : empty += 0
        )
    }

}


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
    localStorage.setItem("themes", "light")
    for (i in light) {
        document.documentElement.style.setProperty(i, light[i]);
    }
}
if (theme == "dark") {
    document.getElementById("dark").classList.remove("d-none")
    document.getElementById("light").classList.add("d-none")
    for (i in dark) {
        document.documentElement.style.setProperty(i, dark[i]);
    }
}
if (theme == "light") {
    for (i in light) {
        document.documentElement.style.setProperty(i, light[i]);
    }
}







var menuOpened = false

function menuOpen(btn) {

    document.getElementById("menu").classList.add("menuInAnim")
    document.getElementById("menu").classList.remove("d-none")
    document.getElementById("bb").classList.add("blurBG")
    menuOpened = true


}

function menuClose() {
    document.getElementById("menu").classList.add("menuOutAnim")
    menuOpened = false


    setTimeout(() => {
        document.getElementById("menu").classList.remove("menuOutAnim")
        document.getElementById("menu").classList.add("d-none")
        document.getElementById("bb").classList.remove("blurBG")
    }, 500);
}

function themeChange(theme, themeStr, btn) {

    for (i in theme) {
        document.documentElement.style.setProperty(i, theme[i]);
    }
    localStorage.setItem("themes", themeStr)

    btn.classList.add("d-none")
    document.getElementById(themeStr).classList.remove("d-none")
}




selectedID = "ignore"

function boxSelected(box) {
    document.getElementById(selectedID).classList.remove("fillCellSelected")
    selectedID = box.id
    box.classList.add("fillCellSelected")
}

addEventListener("keydown", (event) => {
    if (event.key == "Escape" && menuOpened == true) {
        menuClose()
    }
    if ((event.key == "m" || event.key == "M") && menuOpened == false) {
        menuOpen()
    }
    if (!isNaN(event.key)) {  //gives true if a number
        addNumber(event.key)
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
    index = (Number((selectedID[0] - 1) * 9)) + Number(selectedID[2])
    sudokuBoard[index - 1] = num


    if (document.getElementById(selectedID).innerHTML == "") {
        empty -= 1
    }
    if (empty == 0) {
        boardCompleteCheck()
    }

    clearWrong(document.getElementsByClassName(`cell${selectedID[2]}`)) //column clear
    clearWrong(document.getElementsByClassName(`row${selectedID[0]}`)) //row clear
    clearWrongBox()

    
    document.getElementById(selectedID).innerHTML = num
    
    for(n=1;n<10;n++){ //choose number 1-9
        for(colRow=1;colRow<10;colRow++){ //checking column/row number
            checkWrong(n,document.getElementsByClassName(`cell${colRow}`)) //columnChecking for number
            checkWrong(n,document.getElementsByClassName(`row${colRow}`)) //rowChecking for number
            checkWrongBox(n)// box checking
        }   
    }


}

function eraseNumber() {
    index = (Number((selectedID[0] - 1) * 9)) + Number(selectedID[2])
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
    
    for(n=1;n<10;n++){ //choose number 1-9
        for(colRow=1;colRow<10;colRow++){ //checking column/row number
            checkWrong(n,document.getElementsByClassName(`cell${colRow}`)) //columnChecking for number
            checkWrong(n,document.getElementsByClassName(`row${colRow}`)) //rowChecking for number
            checkWrongBox(n)// box checking
        }   
    }

}





//jab number changed toh remove the red wala filter (if red wala changed)
function clearWrong(cells){
    
    for(i=0;i<=8;i++){
        cells[i].classList.remove('cellWrong')
    }
}

function checkWrong(num,cells){

    duplicate = 0
    wrong = []

    //iterate each col to see if koi same numbers hai
    for(j=0;j<=8;j++){
        if(Number(cells[j].innerHTML) == num){
            duplicate+=1
            wrong.push(cells[j])
        }
    }
    //if same numbers hai toh make all red
    if(duplicate>=2){
        //add to sirif wrong wale cells
        for(i=0;i<=(wrong.length - 1);i++){
            wrong[i].classList.add('cellWrong')
        }

        //add to all cells in column
        // for(j=0;j<=8;j++){

        //     cells[j].classList.add('cellWrong')
        // }
    }
    
}


box1 = ["1-1", "1-2", "1-3", "2-1", "2-2", "2-3", "3-1", "3-2", "3-3"]
box2 = ["1-4", "1-5", "1-6", "2-4", "2-5", "2-6", "3-4", "3-5", "3-6"]
box3 = ["1-7", "1-8", "1-9", "2-7", "2-8", "2-9", "3-7", "3-8", "3-9"]
box4 = ["4-1", "4-2", "4-3", "5-1", "5-2", "5-3", "6-1", "6-2", "6-3"]
box5 = ["4-4", "4-5", "4-6", "5-4", "5-5", "5-6", "6-4", "6-5", "6-6"]
box6 = ["4-7", "4-8", "4-9", "5-7", "5-8", "5-9", "6-7", "6-8", "6-9"]
box7 = ["7-1", "7-2", "7-3", "8-1", "8-2", "8-3", "9-1", "9-2", "9-3"]
box8 = ["7-4", "7-5", "7-6", "8-4", "8-5", "8-6", "9-4", "9-5", "9-6"]
box9 = ["7-7", "7-8", "7-9", "8-7", "8-8", "8-9", "9-7", "9-8", "9-9"]
boxes = [box1, box2, box3, box4, box5, box6, box7, box8, box9]


function clearWrongBox(){
    for(box in boxes){
        for(c in boxes[box]){
            document.getElementById(boxes[box][c]).classList.remove('cellWrong')
        }
    }
}

function checkWrongBox(num){
    
    for (box in boxes){ //goes by each box 1,2,3,4 aage 

        duplicate = 0
        wrong = []

        for(c in boxes[box]){ //goes for each cell in the box
            if(Number(document.getElementById(boxes[box][c]).innerHTML) == num){
                duplicate+=1
                wrong.push(document.getElementById(boxes[box][c]))

            }
        }

        if(duplicate>=2){
            for(i in wrong){
                wrong[i].classList.add('cellWrong')
            }
        }
    }


    

}

function boardCompleteCheck(){
    win = true
    for(i in sudokuBoard){
        if(Number(sudokuBoard[i])!=sudokuBoardCorrect[i]){
            console.log("wrong haha")
            win = false
        }
    }

    if(win){
        console.log('we win these')
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

