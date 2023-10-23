/*const url = 'images/1stTitan.png';
const img = new Image();
img.src = url;
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
context.drawImage(img, 0, 0);
function getPixData(x, y){
  return context.getImageData(x, y, 1, 1).data;
}*/
/*function getPixel(url, x, y) {
  let img = new Image();
  img.src = url;
  let canvas = document.createElement('canvas');
  let context = canvas.getContext('2d');
  context.drawImage(img, 0, 0);
  return context.getImageData(x, y, 1, 1).data;
}*/

let theMap = document.getElementById("MapEditorMap");
let mapStuff = document.getElementById("MapStuff");

let bombSpotSprite = document.querySelectorAll(".bombSpot");
let spawnSprite = document.querySelectorAll(".spawnPoint");

let allTowers;
let allWalls;

let towerID = [];
let towerXpos = [];
let towerYpos = [];
let towerColor = [];
let wallTower1 = [];
let wallTower2 = [];
let shadedAreas = [];

let mapWidth = 210;
let mapHeight = 120;
let kothBounds = [];
let bombSpotsT = []; //0, {x : 0, y : 0}, {x : 0, y : 0}
let spawnPointsS = [];

let selectedTower = 0;

let coppiedTowers = {
  Xpos: [],
  Ypos: [],
  ID: [],
  color: [],
};
let coppiedWalls = {
  towerOne: [],
  towerTwo: [],
};

let pastActions = [];
let undoneActions = [];

let pastActionDeep = 0;

let realMousePos = {
  x: 0,
  y: 0,
};
let mousePos = {
  x: 0,
  y: 0,
};
let uncutMouseCoords = {
  x: 0,
  y: 0,
};

let zoomingMouseCoords = {
  x: 0,
  y: 0,
};

let onZooming = false;

let previousTowers = [];

let selectedTowerColor = 1;

let temp;
let temp2;
//let longtemp;

let globalTestVariable = 0;

let towerHasBeenSelectedNew = false;

let loadedFile = [];

let overallBehavior = "normal";

let mapZoom = 1;

let mapIntervallTempSpeed = [0, 0];

let i = 1; //in case of error, change back to '0'

let Ctrl = false;
let Shift = false;
let Enter = false;
let G_snapToGrid = false;
let R_Rotate = false;
let M_Mirrow = false;

let upW = false;
let leftA = false;
let downS = false;
let rightD = false;

let movementSpeed = 4;

let hotkeys = {
  Ctrl: "CONTROL",
  Shift: "SHIFT",
  Enter: "ENTER",
  Delete: "DELETE",
  ArrowUp: "ARROWUP",
  ArrowDown: "ARROWDOWN",
  ArrowLeft: "ARROWLEFT",
  ArrowRight: "ARROWRIGHT",
  g: "G",
  b: "B",
  r: "R",
  m: "M",
  c: "C",
  v: "V",
  n: "N",
  z: "Z",
  y: "Y",
  w: "W",
  a: "A",
  s: "S",
  d: "D",
  f: "F",
  x: "X",
  Plus: "+",
  Minus: "-",
  Zero: "0",
  One: "1",
  Two: "2",
  Three: "3",
  Four: "4",
};

let hotkeyToChange;
let currentHotkey = -1;

let snapRadius = 40;

let startChunkSelection = false;
let chunkSelector;
let startX = 0;
let startY = 0;
let currentX = 0;
let currentY = 0;

let lockUnselect = false;

let currentPage = 1;

const colors = {
  1: "rgb(77,77,77)",
  2: "rgb(61,93,255)",
  3: "rgb(253,53,53)",
  4: "rgb(0,128,55)",
  5: "rgb(255,128,42)",
  6: "rgb(146,75,255)",
  7: "rgb(85,213,255)",
  8: "rgb(24,226,31)",
  9: "rgb(246,89,255)",
  10: "rgb(247,255,42)",
  11: "rgb(255,95,174)",
  12: "rgb(147,254,0)",
  13: "rgb(0,255,188)",
  14: "rgb(0,0,0)",
};
//'rgb (x,x,x )' for ghost towers

let allCharacters = {
  a: {
    towers: [
      [1, 9],
      [2.5, 5],
      [4, 1],
      [5.5, 5],
      [7, 9],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [2, 4],
    ],
  },
  b: {
    towers: [
      [1.75, 9],
      [1.75, 5],
      [1.75, 1],
      [4.75, 1],
      [6.25, 3],
      [4.75, 5],
      [6.25, 7],
      [4.75, 9],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 2],
      [6, 7],
      [7, 8],
      [8, 1],
    ],
  },
  c: {
    towers: [
      [7, 3],
      [5, 1],
      [3, 1],
      [1, 3],
      [1, 7],
      [3, 9],
      [5, 9],
      [7, 7],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
    ],
  },
  d: {
    towers: [
      [1.5, 1],
      [4.5, 1],
      [6.5, 3],
      [6.5, 7],
      [4.5, 9],
      [1.5, 9],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 1],
    ],
  },
  e: {
    towers: [
      [6.5, 1],
      [1.5, 1],
      [1.5, 5],
      [5.5, 5],
      [1.5, 9],
      [6.5, 9],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
      [3, 5],
      [5, 6],
    ],
  },
  f: {
    towers: [
      [7, 1],
      [2, 1],
      [2, 4.5],
      [6, 4.5],
      [2, 9],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
      [3, 5],
    ],
  },
  g: {
    towers: [
      [6.5, 3],
      [5, 1],
      [2.5, 1],
      [1, 3],
      [1, 6.5],
      [2.5, 9],
      [6.5, 9],
      [6.5, 6],
      [3.5, 6],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
    ],
  },
  h: {
    towers: [
      [2, 1],
      [2, 5],
      [2, 9],
      [6, 1],
      [6, 5],
      [6, 9],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [4, 5],
      [5, 6],
      [2, 5],
    ],
  },
  i: {
    towers: [
      [2, 1],
      [4, 1],
      [6, 1],
      [2, 9],
      [4, 9],
      [6, 9],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [2, 5],
      [4, 5],
      [5, 6],
    ],
  },
  j: {
    towers: [
      [3, 1],
      [6, 1],
      [6, 7],
      [4.5, 8.5],
      [3, 8.5],
      [1.5, 7],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
    ],
  },
  k: {
    towers: [
      [2, 1],
      [2, 5],
      [2, 9],
      [6, 1],
      [6, 9],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [2, 4],
      [2, 5],
    ],
  },
  l: {
    towers: [
      [1.5, 1],
      [1.5, 9],
      [6.5, 9],
    ],
    walls: [
      [1, 2],
      [2, 3],
    ],
  },
  m: {
    towers: [
      [1, 9],
      [1, 1],
      [4, 4],
      [7, 1],
      [7, 9],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
    ],
  },
  n: {
    towers: [
      [1.5, 9],
      [1.5, 1],
      [6.5, 9],
      [6.5, 1],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  },
  o: {
    towers: [
      [3, 1],
      [1, 3],
      [1, 7],
      [3, 9],
      [5, 9],
      [7, 7],
      [7, 3],
      [5, 1],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 1],
    ],
  },
  p: {
    towers: [
      [2, 1],
      [2, 5],
      [2, 9],
      [5, 1],
      [6, 2],
      [6, 4],
      [5, 5],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [1, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 2],
    ],
  },
  q: {
    towers: [
      [3, 1],
      [1, 3],
      [1, 7],
      [3, 9],
      [5, 9],
      [5.5, 8.5],
      [7, 7],
      [7, 3],
      [5, 1],
      [4.5, 7.5],
      [7, 9],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 7],
      [7, 8],
      [8, 9],
      [9, 1],
      [10, 6],
      [6, 11],
    ],
  },
  r: {
    towers: [
      [2, 1],
      [2, 5],
      [2, 9],
      [5, 1],
      [6, 2],
      [6, 4],
      [5, 5],
      [6, 9],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [1, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 2],
      [2, 8],
    ],
  },
  s: {
    towers: [
      [6.5, 2.5],
      [5, 1],
      [3, 1],
      [1.5, 3],
      [3, 5],
      [5, 5],
      [6.5, 7],
      [5, 9],
      [3, 9],
      [1.5, 7.5],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
    ],
  },
  t: {
    towers: [
      [1, 1],
      [4, 1],
      [7, 1],
      [4, 9],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [2, 4],
    ],
  },
  u: {
    towers: [
      [1, 1],
      [1, 7],
      [3, 9],
      [5, 9],
      [7, 7],
      [7, 1],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
    ],
  },
  v: {
    towers: [
      [1, 1],
      [4, 9],
      [7, 1],
    ],
    walls: [
      [1, 2],
      [2, 3],
    ],
  },
  w: {
    towers: [
      [1, 1],
      [2.5, 9],
      [4, 6],
      [5.5, 9],
      [7, 1],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
    ],
  },
  x: {
    towers: [
      [1, 1],
      [4, 5],
      [7, 9],
      [7, 1],
      [1, 9],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [4, 2],
      [2, 5],
    ],
  },
  y: {
    towers: [
      [1, 1],
      [4, 5],
      [4, 9],
      [7, 1],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [4, 2],
    ],
  },
  z: {
    towers: [
      [1, 1],
      [7, 1],
      [1, 9],
      [7, 9],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  },
  0: {
    towers: [
      [3, 1],
      [1, 3],
      [1, 7],
      [2, 8],
      [3, 9],
      [5, 9],
      [7, 7],
      [7, 3],
      [6, 2],
      [5, 1],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
      [10, 1],
      [9, 4],
    ],
  },
  1: {
    towers: [
      [1.5, 3.5],
      [4, 1],
      [4, 9],
      [1.5, 9],
      [6.5, 9],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [4, 3],
      [3, 5],
    ],
  },
  2: {
    towers: [
      [1.5, 2.5],
      [3, 1],
      [5, 1],
      [6.5, 2.5],
      [6.5, 4],
      [1.5, 9],
      [6.5, 9],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
    ],
  },
  3: {
    towers: [
      [1.5, 2.5],
      [3, 1],
      [5, 1],
      [6.5, 2.5],
      [6, 5],
      [4, 5],
      [6.5, 7.5],
      [5, 9],
      [3, 9],
      [1.5, 7.5],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [5, 7],
      [7, 8],
      [8, 9],
      [9, 10],
    ],
  },
  4: {
    towers: [
      [6.5, 6],
      [5, 6],
      [1.5, 6],
      [5, 1.5],
      [5, 8.5],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 2],
      [2, 5],
    ],
  },
  5: {
    towers: [
      [6, 1],
      [1.5, 1],
      [1.5, 5],
      [4.5, 5],
      [6, 6],
      [6, 8],
      [4.5, 9],
      [1.5, 9],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
    ],
  },
  6: {
    towers: [
      [6, 1],
      [3, 1],
      [1.5, 3],
      [1.5, 5.5],
      [1.5, 7.5],
      [3, 9],
      [5, 9],
      [6.5, 7.5],
      [6.5, 5.5],
      [5, 4],
      [3, 4],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
      [10, 11],
      [11, 4],
    ],
  },
  7: {
    towers: [
      [1, 1],
      [7, 1],
      [4, 5],
      [1, 9],
      [2, 5],
      [6, 5],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
      [5, 3],
      [3, 6],
    ],
  },
  8: {
    towers: [
      [6, 4],
      [6, 2],
      [5, 1],
      [3, 1],
      [2, 2],
      [2, 4],
      [3, 5],
      [5, 5],
      [6, 6],
      [6, 8],
      [5, 9],
      [3, 9],
      [2, 8],
      [2, 6],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 9],
      [9, 10],
      [10, 11],
      [11, 12],
      [12, 13],
      [13, 14],
      [14, 7],
      [8, 1],
    ],
  },
  9: {
    towers: [
      [6.5, 4.5],
      [6.5, 2.5],
      [5, 1],
      [3, 1],
      [1.5, 2.5],
      [1.5, 4.5],
      [3, 6],
      [5, 6],
      [6.5, 7],
      [5, 9],
      [2, 9],
    ],
    walls: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 7],
      [7, 8],
      [8, 1],
      [1, 9],
      [9, 10],
      [10, 11],
    ],
  },
  non: { towers: [], walls: [] },
};

let textCursor = {
  x: 0,
  y: 0,
};

let buildViewMover = document.getElementById("buildView");
let softlockViewMover = document.getElementById("softlockView");

let openMenu = false;

let pathDistance = 0;

document.getElementById("showMenu").style.display = "none";
document.getElementById("instructions").style.display = "none";
document.getElementById("helpPage2").style.display = "none";
document.getElementById("helpPage3").style.display = "none";
document.getElementById("hotkeys").style.display = "none";
document.getElementById("uploadMapFileButton").style.display = "none";
document.getElementById("chunkSelection").style.display = "none";
document.getElementById("confirm").style.display = "none";
document.getElementById("tower-info").style.display = "none";
document.getElementById("colorPicker").style.display = "none";

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

function buildTower() {
  if (openMenu) return;
  //console.log("Click detected (" + event.button + ")");
  if (event.button != 0) {
    // left click
    //console.log("Leftclick detected");
  }
  if (true) {
    //event.button === 0
    // right click

    //console.log("Rightclick detected");
    let mouseX = mousePos.x; //event.clientX;
    let mouseY = mousePos.y; //event.clientY;
    /*if(G_snapToGrid){
	    if(mouseX%snapRadius > (snapRadius/2)){
	      mouseX += snapRadius-(mouseX%snapRadius);
	    }else{mouseX -= mouseX%snapRadius;}
	    if(mouseY%snapRadius > (snapRadius/2)){
	      mouseY += snapRadius-(mouseY%snapRadius);
	    }else{mouseY -= mouseY%snapRadius;}
	  }*/
    createTower(mouseX, mouseY, i, selectedTowerColor);

    temp2 = towerID.length - 1;

    if (selectedTower != -1) {
      buildWall();
    }
    selectedTower = towerID.length - 1;

    handleSelectTower(towerID[towerID.length - 1]);
  }
}

function createTower(XposTower, YposTower, IdTower, ColorTower) {
  let b = IdTower;
  //let img = new Image(24, 24);  //size of tower
  let img = document.createElement("div");
  //img.style.opacity = 0.5;
  img.classList.add("tower");
  img.classList.add("clickable");
  img.style.left = XposTower - 12;
  img.style.top = YposTower - 12; //always half of towersize offset, so it appears ceneter under mousclick
  img.addEventListener("click", function () {
    //add onclick function to everytower to detect clicks on them, so you can select each one easily
    handleSelectTower(b - 1);
  });
  /*document.body*/ theMap.appendChild(img);

  towerID.push(b);
  towerXpos.push(XposTower);
  towerYpos.push(YposTower); //add tower ID as well as X and Y coords of new tower to array
  if (isNaN(ColorTower)) {
    towerColor.push(1);
  } else {
    towerColor.push(ColorTower);
  }
  img.style.backgroundColor = numberToColor(ColorTower);
  b++;
  i++; //increase number of placed towers

  //console.log("X-pos tower: " + XposTower);
  //console.log("Y-pos tower: " + YposTower);
  let someAction = {
    actionType: "pT",
    tID: [IdTower],
  };
  pastActions.push(someAction); //stores past action (tower placed) in global var for undo porpuse
}

function buildWall(towerOne, towerTwo) {
  if (towerOne === undefined) {
    //normally placed wall
    //console.log('gonna place some walls here...');
    let numberOfTowers = towerID.length;
    if (numberOfTowers > 1) {
      //only do if there´s more then one tower placed
      /*let highlightedTowers = document.getElementsByClassName('tower');
		if(highlightedTowers.length != towerID.length){//console.log("weird...");
	        }
	    numberOfTowers--;
		for(let a=0; a<highlightedTowers.length; a++){
		  if(highlightedTowers[a].classList.contains('highlighted')){createWall(a, numberOfTowers);}
		}*/
      let newTower = numberOfTowers - 1; //!here
      let selectedTowers = getSelectedTowers();
      console.log(selectedTowers);
      selectedTowers.forEach((tower) => {
        createWall(tower, newTower);
      });
    }
  } else {
    //if wall gets placed by map file
    towerOne = convertIDtoArray(towerOne);
    towerTwo = convertIDtoArray(towerTwo);

    createWall(towerOne, towerTwo);
  }
}

function createWall(one, two) {
  let wallLength = Math.sqrt(
    Math.pow(towerXpos[one] - towerXpos[two], 2) +
      Math.pow(towerYpos[one] - towerYpos[two], 2)
  ); //using trigeometry to calculate wall length
  let htmlWall = document.createElement("div");
  htmlWall.style.width = wallLength;
  htmlWall.classList.add("wall");
  let midX = (towerXpos[one] + towerXpos[two]) / 2; //X pos of mid
  let midY = (towerYpos[one] + towerYpos[two]) / 2; //Y pos of mid
  let topX = midX - wallLength / 2; //X pos of top left
  let topY = midY - 6; //Y pos of top left; wall height/2
  htmlWall.style.left = topX;
  htmlWall.style.top = topY;
  let rotation =
    (Math.atan(
      (towerYpos[one] - towerYpos[two]) / (towerXpos[one] - towerXpos[two])
    ) *
      180) /
    Math.PI; //rotate wall correctly
  if (isNaN(rotation)) {
    rotation = 0;
  }
  htmlWall.style.transform = "rotate(" + rotation + "deg)";
  htmlWall.style.backgroundColor = numberToColor(towerColor[one]);
  theMap.appendChild(htmlWall);
  wallTower1.push(towerID[one]);
  wallTower2.push(towerID[two]); //save in wall Array
}

function buildShading(towerIDs) {
  if (towerIDs == undefined) {
    lookForEnshadedArea(getClosestWall());
    //towerIDs = towerID;
    //createShading(getSelectedTowers());
    return; //!!here!!
  }
  createShading(convertIDtoArray(towerIDs));
}

function lookForEnshadedArea(index) {
  let startingTower = wallTower1[index];
  let finishTower = wallTower2[index];
  document
    .querySelectorAll(".tower")
    [convertIDtoArray(startingTower)].classList.add("highlighted");
  let availableWalls = {
    ids: {
      t1: [],
      t2: [],
    },
    availability: [],
  };
  wallTower1.forEach((id, index) => {
    availableWalls.ids.t1.push(id);
    availableWalls.ids.t2.push(wallTower2[index]);
    availableWalls.availability.push(0); //0 > free/unused
  });
  availableWalls.availability[index] = 1; //1 > used in wall chain
  let possibleWalls = [];
  availableWalls.ids.t1.forEach((t1id, index) => {
    if (t1id === startingTower && availableWalls.availability[index] === 0) {
      possibleWalls.push({ indx: index, set: "t2" });
    } else if (
      availableWalls.ids.t2[index] === startingTower &&
      availableWalls.availability[index] === 0
    ) {
      possibleWalls.push({ indx: index, set: "t1" });
    }
  });
  if (possibleWalls.length < 1) {
    console.log("NO WALLS!!!");
    return;
  }
  console.log("SOME WALLS!!!");
  let offests = [];
  let arrM = convertIDtoArray(startingTower);
  let arrS = convertIDtoArray(finishTower);
  possibleWalls.forEach((index) => {
    let arrT = convertIDtoArray(availableWalls.ids["t1"][index.indx]);
    arrT =
      arrT === arrM
        ? convertIDtoArray(availableWalls.ids["t2"][index.indx])
        : arrT;
    offests.push(
      getOffset(
        towerXpos[arrS],
        towerYpos[arrS],
        towerXpos[arrM],
        towerYpos[arrM],
        towerXpos[arrT],
        towerYpos[arrT]
      )
    );
  });
  let closestTower = {
    distance: Infinity,
    index: Infinity,
  };
  offests.forEach((dist, index) => {
    if (dist < closestTower.distance) {
      closestTower.distance = dist;
      closestTower.index = index;
    }
  });
  /*let finalTower = convertIDtoArray(availableWalls.ids[possibleWalls[closestTower.index].set][possibleWalls[
      closestTower.index
    ].indx]);*/
  availableWalls.availability[possibleWalls[closestTower.index].indx] = 1;
  document
    .querySelectorAll(".tower")
    [
      convertIDtoArray(
        availableWalls.ids[possibleWalls[closestTower.index].set][
          possibleWalls[closestTower.index].indx
        ]
      )
    ].classList.add("highlighted");
}
function getNextTower(availableWalls, startTower, currentTower) {}

function getOffset(X1, Y1, X2, Y2, X3, Y3) {
  let v13 = { x: X3 - X1, y: Y3 - Y1 };
  let d13 = Math.sqrt(Math.pow(X3 - X1, 2) + Math.pow(Y3 - Y1, 2));
  let v23 = { x: X3 - X2, y: Y3 - Y2 };
  let d23 = Math.sqrt(Math.pow(X3 - X2, 2) + Math.pow(Y3 - Y2, 2));
  let c12 = d13 / d23;
  v23 = { x: v23.x * c12, y: v23.y * c12 };
  let o12 = Math.sqrt(Math.pow(v13.x - v23.x, 2) + Math.pow(v13.y - v23.y, 2));
  return o12;
}

function createShading(towerArray) {
  /*let svgShading = document.querySelector('#mapShadingSvg');
	let polygonShading = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');*/
  let coords = "";
  let color = numberToColor(towerColor[towerArray[0]]);
  color = color.replace("rgb", "rgba");
  color = color.replace(")", ", 0.5)");
  console.log("COLOR: " + color);
  towerArray.forEach((c) => {
    coords += towerXpos[c];
    coords += ",";
    coords += towerYpos[c];
    coords += " ";
  });
  coords = coords.trimEnd();
  /*polygonShading.setAttribute('points', coords);
	polygonShading.setAttribute('fill', color);
	polygonShading.setAttribute('stroke', 'black');
	polygonShading.setAttribute('stroke-width', '2');
	svgShading.appendChild(polygonShading);*/
  createPolygon(coords, color);
}
function createPolygon(coords, color) {
  //COORDS MUST BE READY-TO-USE STRING; SAME FOR COLOR
  let svgShading = document.querySelector("#mapShadingSvg");
  let polygonShading = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polygon"
  );
  console.log("COORDS: " + coords);
  polygonShading.setAttribute("points", coords);
  polygonShading.setAttribute("fill", color);
  polygonShading.setAttribute("stroke", "black");
  polygonShading.setAttribute("stroke-width", ".1");
  svgShading.appendChild(polygonShading);
}

function buildDifferentThing(whichThing) {
  switch (whichThing[0]) {
    case "bomb": {
      let coords = {
        x: mousePos.x / 20,
        y: mousePos.y / 20, //pixel to coords
      };
      createDifferentThing(["bomb", whichThing[1]], coords);
      break;
    }
    case "spawn": {
      let coords = {
        x: mousePos.x / 20 - 4.5,
        y: mousePos.y / 20 - 4.5,
      };
      createDifferentThing(["spawn", whichThing[1]], coords);
      //smth
      break;
    }
  }
}

function createDifferentThing(whichThing, coords) {
  switch (whichThing[0]) {
    case "bomb": {
      let whichBomb = whichThing[1];
      bombSpotSprite[whichBomb].style.left = coords.x * 20 - 120;
      bombSpotSprite[whichBomb].style.top = coords.y * 20 - 120; //100 - half size of bomb spot so they´re cenetered around your mouse
      if (bombSpotSprite[whichBomb].classList.contains("hidden"))
        bombSpotSprite[whichBomb].classList.remove("hidden");
      bombSpotsT[whichBomb] = {
        x: coords.x,
        y: coords.y,
      };
      break;
    }
    case "spawn": {
      let whichSpawn = whichThing[1];
      spawnSprite[whichSpawn].style.left = coords.x * 20 - 30;
      spawnSprite[whichSpawn].style.top = coords.y * 20 - 30; //offset spawn so it renders correctly (also weird thing as spawns coords get offset in map file unlike bpmb smh)
      if (spawnSprite[whichSpawn].classList.contains("hidden"))
        spawnSprite[whichSpawn].classList.remove("hidden");
      spawnPointsS[whichSpawn] = {
        x: coords.x,
        y: coords.y,
        rotation: coords.rotation,
      };
      break;
    }
  }
}

function updateWall(wallID, one, two) {
  one = convertIDtoArray(one);
  two = convertIDtoArray(two);
  let wallItself = document.getElementsByClassName("wall");
  wallItself = wallItself[wallID];
  let wallLength = Math.sqrt(
    Math.pow(towerXpos[one] - towerXpos[two], 2) +
      Math.pow(towerYpos[one] - towerYpos[two], 2)
  );
  wallItself.style.width = wallLength; //wallLength
  temp = (towerXpos[one] + towerXpos[two]) / 2; //X pos of mid
  temp2 = (towerYpos[one] + towerYpos[two]) / 2; //Y pos of mid
  temp = temp - wallLength / 2; //X pos of top left
  temp2 = temp2 - 7; //Y pos of top left
  wallItself.style.left = temp;
  wallItself.style.top = temp2;
  let rotation =
    (Math.atan(
      (towerYpos[one] - towerYpos[two]) / (towerXpos[one] - towerXpos[two])
    ) *
      180) /
    Math.PI; //rotate wall correctly
  if (isNaN(rotation)) {
    rotation = 0;
  }
  wallItself.style.transform = "rotate(" + rotation + "deg)";
  wallItself.style.backgroundColor = numberToColor(towerColor[one]);
  //console.log("Wall Updated!!");
  //console.log("Rotation°: " + rotation);
}

function numberToColor(number) {
  if (number == "" || number == undefined) {
    return colors[1];
  }
  //return grey on default
  number = Number(number);
  if (number < 1 || number > 14) {
    number = 14;
  }
  //all colors outside 1 - 13 spectrum will be threated as black
  let color = colors[number];
  return color;
}

function connectTowers(ids) {
  let allTowers = document.querySelectorAll(".tower");
  let towersToConnect = [];
  let someAction = {
    actionType: "cnT",
    tID: [],
  };
  if (ids == undefined) {
    ids = convertArrayToID(getSelectedTowers());
  }
  ids.forEach((c) => {
    towersToConnect.push(c);
    someAction.tID.push(c);
  });
  if (towersToConnect.length < 1) {
    console.log("No towers to connect!!");
    return;
  }
  if (towersToConnect.length >= 20) {
    temp = towersToConnect.length;
    temp = (temp + 1) * (temp / 2) - temp;
    if (
      !confirm(
        "Are you sure you want to execute this action?\nDoing so would place " +
          temp +
          " walls!"
      )
    ) {
      return;
    }
  }
  pastActions.push(someAction);
  temp2 = towersToConnect.length;
  let copyOfTowers = [];
  towersToConnect.forEach((tower) => {
    copyOfTowers.forEach((tower2) => {
      buildWall(tower, tower2);
    });
    copyOfTowers.push(tower);
  });
  /*towersToConnect.forEach((tower, i) => {
  		towersToConnect.slice(i+1).forEach(otherTower => {
    		buildWall(tower, otherTower);
  		});
	});*/ // <-- isra´s version - works just fine as well
}

function shieldTowers() {
  let allTowers = document.getElementsByClassName("tower");
  let someAction = {
    actionType: "sT",
    tID: [],
  };

  let wantedTowers = getSelectedTowers();
  wantedTowers.forEach((someTower) => {
    allTowers[someTower].classList.add("shielded");
    someAction.tID.push(towerID[someTower]);
  });
  pastActions.push(someAction);
  updateTowerInfo(1); // 1 - new tower
  //pastActions.push(someAction);
}

function toggleShielded(ids) {
  allTowers = document.getElementsByClassName("tower");
  ids = convertIDtoArray(ids);
  console.log("TOGGLE");
  console.log(ids);
  let someAction = {
    actionType: "sT",
    tID: [],
  };
  ids.forEach((c) => {
    allTowers[c].classList.toggle("shielded");
    someAction.tID.push(towerID[c]);
  });
  convertIDtoArray;
  pastActions.push(someAction);
}

function selectTower(towerToSelect) {
  let allTowers = document.querySelectorAll(".tower"); //get all towers - first tower is same as first value from towerID (allTowers[x] ^ towerID[x])
  if (towerToSelect == -1 && overallBehavior == "normal") {
    // -1 -> all towers will be selected
    allTowers.forEach((tower) => {
      tower.classList.add("highlighted");
    });
    selectedTower = 0; //not -1 - gonna change to all soon
    updateTowerInfo(1); // 1- new tower
    return;
  } else {
    let thisTower = convertIDtoArray(towerToSelect);
    //if(allTowers[t].classList.contains("highlighted")) return;

    if (overallBehavior == "pathCalc") {
      allTowers[thisTower].classList.add("highlighted");
      startPathCalculation(1); // 1 - next tower
      updateTowerInfo(1); // 1- new tower
      return;
    }

    allTowers[thisTower].classList.toggle("highlighted");
    selectedTower = allTowers[thisTower];
  }

  //destroyTower(t);
  updateTowerInfo(1); // 1- new tower
}

function selectChunk(state) {
  switch (state) {
    case 0: {
      //mouse down
      if (event.button != 1) {
        return;
      }
      //console.log("mouse down!!! - " + event.button);
      chunkSelector = document.getElementById("chunkSelection");
      startX = uncutMouseCoords.x; //event.clientX;  // *2
      startY = uncutMouseCoords.y; //event.clientY;
      chunkSelector.style.left = startX;
      chunkSelector.style.top = startY;
      chunkSelector.style.width = 0;
      chunkSelector.style.height = 0;
      startChunkSelection = 1;
      break;
    }
    case 1: {
      //mouse move
      //console.log("mouse move!!!");
      if (startChunkSelection > 0) {
        //only if mousedown was triggered - not when just occasionally moving mouse xd
        startChunkSelection = 2;
        hideBuildView(0);
        chunkSelector.style.display = "inline";
        currentX = uncutMouseCoords.x; //event.clientX;  // *2
        currentY = uncutMouseCoords.y; //event.clientY;
        if (currentX >= startX) {
          chunkSelector.style.width = currentX - startX - 1;
          chunkSelector.style.left = startX;
        } else {
          chunkSelector.style.width = startX - currentX - 2;
          chunkSelector.style.left = currentX + 2;
        }
        if (currentY >= startY) {
          chunkSelector.style.height = currentY - startY - 1;
          chunkSelector.style.top = startY;
        } else {
          chunkSelector.style.height = startY - currentY - 2;
          chunkSelector.style.top = currentY + 2;
        }
      }
      break;
    }
    case 2: {
      //mouse up
      if (startChunkSelection == 2) {
        hideBuildView(1);
        if (Ctrl == true) {
        } else if (Shift == true) {
          unselect();
          selectTower(-1);
          selectedTower = 0; //not -1
          startChunkSelection = 0; //chunkselection will no longer be triggered uppon releasing mouse
          //console.log("mouse up!!!");
          document.getElementById("chunkSelection").style.display = "none";
          return;
        } else {
          unselect();
        }
        //lockUnselect = true;
        if (currentX < startX) {
          //startX always leftmost X coord
          temp = currentX;
          currentX = startX;
          startX = temp;
          startX--;
        }
        if (currentY < startY) {
          //startY always topmost Y coord
          temp = currentY;
          currentY = startY;
          startY = temp;
          startY--;
        }
        let allTowers = document.querySelectorAll(".tower");

        Array.from(allTowers).forEach((tower, index) => {
          if (towerXpos[index] > startX) {
            if (towerXpos[index] < currentX) {
              if (towerYpos[index] > startY) {
                if (towerYpos[index] < currentY) {
                  //could be done in one expression, decreases calculation time by like 1 ms lol
                  tower.classList.toggle("highlighted");
                  /*console.log("highlighted - tower " + i);
					console.log("<<<<<<<<!!!!!!!!!!!!!!!>>>>>>>>");*/
                }
              }
            }
          }
        });

        updateTowerInfo(1); // 1 - new towers
      }
      selectedTower = 0; //not -1
      startChunkSelection = 0; //chunkselection will no longer e triggered uppon releasing mouse
      //console.log("mouse up!!!");
      document.getElementById("chunkSelection").style.display = "none";
      break;
    }
  }
}

function destroyTower(tID) {
  if (tID === undefined) {
    let thoseTowers = getSelectedTowers();

    deleteTower(thoseTowers);

    selectedTower = -1; //none
    updateTowerInfo(0); // 0 - no tower*/
  } else {
    temp = convertIDtoArray(tID);
    deleteTower(temp);
  }
}

function deleteTower(arrayIDs) {
  arrayIDs.sort(function (a, b) {
    return b - a;
  });
  let someAction = {
    actionType: "dT",
    tID: [],
    x: [],
    y: [],
    color: [],
    wall1: [],
    wall2: [],
  };
  //for(let c=arrayIDs.length-1; c>=0; c--){
  let allTowers = document.getElementsByClassName("tower"); //document.querySelectorAll('.tower');
  let allWalls = document.getElementsByClassName("wall"); //document.querySelectorAll('.wall');
  arrayIDs.forEach((c) => {
    temp = c;
    someAction.tID.push(towerID[temp]);
    someAction.x.push(towerXpos[temp]);
    someAction.y.push(towerYpos[temp]);
    someAction.color.push(towerColor[temp]);

    temp2 = towerID[temp];
    //console.log(allTowers);
    allTowers[temp].remove();
    towerID.splice(temp, 1);
    towerXpos.splice(temp, 1);
    towerYpos.splice(temp, 1);
    towerColor.splice(temp, 1);

    for (c2 = 0; c2 < wallTower1.length; c2++) {
      //!here
      if (wallTower1[c2] == temp2 || wallTower2[c2] == temp2) {
        someAction.wall1.push(wallTower1[c2]);
        someAction.wall2.push(wallTower2[c2]);

        wallTower1.splice(c2, 1);
        wallTower2.splice(c2, 1);
        allWalls[c2].remove();
        c2--;
      }
    }
    /*wallTower1.forEach((wall1, index) => {
			if(wall1 == temp2 || wallTower2[index] == temp2){

			}
		})*/
  });
  pastActions.push(someAction);
}

function deleteWalls(ids) {
  let someAction = {
    actionType: "cnT",
    tID: [],
  };
  /*console.log(ids);//!here
	console.log(wallTower1);
	console.log(wallTower2);*/
  let allWalls = document.querySelectorAll(".wall"); //document.getElementsByClassName('wall');
  let copyIDs = [];
  ids.forEach((id) => {
    someAction.tID.push(id);
    copyIDs.push(id);
  });
  ids.forEach((id) => {
    copyIDs.splice(0, 1);
    copyIDs.forEach((secondID) => {
      let wallDeleted = false;
      wallTower1.forEach((towerOneID, index) => {
        if (
          ((towerOneID == id && wallTower2[index] == secondID) ||
            (towerOneID == secondID && wallTower2[index] == id)) &&
          !wallDeleted
        ) {
          wallTower1.splice(index, 1);
          wallTower2.splice(index, 1);
          allWalls[index].remove();
          wallDeleted = true;
        }
      });
    });
  });
  pastActions.push(someAction);
}

function convertIDtoArray(IDtoConvert) {
  let type = typeof IDtoConvert;
  if (type === "string") {
    IDtoConvert = Number(IDtoConvert);
    type = typeof IDtoConvert;
  }
  switch (type) {
    case "object": {
      let arrayIDs = [];
      IDtoConvert.forEach((id) => {
        let thisArray = 0;
        /*for(let c2=0; c2<towerID.length; c2++){
					if(id == towerID[c2]){
						arrayIDs.push(c2);
						break;
					}
				}*/
        towerID.forEach((tower, index) => {
          if (tower == id) {
            thisArray = index;
          }
        });
        arrayIDs.push(thisArray);
      });
      return arrayIDs;
    }
    case "number": {
      let wantedID = 0;
      towerID.forEach((id, index) => {
        if (id == IDtoConvert) {
          wantedID = index;
        }
      });
      return wantedID;
    }
    default: {
      someErrorHere();
      console.log("Type: " + type); // + "  - Coming from: " + comingFrom);
      return 0;
    }
  }
}

function convertArrayToID(ArrayToConvert) {
  let ID = [];
  ArrayToConvert.forEach((array) => {
    ID.push(towerID[array]);
  });
  return ID;
}

function unselect() {
  //console.log("UNSELECT TRIGGERED");
  /*if(lockUnselect == true){
	  lockUnselect = false;
	  return;
	}*/
  selectedTower = -1;
  let towers = document.getElementsByClassName("highlighted");
  Array.from(towers).forEach((thisTower) => {
    thisTower.classList.remove("highlighted");
  });
  updateTowerInfo(0); // 0 - no tower
}

function handleSelectTower(b2) {
  towerHasBeenSelectedNew = true;
  if (overallBehavior == "pathCalc") {
    unselect();
    selectTower(b2);
  } else if (Ctrl === true) {
    selectTower(b2); //if ctrl pressed - add tower to selection
  } else if (Shift === true) {
    unselect();
    selectTower(-1); //if shift pressed - select all towers
  } else {
    unselect();
    selectTower(b2); //if neither are pressed - select only clicked tower
  }
}

function checkUnselect() {
  if (event.button != 0) {
    return;
  }
  towerHasBeenSelectedNew = false;
  setTimeout(function () {
    if (!towerHasBeenSelectedNew) {
      unselect();
      return;
    } else {
      return;
    }
  }, 50);
}

function generateMapFile(oMFType) {
  let text = "";
  let mapFileType = oMFType
    ? oMFType
    : document.getElementById("mapFileFormatSelection").value;
  if (mapFileType === "astrollyFormat") {
    //astrolly map format
    // following part is for astrolly map file

    let mapName = document.querySelector("#mapName").value ?? "Map Name";
    let authorName = document.getElementById("mapAuthorName").value ?? "Author";
    text =
      '{"name":"' +
      mapName +
      '","author":"' +
      authorName +
      '","width":' +
      mapWidth * 20 +
      ',"height":' +
      mapHeight * 20 +
      ',"nodes":{';
    /*for(let c = 0; c < towerID.length; c++){  //get towers
	    text += '"' + towerID[c] + '":{"nodeId":"' + towerID[c] + '","x":' + towerXpos[c] + ',"y":' + towerYpos[c] + '}';
	    if((c+1) < towerID.length){text += ',';}
	  }*/
    towerID.forEach((id, index) => {
      text +=
        '"' +
        id +
        '":{"nodeId":"' +
        id +
        '","x":' +
        towerXpos[index] +
        ',"y":' +
        towerYpos[index] +
        "}";
      if (index + 1 < towerID.length) {
        text += ",";
      }
    });
    text += '},"edges":[';

    /*for(let u = 0; u < wallTower1.length; u++){
	    text += '{"fromNodeId":"' + wallTower1[u] + '","toNodeId":"' + wallTower2[u] + '"}';
	    if((u+1) < wallTower1.length){text += ',';}
	  }*/
    wallTower1.forEach((wall1, index) => {
      text +=
        '{"fromNodeId":"' + wall1 + '","toNodeId":"' + wallTower2[index] + '"}';
      if (index + 1 < wallTower1.length) {
        text += ",";
      }
    });
    text += '],"regions":[[]]'; //],"regions":[[{"x":349,"y":699}
    //console.log("text file - " + text);
    // shaded areas here

    text +=
      ',"towerRadius":14,"wallWidth":14,"bombRadius":200,"spots":[{"position":{"x":200,"y":900},"label":"1","id":"a"},{"position":{"x":1799,"y":900},"label":"2","id":"b"}],"spawns":{"attack":{"position":{"x":899,"y":1650},"direction":90},"defense":{"position":{"x":900,"y":0},"direction":90}}}';
    // rest stuff above
    //console.log("text file - " + text);

    return text;
  } else if (mapFileType === "deflyFormat") {
    //defly map format
    if (isNaN(mapWidth) || mapWidth == undefined || mapWidth == "") {
      mapWidth = 210;
    }
    if (isNaN(mapHeight) || mapHeight == undefined || mapHeight == "") {
      mapHeight = 120;
    }
    text += "MAP_WIDTH " + mapWidth + "\n";
    text += "MAP_HEIGHT " + mapHeight + "\n";
    if (!isNaN(kothBounds[0])) {
      text +=
        "KOTH " +
        kothBounds[0] +
        " " +
        kothBounds[1] +
        " " +
        kothBounds[2] +
        " " +
        kothBounds[3] +
        "\n";
    }

    bombSpotsT.forEach((bombCoords, index) => {
      text += "t " + index + " " + bombCoords.x + " " + bombCoords.y + "\n";
    });
    spawnPointsS.forEach((spawn, index) => {
      text += "s " + (index + 1) + " " + spawn.x + " " + spawn.y;
      if (!isNaN(spawn.rotation)) text += " " + spawn.rotation;
      text += "\n";
    });

    let cleanStuff = cleanMapInformation();

    cleanStuff.towerIDs.forEach((id, index) => {
      text +=
        "d " +
        id +
        " " +
        cleanStuff.towerX[index] +
        " " +
        cleanStuff.towerY[index];
      if (cleanStuff.towerCol[index] != 1) {
        text += " " + cleanStuff.towerCol[index] + "\n";
      } else {
        text += "\n";
      }
    });

    /*towerID.forEach((ID, c) => {
      text += "d " + ID + " " + towerXpos[c] / 20 + " " + towerYpos[c] / 20;
      if (towerColor[c] != 1) {
        text += " " + towerColor[c] + "\n";
      } else {
        text += "\n";
      }
    });*/

    cleanStuff.wallT1IDs.forEach((id1, index) => {
      text += "l " + id1 + " " + cleanStuff.wallT2IDs[index] + "\n";
    });

    /*wallTower1.forEach((nothing, c) => {
      text += "l " + wallTower1[c] + " " + wallTower2[c] + "\n";
    });*/

    cleanStuff.shadingIDs.forEach((area) => {
      text += "z ";
      area.forEach((point) => {
        text += point + " ";
      });
      text = text.trimEnd();
      text += "\n";
    });

    /*shadedAreas.forEach((area) => {
      text += "z ";
      area.forEach((point) => {
        text += point + " ";
      });
      text = text.trimEnd();
      text += "\n";
    });*/

    let allTowers = document.querySelectorAll(".tower");
    Array.from(allTowers).forEach((tower, c) => {
      if (tower.classList.contains("shielded")) {
        text += "\n";
        text += "l " + cleanStuff.towerIDs[c] + " " + cleanStuff.towerIDs[c];
        text += "\n";
        text += "z " + cleanStuff.towerIDs[c] + " " + cleanStuff.towerIDs[c];
      }
    });

    return text;
  } else if (mapFileType === "compactFormat") {
    //!here
    notWorkingYet();

    let cleanIds = cleanMapInformation();

    if (isNaN(mapWidth) || mapWidth === undefined) text += "210,";
    else text += mapWidth + ",";
    if (isNaN(mapHeight) || mapHeight === undefined) text += "120|";
    else text += mapHeight + "|";

    if (!isNaN(kothBounds[0])) {
      text +=
        kothBounds[0] +
        "," +
        kothBounds[1] +
        "," +
        kothBounds[2] +
        "," +
        kothBounds[3] +
        "|";
    } else {
      text += "|";
    }

    bombSpotsT.forEach((bombCoords, index) => {
      text += bombCoords.x + "," + bombCoords.y + ",";
      if (index == bombSpotsT.length - 1) text = text.replace(/.$/, "");
    });
    text += "|";
    spawnPointsS.forEach((spawn, index) => {
      text += spawn.x + "," + spawn.y + ",";
      if (!isNaN(spawn.rotation)) text += spawn.rotation;
      text += ",";
      if (index == spawnPointsS.length - 1) text = text.replace(/.$/, "");
    });
    text += "|";

    cleanIds.towerIDs.forEach((ID, index) => {
      text += cleanIds.towerX[index] + "," + cleanIds.towerY[index] + ",";
      if (cleanIds.towerCol[index] != 1) text += cleanIds.towerCol[index];
      cleanIds.wallT1IDs.forEach((wID, wIndex) => {
        if (ID === wID) text += "," + cleanIds.wallT2IDs[wIndex];
      });
      text += ";";
    });
    text = text.replace(/.$/, "");
    text += "|";

    cleanIds.shadingIDs.forEach((area, index) => {
      area.forEach((aID, aIndex) => {
        text += aID + ",";
      });
      text = text.replace(/.$/, ";");
    });
    text = text.replace(/.$/, "");

    return text;
  } else {
    someErrorHere();
    return "-";
  }
}

function CopyFile() {
  // Get the text content of the element

  // Create a temporary element for copying
  let templ = document.createElement("textarea");
  templ.value = generateMapFile();
  if (templ.value === "-") {
    document.body.removeChild(templ);
    return;
  }
  document.body.appendChild(templ);

  // Select the text and copy it to the clipboard
  templ.select();
  document.execCommand("copy");

  // Remove the temporary element
  document.body.removeChild(templ);
} //=== thx to Alex for providing that code  xd  ===

function downloadMapFile() {
  let mapName = document.getElementById("mapName").value ?? "Map";
  let textContent = generateMapFile();
  if (textContent === "-") return;
  let filename = mapName + "-deflyMap.txt";
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(textContent)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

async function saveMapFile() {
  let mapName = document.getElementById("mapName").value ?? "Map";
  let existingMaps = JSON.parse(localStorage.getItem("saved-map-list"));
  if (existingMaps.includes(mapName)) {
    //if that map already exists
    let userDecision = await confirmAction(
      "A Map with this name already exists - overwrite old save?",
      "Overwrite"
    );
    console.log(userDecision);
    if (userDecision) {
      localStorage.setItem(`map: ${mapName}`, generateMapFile("deflyFormat"));
    }
  } else {
    localStorage.setItem(`map: ${mapName}`, generateMapFile("deflyFormat"));
    let newMapList = JSON.parse(localStorage.getItem("saved-map-list"));
    newMapList.push(mapName);
    localStorage.setItem("saved-map-list", JSON.stringify(newMapList));
  }
}

function loadMapFile(loadedFile, oMFType) {
  let loadingType = document.querySelector("#load-as-map-vary").value;
  let fileType = oMFType
    ? oMFType
    : document.querySelector("#load-as-file-type").value;
  let startingTowerID = 0;
  if (loadingType === "new-map" && fileType === "deflyFormat") {
    //so it won´t delete map if 'new map' + 'not-defly-format' yet
    deleteExistingMap();
  } else {
    startingTowerID = towerID?.at(-1) ?? -1;
    startingTowerID++;
  }
  switch (fileType) {
    case "deflyFormat": {
      loadedFile = loadedFile.split(/\s+/);
      console.log(loadedFile);
      for (let n = 0; n < loadedFile.length; n++) {
        switch (loadedFile[n]) {
          case "MAP_WIDTH":
            if (startingTowerID == 0) {
              //if new map
              mapWidth = Number(loadedFile[n + 1]);
              if (!(mapWidth > 0)) {
                mapWidth = 210;
                break;
              }
            } else {
              //if on top - use higher value
              let thisMapsWidth = Number(loadedFile[n + 1]);
              if (mapWidth < thisMapsWidth) {
                mapWidth = thisMapsWidth;
              }
            }
            break;
          case "MAP_HEIGHT":
            if (startingTowerID == 0) {
              //if new map
              mapHeight = Number(loadedFile[n + 1]);
              if (!(mapHeight > 0)) {
                mapHeight = 120;
                break; //works because map has been resized correctly upon clearing
              }
            } else {
              //if on top
              let thisMapsHeight = Number(loadedFile[n + 1]);
              if (mapHeight < thisMapsHeight) {
                mapHeight = thisMapsHeight;
              }
            }
            break;
          case "KOTH":
            console.log(
              "KOTH: " +
                loadedFile[n + 0] +
                loadedFile[n + 1] +
                loadedFile[n + 2] +
                loadedFile[n + 3] +
                loadedFile[n + 4]
            );
            for (let i = 0; i < 4; i++) {
              //!here
              kothBounds[i] = loadedFile[n + i + 1];
            }
            break;
          case "t": //bomb spots
            //bombSpotsT.push({x : loadedFile[n+2], y : loadedFile[n+3]});
            createDifferentThing(["bomb", loadedFile[n + 1]], {
              x: loadedFile[n + 2],
              y: loadedFile[n + 3],
            });
            break;
          case "s": //spawns
            createDifferentThing(["spawn", loadedFile[n + 1] - 1], {
              x: loadedFile[n + 2],
              y: loadedFile[n + 3],
              rotation: loadedFile[n + 4],
            });
            break;
          case "d": //tower (dot)
            let thisTowersColor = loadedFile[n + 4];
            if (isNaN(thisTowersColor)) thisTowersColor = 1;
            createTower(
              loadedFile[n + 2] * 20 + randomNumber(-10, 10) * 0, //wonky map loading
              loadedFile[n + 3] * 20 + randomNumber(-10, 10) * 0,
              Number(loadedFile[n + 1]) + startingTowerID,
              thisTowersColor
            );
            if (Number(loadedFile[n + 1]) + startingTowerID >= i) {
              i = Number(loadedFile[n + 1]) + startingTowerID + 1;
            }
            break;
          case "l": //wall (line)
            buildWall(
              Number(loadedFile[n + 1]) + startingTowerID,
              Number(loadedFile[n + 2]) + startingTowerID
            );
            break;
          case "z": //shaded area (zone)
            let thisShadingsID = [];
            for (let r = 1; r < loadedFile.length; r++) {
              //!here
              if (isNaN(loadedFile[n + r]) || !(loadedFile[n + r] > 0)) {
                r = loadedFile.length;
                continue;
              }
              //temp += " " + (Number(loadedFile[n+r])+startingTowerID);
              thisShadingsID.push(Number(loadedFile[n + r]) + startingTowerID);
            }
            //temp = temp.trimEnd();
            //shadedAreas.push("z" + temp);
            shadedAreas.push(thisShadingsID);
            buildShading(thisShadingsID);
            //console.log("maybe here? - " + temp);
            break;
          case "!!!END!!!":
            //ends map loading
            return;
          default:
            //console.log('other: ' + loadedFile[n]);
            continue;
        }
      }
      break;
    }
    case "astrollyFormat": {
      //here
      let mapData = JSON.parse(loadedFile);
      console.log(mapData);
      document.querySelector("#mapAuthorName").value =
        mapData?.author ?? document.querySelector("#mapAuthorName").value;
      document.querySelector("#mapName").value =
        mapData?.name ?? document.querySelector("#mapName").value;
      if (startingTowerID == 0) {
        mapWidth = mapData.width / 20;
        mapHeight = mapData.height / 20;
      } else {
        mapWidth =
          mapWidth > mapData.width / 20 ? mapWidth : mapData.width / 20;
        mapHeight =
          mapHeight > mapData.height / 20 ? mapHeight : mapData.height / 20;
      }
      mapData.spots.forEach((bomb) => {
        createDifferentThing(["bomb", bomb.label - 1], {
          x: bomb.position.x / 20,
          y: bomb.position.y / 20,
        });
      });
      if (!!mapData?.spawns?.attack?.position?.x) {
        createDifferentThing(["spawn", 1], {
          x: mapData.spawns.attack.position.x,
          y: mapData.spawns.attack.position.y,
          rotation: mapData.spawns.attack.direction / 90,
        });
        createDifferentThing(["spawn", 0], {
          x: mapData.spawns.defense.position.x,
          y: mapData.spawns.defense.position.y,
          rotation: mapData.spawns.defense.direction / 90,
        });
      }
      let towers = Object.entries(mapData.nodes);
      towers.forEach((tower) => {
        createTower(
          tower[1].x + randomNumber(-10, 10) * 0, //wonky map loading
          tower[1].y + randomNumber(-10, 10) * 0,
          Number(tower[1].nodeId) + startingTowerID,
          1
        );
        if (Number(tower[1].nodeId) + startingTowerID >= i) {
          i = Number(tower[1].nodeId) + startingTowerID + 1;
        }
      });
      let walls = Object.entries(mapData.edges);
      console.log(walls);
      walls.forEach((wall) => {
        console.log(
          `From: ${Number(wall[1].fromNodeId)} to: ${Number(
            wall[1].toNodeId
          )}, while base = ${startingTowerID}`
        );
        buildWall(
          Number(wall[1].fromNodeId) + startingTowerID,
          Number(wall[1].toNodeId) + startingTowerID
        );
      });
      break;
    }
    case "compactFormat": {
      startingTowerID++;
      let mapData = loadedFile.split("|");

      //map size
      let newMapSize = mapData[0].split(",");
      mapWidth = Number(newMapSize[0]) > 0 ? Number(newMapSize[0]) : mapWidth;
      mapHeight = Number(newMapSize[1]) > 0 ? Number(newMapSize[1]) : mapHeight;

      //koth bounds
      kothBounds = mapData[1].split(",").length < 4 ? [] : mapData[1].split(",");

      //defuse bombs
      let bombData = mapData[2].split(",");
      for (let c = 0; bombData.length > c; c += 2) {
        createDifferentThing(["bomb", c / 2], {
          x: bombData[0 + c],
          y: bombData[1 + c],
        });
      }

      //defuse spawns
      let spawnData = mapData[3].split(",");
      for (let c = 0; spawnData.length > c; c += 3) {
        createDifferentThing(["spawn", c / 3], {
          x: spawnData[0 + c],
          y: spawnData[1 + c],
          rotation: spawnData[2 + c],
        });
      }

      //towers (and walls monitored)
      let walls = [];
      let towerData = mapData[4].split(";");
      towerData.forEach((rawTower, index) => {
        let tower = rawTower.split(",");
        let tColor = tower[2] === "" ? 1 : tower[2];
        createTower(tower[0] * 20, tower[1] * 20, index + startingTowerID, tColor);
        if (index + startingTowerID >= i) {
          i = index + startingTowerID + 1;
        }
        for (let c = 3; c < tower.length; c++) {
          walls.push([index + startingTowerID, Number(tower[c]) + startingTowerID - 1]);
        }
      });
      //walls
      walls.forEach((wall) => {
        buildWall(wall[0], wall[1]);
      });

      //shading
      let shadingData = mapData[5].split(";");
      shadingData.forEach((rawShading) => {
        let shading = rawShading.split(",");
        let ids = [];
        shading.forEach((tId) => {
          ids.push(Number(tId) + startingTowerID - 1);
        });
        shadedAreas.push(ids);
        buildShading(ids);
      });

      break;
    }
  }

  updateMapSize();
  //console.log(loadedFile[loadedFile.length-2]);
}

function loadFileFromLocal(mapName){
  document.querySelector("#map-file-text").value = localStorage.getItem(`map: ${mapName}`);
  document.querySelector("#mapName").value = mapName;
}

function cleanMapInformation() {
  let copyOfIDs = {
    towerIDs: [],
    towerX: [],
    towerY: [],
    towerCol: [],
    order: [],
    wallT1IDs: [],
    wallT2IDs: [],
    shadingIDs: [],
  };
  towerID.forEach((id, index) => {
    copyOfIDs.towerIDs.push(id);
    copyOfIDs.order.push(index);
    if (countDecimalPlaces(towerXpos[index] / 20) > 4)
      copyOfIDs.towerX.push((towerXpos[index] / 20).toFixed(4));
    else copyOfIDs.towerX.push(towerXpos[index] / 20);
    if (countDecimalPlaces(towerYpos[index] / 20) > 4)
      copyOfIDs.towerY.push((towerYpos[index] / 20).toFixed(4));
    else copyOfIDs.towerY.push(towerYpos[index] / 20);
    copyOfIDs.towerCol.push(towerColor[index]);
  });
  wallTower1.forEach((id, index) => {
    copyOfIDs.wallT1IDs.push(id);
    copyOfIDs.wallT2IDs.push(wallTower2[index]);
  });
  shadedAreas.forEach((area) => {
    let thisArea = [];
    area.forEach((id) => {
      thisArea.push(id);
    });
    copyOfIDs.shadingIDs.push(thisArea);
  });
  copyOfIDs.towerIDs.sort(function (a, b) {
    return a - b;
  });
  copyOfIDs.towerIDs.forEach((id, index) => {
    towerID.forEach((tID, tIndex) => {
      if (id === tID) copyOfIDs.order[index] = tIndex;
    });
  });
  copyOfIDs.towerIDs.forEach((id, index) => {
    let orderNumber = index + 1;
    copyOfIDs.towerIDs.forEach((tId, tIndex) => {
      if (tId === id) copyOfIDs.towerIDs[tIndex] = orderNumber;
    });
    copyOfIDs.wallT1IDs.forEach((wId, wIndex) => {
      if (wId === id) copyOfIDs.wallT1IDs[wIndex] = orderNumber;
    });
    copyOfIDs.wallT2IDs.forEach((wId, wIndex) => {
      if (wId === id) copyOfIDs.wallT2IDs[wIndex] = orderNumber;
    });
    copyOfIDs.shadingIDs.forEach((area, aOindex) => {
      area.forEach((aId, aIindex) => {
        if (aId === id) copyOfIDs.shadingIDs[aOindex][aIindex] = orderNumber;
      });
    });
  });
  let secondCopy = [];
  copyOfIDs.order.forEach((order) => {
    secondCopy.push(copyOfIDs.towerIDs[order]);
  });
  copyOfIDs.towerIDs = secondCopy;
  return copyOfIDs;
}

function countDecimalPlaces(number) {
  if (Math.floor(number) !== number) {
    return number.toString().split(".")[1].length;
  }
  return 0;
}

function deleteExistingMap() {
  //!here
  temp = towerID.length;
  let towers = document.getElementsByClassName("tower");
  let walls = document.getElementsByClassName("wall");
  for (t = 0; t < temp; t++) {
    towerID.splice(0, 1);
    towerXpos.splice(0, 1);
    towerYpos.splice(0, 1);
    towerColor.splice(0, 1);
    towers[0].remove();
  }
  temp = wallTower1.length;
  for (f = 0; f < temp; f++) {
    wallTower1.splice(0, 1);
    wallTower2.splice(0, 1);
    walls[0].remove();
  }
  let shading = document.querySelector("svg");
  shading.innerHTML = "";
  shadedAreas = [];
  i = 1;

  spawnPointsS = [];
  bombSpotsT = [];
  Array.from(spawnSprite).forEach((sprite) => {
    sprite.classList.add("hidden");
  });
  Array.from(bombSpotSprite).forEach((sprite) => {
    sprite.classList.add("hidden");
  });

  kothBounds = [];

  updateTowerInfo(0); // 1 - no tower

  mapWidth = 210;
  mapHeight = 120;
  updateMapSize();

  pastActions = [];
  undoneActions = [];
}

function getFile(input) {
  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function () {
    console.log(reader.result);
    loadedFile = reader.result;
    document.querySelector("#map-file-text").value = loadedFile;
  };

  reader.onerror = function () {
    console.log(reader.error);
    return;
  };
}

function showHelpPage(page) {
  document.getElementById("helpPage" + currentPage).style.display = "none";
  switch (page) {
    case 1: //next page
      currentPage = currentPage % 3;
      currentPage++;
      break;

    case -1: //previous page
      currentPage--;
      if (currentPage === 0) {
        currentPage = 3;
      }
      break;
  }
  document.getElementById("helpPage" + currentPage).style.display = "inline";
  document.getElementById("pageCount").innerHTML = currentPage + "/3";
}

function showMapOverview() {
  updateMapOverview();
  document.querySelector("#map-file-text").value = generateMapFile(document.querySelector('#load-as-file-type').value);
  document.querySelector("#map-file-options").style.display = "inline";
  openMenu = true;
}

function updateMapOverview() {
  let tableData = document
    .querySelector("#map-file-options-content")
    .querySelectorAll("td");
  tableData[0].innerText = `${mapWidth} x ${mapHeight}`;
  tableData[1].innerText = `${towerID.length}`;
  tableData[2].innerText = `${wallTower1.length}`;
  tableData[3].innerText = `${spawnPointsS.length ?? "-"}`;
  tableData[4].innerText = `${bombSpotsT.length ?? "-"}`;
  tableData[5].innerText = kothBounds[0]
    ? `${kothBounds[0]}, ${kothBounds[1]}\n${kothBounds[2]}, ${kothBounds[3]}`
    : "-";
  let space = playableSpace();
  tableData[6].innerText = `${space.totallSpace} units² (${space.percentage}%)`;
  let dropdown = document.querySelector('#selectLocalFileToLoad');
  let mapList = JSON.parse(localStorage.getItem('saved-map-list'));
  let dropdownOption = '';
  mapList.forEach(mapName => {
    dropdownOption += `<option value="${mapName}">${mapName}</option>`
  });
  dropdown.innerHTML = dropdownOption;
}

function updateMouseCoords() {
  realMousePos.x = event.clientX;
  realMousePos.y = event.clientY;
}

function updateMapSize() {
  theMap.style.width = mapWidth * 20;
  theMap.style.height = mapHeight * 20;
  let svg = document.querySelector("#mapShadingSvg");
  svg.setAttribute("width", mapWidth * 20);
  svg.setAttribute("height", mapHeight * 20);
  document.querySelector("#inputMapWidth").value = mapWidth;
  document.querySelector("#inputMapHeight").value = mapHeight;
}

function moveBuildView() {
  mousePos = transformClientToMapCoords(realMousePos);
  uncutMouseCoords.x = mousePos.x;
  uncutMouseCoords.y = mousePos.y;
  if (G_snapToGrid) {
    if (mousePos.x % snapRadius > snapRadius / 2) {
      mousePos.x += snapRadius - (mousePos.x % snapRadius);
    } else {
      mousePos.x -= mousePos.x % snapRadius;
    }
    if (mousePos.y % snapRadius > snapRadius / 2) {
      mousePos.y += snapRadius - (mousePos.y % snapRadius);
    } else {
      mousePos.y -= mousePos.y % snapRadius;
    }
  }
  if (mousePos.x < 0) {
    mousePos.x = 0;
  }
  if (mousePos.x > mapWidth * 20) {
    mousePos.x = mapWidth * 20;
  }
  if (mousePos.y < 0) {
    mousePos.y = 0;
  }
  if (mousePos.y > mapHeight * 20) {
    mousePos.y = mapHeight * 20;
  }
  buildViewMover.style.left = mousePos.x - 11;
  buildViewMover.style.top = mousePos.y - 11;
  softlockViewMover.style.left = mousePos.x - 300;
  softlockViewMover.style.top = mousePos.y - 300;
  document.getElementById("coords-info-x").innerHTML = (
    mousePos.x / 20
  ).toFixed(2);
  document.getElementById("coords-info-y").innerHTML = (
    mousePos.y / 20
  ).toFixed(2);
  selectChunk(1);
}

function transformClientToMapCoords(originalCoords) {
  let mapOffsetX = theMap.style.left.replace("px", "");
  let mapOffsetY = theMap.style.top.replace("px", "");
  let newCoords = {
    x: originalCoords.x / mapZoom - mapOffsetX,
    y: originalCoords.y / mapZoom - mapOffsetY,
  };
  return newCoords;
}

function changeSnapRange(newSnapRange) {
  //let newSnapRange = prompt("Enter new snap range: ", snapRadius);
  if (!newSnapRange) {
    return;
  } else {
    if (isNaN(newSnapRange)) {
      //NaN = Not a Number
      alert("Input is not a number!!");
    } else {
      snapRadius = Number(newSnapRange) * 20;
    }
  }
}

function hideBuildView(OnOff) {
  if (OnOff == 0) {
    buildViewMover.style.display = "none";
  } else {
    buildViewMover.style.display = "inline";
  }
}

/*function moveTowers(movingState){  // -- nothing --
    switch(movingState){
	  case 1:{  //mouse down
        let allTowers = document.getElementsByClassName('tower');
	    let selectedTowers = '';
		let startingMouseXcoords = event.clie ntX;
		let startingMouseYcoords = event.clie ntY;
	    for(let e=0; e<temp.length; e++){
	      if(temp[e].classList.contains('highlighted')){
	        temp2.push(e);
	      }
	    }
	    break;
	  }
	  case 2:{  //mouse move
	    
		break;
	  }
	  case 3:{  //mouse up
	    
		break;
	  }
    }
}*/
function shiftTowers(direction, towerIDs, distance, centre) {
  let allTowers = document.getElementsByClassName("tower");
  let selectedTowers = [];
  let someAction = {
    actionType: "mT",
    tID: [],
    direction: "",
    distance: 0,
    centre: centre,
  };
  if (towerIDs == undefined) {
    Array.from(allTowers).forEach((tower, index) => {
      if (tower.classList.contains("highlighted")) {
        selectedTowers.push(index);
        someAction.tID.push(towerID[index]);
      } //stores array ID
    });
  } else {
    someAction.tID = towerIDs;
    selectedTowers = convertIDtoArray(towerIDs);
  }
  if (distance == undefined) {
    distance = snapRadius / 2;
  }
  someAction.distance = distance;
  let rotationAngle = 45;
  if (direction === "rotate") {
    rotationAngle = distance;
    R_Rotate = false;
    someAction.distance = rotationAngle;
  }
  if (R_Rotate) {
    rotationAngle = prompt("enter angle");
    direction = "rotate";
    R_Rotate = false;
    if (direction == "l") {
      rotationAngle = -rotationAngle;
    }
    someAction.distance = rotationAngle;
  }
  if (direction === "m") {
    M_Mirrow = false;
  }
  if (M_Mirrow) {
    distance = direction;
    direction = 'm';
    M_Mirrow = false;
    someAction.distance = distance;
    someAction.direction = 'm';
  }
  switch (direction) {
    case "u": {
      //y-
      someAction.direction = "u";
      selectedTowers.forEach((thisTower) => {
        allTowers[thisTower].style.top =
          allTowers[thisTower].style.top.replace("px", "") - distance;
        towerYpos[thisTower] -= distance;
      });
      break;
    }
    case "d": {
      //y+
      someAction.direction = "d";
      selectedTowers.forEach((thisTower) => {
        allTowers[thisTower].style.top =
          allTowers[thisTower].style.top.replace("px", "") - -distance;
        towerYpos[thisTower] -= -distance;
      });
      break;
    }
    case "l": {
      //x-
      someAction.direction = "l";
      selectedTowers.forEach((thisTower) => {
        allTowers[thisTower].style.left =
          allTowers[thisTower].style.left.replace("px", "") - distance;
        towerXpos[thisTower] -= distance;
      });
      break;
    }
    case "r": {
      //x+
      someAction.direction = "r";
      selectedTowers.forEach((thisTower) => {
        allTowers[thisTower].style.left =
          allTowers[thisTower].style.left.replace("px", "") - -distance;
        towerXpos[thisTower] -= -distance;
      });
      break;
    }
    case "rotate": {
      // <==error HERE  mid of towers will change when rotating - next rotating will be different cenetered then first rotation, hence it will "move"
      someAction.direction = "rotate";
      let mid;
      if (centre == undefined) {
        mid = getMidOfTowers(selectedTowers);
      } else {
        mid = centre;
      }
      someAction.centre = mid;

      selectedTowers.forEach((thisTower) => {
        let radians = (rotationAngle * Math.PI) / 180;
        let cos = Math.cos(radians);
        let sin = Math.sin(radians);
        let x = towerXpos[thisTower] - mid.x;
        let y = towerYpos[thisTower] - mid.y;
        let newX = x * cos - y * sin + mid.x;
        let newY = x * sin + y * cos + mid.y;
        allTowers[thisTower].style.left = newX - 12;
        allTowers[thisTower].style.top = newY - 12;
        towerXpos[thisTower] = newX;
        towerYpos[thisTower] = newY;
      });
      break;
    }
    case 'm':{
      let mumberTotalTowers = towerID.length;
      let register = {};
      selectedTowers.forEach((ar, index) => {
        register[ar] = index + mumberTotalTowers;
      })
      let wallsToClone = [];
      wallTower1.forEach((towerID, index) => {
        if(selectedTowers.includes(convertIDtoArray(towerID))){
          if(selectedTowers.includes(convertIDtoArray(wallTower2[index]))){
            wallsToClone.push([register[convertIDtoArray(towerID)], register[convertIDtoArray(wallTower2[index])]]);
          }
        }
      })
      switch(distance){
        case 'u':{
          let yCoordsMirrorLine = Infinity;
          selectedTowers.forEach(towerAr => {
            yCoordsMirrorLine = yCoordsMirrorLine > towerYpos[towerAr] ? towerYpos[towerAr] : yCoordsMirrorLine;
          });
          selectedTowers.forEach(towerAr => {
            let newYcoord = towerYpos[towerAr] + 2*(yCoordsMirrorLine - towerYpos[towerAr]);
            createTower(towerXpos[towerAr], newYcoord, i, towerColor[towerAr]);
          })
          /*createTower(0, yCoordsMirrorLine, i, 3);
          createTower(10000, yCoordsMirrorLine, i, 3);
          createWall(towerID.length - 2, towerID.length - 1);*///checking for correct mirroring
          break;
        }
        case 'd':{
          let yCoordsMirrorLine = -Infinity;
          selectedTowers.forEach(towerAr => {
            yCoordsMirrorLine = yCoordsMirrorLine < towerYpos[towerAr] ? towerYpos[towerAr] : yCoordsMirrorLine;
          });
          selectedTowers.forEach(towerAr => {
            let newYcoord = towerYpos[towerAr] + 2*(yCoordsMirrorLine - towerYpos[towerAr]);
            createTower(towerXpos[towerAr], newYcoord, i, towerColor[towerAr]);
          })
          /*createTower(0, yCoordsMirrorLine, i, 3);
          createTower(10000, yCoordsMirrorLine, i, 3);
          createWall(towerID.length - 2, towerID.length - 1);*/
          break;
        }
        case 'l':{
          let xCoordsMirrorLine = Infinity;
          selectedTowers.forEach(towerAr => {
            xCoordsMirrorLine = xCoordsMirrorLine > towerXpos[towerAr] ? towerXpos[towerAr] : xCoordsMirrorLine;
          });
          selectedTowers.forEach(towerAr => {
            let newXcoord = towerXpos[towerAr] + 2*(xCoordsMirrorLine - towerXpos[towerAr]);
            createTower(newXcoord, towerYpos[towerAr], i, towerColor[towerAr]);
          })
          /*createTower(xCoordsMirrorLine, 0, i, 3);
          createTower(xCoordsMirrorLine, 10000, i, 3);
          createWall(towerID.length - 2, towerID.length - 1);*/
          break;
        }
        case 'r':{
          let xCoordsMirrorLine = -Infinity;
          selectedTowers.forEach(towerAr => {
            xCoordsMirrorLine = xCoordsMirrorLine < towerXpos[towerAr] ? towerXpos[towerAr] : xCoordsMirrorLine;
          });
          selectedTowers.forEach(towerAr => {
            let newXcoord = towerXpos[towerAr] + 2*(xCoordsMirrorLine - towerXpos[towerAr]);
            createTower(newXcoord, towerYpos[towerAr], i, towerColor[towerAr]);
          })
          /*createTower(xCoordsMirrorLine, 0, i, 3);
          createTower(xCoordsMirrorLine, 10000, i, 3);
          createWall(towerID.length - 2, towerID.length - 1);*/
          break;
        }
      }
      wallsToClone.forEach(outerTowers => {
        createWall(outerTowers[0], outerTowers[1]);
      })
      break;
    }
    default: {
      console.log("ERROR SMH -  " + direction);
      break;
    }
  }

  let noticedWalls = [];
  wallTower1.forEach((e) => {
    noticedWalls.push(false); //all walls false
  });

  wallTower1.forEach((wall1, index) => {
    let wall2 = wallTower2[index];
    selectedTowers.forEach((someTower) => {
      let thisTower = towerID[someTower];
      if ((wall1 == thisTower || wall2 == thisTower) && !noticedWalls[index]) {
        noticedWalls[index] = true;
        updateWall(index, wall1, wall2);
      }
    });
  });

  pastActions.push(someAction);

  updateTowerInfo(1); // 1 - new tower
}

function undoLastAction() {
  //!HERE!
  if (1 > pastActions.length) {
    return;
  }
  temp = pastActions[pastActions.length - 1].actionType;
  switch (temp) {
    case "pT": {
      destroyTower(pastActions[pastActions.length - 1].tID); //destroy tower pastActions[pastActions.length-1].tID
      updateTowerInfo(1);
      break;
    }
    case "dT": {
      //place tower
      let numeroOfThisAction = pastActions.length - 1;

      pastActions[numeroOfThisAction].x.forEach((destroyedTowerX, index) => {
        createTower(
          destroyedTowerX,
          pastActions[numeroOfThisAction].y[index],
          pastActions[numeroOfThisAction].tID[index],
          pastActions[numeroOfThisAction].color[index]
        );
      });

      pastActions[numeroOfThisAction].wall1.forEach((firstWall, index) => {
        buildWall(firstWall, pastActions[numeroOfThisAction].wall2[index]);
      });
      break;
    }
    case "mT": {
      let direction = pastActions[pastActions.length - 1].direction;
      let ids = pastActions[pastActions.length - 1].tID;
      let distance = pastActions[pastActions.length - 1].distance;
      let centre = pastActions[pastActions.length - 1].centre;
      shiftTowers(direction, ids, -distance, centre);
      //move towers
      break;
    }
    case "clT": {
      let ids = pastActions[pastActions.length - 1].tID;
      let colors = pastActions[pastActions.length - 1].color;
      changeColor(colors, ids);
      //color towers
      break;
    }
    case "cnT": {
      let ids = pastActions[pastActions.length - 1].tID;
      deleteWalls(ids);
      //connect towers
      break;
    }
    case "sT": {
      let ids = pastActions[pastActions.length - 1].tID;
      console.log(ids);
      toggleShielded(ids);
      //shield towers
      break;
    }
  }
  undoneActions.push(pastActions[pastActions.length - 1]);
  pastActions.splice(pastActions.length - 2, 2);
}
function redoLastAction() {
  if (1 > undoneActions.length) {
    return;
  }
  temp = undoneActions[undoneActions.length - 1].actionType;
  switch (temp) {
    case "pT": {
      destroyTower(undoneActions[undoneActions.length - 1].tID); //destroy tower undoneActions[undoneActions.length-1].tID
      break;
    }
    case "dT": {
      //place tower
      let numeroOfThisAction = undoneActions.length - 1;
      let amountOfDestroyedTowers = undoneActions[numeroOfThisAction].x.length;
      //console.log(amountOfDestroyedTowers);
      for (let c = 0; c < amountOfDestroyedTowers; c++) {
        createTower(
          undoneActions[numeroOfThisAction].x[c],
          undoneActions[numeroOfThisAction].y[c],
          undoneActions[numeroOfThisAction].tID[c],
          undoneActions[numeroOfThisAction].color[c]
        );
      }
      let amountOfDestroyedWalls =
        undoneActions[numeroOfThisAction].wall1.length;
      //console.log(amountOfDestroyedWalls);
      for (let c = 0; c < amountOfDestroyedWalls; c++) {
        buildWall(
          undoneActions[numeroOfThisAction].wall1[c],
          undoneActions[numeroOfThisAction].wall2[c]
        );
      }
      updateTowerInfo(1);
      break;
    }
    case "mT": {
      let direction = undoneActions[undoneActions.length - 1].direction;
      let ids = undoneActions[undoneActions.length - 1].tID;
      let distance = undoneActions[undoneActions.length - 1].distance;
      shiftTowers(direction, ids, -distance);
      //move towers
      break;
    }
    case "clT": {
      let ids = undoneActions[undoneActions.length - 1].tID;
      let colors = undoneActions[undoneActions.length - 1].color;
      changeColor(colors, ids);
      //color towers
      break;
    }
    case "cnT": {
      let ids = undoneActions[undoneActions.length - 1].tID;
      connectTowers(ids);
      //connect towers
      break;
    }
    case "sT": {
      let ids = undoneActions[undoneActions.length - 1].tID;
      console.log(ids);
      toggleShielded(ids);
      //shield towers
      break;
    }
  }
  undoneActions.splice(undoneActions.length - 1, 1);
}

function changeColor(newColor, towerIDs) {
  let allTowers = document.getElementsByClassName("tower"); //have to take that shit into one funciton anytime
  let selectedTowers = [];
  let someAction = {
    actionType: "clT",
    tID: [],
    color: [],
  };
  if (towerIDs == undefined) {
    for (let c = 0; c < allTowers.length; c++) {
      if (allTowers[c].classList.contains("highlighted")) {
        selectedTowers.push(c);
        someAction.tID.push(towerID[c]);
        someAction.color.push(towerColor[c]);
      }
    }
  } else {
    someAction.tID = towerIDs;
    selectedTowers = convertIDtoArray(towerIDs);
    selectedTowers.forEach((c) => {
      someAction.color.push(towerColor[c]);
    });
  }
  if (typeof newColor === "number") {
    let actualColor = numberToColor(newColor);
    //console.log('Color: ' + newColor + ' = ' + actualColor);
    selectedTowers.forEach((c) => {
      towerColor[c] = newColor;
      allTowers[c].style.backgroundColor = actualColor;
      for (let c2 = 0; c2 < wallTower1.length; c2++) {
        if (wallTower1[c2] == towerID[c]) {
          //console.log("Update Walls!!");
          updateWall(c2, wallTower1[c2], wallTower2[c2]);
        }
      }
    });
    document.getElementById("colorPicker").style.display = "none";
    updateTowerInfo(1); //"new tower" - colors have changed -> update
  } else if (newColor.constructor == "function Array() { [native code] }") {
    if (selectedTowers.length != newColor.length) {
      someErrorHere();
      return;
    }
    for (let c = 0; c < selectedTowers.length; c++) {
      temp = numberToColor(newColor[c]);
      towerColor[selectedTowers[c]] = newColor[c];
      allTowers[selectedTowers[c]].style.backgroundColor = temp;
      for (let c2 = 0; c2 < wallTower1.length; c2++) {
        if (wallTower1[c2] == towerID[selectedTowers[c]]) {
          //console.log("Update Walls!!");
          updateWall(c2, wallTower1[c2], wallTower2[c2]);
        }
      }
    }
  }
  pastActions.push(someAction);
}

function coppyTowers() {
  let allTowers = document.getElementsByClassName("tower"); //towers
  let selectedTowers = [];
  for (let u = 0; u < allTowers.length; u++) {
    if (allTowers[u].classList.contains("highlighted")) {
      selectedTowers.push(u);
    }
  }
  let mid = getMidOfTowers(selectedTowers);

  coppiedTowers.Xpos = [];
  coppiedTowers.Ypos = [];
  coppiedTowers.ID = [];
  coppiedTowers.color = [];

  selectedTowers.forEach((c) => {
    //store all tower positions as well as ids and colors
    coppiedTowers.Xpos.push(towerXpos[c] - mid.x);
    coppiedTowers.Ypos.push(towerYpos[c] - mid.y);
    coppiedTowers.ID.push(towerID[c]);
    coppiedTowers.color.push(towerColor[c]);
  });
  //console.log(coppiedTowers);

  coppiedWalls.towerOne = []; //walls
  coppiedWalls.towerTwo = [];
  for (let c = 0; c < wallTower1.length; c++) {
    temp = false;
    for (let c2 = 0; c2 < coppiedTowers.ID.length; c2++) {
      //only if wall connects to two towers, which are both coppied as well
      if (coppiedTowers.ID[c2] == wallTower1[c]) {
        temp = true;
        c2 = coppiedTowers.ID.length;
      }
    }
    if (temp) {
      temp = false;
      for (let c2 = 0; c2 < coppiedTowers.ID.length; c2++) {
        if (coppiedTowers.ID[c2] == wallTower2[c]) {
          temp = true;
          c2 = coppiedTowers.ID.length;
        }
      }
      if (temp) {
        coppiedWalls.towerOne.push(wallTower1[c]);
        coppiedWalls.towerTwo.push(wallTower2[c]);
      }
    }
  }
  //console.log(coppiedWalls);
}

function pasteTowers() {
  /*let centre = mouseCoords(event);
	console.log(centre);
	if(G_snapToGrid){
	  if(centre.x%snapRadius > (snapRadius/2)){
	    centre.x += snapRadius-(centre.x%snapRadius);
	  }else{centre.x -= centre.x%snapRadius;}
	  if(centre.y%snapRadius > (snapRadius/2)){
	    centre.y += snapRadius-(centre.y%snapRadius);
	  }else{centre.y -= centre.y%snapRadius;}
	}*/
  let startingID = i;
  let tempX = 0;
  let tempY = 0;
  let tempID = 0;
  let tempColor = 0;
  for (let c = 0; c < coppiedTowers.Xpos.length; c++) {
    tempX = coppiedTowers.Xpos[c] + mousePos.x;
    tempY = coppiedTowers.Ypos[c] + mousePos.y;
    tempID = coppiedTowers.ID[c] + Number(startingID);
    tempColor = coppiedTowers.color[c];
    createTower(tempX, tempY, tempID, tempColor);
    //console.log(tempX + tempY + tempID + tempColor);
    if (i <= tempID) {
      i = tempID + 1;
    }
  }
  for (let c = 0; c < coppiedWalls.towerOne.length; c++) {
    temp = coppiedWalls.towerOne[c] + startingID;
    temp2 = coppiedWalls.towerTwo[c] + startingID;
    buildWall(temp, temp2);
  }
}

function inputWText(text) {
  let chars = Array.from(text);
  chars.forEach((char) => {
    writeIG(char, textCursor);
    textCursor.x += textCursor.x < 40 ? 1 : -textCursor.x;
    textCursor.y += textCursor.x === 0 ? 1 : 0;
  });
}

function writeIG(character, cursor, fontSize = 20, offset) {
  let drawingData =
    character.toLowerCase() in allCharacters
      ? allCharacters[character.toLowerCase()]
      : allCharacters.non;
  drawingData.towers.forEach((tower) => {
    createTower(
      (tower[0] + cursor.x * 8) * fontSize,
      (tower[1] + cursor.y * 10) * fontSize,
      i
    );
  });
  let towerCt = drawingData.towers.length + 1;
  let aTowerCt = towerID.length;
  console.log("here");
  drawingData.walls.forEach((wall) => {
    createWall(aTowerCt - towerCt + wall[0], aTowerCt - towerCt + wall[1]);
  });
}

function getMidOfTowers(towers) {
  let lX = towerXpos[towers[0]];
  let tY = towerYpos[towers[0]];
  let rX = towerXpos[towers[0]];
  let bY = towerYpos[towers[0]];
  towers.forEach((u) => {
    if (towerXpos[u] < lX) {
      lX = towerXpos[u];
    }
    if (towerYpos[u] < tY) {
      tY = towerYpos[u];
    }
    if (towerXpos[u] > rX) {
      rX = towerXpos[u];
    }
    if (towerYpos[u] > bY) {
      bY = towerYpos[u];
    }
  });
  let mid = { x: (lX + rX) / 2, y: (tY + bY) / 2 };
  //createTower(mid.x,mid.y,i,4);
  return mid;
}

function getNearestTower() {
  let closestDistance = Math.sqrt(
    Math.pow(mousePos.x - towerXpos[0], 2) +
      Math.pow(mousePos.y - towerYpos[0], 2)
  );
  let closestTowerAr = 0;
  for (let c = 1; c < towerID.length; c++) {
    let thisTowersDistance = Math.sqrt(
      Math.pow(mousePos.x - towerXpos[c], 2) +
        Math.pow(mousePos.y - towerYpos[c], 2)
    );
    if (thisTowersDistance < closestDistance) {
      closestDistance = thisTowersDistance;
      closestTowerAr = c;
    }
  }
  return closestTowerAr;
}

function getSelectedTowers() {
  let allTowers = document.querySelectorAll(".tower");
  let selectedTowerArray = [];
  Array.from(allTowers).forEach((tower, c) => {
    if (tower.classList.contains("highlighted")) {
      selectedTowerArray.push(c);
    }
  });
  /*for(let c = 0; c < allTowers.length; c++){
		if(allTowers[c].classList.contains('highlighted')){
			selectedTowerArray.push(c);
		}
	}*/
  /*const selectedTowerArrayTestIsra =  Array.from(document.querySelectorAll('.tower')).filter(el=>el.classList.contains('highlighted'));
	console.log(selectedTowerArrayTestIsra);
	console.log("^^");*/
  return selectedTowerArray;
}

function getDistanceToLine(wall1x, wall1y, wall2x, wall2y, pointX, pointY) {
  const dx1 = pointX - wall1x;
  const dy1 = pointY - wall1y;
  const dx2 = pointX - wall2x;
  const dy2 = pointY - wall2y;
  const dx12 = wall2x - wall1x;
  const dy12 = wall2y - wall1y;

  // Calculate squared distances
  const dist1Sq = dx1 * dx1 + dy1 * dy1;
  const dist2Sq = dx2 * dx2 + dy2 * dy2;
  const lineLengthSq = dx12 * dx12 + dy12 * dy12;

  // Calculate squared distance from point3 to line formed by point1 and point2
  const crossProduct = dx1 * dy12 - dx12 * dy1;
  const distToLineSq = (crossProduct * crossProduct) / lineLengthSq;

  //(doesn´t have to) Check if point3 is between point1 and point2
  const dotProduct = dx1 * dx12 + dy1 * dy12;
  if (dotProduct >= 0 && dotProduct <= lineLengthSq) {
    // Calculate the distance from point3 to the line
    const distToLine = Math.sqrt(distToLineSq);
    return distToLine;
  }

  const distanceT1 = Math.sqrt(dist1Sq) + 1;
  const distanceT2 = Math.sqrt(dist2Sq) + 1;
  if (distanceT1 < distanceT2) return distanceT1;
  return distanceT2; // Point is not near the line
}

function getClosestWall() {
  //!!here!!
  let distances = [];
  wallTower1.forEach((wall1id, index) => {
    let wall1x = towerXpos[convertIDtoArray(wall1id)];
    let wall1y = towerYpos[convertIDtoArray(wall1id)];
    let wall2x = towerXpos[convertIDtoArray(wallTower2[index])];
    let wall2y = towerYpos[convertIDtoArray(wallTower2[index])];
    let distanceToThis = getDistanceToLine(
      wall1x,
      wall1y,
      wall2x,
      wall2y,
      uncutMouseCoords.x,
      uncutMouseCoords.y
    );
    distances.push(distanceToThis);
  });
  let closestDistance = {
    distance: Infinity,
    index: Infinity,
  };
  distances.forEach((distance, index) => {
    if (distance < closestDistance.distance) {
      closestDistance.distance = distance;
      closestDistance.index = index;
    }
  });
  document
    .querySelectorAll(".wall")
    [closestDistance.index].classList.add("highlighted");
  return closestDistance.index;
}

function startPathCalculation(step) {
  if (step == 0 && overallBehavior == "normal") {
    overallBehavior = "pathCalc";
    document.getElementById("tower-info-pathCalculation-button").innerHTML =
      "End Path Calculation";
    // inform "select next tower"
    previousTowers = [];
    pathDistance = 0;
  } else if (step == 0 && overallBehavior == "pathCalc") {
    //end path calculation
    overallBehavior = "normal";
    //alert("Distance: " + (pathDistance/20) + " units  (" + (pathDistance/40) + " squares)");
    pathDistance /= 20;
    pathDistance = pathDistance.toFixed(2);
    let row = 1;
    for (let c = 0; c < 5; c++) {
      if (
        !document.getElementById("path_" + (c + 1) + "_checkbox").checked ||
        c == 5
      ) {
        row = c;
        break;
      }
    }
    temp = document.querySelectorAll("#table-pathDistance > td");
    //console.log(temp);
    console.log("DISTANCE: " + pathDistance);
    console.log("ROW: " + row);
    temp[row].innerHTML =
      pathDistance + " units (" + pathDistance / 2 + " squares)";
    temp = document.querySelectorAll("#table-basicCopter > td");
    temp[row].innerHTML = (pathDistance / 9.6).toFixed(2) + " s"; //basic copter speed ~4.8 grids per second / 9.6 units
    temp = document.querySelectorAll("#table-droneCopter > td");
    temp[row].innerHTML = (pathDistance / 8.8).toFixed(2) + " s"; //drone speed ~4.4 grids per second / 8.8 units
    temp = document.querySelectorAll("#table-shotgunCopter > td");
    temp[row].innerHTML = (pathDistance / 8.8).toFixed(2) + " s"; //shotgun speed ~4.4 grids per second / 8.8 units
    temp = document.querySelectorAll("#table-minisnipeCopter > td");
    temp[row].innerHTML = (pathDistance / 7.8).toFixed(2) + " s"; //minisnipe speed ~3.9 grids per second / 7.8 units
    temp = document.querySelectorAll("#table-machinegunCopter > td");
    temp[row].innerHTML = (pathDistance / 7.0).toFixed(2) + " s"; //machinegun speed ~3.5 grids per second / 7.0 units
    temp = document.querySelectorAll("#table-sniperCopter > td");
    temp[row].innerHTML = (pathDistance / 7.2).toFixed(2) + " s"; //sniper speed ~3.6 grids per second / 7.2 units
    document.getElementById("distance-overview-table").style.display = "inline";
    openMenu = true;
    document.getElementById("tower-info-pathCalculation-button").innerHTML =
      "Start Path Calculation";
    return;
  }
  let allTowers = document.getElementsByClassName("tower");
  for (c = 0; c < allTowers.length; c++) {
    if (allTowers[c].classList.contains("highlighted")) {
      temp = c;
      c = allTowers.length;
    }
  }
  let thisTower = {
    x: towerXpos[temp],
    y: towerYpos[temp],
  };
  previousTowers.push(thisTower);
  if (previousTowers.length > 1) {
    pathDistance = 0;
    for (let c = 0; c < previousTowers.length - 1; c++) {
      pathDistance += Math.sqrt(
        Math.pow(previousTowers[c].x - previousTowers[c + 1].x, 2) +
          Math.pow(previousTowers[c].y - previousTowers[c + 1].y, 2)
      );
    }
  }
}

function zoomMap(event) {
  let zoomInOut = event.deltaY;
  if (!onZooming) {
    onZooming = true;
    zoomingMouseCoords = {
      x: uncutMouseCoords.x,
      y: uncutMouseCoords.y,
    };
  }
  if (zoomInOut < 0) {
    //zoom IN
    mapZoom /= 0.9;
  } else if (zoomInOut > 0) {
    //zoom OUT
    mapZoom *= 0.9;
  }
  theMap.style.zoom = mapZoom; //transform = "scale(" + mapZoom + ", " + mapZoom + ")";
  //createTower(uncutMouseCoords.x, uncutMouseCoords.y, i, 3);
  moveBuildView();
  //createTower(uncutMouseCoords.x, uncutMouseCoords.y, i, 3);
  //buildWall(i-2, i-1);
  let coordsDifferent = {
    x: uncutMouseCoords.x - zoomingMouseCoords.x,
    y: uncutMouseCoords.y - zoomingMouseCoords.y,
  };
  temp = theMap.style.left.replace("px", "");
  temp -= -coordsDifferent.x;
  theMap.style.left = temp;
  temp = theMap.style.top.replace("px", "");
  temp -= -coordsDifferent.y;
  theMap.style.top = temp;
  moveBuildView();
}

function changeSelectedTowerColor(newCol) {
  let newColor = Number(newCol).toFixed(0);
  selectedTowerColor = 0 < newColor && newColor < 14 ? newColor : 14;
  document.querySelector("#inputTowerColor").value = selectedTowerColor;
  document.querySelector("#inputTowerColor").style.backgroundColor = colors[
    selectedTowerColor
  ]
    .replace("(", "a(")
    .replace(")", ", 0.9)");
  document.querySelector("#selectColorDorpdown").querySelectorAll("option")[
    selectedTowerColor - 1
  ].selected = true;
}

function changeHotkey(key) {
  if (currentHotkey != -1) {
    //if hotkey change was started, but not finished
    hotkeyToChange.innerHTML = currentHotkey;
  }
  hotkeyToChange = document.getElementById("hotkeys.change" + key);
  hotkeyToChange.blur();
  currentHotkey = hotkeyToChange.innerHTML;
  hotkeyToChange.innerHTML = "press a key";
  onkeydown = function (event) {
    if (currentHotkey == -1) {
      return;
    }
    hotkeyToChange.innerHTML = event.key.toUpperCase();
    markDoubleKeys();
    currentHotkey = -1;
    return;
  };
}
function hideHotkeyMenu() {
  mapStuff.classList.remove("blurred");
  document.getElementById("hotkeys").style.display = "none";
  if (currentHotkey != -1) {
    hotkeyToChange.innerHTML = currentHotkey;
    currentHotkey = -1;
  }
  Array.from(document.querySelectorAll(".hotkey-change-button")).forEach(
    (buttonVal) => {
      console.log(buttonVal.innerHTML);
      console.log(buttonVal.textContent);
      hotkeys[buttonVal.id.replace("hotkeys.change", "")] =
        buttonVal.textContent;
    }
  );
  localStorage.setItem("hotkeys", JSON.stringify(hotkeys));
}

function markDoubleKeys() {
  let allSetHotkeys = [];
  Array.from(document.querySelectorAll(".hotkey-change-button")).forEach(
    (value) => {
      allSetHotkeys.push(value.innerHTML);
    }
  );
  let doubledKeys = {};
  allSetHotkeys.forEach((value) => {
    doubledKeys[value] = doubledKeys?.[value] === undefined ? 0 : 1;
  });
  Array.from(document.querySelectorAll(".hotkey-change-button")).forEach(
    (value) => {
      if (doubledKeys?.[value.innerHTML]) {
        value.style.color = "red";
      } else {
        value.style.color = "black";
      }
    }
  );
}

function changeMapDimensions() {
  let newWidth = document.querySelector("#inputMapWidth").value;
  let newHeight = document.querySelector("#inputMapHeight").value;
  theMap.style.width = newWidth * 20;
  theMap.style.height = newHeight * 20;
  mapWidth = newWidth;
  mapHeight = newHeight;
  let svg = document.querySelector("#mapShadingSvg");
  svg.setAttribute("width", newWidth * 20);
  svg.setAttribute("height", newHeight * 20);
}

function playableSpace() {
  let mapSpace = mapWidth * mapHeight;
  let greySpace = 0;
  shadedAreas.forEach((area) => {
    //calculate grey area
    let firstSet = 0;
    let secondSet = 0;
    let arLg = area.length;
    area.forEach((thisArea, index) => {
      firstSet +=
        (towerXpos[convertIDtoArray(thisArea)] / 20) *
        (towerYpos[convertIDtoArray(area[(index + 1) % arLg])] / 20);
      secondSet +=
        (towerYpos[convertIDtoArray(thisArea)] / 20) *
        (towerXpos[convertIDtoArray(area[(index + 1) % arLg])] / 20);
    });
    if (firstSet < secondSet) {
      greySpace -= firstSet - secondSet;
    } else {
      greySpace += firstSet - secondSet; //[calculated space];
    }
  });
  greySpace /= 2;
  let finalSpace = {
    totallSpace:
      countDecimalPlaces(mapSpace - greySpace) > 2
        ? (mapSpace - greySpace).toFixed(2)
        : mapSpace - greySpace,
    percentage:
      countDecimalPlaces(((mapSpace - greySpace) / mapSpace) * 100) > 2
        ? (((mapSpace - greySpace) / mapSpace) * 100).toFixed(2)
        : ((mapSpace - greySpace) / mapSpace) * 100,
  };
  return finalSpace;
}

function updateTowerInfo(state) {
  temp = document.getElementsByClassName("highlighted");
  if (state == 0 || temp.length < 1) {
    document.getElementById("tower-info").style.display = "none";
    //document.getElementById('coords-info').style.display = 'inline';
    document.getElementById("info-box").style.borderStyle = "none";
    document.getElementById("info-box").style.backgroundColor = "rgba(0,0,0,0)";
  } else if (state == 1) {
    document.getElementById("tower-info").style.display = "inline";
    //document.getElementById('coords-info').style.display = 'none';
    document.getElementById("info-box").style.borderStyle = "solid";
    document.getElementById("info-box").style.backgroundColor =
      "rgba(10, 10, 10, 0.5)";
    temp = document.getElementsByClassName("tower");
    let selectedTowers = [];
    for (let c = 0; c < temp.length; c++) {
      if (temp[c].classList.contains("highlighted")) {
        selectedTowers.push(c);
      }
    }
    document.getElementById(
      "tower-info-numberSelectedTowers-number"
    ).innerHTML = selectedTowers.length;
    if (selectedTowers.length == 1) {
      document.getElementById("tower-info-pathCalculation").style.display =
        "inline";
    } else {
      document.getElementById("tower-info-pathCalculation").style.display =
        "none";
    }
    let col1 = towerColor[selectedTowers[0]];
    temp = true;
    selectedTowers.forEach((c) => {
      if (towerColor[c] != col1) {
        temp = false;
      }
    });
    if (temp) {
      document.getElementById("tower-info-color-button").innerHTML = col1;
      document.getElementById("tower-info-color-button").style.backgroundColor =
        numberToColor(col1);
      if (
        document.getElementById("tower-info-color-button").style
          .backgroundColor == "rgb(0, 0, 0)"
      ) {
        document.getElementById("tower-info-color-button").style.color =
          "rgb(180, 180, 180)";
      } else {
        document.getElementById("tower-info-color-button").style.color =
          "rgb(0, 0, 0)";
      }
    } else {
      document.getElementById("tower-info-color-button").innerHTML = "-";
      document.getElementById("tower-info-color-button").style.backgroundColor =
        "rgb(180, 180, 180)";
      document.getElementById("tower-info-color-button").style.color =
        "rgb(0, 0, 0)";
    }
    if (selectedTowers.length == 1) {
      document.getElementById("tower-info-coords-x").innerHTML = (
        towerXpos[selectedTowers[0]] / 20
      ).toFixed(4);
      document.getElementById("tower-info-coords-y").innerHTML = (
        towerYpos[selectedTowers[0]] / 20
      ).toFixed(4);
    } else {
      document.getElementById("tower-info-coords-x").innerHTML = "-";
      document.getElementById("tower-info-coords-y").innerHTML = "-";
    }
  }
} // 1 - new tower

function autoSave() {
  let currentMapFile = generateMapFile("deflyFormat");
  localStorage.setItem("auto-saved-map", currentMapFile);
  console.log("Auto Saved Map File!");
}

async function confirmAction(
  text,
  buttonConfirm = "Confirm",
  buttonCancel = "Cancel",
  actionToConfirm,
  inputBox
) {
  document.getElementById("confirm").style.display = "inline";
  openMenu = true;
  mapStuff.classList.add("blurred");
  document.getElementById("confirmText").innerHTML = text;
  // if(isEmpty(buttonConfirm)){buttonConfirm='Confirm';}
  // if(isEmpty(buttonCancel)){buttonCancel='Cancel';}
  document.getElementById("confirmButtomConfirm").innerHTML = buttonConfirm;
  document.getElementById("confirmButtomCancel").innerHTML = buttonCancel;
  button1 = document.getElementById("confirmButtomConfirm");
  button2 = document.getElementById("confirmButtomCancel");
  if (inputBox) {
    document.getElementById("confirmInputBox").style.display = "inline";
  } else {
    document.getElementById("confirmInputBox").style.display = "none";
  }
  button1.onclick = function () {
    document.getElementById("confirm").style.display = "none";
    mapStuff.classList.remove("blurred");
    openMenu = false;
    if (actionToConfirm) deleteExistingMap();
    else return true;
  };
  button2.onclick = function () {
    mapStuff.classList.remove("blurred");
    openMenu = false;
    document.getElementById("confirm").style.display = "none";
    return false;
  };
}

function testMap(){
  let link = document.querySelector('#linkToMapTest');
  let mapData = generateMapFile("compactFormat");
  link.href = `https://marmuzzcju.github.io/Defuse-Clone?loadMap:${mapData}`;
  link.click();
}

document.addEventListener("contextmenu", function (event) {
  //preventing right click from creating context menu instead of detecting click
  event.preventDefault();
});
window.oncontextmenu = function () {
  buildTower();
  return false; // cancel default menu
};

document.addEventListener("keydown", function (event) {
  if (openMenu) {
    if (event.key == "Enter") {
      //this.blur();
      console.log("confirm smh idk");
      if (document.getElementById("confirm").style.display == "inline") {
        document.getElementById("confirmButtomConfirm").focus();
        document.getElementById("confirmButtomConfirm").blur();
        document.getElementById("confirmButtomConfirm").click();
        console.log("yup");
      }
      /*if (
        document.getElementById("downloadMapOptions").style.display == "inline"
      ) {
        document.getElementById("downloadMapFileButton").click();
      }*/
      return;
    } else {
      return;
    }
  }
  temp = event.key.toUpperCase();
  switch (temp) {
    case hotkeys.Delete: {
      //console.log("SFGH");
      destroyTower();
      break;
    }
    case hotkeys.Ctrl: {
      Ctrl = true;
      //console.log("Ctrl: " + Ctrl);
      break;
    }
    case hotkeys.Shift: {
      Shift = true;
      break;
    }
    case hotkeys.Enter: {
      connectTowers();
      Enter = true;
      break;
    }
    case hotkeys.b: {
      shieldTowers();
      break;
    }
    case hotkeys.r: {
      R_Rotate = true;
      break;
    }
    case hotkeys.m: {
      M_Mirrow = true;
      break;
    }
    case hotkeys.ArrowUp: {
      shiftTowers("u");
      break;
    }
    case hotkeys.ArrowDown: {
      shiftTowers("d");
      break;
    }
    case hotkeys.ArrowLeft: {
      shiftTowers("l");
      break;
    }
    case hotkeys.ArrowRight: {
      shiftTowers("r");
      break;
    }
    case hotkeys.z: {
      console.log("undo");
      if (Ctrl) {
        if (Shift) {
          console.log("unde x10");
          for (let c = 0; c < 10; c++) {
            undoLastAction();
            console.log(c);
          }
        } else {
          undoLastAction();
        }
      }
      break;
    }
    case hotkeys.y: {
      if (Ctrl) {
        if (Shift) {
          for (let c = 0; c < 10; c++) {
            redoLastAction();
          }
        } else {
          redoLastAction();
        }
      }
      break;
    }
    case hotkeys.w: {
      upW = true;
      return;
    }
    case hotkeys.a: {
      leftA = true;
      return;
    }
    case hotkeys.s: {
      downS = true;
      return;
    }
    case hotkeys.d: {
      rightD = true;
      return;
    }
    case hotkeys.Plus: {
      movementSpeed += 0.5;
      break;
    }
    case hotkeys.Minus: {
      movementSpeed -= 0.5;
      if (movementSpeed < 0.5) {
        movementSpeed = 0.5;
      }
      break;
    }
    case hotkeys.Zero: {
      movementSpeed = 4;
      break;
    }
    case hotkeys.f: {
      console.log("SHADING...");
      buildShading();
      break;
    }
    case hotkeys.One: {
      buildDifferentThing(["bomb", 0]);
      break;
    }
    case hotkeys.Two: {
      buildDifferentThing(["bomb", 1]);
      break;
    }
    case hotkeys.Three: {
      buildDifferentThing(["spawn", 0]);
      break;
    }
    case hotkeys.Four: {
      buildDifferentThing(["spawn", 1]);
      break;
    }
    case hotkeys.x: {
      let space = playableSpace();
      alert(
        "Space: " +
          space.totallSpace +
          " units² - " +
          space.totallSpace / 4 +
          " squares - " +
          space.percentage +
          "%"
      );
      break;
    }
    case "H": {
      //h for testing
      getClosestWall();
      /*alert(
        getDistanceToLine(
          towerXpos[convertIDtoArray(wallTower1[0])],
          towerYpos[convertIDtoArray(wallTower1[0])],
          towerXpos[convertIDtoArray(wallTower2[0])],
          towerYpos[convertIDtoArray(wallTower2[0])],
          mousePos.x,
          mousePos.y
        )
      );*/
      break;
    }
    case "Q": {
      writeIG("a", {
        x: Math.floor(mousePos.x / 160),
        y: Math.floor(mousePos.y / 200),
      });
    }
  }
  //console.log("Keydown: " + event.key + "  - Ctrl: " + Ctrl + " - Shift: " + Shift);
});
document.addEventListener("keyup", function (event) {
  if (openMenu) {
    return;
  }
  temp = event.key.toUpperCase();
  switch (temp) {
    case hotkeys.Ctrl: {
      Ctrl = false;
      break;
    }
    case hotkeys.Shift: {
      Shift = false;
      break;
    }
    case hotkeys.Enter: {
      Enter = false;
      break;
    }
    case hotkeys.g: {
      G_snapToGrid = !G_snapToGrid;
      document.querySelector("#enableSnapToGridCheckbox").checked =
        G_snapToGrid;
      //console.log("TOGGLED: " + G_snapToGrid);
      break;
    }
    case hotkeys.r: {
      if (R_Rotate) {
        R_Rotate = false;
      }
      break;
    }
    case hotkeys.m: {
      if (M_Mirrow) {
        M_Mirrow = false;
      }
      break;
    }
    case hotkeys.c: {
      if (event.ctrlKey) CopyFile();
      else coppyTowers();
      break;
    }
    case hotkeys.v: {
      pasteTowers();
      break;
    }
    case hotkeys.n: {
      document.querySelector("#inputTowerColor").focus();
      break;
    }
    case hotkeys.w: {
      upW = false;
      return;
    }
    case hotkeys.a: {
      leftA = false;
      return;
    }
    case hotkeys.s: {
      downS = false;
      return;
    }
    case hotkeys.d: {
      rightD = false;
      return;
    }
    case "L": {
      if (event.altKey) {
        let data = [];
        for (let c = 100; c < 110; c++) {
          data.push(getPixData(c, 100));
        }
        console.log(data);
      }
    }
  }
  //console.log("Keyup: " + temp);
});

document.addEventListener("mousedown", function () {
  selectChunk(0);
});
document.addEventListener("mousemove", function () {
  updateMouseCoords();
  moveBuildView();
  onZooming = false;
});
document.addEventListener("mouseup", function () {
  selectChunk(2);
  //checkUnselect();
});

function notWorkingYet() {
  alert(
    "Unfortunately, this button's property hasn't been codded in yet - pls dm Marmuzzcju#5615 for further informations/suggestions and bug reports"
  );
}
function someErrorHere() {
  alert(
    "Unexpected Error encountered!!\nPlease report this error message to Marmuzzcju#5615 and check the console for possible error messages"
  );
}

window.setInterval(function () {
  if (!openMenu) {
    if (upW && !downS) {
      mapIntervallTempSpeed[0] = (-movementSpeed / mapZoom) * 8;
    } else if (downS && !upW) {
      mapIntervallTempSpeed[0] = (movementSpeed / mapZoom) * 8;
    } else {
      mapIntervallTempSpeed[0] = 0;
    }

    if (leftA && !rightD) {
      mapIntervallTempSpeed[1] = (-movementSpeed / mapZoom) * 8;
    } else if (rightD && !leftA) {
      mapIntervallTempSpeed[1] = (movementSpeed / mapZoom) * 8;
    } else {
      mapIntervallTempSpeed[1] = 0;
    }

    if (mapIntervallTempSpeed[0] != 0 && mapIntervallTempSpeed[1] != 0) {
      mapIntervallTempSpeed[0] *= 0.71;
      mapIntervallTempSpeed[1] *= 0.71;
      temp2 = true;
    } else if (mapIntervallTempSpeed[0] != 0 || mapIntervallTempSpeed[1] != 0) {
      temp2 = true;
    } else {
      temp2 = false;
    }

    if (temp2) {
      onZooming = false;
      temp = theMap.style.top;
      temp = temp.replace("px", "");
      theMap.style.top = temp - mapIntervallTempSpeed[0];
      temp = theMap.style.left;
      temp = temp.replace("px", "");
      theMap.style.left = temp - mapIntervallTempSpeed[1];
      moveBuildView();
    }
  }
}, 40);

window.onbeforeunload = () => {
  autoSave();
};

changeSelectedTowerColor(1);

if (typeof Storage !== undefined) {
  if (!localStorage.getItem("hotkeys")) {
    localStorage.setItem("hotkeys", JSON.stringify(hotkeys));
  } else {
    let storedHotkeys = JSON.parse(localStorage.getItem("hotkeys"));
    Object.entries(storedHotkeys).forEach(key => {
      hotkeys[key[0]] = key[1];
    })
  }
  Array.from(document.querySelectorAll(".hotkey-change-button")).forEach(
    (buttonVal) => {
      buttonVal.innerHTML = hotkeys[buttonVal.id.replace("hotkeys.change", "")];
    }
  );

  if (!localStorage.getItem("auto-saved-map")) {
    localStorage.setItem("auto-saved-map", "MAP_WIDTH 210 MAP_HEIGHT 120");
  } else {
    loadMapFile(localStorage.getItem("auto-saved-map"), "deflyFormat");
  }

  if (!localStorage.getItem("saved-map-list")) {
    localStorage.setItem("saved-map-list", JSON.stringify(["Empty"]));
  }
}
