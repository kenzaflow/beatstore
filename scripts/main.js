function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

var mediaqueryList = window.matchMedia("(min-width: 768px)");

function updateScreen() {
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit

  /* document.getElementById("debug__text").innerHTML =
    "Absoulute: " +
    screen.width +
    "x" +
    screen.height +
    "<br>" +
    "Available: " +
    screen.availWidth +
    "x" +
    screen.availHeight +
    "<br>"; */

  const parent_site = document.getElementById("site");
  const parent_site_menu = document.getElementById("site__menu");
  const child_menu = document.getElementById("site__menu__links");

  if (mediaqueryList.matches) {
    /* console.log("pantalla => a 768px"); */
    parent_site_menu.append(child_menu);
  } else {
    /* console.log("pantalla < a 768px"); */
    parent_site.append(child_menu);
  }

  /* console.log("reescalado ahora"); */
}

window.addEventListener(
  "resize",
  debounce(() => {
    updateScreen();
  }, 200)
);

if (document.readyState == "interactive") {
  document.querySelector("#menuToggler").addEventListener("click", () => {
    if (
      document.querySelector("#site__menu__links").classList.contains("active")
    ) {
      document.querySelector("#site__menu__links").classList.remove("active");
      document
        .querySelector(".hamburger__icon_line")
        .classList.remove("active");
    } else {
      document.querySelector("#site__menu__links").classList.add("active");
      document.querySelector(".hamburger__icon_line").classList.add("active");
    }
  });
}

/* ToDo like this below */

/* window.addEventListener("mouseup", function (event) {
  var pol = document.getElementById("site__menu__links");
  if (event.target != pol && event.target.parentNode != pol) {
    pol.classList.remove("active");
  }
}); */

function makeitDisplay() {
  console.log("DIOS");
  var siteDiv = document.getElementById("site");

  /* siteDiv.style.display = "block"; */

  console.log("terminamos de cargar");
  var c = document.getElementsByClassName("preloading__spinner")[0];

  setTimeout(function () {
    var b = document.getElementsByTagName("body")[0];
    b.classList.remove("preloading");
    c.classList.add("preloading__spinner--hide");
  }, 250);

  setTimeout(function () {
    c.classList.remove("preloading__spinner--visible");
  }, 750);
}

function scanImageTracks() {
  var allTag_DIVS = document.getElementsByTagName("div");
  for (var currentDIV = 0; currentDIV < allTag_DIVS.length; currentDIV++) {
    if (allTag_DIVS[currentDIV].getAttribute("data-track_src") != null) {
      var tracklist_track__img = allTag_DIVS[currentDIV].getElementsByClassName(
        "tracklist_track__img"
      );
      var featured_track__img = allTag_DIVS[currentDIV].getElementsByClassName(
        "featured_track__img"
      );

      if (tracklist_track__img[0] != undefined) {
        tracklist_track__img[0].src =
          allTag_DIVS[currentDIV].getAttribute("data-artwork");
      }

      if (featured_track__img[0] != undefined) {
        featured_track__img[0].src =
          allTag_DIVS[currentDIV].getAttribute("data-artwork");
      }
    }
  }
}

window.addEventListener("load", (event) => {
  /* var linesToAdd = [
    '<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet"/>',
  ];
  for (var i = 0; i < linesToAdd.length; i++) {
    document.head.innerHTML += linesToAdd[i];
  } */

  var linkToAdd = document.createElement("link");
  linkToAdd.setAttribute("rel", "stylesheet");
  linkToAdd.href =
    "https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap";
  document.getElementsByTagName("head")[0].appendChild(linkToAdd);

  var linkToAddAnother = document.createElement("link");
  linkToAddAnother.setAttribute("rel", "stylesheet");
  linkToAddAnother.href = "css/uicons/css/uicons-solid-rounded.css?0.0.3";
  document.getElementsByTagName("head")[0].appendChild(linkToAddAnother);

  /* const scriptOne = document.createElement("script");
  scriptOne.type = "text/javascript";
  scriptOne.src = "scripts/howler.min.js?0.0.8";

  document.head.appendChild(scriptOne);

  const scriptTwo = document.createElement("script");
  scriptTwo.type = "text/javascript";
  scriptTwo.src = "scripts/player.js?0.0.6";

   document.head.appendChild(scriptTwo); */

  updateScreen();

  setTimeout(() => {
    makeitDisplay();
  }, 500);

  setTimeout(() => {
    scanImageTracks();
  }, 750);
});

var yaEstaAgregado = false;

function playSound(element_clicked_id) {
  if (yaEstaAgregado == false) {
    yaEstaAgregado = true;

    const scriptOne = document.createElement("script");
    scriptOne.id = "howler_id";
    scriptOne.type = "text/javascript";
    scriptOne.src = "scripts/howler.min.js?0.0.11";

    document.head.appendChild(scriptOne);

    var scriptOneLoaded = document.querySelector("#howler_id");
    scriptOneLoaded.addEventListener("load", function () {
      const scriptTwo = document.createElement("script");
      scriptTwo.id = "player_script";
      scriptTwo.type = "text/javascript";
      scriptTwo.src = "scripts/player.js?0.0.10";
      scriptTwo.async = true;

      document.head.appendChild(scriptTwo);

      var scriptTwoLoaded = document.querySelector("#player_script");
      scriptTwoLoaded.addEventListener("load", function () {
        console.log("Está cargado el player");
        playSound(element_clicked_id);
      });
    });
  } else {
    console.log("no pofavo");
  }
}

// module.js
/* export function hello() {
  return "Hello";
} */

// main.js
/* import {playSound} from 'player'; // or './module' */
/* let val = hello(); // val is "Hello"; */

/* window.onbeforeunload = confirmExit;
function confirmExit() {} */
