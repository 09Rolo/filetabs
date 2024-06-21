/*--------------------------------------------betöltés--------------------------------------------*/
document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.style.scrollBehavior = "auto"
    window.scrollTo(0,0)
    
    setTimeout(() => {
        document.documentElement.style.scrollBehavior = "smooth"
    }, 200)
})



function loaded() {
    window.scrollTo(0,0)
    let betolto = document.getElementById("betolto")
    betolto.remove()
    window.scrollTo(0,0)

    //többi cucc
}


function reload() {
    window.location.reload()
}




var tartalom = null
var fulldata = {}
const visszajelzes = document.getElementById("visszajelzes")
const linkek = document.getElementById("linkek")
const linkekhelye = linkek.querySelector(".összlinks")

const fileInput = document.getElementById("file");
fileInput.addEventListener("change", () => {
    let file = fileInput.files[0]

    document.getElementById("filelabel").innerHTML = 'Fájl: <span class="filename">' + file.name + "</span>"
    getTartalom(file)
})



function getTartalom(file) {
    const reader = new FileReader();
    reader.onload = (evt) => {
        tartalom = evt.target.result


        if (tartalom) {
            getLinks(evt.target.result)

            try {
                visszajelzes.classList.remove("bad")
            } catch {}

            visszajelzes.classList.add("good")
            visszajelzes.innerHTML = ""
            visszajelzes.innerHTML = "Rendben :)"
        } else {
            try {
                visszajelzes.classList.remove("good")
            } catch {}
            
            visszajelzes.classList.add("bad") 
            visszajelzes.innerHTML = ""
            visszajelzes.innerHTML = "A file üres :("
        }

        //console.log(evt.target.result);
    };
    reader.readAsText(file);
}






function getLinks(data) {
    linkek.style.opacity = 1
    //console.log(data.split("\n"))

    for (let i = 0; i < data.split("\n").length; i++) {
        
        if (data.split("\n")[i].slice(-1) == "\r") {
            data.split("\n")[i] = data.split("\n")[i].slice(0, (data.split("\n")[i].length - 1))

            fulldata[i] = data.split("\n")[i]
        }


        if (data.split("\n")[i].slice(0, 4) == "http") {
            fulldata = data.split("\n")

            linkekhelye.innerHTML += `
                <li><a href="${data.split("\n")[i]}" target="_blank" rel="noopener noreferrer">${data.split("\n")[i]}</a></li>
            `
        }
    }
}



function osszesOpen() {
    if (fulldata.length != 0) {
        for (let i = 0; i < fulldata.length; i++) {
            console.log(i)
            console.log(fulldata[i])

            window.open(fulldata[i], "_blank")
        }
    }
}