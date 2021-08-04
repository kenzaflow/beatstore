function interceptClickEvent(e) {
  var href;
  var target = e.target || e.srcElement;
  target = target.closest("a");
  if (target !== null) {
    if (target.tagName !== null) {
      if (target.tagName !== "a") {
        if (target.getAttribute("href") !== null) {
          href = target.getAttribute("href");

          //put your logic here...
          if (true) {
            //tell the browser not to respond to the link click
            e.preventDefault();

            /* WIIIIII */
            /* console.log(getParameterByName("page", href)); */
            let newPage = getParameterByName("page", href);
            replaceSiteContent(newPage + ".html");
          }
        }
      }
    }
  }
}

//listen for link click events at the document level
if (document.addEventListener) {
  document.addEventListener("click", interceptClickEvent);
} else if (document.attachEvent) {
  document.attachEvent("onclick", interceptClickEvent);
}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

window.addEventListener("DOMContentLoaded", (event) => {
  /* console.log("DOM fully loaded and parsed"); */
  let urlParams = new URLSearchParams(window.location.search);
  let myParam = urlParams.get("page");

  if (myParam === null) {
    setCurrentPage("home");
    urlParams = new URLSearchParams(window.location.search);
    myParam = urlParams.get("page");
  }

  /* fileExists(myParam + ".html").then(
    (yes) => yes && getPage(myParam + ".html")
  ); */

  /* setPageIfExists(myParam + ".html"); */
  replaceSiteContent(myParam + ".html");

  /* console.log("esto no deberia suceder"); */
});

function setCurrentPage(thePage) {
  const url = new URL(location.href);
  url.searchParams.set("page", thePage);
  history.pushState(null, "", url);
}

/* function getPage(theURL) {
  console.log(theURL);
} */

/* const fileExists = (file) =>
  fetch(file, { method: "HEAD", cache: "no-store" }).then(
    (response) => response.status == 200
  ); */

async function replaceSiteContent(url, error_page) {
  /* makeitDisplay(false); */
  let queryURL = url.replace(".html", "");
  try {
    const response = await fetch(url, { cache: "no-store" });
    const data = await response.text();
    /* console.log(data); */

    if (response.ok) {
      /* response.blob().then(function (miBlob) {
        var objectURL = URL.createObjectURL(miBlob);
        console.log(objectURL);
      }); */
      document.getElementById("site__content").innerHTML = data;

      setCurrentPage(queryURL);

      if (queryURL === "home") {
        setTimeout(() => {
          scanImageTracks();
        }, 100);
      }

      if (queryURL === "404") {
        if (error_page == undefined) {
          document.getElementById("error_404_cannot_text").innerHTML =
            "Cannot find the page";
        } else {
          document.getElementById("error_404_cannot_page").innerHTML =
            error_page;
        }
      }

      /* makeitDisplay(true); */
    } else {
      /* console.log("Respuesta de red OK pero respuesta HTTP no OK"); */
      replaceSiteContent("404.html", queryURL);
    }
  } catch (err) {
    console.log("Hubo un problema con la petición Fetch:" + err.message);
    replaceSiteContent("404.html", queryURL);
  }
}

/* const setPageIfExists = function (file) {
  fetch(file, { method: "HEAD", cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.blob().then(function (miBlob) {
          var objectURL = URL.createObjectURL(miBlob);
          console.log(objectURL);
        });
      } else {
        console.log("Respuesta de red OK pero respuesta HTTP no OK");
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch(function (error) {
      console.log("Hubo un problema con la petición Fetch:" + error.message);
    });
}; */

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

function makeitDisplay(makeactive = true) {
  /* console.log("DIOS"); */
  var siteDiv = document.getElementById("site");

  /* siteDiv.style.display = "block"; */

  /* console.log("terminamos de cargar"); */
  var c = document.getElementsByClassName("preloading__spinner")[0];

  if (makeactive === true) {
    setTimeout(function () {
      var b = document.getElementsByTagName("body")[0];
      b.classList.remove("preloading");
      c.classList.add("preloading__spinner--hide");
    }, 250);

    setTimeout(function () {
      c.classList.remove("preloading__spinner--visible");
    }, 750);
  } else {
    setTimeout(function () {
      var b = document.getElementsByTagName("body")[0];
      b.classList.add("preloading");
      c.classList.add("preloading__spinner--hide");
      c.classList.add("preloading__spinner--visible");
    }, 1);

    setTimeout(function () {
      c.classList.remove("preloading__spinner--hide");
    }, 100);
  }
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
        /* console.log("Está cargado el player"); */
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
