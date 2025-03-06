for (let i= 1;i<=9;i++){
    for(let cell=1;cell<=9;cell++){
        document.getElementById("row-"+i).insertAdjacentHTML("beforeend",
        
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
    "--text": "black"
}

const dark = {
    "--primary": "rgb(25,25,25)",
    "--secondary": "rgb(41,41,41)",
    "--shadow": "rgb(25, 25, 25)",
    "--cellBorder": "rgb(65, 65, 65)",
    "--outlineBorder": "rgb(100, 100, 100)",
    "--text": "rgb(230, 230, 230)",
}

// theme = localStorage.getItem("themes")

theme = "dark";
if (theme == null) {
    localStorage.setItem("themes", "light")
}
if (theme == "dark") {
    // document.getElementById("dark").classList.remove("d-none")
    // document.getElementById("light").classList.add("d-none")
    for (i in dark) {
        document.documentElement.style.setProperty(i, dark[i]);
    }
}
if (theme == "light") {
    for (i in light) {
        document.documentElement.style.setProperty(i, light[i]);
    }
}


function menuOpen(){
    document.getElementById("bb").classList.add("blurBG")
    document.getElementById("menu").classList.remove("d-none")
}


