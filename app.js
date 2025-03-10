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

empty = 0


for (let i = 1; i <= 9; i++) {
    for (let cell = 1; cell <= 9; cell++) {
        index = (((i - 1) * 9) + cell) - 1
        document.getElementById("row-" + i).insertAdjacentHTML("beforeend",

            sudokuBoard[index] == "" ? `<div id="${i}-${cell}" class="col-1 cell cell${cell} fillCell" onclick="boxSelected(this)">${sudokuBoard[index]}</div>` : `<div id="${i}-${cell}" class="col-1 cell cell${cell} fixedCell" >${sudokuBoard[index]}</div>`,
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
    document.getElementById(selectedID).innerHTML = num
    empty -= 1
}

function eraseNumber() {
    index = (Number((selectedID[0] - 1) * 9)) + Number(selectedID[2])
    sudokuBoard[index - 1] = ""
    document.getElementById(selectedID).innerHTML = ""
    empty += 1
}


passed = ""

function checkBoard() {
    for (let i = 1; i <= 9; i++) {
        usedNums = []
        for (let cell = 1; cell <= 9; cell++) {

            num = Number(document.getElementById(`${i}-${cell}`).innerHTML)

            if (!(usedNums.indexOf(num) == -1)) {
                console.log("repeat")
                passed = false
            }


            usedNums.push(num)

        }
        console.log(usedNums)
    }
}
