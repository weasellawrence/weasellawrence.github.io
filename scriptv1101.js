debug = false
renderDistance = 10
testRange = 0.0001
currentLevel = 50
noOfHits = 0
noOfDeaths = 0
time = 0
timeSinceLastUpdate = Date.now()
ballMoving = false
finished = true
inMenu = true
mousePos = [0,0]
antiGravity = false
numberOfLevels = 60

function reset() {
	game = {
		levelsBeaten: new Array(numberOfLevels).fill(false),
		levelHits: [],
		levelFalls: [],
		levelTime: []
	}
}
reset()

//If the user confirms the hard reset, resets all variables, saves and refreshes the page
function hardReset() {
  if (confirm("Are you sure you want to reset? You will lose everything!")) {
    reset()
    save()
    location.reload()
  }
}

function save() {
  //console.log("saving")
  localStorage.setItem("golfHellSave", JSON.stringify(game));
}

function load() {
	reset()
	let loadgame = JSON.parse(localStorage.getItem("golfHellSave"))
	if (loadgame != null) {loadGame(loadgame)}
	loadMenu()
}

load()

function exportGame() {
  save()
  navigator.clipboard.writeText(btoa(JSON.stringify(game))).then(function() {
    alert("Copied to clipboard!")
  }, function() {
    alert("Error copying to clipboard, try again...")
  });
}

function importGame() {
  loadgame = JSON.parse(atob(prompt("Input your save here:")))
  if (loadgame && loadgame != null && loadgame != "") {
    reset()
    loadGame(loadgame)
    save()
    location.reload()
  }
  else {
    alert("Invalid input.")
  }
}


function loadGame(loadgame) {
  //Sets each variable in 'game' to the equivalent variable in 'loadgame' (the saved file)
  let loadKeys = Object.keys(loadgame);
  for (i=0; i<loadKeys.length; i++) {
    if (loadgame[loadKeys[i]] != "undefined") {
      let thisKey = loadKeys[i];
      if (Array.isArray(loadgame[thisKey])) {
        game[loadKeys[i]] = loadgame[thisKey].map((x) => {return x})
      }
      //else {game[Object.keys(game)[i]] = loadgame[loadKeys[i]]}
      else {game[loadKeys[i]] = loadgame[loadKeys[i]]}
    }
  }
}

function loadLevel(x) {
	noOfHits = 0
	noOfDeaths = 0
	time = 0
	timeSinceLastUpdate = Date.now()
	inMenu = false
	document.getElementById("stats").style.display = "block"
	document.getElementById("keybinds").style.display = "block"
	if (currentLevel != x) currentLevel = x
	//Someone please tell me a better way to do this
	switch (x) {
		case 51:
			levelData = demonim
			break;
		case 52:
			levelData = casher
			break;
		case 53:
			levelData = mocker
			break;
		case 54:
			levelData = crofter
			break;
		case 55:
			levelData = lucifer
			break;
		case 56:
			levelData = polPot
			break;
		case 57:
			levelData = stalin
			break;
		case 58:
			levelData = hitler
			break;
		case 59:
			levelData = georgePig
			break;
		case 60:
			levelData = otisPascal
			break;
		case 1:
			levelData = limbo1
			break;
		case 2:
			levelData = limbo2
			break;
		case 3:
			levelData = limbo3
			break;
		case 4:
			levelData = limbo4
			break;
		case 5:
			levelData = limbo5
			break;
		case 6:
			levelData = lust1
			break;
		case 7:
			levelData = lust2
			break;
		case 8:
			levelData = lust3
			break;
		case 9:
			levelData = lust4
			break;
		case 10:
			levelData = lust5
			break;
		case 11:
			levelData = gluttony1
			break;
		case 12:
			levelData = gluttony2
			break;
		case 13:
			levelData = gluttony3
			break;
		case 14:
			levelData = gluttony4
			break;
		case 15:
			levelData = gluttony5
			break;
		case 16:
			levelData = greed1
			break;
		case 17:
			levelData = greed2
			break;
		case 18:
			levelData = greed3
			break;
		case 19:
			levelData = greed4
			break;
		case 20:
			levelData = greed5
			break;
		case 21:
			levelData = wrath1
			break;
		case 22:
			levelData = wrath2
			break;
		case 23:
			levelData = wrath3
			break;
		case 24:
			levelData = wrath4
			break;
		case 25:
			levelData = wrath5
			break;
		case 26:
			levelData = heresy1
			break;
		case 27:
			levelData = heresy2
			break;
		case 28:
			levelData = heresy3
			break;
		case 29:
			levelData = heresy4
			break;
		case 30:
			levelData = heresy5
			break;
		case 31:
			levelData = violence1
			break;
		case 32:
			levelData = violence2
			break;
		case 33:
			levelData = violence3
			break;
		case 34:
			levelData = violence4
			break;
		case 35:
			levelData = violence5
			break;
		case 36:
			levelData = fraud1
			break;
		case 37:
			levelData = fraud2
			break;
		case 38:
			levelData = fraud3
			break;
		case 39:
			levelData = fraud4
			break;
		case 40:
			levelData = fraud5
			break;
		case 41:
			levelData = treachery1
			break;
		case 42:
			levelData = treachery2
			break;
		case 43:
			levelData = treachery3
			break;
		case 44:
			levelData = treachery4
			break;
		case 45:
			levelData = treachery5
			break;
		case 46:
			levelData = caina
			break;
		case 47:
			levelData = antenora
			break;
		case 48:
			levelData = ptolomaea
			break;
		case 49:
			levelData = judecca
			break;
		case 50:
			levelData = satan
			break;
		case 666:
			levelData = limbo1
			break;
		case 667:
			levelData = limbo2
			break;
		case 668:
			levelData = limbo3
			break;
		case 669:
			levelData = limbo4
			break;
		case 670:
			levelData = limbo5
			break;
		case 671:
			levelData = endless
			break;
		default:
			levelData = testGrid
			break;
	}
	gridWidth = levelData[0] + levelData[1] + levelData[2]
	levelGrid = levelData.slice(9)
	resetLevel()
	timeSinceLastUpdate = Date.now()
	document.getElementById("hits").innerHTML = noOfHits
	document.getElementById("deaths").innerHTML = noOfDeaths
	document.getElementById("time").innerHTML = time

	document.getElementById("levelStats").style.display = "none"
	if (currentLevel >= 666 && currentLevel <= 670) {
		document.getElementById("overlay").style.display = "block"
		document.getElementById("levelSelect").style.display = "none"
		document.getElementById("finishMessage").style.display = "none"
		document.getElementById("overlay").style.backgroundColor = "rgba(0,46,128,0.2)"
		document.getElementById("grid").style.transform = "translate(-50%, -50%) scale(-1.5,1.5)"
		document.getElementById("gameTitle").style.transform = "scaleX(-1)"
		document.getElementById("stats").style.transform = "scaleX(-1)"
		document.getElementById("keybinds").style.transform = "scaleX(-1)"
		document.getElementById("levelName").innerHTML = levelNames[currentLevel - 665]
	}
	else {
		document.getElementById("overlay").style.display = "none"
		document.getElementById("overlay").style.backgroundColor = "rgba(0,0,0,0.2)"
		document.getElementById("grid").style.transform = "translate(-50%, -50%) scale(1.5,1.5)"
		document.getElementById("gameTitle").style.transform = "none"
		document.getElementById("stats").style.transform = "none"
		document.getElementById("keybinds").style.transform = "none"
		if (currentLevel == 671) {document.getElementById("levelName").innerHTML = ""}
		else {document.getElementById("levelName").innerHTML = levelNames[currentLevel]}
	}
}

function checkLoadLevel(x) {
	if (x==1 || game.levelsBeaten[x-2] || x > 50) loadLevel(x)
}

function nextLevel() {
	if (currentLevel == 670) {
		currentLevel++
		loadLevel(currentLevel)
	} 
	else if (currentLevel == 671) {
		loadMenu()
	} 
	else if (currentLevel % 5 == 0) {
		loadMenu()
	}
	else {
		currentLevel++
		loadLevel(currentLevel)
	}
}

function resetLevel() {
	if (currentLevel == 666) {
		xPos = 487.5
		yPos = 50
	}
	else {
		xPos = parseInt(levelData[3] + levelData[4] + levelData[5]) * 25 + 12.5
		yPos = parseInt(levelData[6] + levelData[7] + levelData[8]) * 25 + 12.5
	}
	xVel = 0
	yVel = 0
	slope = 0
	finalPos = [xPos + xVel, yPos + yVel]
	nextXBorderPos = [xPos, yPos]
	nextYBorderPos = [xPos, yPos]
	ballMoving = true
	finished = false
	antiGravity = false
}

function xOutOfRange() {
	return (xPos < 0 || xPos > gridWidth * 25)
}

function yOutOfRange() {
	return (yPos < -25 || yPos > Math.ceil(levelGrid.length / gridWidth) * 25)
}

function formatTime(x) {
	timeFloor = Math.floor(x)
	timeMinutes = Math.floor(timeFloor / 60)
	timeSeconds = timeFloor % 60
	timeString = ((timeMinutes < 10 ? '0' : '') + timeMinutes + ":" + (timeSeconds < 10 ? '0' : '') + timeSeconds + "." + (Math.floor((x % 1) * 100) < 10 ? '0' : '') + Math.floor((x % 1) * 100))
	return timeString
}

function loadMenu() {
	inMenu = true
	document.getElementById("overlay").style.display = "block"
	document.getElementById("levelSelect").style.display = "block"
	document.getElementById("stats").style.display = "none"
	document.getElementById("keybinds").style.display = "none"
	document.getElementById("levelStats").style.display = "block"
	loadLevelStats(0)
	for (i=0;i<numberOfLevels;i++) {
		if (game.levelsBeaten[i]) {document.getElementsByClassName("level")[i].style.backgroundColor = "#393"}
		else if (i==0 || game.levelsBeaten[i-1] || i > 50) {document.getElementsByClassName("level")[i].style.backgroundColor = "#999"}
		else {document.getElementsByClassName("level")[i].style.backgroundColor = "#666"}
	}
}

function loadLevelStats(x) {
	if (x==0) {
		totalLevelsBeaten = 0
		totalHits = 0
		totalTime = 0
		for (i=0;i<numberOfLevels;i++) {
			if (game.levelsBeaten[i]) {
				totalLevelsBeaten++
				if (i<45) {
				totalHits += game.levelHits[i]
				totalTime += game.levelTime[i]
				}
			}
		}
		document.getElementById("levelStats").innerHTML = "<span style='color: #080'>" + totalLevelsBeaten + "/45 levels beaten </span><br>Total hits: " + totalHits + "<br>Total time: " + formatTime(totalTime)
		if (totalLevelsBeaten >= 45) {
			document.getElementById("hyperHell").style.display = "block"
		}
	}
	else if (game.levelsBeaten[x-1]) {document.getElementById("levelStats").innerHTML = "<span style='color: #088'>" + levelNames[x] + "</span><br>Least hits: " + game.levelHits[x-1] + ", Least time: " + formatTime(game.levelTime[x-1])}
	else {document.getElementById("levelStats").innerHTML = "<span style='color: #088'>" + levelNames[x] + "</span><br>Level not completed"}
}

function update(x=1) {
	if (ballMoving) {
		for (i=0;i<x;i++) {
			z=10
			while ((xPos != finalPos[0] || yPos != finalPos[1]) && z>0) {
				//Determine ths slope of the player's movement
				slope = (finalPos[1]-yPos)/(finalPos[0]-xPos)
				//Calculate where the player will next hit X and Y borders on its path (+ testRange so that if you're on a line it won't put it where you are)
				if (xVel > 0) {nextXBorderPos = [(Math.ceil(xPos / 25 + testRange) * 25), ((Math.ceil(xPos / 25 + testRange) * 25) - xPos) * slope + yPos]}
				else {nextXBorderPos = [(Math.floor(xPos / 25 - testRange) * 25), ((Math.floor(xPos / 25 - testRange) * 25) - xPos) * slope + yPos]}
				if (yVel > 0) {nextYBorderPos = [((Math.ceil(yPos / 25 + testRange) * 25) - yPos) / slope + xPos, (Math.ceil(yPos / 25 + testRange) * 25)]}
				else {nextYBorderPos = [((Math.floor(yPos / 25 - testRange) * 25) - yPos) / slope + xPos, (Math.floor(yPos / 25 - testRange) * 25)]}
				//Use pythagorean theorem to determine distance to the points
				nextXBorderDist = ((nextXBorderPos[0] - xPos) ** 2 + (nextXBorderPos[1] - yPos) ** 2) ** 0.5
				nextYBorderDist = ((nextYBorderPos[0] - xPos) ** 2 + (nextYBorderPos[1] - yPos) ** 2) ** 0.5
				finalPosDist = ((finalPos[0] - xPos) ** 2 + (finalPos[1] - yPos) ** 2) ** 0.5
				//Set position to next Y border
				if (Math.min(nextXBorderDist, nextYBorderDist, finalPosDist) == nextYBorderDist) {
					xPos = nextYBorderPos[0]; yPos = nextYBorderPos[1]
					//Detecting wall collisions
					if (yVel >= 0 && !xOutOfRange() && !yOutOfRange() && levelGrid[Math.floor(yPos / 25 + testRange) * gridWidth + Math.floor(xPos / 25)] == 1) {if (debug) console.log("Hit floor"); z=0; yVel = (0-yVel)/2; xVel = xVel * 0.8}
					else if (yVel < 0 && !xOutOfRange() && !yOutOfRange() && levelGrid[Math.floor(yPos / 25 - testRange) * gridWidth + Math.floor(xPos / 25)] == 1) {if (debug) console.log("Hit ceiling"); z=0; yVel = (0-yVel)/2; xVel = xVel * 0.8}
					//Detecting fire collisions
					else if (yVel >= 0 && !xOutOfRange() && !yOutOfRange() && levelGrid[Math.floor(yPos / 25 + testRange) * gridWidth + Math.floor(xPos / 25)] == 3) {hitFire()}
					else if (yVel < 0 && !xOutOfRange() && !yOutOfRange() && levelGrid[Math.floor(yPos / 25 - testRange) * gridWidth + Math.floor(xPos / 25)] == 3) {hitFire()}
					//Detecting anti-grav collisions
					else if (yVel >= 0 && !xOutOfRange() && !yOutOfRange() && levelGrid[Math.floor(yPos / 25 + testRange) * gridWidth + Math.floor(xPos / 25)] == 4) {antiGravity = !antiGravity}
					else if (yVel < 0 && !xOutOfRange() && !yOutOfRange() && levelGrid[Math.floor(yPos / 25 - testRange) * gridWidth + Math.floor(xPos / 25)] == 4) {antiGravity = !antiGravity}
				}
				//Set position to next X border
				else if (Math.min(nextXBorderDist, nextYBorderDist, finalPosDist) == nextXBorderDist) {
					xPos = nextXBorderPos[0]; yPos = nextXBorderPos[1]
					//Detecting collisions
					if (yVel == 0 && yPos % 25 == 0) { //If the ball is sliding across a platform
						//Wall collisions
						if (!antiGravity && xVel > 0 && Math.ceil(xPos / 25) < gridWidth && !xOutOfRange() && !yOutOfRange() && levelGrid[Math.floor(yPos / 25) * gridWidth - gridWidth + Math.floor(xPos / 25 + testRange)] == 1) {if (debug) console.log("Hit right wall"); z=0; xVel = (0-xVel) * 0.8; if (xVel > -0.6) xVel = -0.6}
						else if (!antiGravity && xVel < 0 && Math.floor(xPos / 25) > 0 && !yOutOfRange() && levelGrid[Math.floor(yPos / 25) * gridWidth - gridWidth + Math.floor(xPos / 25 - testRange)] == 1) {if (debug) console.log("Hit left wall"); z=0; xVel = (0-xVel) * 0.8; if (xVel < 0.6) xVel = 0.6}
						//Wall collisions in anti-grav
						else if (antiGravity && xVel > 0 && Math.ceil(xPos / 25) < gridWidth && !xOutOfRange() && !yOutOfRange() && levelGrid[Math.ceil(yPos / 25 + testRange) * gridWidth - gridWidth + Math.floor(xPos / 25 + testRange)] == 1) {if (debug) console.log("Hit right wall"); z=0; xVel = (0-xVel) * 0.8; if (xVel > -0.6) xVel = -0.6}
						else if (antiGravity && xVel < 0 && Math.floor(xPos / 25) > 0 && !yOutOfRange() && levelGrid[Math.ceil(yPos / 25 + testRange) * gridWidth - gridWidth + Math.floor(xPos / 25 - testRange)] == 1) {if (debug) console.log("Hit left wall"); z=0; xVel = (0-xVel) * 0.8; if (xVel < 0.6) xVel = 0.6}
						//Fire collisions
						else if (!antiGravity && xVel > 0 && Math.ceil(xPos / 25) < gridWidth && !xOutOfRange() && !yOutOfRange() && levelGrid[Math.floor(yPos / 25) * gridWidth - gridWidth + Math.floor(xPos / 25 + testRange)] == 3) {hitFire()}
						else if (!antiGravity && xVel < 0 && Math.floor(xPos / 25) > 0 && !yOutOfRange() && levelGrid[Math.floor(yPos / 25) * gridWidth - gridWidth + Math.floor(xPos / 25 - testRange)] == 3) {hitFire()}
						//Fire collisions in anti-grav
						else if (antiGravity && xVel > 0 && Math.ceil(xPos / 25) < gridWidth && !xOutOfRange() && !yOutOfRange() && levelGrid[Math.ceil(yPos / 25 + testRange) * gridWidth - gridWidth + Math.floor(xPos / 25 + testRange)] == 3) {hitFire()}
						else if (antiGravity && xVel < 0 && Math.floor(xPos / 25) > 0 && !yOutOfRange() && levelGrid[Math.ceil(yPos / 25 + testRange) * gridWidth - gridWidth + Math.floor(xPos / 25 - testRange)] == 3) {hitFire()}
						//Anti-grav collisions
						else if (xVel > 0 && Math.ceil(xPos / 25) < gridWidth && !xOutOfRange() && !yOutOfRange() && levelGrid[Math.floor(yPos / 25) * gridWidth - gridWidth + Math.floor(xPos / 25 + testRange)] == 4) {antiGravity = !antiGravity}
						else if (xVel < 0 && Math.floor(xPos / 25) > 0 && !yOutOfRange() && levelGrid[Math.floor(yPos / 25) * gridWidth - gridWidth + Math.floor(xPos / 25 - testRange)] == 4) {antiGravity = !antiGravity}
						else if (xVel > 0 && Math.ceil(xPos / 25) < gridWidth && !xOutOfRange() && !yOutOfRange() && levelGrid[Math.ceil(yPos / 25 - testRange) * gridWidth - gridWidth + Math.floor(xPos / 25 + testRange)] == 4) {antiGravity = !antiGravity}
						else if (xVel < 0 && Math.floor(xPos / 25) > 0 && !yOutOfRange() && levelGrid[Math.ceil(yPos / 25 - testRange) * gridWidth - gridWidth + Math.floor(xPos / 25 - testRange)] == 4) {antiGravity = !antiGravity}
						else if (xVel > 0 && Math.ceil(xPos / 25) < gridWidth && !xOutOfRange() && !yOutOfRange() && levelGrid[Math.ceil(yPos / 25 + testRange) * gridWidth - gridWidth + Math.floor(xPos / 25 + testRange)] == 4) {antiGravity = !antiGravity}
						else if (xVel < 0 && Math.floor(xPos / 25) > 0 && !yOutOfRange() && levelGrid[Math.ceil(yPos / 25 + testRange) * gridWidth - gridWidth + Math.floor(xPos / 25 - testRange)] == 4) {antiGravity = !antiGravity}
					}
					else {
						//Wall collisions
						if (xVel > 0 && Math.ceil(xPos / 25) < gridWidth && !xOutOfRange() && !yOutOfRange() && levelGrid[Math.floor(yPos / 25) * gridWidth + Math.floor(xPos / 25 + testRange)] == 1) {if (debug) console.log("Hit right wall"); z=0; xVel = (0-xVel) * 0.8; if (xVel > -0.6) xVel = -0.6}
						else if (xVel < 0 && Math.floor(xPos / 25) > 0 && !yOutOfRange() && levelGrid[Math.floor(yPos / 25) * gridWidth + Math.floor(xPos / 25 - testRange)] == 1) {if (debug) console.log("Hit left wall"); z=0; xVel = (0-xVel) * 0.8; if (xVel < 0.6) xVel = 0.6}
						//Fire collisions
						else if (xVel > 0 && Math.ceil(xPos / 25) < gridWidth && !xOutOfRange() && !yOutOfRange() && levelGrid[Math.floor(yPos / 25) * gridWidth + Math.floor(xPos / 25 + testRange)] == 3) {hitFire()}
						else if (xVel < 0 && Math.floor(xPos / 25) > 0 && !yOutOfRange() && levelGrid[Math.floor(yPos / 25) * gridWidth + Math.floor(xPos / 25 - testRange)] == 3) {hitFire()}
						//Anti-grav collisions
						else if (xVel > 0 && Math.ceil(xPos / 25) < gridWidth && !xOutOfRange() && !yOutOfRange() && levelGrid[Math.floor(yPos / 25) * gridWidth + Math.floor(xPos / 25 + testRange)] == 4) {antiGravity = !antiGravity}
						else if (xVel < 0 && Math.floor(xPos / 25) > 0 && !yOutOfRange() && levelGrid[Math.floor(yPos / 25) * gridWidth + Math.floor(xPos / 25 - testRange)] == 4) {antiGravity = !antiGravity}
					}
				}
				//Set position to final position
				else if (Math.min(nextXBorderDist, nextYBorderDist, finalPosDist) == finalPosDist) {
					xPos = finalPos[0]; yPos = finalPos[1]
					if (antiGravity) {
						if (xOutOfRange() || yOutOfRange() || levelGrid[Math.floor(yPos / 25 - testRange) * gridWidth + Math.floor(xPos / 25 - testRange)] != 1) {yVel -= 0.9}
						else {xVel = xVel * 0.9}
					}
					else {
						if (xOutOfRange() || yOutOfRange() || levelGrid[Math.floor(yPos / 25) * gridWidth + Math.floor(xPos / 25 + testRange)] != 1) {yVel += 0.9}
						else {xVel = xVel * 0.9}
					}
					//Detecting collisions
					//Collisions should never happen on the final position! They should only happen on X and Y borders! I have no fucking clue why X/Y borders sometimes don't detect
					//if ((xPos % 25 < 1 || xPos % 25 > 24) && xVel > 0 && !xOutOfRange() && !yOutOfRange() && levelGrid[Math.floor(yPos / 25) * gridWidth + Math.floor(xPos / 25 + testRange)] == 1) {console.log("F-Hit right wall"); z=0; xVel = (0-xVel) * 0.8}
					//else if ((xPos % 25 < 1 || xPos % 25 > 24) && xVel < 0 && Math.floor(xPos / 25) > 0 && !yOutOfRange() && levelGrid[Math.floor(yPos / 25) * gridWidth + Math.floor(xPos / 25 - testRange)] == 1) {console.log("F-Hit left wall"); z=0; xVel = (0-xVel) * 0.8}
					//else if (yVel > 0 && !xOutOfRange() && !yOutOfRange() && levelGrid[Math.floor(yPos / 25 + testRange) * gridWidth + Math.floor(xPos / 25)] == 1) {console.log("F-Hit floor"); z=0; yVel = (0-yVel)/2; xVel = xVel * 0.8}
					//else if (yVel < 0 && !xOutOfRange() && !yOutOfRange() && levelGrid[Math.floor(yPos / 25 - testRange) * gridWidth + Math.floor(xPos / 25)] == 1) {console.log("F-Hit ceiling"); z=0; yVel = (0-yVel)/2; xVel = xVel * 0.8}
					if (!xOutOfRange() && !yOutOfRange() && levelGrid[Math.floor(yPos / 25) * gridWidth + Math.floor(xPos / 25)] == 3) {
						resetLevel()
						noOfHits = 0
						document.getElementById("hits").innerHTML = noOfHits
						time = 0
						timeSinceLastUpdate = Date.now()
						noOfDeaths++
						document.getElementById("deaths").innerHTML = noOfDeaths
					}
					//Movement arrows
					else if (!xOutOfRange() && !yOutOfRange() && yPos % 25 > 1 && levelGrid[Math.floor(yPos / 25) * gridWidth + Math.floor(xPos / 25)] == 5) {
						yVel -= 2
					}
					else if (!xOutOfRange() && !yOutOfRange() && yPos % 25 < 24 && levelGrid[Math.floor(yPos / 25) * gridWidth + Math.floor(xPos / 25)] == 6) {
						yVel += 2
					}
					else if (!xOutOfRange() && !yOutOfRange() && xPos % 25 > 1 && levelGrid[Math.floor(yPos / 25) * gridWidth + Math.floor(xPos / 25)] == 7) {
						xVel -= 2
					}
					else if (!xOutOfRange() && !yOutOfRange() && xPos % 25 < 24 && levelGrid[Math.floor(yPos / 25) * gridWidth + Math.floor(xPos / 25)] == 8) {
						xVel += 2
					}
					//Mirror world stuff
					if (currentLevel == 671 && yPos > 800) {yPos -= 400; finalPos[1] -= 400}
					else if (currentLevel == 671 && yPos < 400) {yPos += 400; finalPos[1] += 400}
					if (currentLevel == 671 && xPos > 800) {xPos -= 400; finalPos[0] -= 400}
					else if (currentLevel == 671 && xPos < 400) {xPos += 400; finalPos[0] += 400}
				}
				//Something is wrong
				else {console.log("broken"); xPos = finalPos[0]; yPos = finalPos[1]}
				z--
			}
			//Mirror world stuff
			if (currentLevel == 1 && game.levelsBeaten[44] && Math.floor(xPos / 25) == 19 && Math.floor(yPos / 25) == 2) {loadLevel(666)}
			//Ball is stationary
			if (xVel < 0.5 && xVel > -0.5) xVel = 0
			if (yVel < 0.5 && yVel > -0.5) yVel = 0
			if (xVel == 0 && yVel <= 1 && yVel >= -1) yVel = 0
			if (antiGravity && xVel == 0 && yVel == 0 && levelGrid[Math.floor(yPos / 25 - testRange) * gridWidth + Math.floor(xPos / 25 - testRange)] != 1) { yVel -= 0.9}
			else if (!antiGravity && xVel == 0 && yVel == 0 && levelGrid[Math.floor(yPos / 25) * gridWidth + Math.floor(xPos / 25 + testRange)] != 1) yVel += 0.9
			else if (xVel == 0 && yVel == 0) {
				if ((antiGravity && levelGrid[Math.floor(yPos / 25 - testRange) * gridWidth + Math.floor(xPos / 25)] == 1) || (!antiGravity && levelGrid[Math.floor(yPos / 25) * gridWidth + Math.floor(xPos / 25)] == 1)) {
					if (debug) console.log("Round is finished!")
					ballMoving = false
					if ((antiGravity && levelGrid[Math.floor((yPos + 5) / 25) * gridWidth + Math.floor(xPos / 25)] == 2) || (!antiGravity && levelGrid[Math.floor((yPos - 5) / 25) * gridWidth + Math.floor(xPos / 25)] == 2)) {
						document.getElementById("overlay").style.display = "block"
						document.getElementById("overlay").style.backgroundColor = "rgba(0,0,0,0.2)"
						document.getElementById("finishMessage").style.display = "block"
						document.getElementById("levelSelect").style.display = "none"
						finished = true
						document.getElementById("finishStats").innerHTML = "Final stats:<br>Hits: " + noOfHits + "<br>Deaths: " + noOfDeaths + "<br>Time: " + formatTime(time)
						if (game.levelsBeaten[currentLevel-1]) {
							if (noOfHits < game.levelHits[currentLevel-1]) game.levelHits[currentLevel-1] = noOfHits
							if (noOfDeaths < game.levelFalls[currentLevel-1]) game.levelFalls[currentLevel-1] = noOfDeaths
							if (time < game.levelTime[currentLevel-1]) game.levelTime[currentLevel-1] = time
						}
						else {
							game.levelHits[currentLevel-1] = noOfHits
							game.levelFalls[currentLevel-1] = noOfDeaths
							game.levelTime[currentLevel-1] = time
						}
						game.levelsBeaten[currentLevel-1] = true
						noOfHits = 0
						noOfDeaths = 0
						time = 0
						save()
						if (debug) console.log("Goal reached!")
					}
				}
			}

			//Calculate X and Y again (so that debug display is correct)
			if (xVel > 0) {nextXBorderPos = [(Math.ceil(xPos / 25 + testRange) * 25), ((Math.ceil(xPos / 25 + testRange) * 25) - xPos) * slope + yPos]}
			else {nextXBorderPos = [(Math.floor(xPos / 25 - testRange) * 25), ((Math.floor(xPos / 25 - testRange) * 25) - xPos) * slope + yPos]}
			if (yVel > 0) {nextYBorderPos = [((Math.ceil(yPos / 25 + testRange) * 25) - yPos) / slope + xPos, (Math.ceil(yPos / 25 + testRange) * 25)]}
			else {nextYBorderPos = [((Math.floor(yPos / 25 - testRange) * 25) - yPos) / slope + xPos, (Math.floor(yPos / 25 - testRange) * 25)]}
			finalPos = [Math.round((xPos + xVel) * 100) / 100, Math.round((yPos + yVel) * 100) / 100]
			if ((antiGravity && yPos < -200) || (!antiGravity && yPos > Math.ceil(levelGrid.length / gridWidth) * 25 + 200)) {
				resetLevel()
				noOfHits = 0
				document.getElementById("hits").innerHTML = noOfHits
				time = 0
				timeSinceLastUpdate = Date.now()
				noOfDeaths++
				document.getElementById("deaths").innerHTML = noOfDeaths
			}
		}
	}

	if (!inMenu && !finished) {
		renderGrid(xPos,yPos)

		time += ((Date.now() - timeSinceLastUpdate) / 1000)
		timeSinceLastUpdate = Date.now()
		document.getElementById("time").innerHTML = formatTime(time)

		if (debug) {
			document.getElementById("debugStats").innerHTML = "Debug stats:<br>xPos: " + xPos + "<br>yPos: " + yPos + "<br>xVelocity: " + xVel + "<br>yVelocity: " + yVel + "<br>next frame position: " + finalPos + "<br>next X border position: " + nextXBorderPos + "<br>next Y border position: " + nextYBorderPos
		}
		else {
			document.getElementById("debugStats").innerHTML = ""
		}
	}
}

function renderGrid(x,y) {
	const canvas = document.getElementById("grid");
	if (debug) {
		canvas.style.backgroundImage = "url('grid.png')"
		canvas.style.backgroundPosition = -(xPos) % 25 + "px " + -(yPos) % 25 + "px"
	}
	else if (currentLevel <= 5 || (currentLevel >= 666 && currentLevel <= 670)) {
		canvas.style.backgroundImage = "linear-gradient(#cff, #9ff)"
		canvas.style.backgroundPosition = "0 0"
	}
	else if (currentLevel == 671) {
		canvas.style.backgroundImage = "linear-gradient(black, black)"
		canvas.style.backgroundPosition = "0 0"
	}
	else if (currentLevel <= 10) {
		canvas.style.backgroundImage = "linear-gradient(#126, #558, #a8c, #fba)"
		canvas.style.backgroundPosition = "0 0"
	}
	else if (currentLevel <= 15) {
		canvas.style.backgroundImage = "linear-gradient(#fa2, #d62, #b22, #611)"
		canvas.style.backgroundPosition = "0 0"
	}
	else if (currentLevel <= 20) {
		canvas.style.backgroundImage = "url('spaceBack.png')"
		canvas.style.backgroundPosition = -(xPos * 0.1) % 320 + "px " + -(yPos * 0.1) % 320 + "px"
	}
	else if (currentLevel <= 25) {
		canvas.style.backgroundImage = "url('celestialBack.png')"
		canvas.style.backgroundPosition = -(xPos * 0.1) % 320 + "px " + -(yPos * 0.1) % 320 + "px"
	}
	else if (currentLevel <= 30) {
		canvas.style.backgroundImage = "linear-gradient(#5a0, #7b7, #8cc)"
		canvas.style.backgroundPosition = "0 0"
	}
	else if (currentLevel <= 35) {
		canvas.style.backgroundImage = "url('dirtBack.png')"
		canvas.style.backgroundPosition = -(xPos * 0.1) % 160 + "px " + -(yPos * 0.1) % 160 + "px"
	}
	else if (currentLevel <= 40) {
		canvas.style.backgroundImage = "url('tileBack.png')"
		canvas.style.backgroundPosition = -(xPos * 0.1) % 320 + "px " + -(yPos * 0.1) % 320 + "px"
	}
	else if (currentLevel <= 45) {
		canvas.style.backgroundImage = "linear-gradient(#d22, #211)"
		canvas.style.backgroundPosition = "0 0"
	}
	else if (currentLevel <= 50) {
		canvas.style.backgroundImage = "linear-gradient(#f00, black)"
		canvas.style.backgroundPosition = "0 0"
	}
	else if (currentLevel <= 55) {
		canvas.style.backgroundImage = "url('celestialBack.png')"
		canvas.style.backgroundPosition = -(xPos * 0.1) % 320 + "px " + -(yPos * 0.1) % 320 + "px"
	}
	else if (currentLevel <= 60) {
		canvas.style.backgroundImage = "linear-gradient(#306, #606)"
		canvas.style.backgroundPosition = -(xPos * 0.1) % 320 + "px " + -(yPos * 0.1) % 320 + "px"
	}
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, 500, 500);


		renderSpace = [Math.floor(xPos / 25 - renderDistance), Math.ceil(xPos / 25 + renderDistance), Math.floor(yPos / 25 - renderDistance), Math.ceil(yPos / 25 + renderDistance)]
		for (i=renderSpace[2];i<renderSpace[3]; i++) {
			for (j=Math.max(renderSpace[0], 0);j<Math.min(renderSpace[1], gridWidth); j++) {
				//Creates dirt
				if (levelGrid[i * gridWidth + j] == 1) {
					if (currentLevel <= 5 || (currentLevel >= 666 && currentLevel <= 670) || (currentLevel >= 51 && currentLevel <= 60)) {ctx.fillStyle = "#630"}
					else if (currentLevel == 671) {ctx.fillStyle = "white"}
					else if (currentLevel <= 10) {ctx.fillStyle = "#555"}
					else if (currentLevel <= 15) {ctx.fillStyle = "#854"}
					else if (currentLevel <= 20) {ctx.fillStyle = "#555"}
					else if (currentLevel <= 25) {ctx.fillStyle = "#006"}
					else if (currentLevel <= 30) {ctx.fillStyle = "#060"}
					else if (currentLevel <= 35) {ctx.fillStyle = "#642"}
					else if (currentLevel <= 40) {ctx.fillStyle = "#044"}
					else if (currentLevel <= 50) {ctx.fillStyle = "black"}
					ctx.fillRect(25*(j % gridWidth) + 250 - x, i * 25 + 250 - y, 26, 26);
					//img = document.createElement("img")
					//img.src = "dirt.png"
					//ctx.drawImage(img, 25*(j % gridWidth) + 250 - x, i * 25 + 250 - y, 26, 26);
					//Creates details
					if (currentLevel <= 5 && levelGrid[i * gridWidth - gridWidth + j] != 1) {
						ctx.fillStyle = "#060"
						ctx.fillRect(25*(j % gridWidth) + 250 - x, i * 25 + 250 - y, 26, 10);
						//img = document.createElement("img")
						//img.src = "grass.png"
						//ctx.drawImage(img, 25*(j % gridWidth) + 250 - x, i * 25 + 250 - y, 26, 26);
					}
					else if (currentLevel <= 10 && levelGrid[i * gridWidth - gridWidth + j] != 1) {
						ctx.fillStyle = "#777"
						ctx.fillRect(25*(j % gridWidth) + 250 - x, i * 25 + 250 - y, 26, 6);
					}
					else if (currentLevel > 20 && currentLevel <= 25) {
						ctx.fillStyle = "#208"
						ctx.fillRect(25*(j % gridWidth) + 253 - x, i * 25 + 253 - y, 20, 20);
					}
					else if (currentLevel >= 666 && currentLevel <= 670 && levelGrid[i * gridWidth - gridWidth + j] != 1) {
						ctx.fillStyle = "#060"
						ctx.fillRect(25*(j % gridWidth) + 250 - x, i * 25 + 250 - y, 26, 10);
					}
				}
				//Creates end goal
				else if (levelGrid[i * gridWidth + j] == 2) {
					ctx.fillStyle = "#0f0"
					ctx.fillRect(25*(j % gridWidth) + 250 - x, i * 25 + 250 - y, 25, 25);
				}
				//Creates fire
				else if (levelGrid[i * gridWidth + j] == 3) {
					ctx.fillStyle = "#f80"
					ctx.fillRect(25*(j % gridWidth) + 250 - x, i * 25 + 250 - y, 26, 26);
				}
				//Creates anti-grav
				else if (levelGrid[i * gridWidth + j] == 4) {
					img = document.createElement("img")
					img.src = "antiGrav.png"
					ctx.drawImage(img, 25*(j % gridWidth) + 250 - x, i * 25 + 250 - y, 25, 25);
				}
				//Creates up arrows
				else if (levelGrid[i * gridWidth + j] == 5) {
					img = document.createElement("img")
					img.src = "arrows1.png"
					ctx.drawImage(img, 25*(j % gridWidth) + 250 - x, i * 25 + 250 - y, 25, 25);
				}
				//Creates down arrows
				else if (levelGrid[i * gridWidth + j] == 6) {
					img = document.createElement("img")
					img.src = "arrows3.png"
					ctx.drawImage(img, 25*(j % gridWidth) + 250 - x, i * 25 + 250 - y, 25, 25);
				}
				//Creates left arrows
				else if (levelGrid[i * gridWidth + j] == 7) {
					img = document.createElement("img")
					img.src = "arrows4.png"
					ctx.drawImage(img, 25*(j % gridWidth) + 250 - x, i * 25 + 250 - y, 25, 25);
				}
				//Creates down arrows
				else if (levelGrid[i * gridWidth + j] == 8) {
					img = document.createElement("img")
					img.src = "arrows2.png"
					ctx.drawImage(img, 25*(j % gridWidth) + 250 - x, i * 25 + 250 - y, 25, 25);
				}
				else if (currentLevel == 1 && i * gridWidth + j == 39 && game.levelsBeaten[44]) {
					ctx.fillStyle = "black"
					ctx.fillRect(25*(j % gridWidth) + 250 - x, i * 25 + 250 - y, 26, 26);
				}
			}
		}

		if (debug) {
			ctx.fillStyle = "yellow";
			ctx.fillRect((Math.floor(xPos / 25) * 25 - xPos + 250),(Math.floor(yPos / 25) * 25 - yPos + 250),25,25)
			console.log(Math.floor(yPos / 25), Math.floor(xPos / 25))
			console.log("Tile at current position is " + levelGrid[Math.floor(yPos / 25) * gridWidth + Math.floor(xPos / 25)])
		}

		ctx.fillStyle = "#bbb";
		ctx.strokeStyle = "#bbb";
		//ctx.fillRect(245,245,10,10)
		ctx.beginPath();
		ctx.arc(250,250,5,0,2*Math.PI);
		ctx.fill();
		ctx.stroke();

		if (debug) {
			ctx.fillStyle = "blue";
			ctx.fillRect(245+xVel,245+yVel,10,10)
			ctx.fillStyle = "green";
			ctx.fillRect((nextXBorderPos[0] - xPos + 247),(nextXBorderPos[1] - yPos + 247),6,6)
			ctx.fillStyle = "lime";
			ctx.fillRect((nextYBorderPos[0] - xPos + 247),(nextYBorderPos[1] - yPos + 247),6,6)
		}

		if (!ballMoving && !finished) {
			ctx.strokeStyle = "red";
			ctx.moveTo(250, 250);
			ctx.lineTo(mousePos[0] + 250, mousePos[1] + 250)
			ctx.stroke();
		}
  }
}

setInterval(update, 30)

function hitBall(x,y) {
	noOfHits++
	document.getElementById("hits").innerHTML = noOfHits
	xVel = x
	yVel = y
	ballMoving = true
}

function hitFire() {
	if (debug) console.log("Hit fire")
	resetLevel()
	noOfHits = 0
	document.getElementById("hits").innerHTML = noOfHits
	time = 0
	timeSinceLastUpdate = Date.now()
	noOfDeaths++
	document.getElementById("deaths").innerHTML = noOfDeaths
}

//Mouse tracking
document.onmousemove = handleMouseMove;
function handleMouseMove(event) {
	mousePos = [(event.pageX - (window.innerWidth / 2)) / 1.5, (event.pageY - (window.innerHeight / 2)) / 1.5]
	if (!antiGravity) {
		if (mousePos[0] < -100) mousePos[0] = -100
		if (mousePos[0] > 100) mousePos[0] = 100
		if (mousePos[1] < -100) mousePos[1] = -100
		if (mousePos[1] > 1) mousePos[1] = 1
	}
	else {
		if (mousePos[0] < -100) mousePos[0] = -100
		if (mousePos[0] > 100) mousePos[0] = 100
		if (mousePos[1] > 100) mousePos[1] = 100
		if (mousePos[1] < -1) mousePos[1] = -1
	}
}

document.addEventListener('click', function(){if (!ballMoving && !finished && !inMenu) hitBall(mousePos[0] / 10, mousePos[1] / 6)})

window.addEventListener("keydown", (event) => {
  if (event.keyCode === 27 && !finished && !inMenu) {
		loadMenu()
	}
	else if (event.keyCode === 82 && !finished && !inMenu) {
		loadLevel(currentLevel)
	}
})
