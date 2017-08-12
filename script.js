// DOM elements
const tilesContainer = document.getElementsByClassName("content")[0];
const tiles = document.getElementsByClassName("tile");
const appStatus = document.getElementsByClassName("app-status")[0];
const appBody = document.getElementsByClassName("app-body")[0];
const appBack = document.getElementsByClassName("app-back")[0];
const appTitle = document.getElementsByClassName("app-title")[0];
const appFrame = appBody.getElementsByTagName("iframe")[0];
const loadingScreen = document.getElementsByClassName("loading-screen")[0];
const loadingText = document.getElementsByClassName("loading-text")[0];
const loadingImg = document.querySelector(".loading-img img");

// "global" variables
let tileClass = "";

// Add event listener to individual tiles
[].forEach.call(tiles, (tile) => {
  tile.addEventListener("click", () => {
    openApp(tile);
  });
});

// app-back event listener
appBack.addEventListener("click", closeApp);

// Frame loaded event 
appFrame.addEventListener("load", frameLoaded);

// Logic for opening the app
function openApp(tile){
  // Get info from tile
  const appTitleText = tile.children[1].innerHTML;
  const appSrc = tile.dataset.src;
  tileClass = tile.classList[2] || tile.classList[1];

  // Open loading screen
  loadingText.innerHTML = appTitleText;
  loadingImg.src = tile.children[0].src;
  loadingScreen.classList.add(tileClass);
  loadingScreen.style.display = "grid";

  // Animation

  // Show app
  appStatus.style.display = "grid";
  appBody.style.display = "block";
  tilesContainer.style.display = "none";

  appTitle.innerHTML = appTitleText;
  appFrame.src = appSrc;

  console.log(tile);
}

function frameLoaded(){
  // Close loading screen
  loadingScreen.style.display = "none";
  if(loadingScreen.classList.contains(tileClass)) loadingScreen.classList.remove(tileClass);
}

function closeApp(){
  appStatus.style.display = "none";
  appBody.style.display = "none";
  tilesContainer.style.display = "grid";

  appFrame.src = "";
}
