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
let frameLoadedStatus = false;

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
  frameLoadedStatus = false;
  // Get info from tile
  const appTitleText = tile.children[1].innerHTML;
  const appSrc = tile.dataset.src;
  tileClass = tile.classList[2] || tile.classList[1];

  // Add animation div
  let tileAnimeDiv = document.createElement("div");
  tileAnimeDiv.classList.add("animate-tile");
  tileAnimeDiv.style.top = tile.offsetTop + "px";
  tileAnimeDiv.style.left = tile.offsetLeft + "px";
  tileAnimeDiv.style.width = tile.offsetWidth + "px";
  tileAnimeDiv.style.height = tile.offsetHeight + "px";
  tileAnimeDiv.classList.add(tileClass);

  tile.appendChild(tileAnimeDiv);

  // Set loading screen
  loadingText.innerHTML = appTitleText;
  loadingImg.src = tile.children[0].src;
  loadingScreen.classList.add(tileClass);

  // Set app
  // appTitle.innerHTML = appTitleText;
  appFrame.src = appSrc;
  appStatus.classList.add(tileClass);

  // Wait for animation
  loadingAnimationTimer = setTimeout(() => {
    // Handle displays
    if(!frameLoadedStatus) loadingScreen.style.display = "grid";   // Show loading screen
    tileAnimeDiv.style.display = "none";    // Hide animation div
    appStatus.style.display = "grid";       // show app-status
    appBody.style.display = "block";        // show app-body
    tilesContainer.style.display = "none";  // Hide tilesContainer

    // Remove animation div
    tile.removeChild(tile.childNodes[tile.childNodes.length-1]);
  }, 600);
}

function frameLoaded(){
  frameLoadedStatus = true;
  // Close loading screen
  loadingScreen.style.display = "none";
  if(loadingScreen.classList.contains(tileClass)) loadingScreen.classList.remove(tileClass);
}

function closeApp(){
  appStatus.style.display = "none";
  appBody.style.display = "none";
  tilesContainer.style.display = "grid";

  if(appStatus.classList.contains(tileClass)) appStatus.classList.remove(tileClass);

  appFrame.src = "";
}
