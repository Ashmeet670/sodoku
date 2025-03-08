for (let i = 1; i <= 9; i++) {
    for (let cell = 1; cell <= 9; cell++) {
        document.getElementById("row-" + i).insertAdjacentHTML("beforeend",

            `<div id="${i}-${cell}" class="col-1 cell cell${cell}">${cell}</div>`
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

}

const dark = {
    "--primary": "rgb(25,25,25)",
    "--secondary": "rgb(41,41,41)",
    "--shadow": "rgb(25, 25, 25)",
    "--cellBorder": "rgb(65, 65, 65)",
    "--outlineBorder": "rgb(110, 110, 110)",
    "--text": "rgb(230, 230, 230)",
    "--selectBG": "rgb(65, 65, 65)",

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

addEventListener("keydown", (event) => {
    if (event.key == "Escape" && menuOpened == true){
        menuClose()
    }
    if ((event.key == "m" || event.key == "M") && menuOpened == false){
        menuOpen()
    }
});

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
