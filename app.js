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


for (let i = 1; i <= 9; i++) {
    for (let cell = 1; cell <= 9; cell++) {
        index = (((i - 1) * 9) + cell) - 1
        document.getElementById("row-" + i).insertAdjacentHTML("beforeend",

            sudokuBoard[index] == "" ? `<div id="${i}-${cell}" class="col-1 cell cell${cell} fillCell" onclick="boxSelected(this)">${sudokuBoard[index]}</div>` : `<div id="${i}-${cell}" class="col-1 cell cell${cell} fixedCell" >${sudokuBoard[index]}</div>`

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

});



// new commit test

function addNumber(num){
    index = ((selectedID[0]-1)*9) + selectedID[2]
    sudokuBoard[index] = num
    document.getElementById(selectedID).innerHTML = num
}

function eraseNumber(){
    index = ((selectedID[0]-1)*9) + selectedID[2]
    sudokuBoard[index] = ""
    document.getElementById(selectedID).innerHTML = ""
}