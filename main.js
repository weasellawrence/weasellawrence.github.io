var cl = 0
var input = document.getElementById("input")
var clearance = document.getElementById("cli")
input.onchange = () => {
    if (input.value === "system1") {
        document.getElementById("system1").style.display = ""
        } 
    else if (input.value === "cars1") {
        document.getElementById("cars1").style.display = ""
        }
        else if (input.value === "cars2" && cl >= 6) {
        document.getElementById("cars2").style.display = ""
        }
        else if (input.value === "crimes1" && cl >= 6) {
        document.getElementById("crimes1").style.display = ""
        }
        else if (input.value === "system2" && cl >= 5) {
        document.getElementById("system2").style.display = ""
        }
        else if (input.value === "records2" && cl >= 4) {
        document.getElementById("records2").style.display = ""
        }
        else if (input.value === "records1" && cl >= 1) {
        document.getElementById("records1").style.display = ""
        }
        else if (input.value === "assasination1" && cl >= 7) {
        document.getElementById("assasination1").style.display = ""
        }
        else if (input.value === "passwords" && cl >= 7) {
        document.getElementById("passwords").style.display = ""
        }
        else if (input.value === "records3" && cl >= 5) {
        document.getElementById("records3").style.display = ""
        }
    else if (input.value === "clear") {
        document.getElementById("cars1").style.display = "none"
        document.getElementById("system1").style.display = "none"
        document.getElementById("cars2").style.display = "none"
        document.getElementById("system2").style.display = "none"
        document.getElementById("crimes1").style.display = "none"
        document.getElementById("records1").style.display = "none"
        document.getElementById("records2").style.display = "none"
        document.getElementById("assasination1").style.display = "none"
        document.getElementById("passwords").style.display = "none"
        document.getElementById("records3").style.display = "none"
    }
    else if (input.value ==="clearance") {
        clearance.style.display = ""
    }
    }    

clearance.onchange = () => {
    if (clearance.value === "password") {
        cl = 1
        document.getElementById("cll").innerText = "Clearance Level: " + cl
    } else if (clearance.value === "imagefinder") {
        cl = 2
        document.getElementById("cll").innerText = "Clearance Level: " + cl
    } else if (clearance.value === "hellbringer") {
        cl = 3
        document.getElementById("cll").innerText = "Clearance Level: " + cl
    } else if (clearance.value === "industrialprogressor") {
        cl = 4
        document.getElementById("cll").innerText = "Clearance Level: " + cl
    } else if (clearance.value === "missionariesofagod") {
        cl = 5
        document.getElementById("cll").innerText = "Clearance Level: " + cl
    } else if (clearance.value === "leaderofanarmy") {
        cl = 6
        document.getElementById("cll").innerText = "Clearance Level: " + cl
    } else if (clearance.value === "theonetruegod") {
        cl = 7
        document.getElementById("cll").innerText = "Clearance Level: " + cl
    } else if (clearance.value === "open" && cl >= 1) {
        document.getElementById("body").style.display = "none"
        document.getElementById("workspace").style.display = ""
    }
}
