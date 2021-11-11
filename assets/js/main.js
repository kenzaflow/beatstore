class beat {
  constructor(id, name, bpm, key, duration, tag, price, image, preview) {
    this.id = id;
    this.name = name;
    this.bpm = bpm;
    this.key = key;
    this.duration = duration;
    this.tag = tag;
    this.price = price;
    this.image = image;
    this.preview = preview;
  }
}

const beats = [
  new beat(1, 'Luz', 85, 'E Min', '3:30', ['JustinQuiles', 'Latin'], undefined, 'data/luz.jpg', 'data/luz.mp3'),
  new beat(2, 'Karma', 90, 'A Min', '3:06', ['JBalvin', 'Sech'], undefined, 'data/karma.jpg', 'data/karma.mp3'),
  new beat(3, 'Quizás', 99, 'F Min', '3:11', ['BadBunny', 'MariaBecerra'], undefined, 'data/quizas.jpg', 'data/quizas.mp3'),
  new beat(4, 'Sufres', 100, 'D Min', '3:17', ['MariaBecerra', 'EmiliaMernes'], undefined, 'data/sufres.jpg', 'data/sufres.mp3'),
  new beat(5, 'Otra Vez', 90, 'C# Min', '2:55', ['JhayCortez', 'NioGarcia'], undefined, 'data/otra_vez.jpg', 'data/otra_vez.mp3'),
  new beat(6, 'Bellaca', 92, 'C Min', '3:13', undefined, undefined, 'data/bellaca.jpg', 'data/bellaca.mp3'),
  new beat(7, 'Dogg', 130, 'G Maj', '3:52', undefined, undefined, 'data/dogg.gif', 'data/dogg.mp3'),
  new beat(8, 'Payaso', 120, 'D Min', '2:53', undefined, undefined, 'data/payaso.jpg', 'data/payaso.mp3'),
  new beat(9, 'Prohibida', 80, 'D Min', '3:26', undefined, undefined, 'data/prohibida.jpg', 'data/prohibida.mp3'),
  new beat(10, 'Rock Life Club Sports', 140, 'Bb Min', '3:57', undefined, undefined, 'data/rock_life_club_sports.jpg', 'data/rock_life_club_sports.mp3'),
  new beat(11, 'Spaceflight', 140, 'F# Min', '3:17', undefined, undefined, 'data/spaceflight.jpg', 'data/spaceflight.mp3'),
  new beat(12, 'Te Vas', 87, 'A Min', '3:07', undefined, undefined, 'data/te_vas.jpg', 'data/te_vas.mp3'),
  new beat(13, 'Virao', 130, 'F# Min', '2:26', undefined, undefined, 'data/virao.jpg', 'data/virao.mp3'),
];

let carrito = [];

if (localStorage.getItem('carrito') != null) {
  carrito = JSON.parse(localStorage.getItem('carrito'));
}

/* console.log(carrito); */

function findBeatArrayNumberById(id) {
  if (beats.length > 0) {
    let encontramos = false;
    let currentNumber = -1;

    do {
      currentNumber += 1;
      if (beats[currentNumber].id == id) {
        encontramos = currentNumber;
        break;
      } else {
      }
    } while (encontramos == false);
    return encontramos;
  }
  return false;
}

let ultimoBeatAgregado = null;

function agregarBeatAlCarrito(beatId) {
  carrito.push(beats[beatId].id);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  /* console.log(beats[beatId]); */
  ultimoBeatAgregado = beats[beatId].id;
  actualizarIconoCarrito();
}

function actualizarIconoCarrito() {
  let site_menu = document.getElementById('site__menu__links');

  let string_cart_element = `<i style="display: inline-block; transform: translateY(2px)" class="fi fi-br-shopping-cart fw"></i><span class="cart_number">${carrito.length}</span>`;

  /* console.log(site_menu.querySelector('#cart_section')); */
  site_menu.querySelector('#cart_section').innerHTML = string_cart_element;

  /* let cart_section = document.createElement('a');
  cart_section.id = 'cart_section';
  cart_section.classList.add('link');
  cart_section.classList.add('cart_section');
  cart_section.href = '?page=cart';
  cart_section.innerHTML = string_cart_element;
  site_menu.appendChild(cart_section); */
}

actualizarIconoCarrito();

var yaEstaAgregado = false;

let cargarNuevaPagina;

let pausarReproduccion = false;

function playSound(element_clicked_id) {
  pausarReproduccion = true;

  /* console.log('Cargando reproduccion'); */

  if (yaEstaAgregado == false) {
    yaEstaAgregado = true;

    document.getElementById('site__player').classList.add('active');
    document.getElementById('player__control_spinner').classList.add('visible');

    setTimeout(() => {
      startLoadingPlayer(element_clicked_id);
    }, 100);
  } else {
    /* console.log('bancaaaaaaaaaaa'); */
  }
}

function updatePage_cart() {
  cart_checkout_section = document.getElementById('cart_checkout_section');
  cart_list = document.getElementById('cart__list');

  boton = document.createElement('a');
  boton.classList.add('cart__goback');
  boton.setAttribute('type', 'button');

  if (carrito.length > 0) {
    if (carrito.length > 2) {
      cart_list.classList.remove('no_overflow');
    }

    for (let currentBeat = 0; currentBeat < carrito.length; currentBeat++) {
      beatInfo = beats[findBeatArrayNumberById(carrito[currentBeat])];
      let theBeat = document.createElement('div');
      theBeat.classList.add('cart__track');
      theBeat.innerHTML = `<img id="cart_added_track_image" draggable="false" loading="lazy" class="track__img" src="${beatInfo.image}" alt="Artwork" />
      <span id="cart_added_track_name" class="track__name">${beatInfo.name}</span>
      <span id="cart_added_track_lease" class="track__name track__lease">Lease Name</span>`;
      cart_list.append(theBeat);
    }

    boton.innerText = 'Finish with PayPal';
    boton.href = '?page=cart';
    cart_checkout_section.appendChild(boton);
  } else {
    /* ...; */
    let theMessage = document.createElement('span');
    theMessage.innerText = `There is no beats added to cart`;
    cart_list.appendChild(theMessage);

    boton.innerText = 'Go back';
    boton.href = '?page=home';
    cart_checkout_section.appendChild(boton);
  }
}

function startLoadingPlayer(element_clicked_id) {
  const scriptOne = document.createElement('script');
  scriptOne.id = 'howler_id';
  scriptOne.type = 'text/javascript';
  scriptOne.src = 'assets/js/external/howler.min.js?v=0.0.15';

  document.head.appendChild(scriptOne);

  var scriptOneLoaded = document.querySelector('#howler_id');
  scriptOneLoaded.addEventListener('load', function () {
    const scriptTwo = document.createElement('script');
    scriptTwo.id = 'player_script';
    scriptTwo.type = 'text/javascript';
    scriptTwo.src = 'assets/js/player.js?v=0.0.15';
    scriptTwo.async = true;

    document.head.appendChild(scriptTwo);

    var scriptTwoLoaded = document.querySelector('#player_script');
    scriptTwoLoaded.addEventListener('load', function () {
      /* console.log("Está cargado el player"); */
      playSound(element_clicked_id);
    });
  });

  pausarReproduccion = false;

  /* console.log('Termino de cargar la reproduccion'); */

  /* document.getElementById('debug__box').classList.add('dejame_ver_el_player'); */
}

function interceptClickEvent(e) {
  /* console.log(e); */

  var href;
  var target = e.target || e.srcElement;

  if (
    target.id == 'site__menu__hamburger' ||
    target.id == 'hamburger__icon' ||
    target.id == 'hamburger__icon--line--one' ||
    target.id == 'hamburger__icon--line--two' ||
    target.id == 'hamburger__icon--line--three'
  ) {
    if (document.querySelector('#site__menu__links').classList.contains('active')) {
      document.querySelector('#site__menu__links').classList.remove('active');
      document.querySelector('.hamburger__icon--line').classList.remove('active');
    } else {
      document.querySelector('#site__menu__links').classList.add('active');
      document.querySelector('.hamburger__icon--line').classList.add('active');
    }
  } else {
    if (document.querySelector('#site__menu__links').classList.contains('active')) {
      document.querySelector('#site__menu__links').classList.remove('active');
      document.querySelector('.hamburger__icon--line').classList.remove('active');
    }
  }
  if (target.id == 'youtube__section__video_thumbail_play') {
    document.getElementById('youtube__section__video').innerHTML =
      '<iframe class="youtube__section__video_iframe" width="100%" height="100%" src="https://www.youtube.com/embed/41p8H7OU4Ew" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    if (typeof sound !== 'undefined') {
      sound.pause();
    }
  }
  if (target.id == 'login__send' || target.id == 'contact__send') {
    if (document.getElementById('login__error_ptm_xd').classList.contains('enabled')) {
      document.getElementById('login__error_ptm_xd').classList.remove('enabled');

      setTimeout(() => {
        document.getElementById('login__error_ptm_xd').classList.add('enabled');
      }, 500);
    } else {
      document.getElementById('login__error_ptm_xd').classList.add('enabled');
    }
  }
  if (target.id == 'player__menu_volume' || target.id == 'player__menu_volume_container' || target.id == 'player__menu_volume-slider') {
    /* console.log("Click en volumen"); */
    /* document
      .getElementById("player__menu_volume_container")
      .classList.add("visible"); */

    if (!document.getElementById('player__menu_volume_container').classList.contains('visible')) {
      document.getElementById('player__menu_volume_container').classList.add('visible');
    } else if (target.id == 'player__menu_volume') {
      document.getElementById('player__menu_volume_container').classList.remove('visible');
    }
  } else {
    if (document.getElementById('player__menu_volume_container').classList.contains('visible')) {
      document.getElementById('player__menu_volume_container').classList.remove('visible');
    }
  }
  if (target.offsetParent !== null) {
    if (target.offsetParent.id !== 'site__playlist_player' && target.offsetParent.id !== null && target.id !== 'player__menu_open_playlist') {
      var site__playlist_player = document.getElementById('site__playlist_player');

      if (site__playlist_player.classList.contains('visible')) {
        site__playlist_player.classList.remove('visible');
      }
    }
  }

  target = target.closest('a');
  if (target !== null) {
    if (target.tagName !== null) {
      /* En este nesting van los elementos */
      if (target.tagName !== 'a') {
        //tell the browser not to respond to the link click

        if (target.getAttribute('href') !== '') {
          if (target.getAttribute('href') !== null) {
            if (target.getAttribute('href') !== '#') {
              if (target.getAttribute('href').split('')[0] == '?') {
                href = target.getAttribute('href');
                e.preventDefault();
                /* console.log(href); */

                //put your logic here...
                if (true) {
                  /* WIIIIII */
                  /* console.log(getParameterByName("page", href)); */
                  let newPage = getParameterByName('page', href);
                  /* replaceSiteContent(newPage); */

                  if (target.getAttribute('data-beat-id') != null && newPage == 'cart_added') {
                    agregarBeatAlCarrito(target.getAttribute('data-beat-id'));
                  }

                  /* console.log('Cargar nueva página'); */

                  if (pausarReproduccion == true) {
                    cargarNuevaPagina = newPage;
                    /* console.log('Esperamos'); */
                  } else {
                    cargarNuevaPagina = null;
                    /* console.log('Proseguimos'); */
                    replaceSiteContent(newPage);
                  }

                  /* if (newPage === 'cart') {
                    //DELETEME

                    let theScriptIsLoaded = document.querySelector('#coderhouse');

                    console.log(theScriptIsLoaded);

                    if (theScriptIsLoaded == null) {
                      const theScript = document.createElement('script');
                      theScript.id = 'coderhouse';
                      theScript.type = 'text/javascript';
                      theScript.src = 'assets/js/coderhouse.js';

                      document.head.appendChild(theScript);

                      do {
                        theScriptIsLoaded = document.querySelector('#coderhouse');
                      } while (theScriptIsLoaded == null);

                      theScriptIsLoaded.addEventListener('load', function () {
                        ejecutarCODERHOUSE();
                      });
                    } else {
                      ejecutarCODERHOUSE();
                    }
                  } */
                }
              }
            }
            if (target.getAttribute('href') == '#') {
              e.preventDefault();
            }
          }
        }
      }
    }
  }
}

//listen for link click events at the document level
if (document.addEventListener) {
  document.addEventListener('click', interceptClickEvent);
} else if (document.attachEvent) {
  document.attachEvent('onclick', interceptClickEvent);
}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

window.addEventListener('DOMContentLoaded', (event) => {
  /* console.log("DOM fully loaded and parsed"); */

  let urlParams = new URLSearchParams(window.location.search);
  let myParam = urlParams.get('page');

  if (myParam === null) {
    setCurrentPage('home');
    urlParams = new URLSearchParams(window.location.search);
    myParam = urlParams.get('page');
  }

  /* fileExists(myParam + ".html").then(
    (yes) => yes && getPage(myParam + ".html")
  ); */

  /* setPageIfExists(myParam + ".html"); */
  replaceSiteContent(myParam);

  /* console.log("esto no deberia suceder"); */
});

function setCurrentPage(thePage) {
  const url = new URL(location.href);
  url.searchParams.set('page', thePage);
  history.pushState(null, '', url);
}

/* function getPage(theURL) {
  console.log(theURL);
} */

/* const fileExists = (file) =>
  fetch(file, { method: "HEAD", cache: "no-store" }).then(
    (response) => response.status == 200
  ); */

/* function disableAllMenuActives(thePageID) {
  thePageID = "?page=" + thePageID;
  var allTag_A = document.getElementsByTagName("a");
  for (var currentA = 0; currentA < allTag_A.length; currentA++) {
    if (
      allTag_A[currentA].getAttribute("href") !== null &&
      allTag_A[currentA].getAttribute("href") !== undefined
    ) {
      if (allTag_A[currentA].classList.contains("active")) {
        allTag_A[currentA].classList.remove("active");
      }

      if (allTag_A[currentA].getAttribute("href") == thePageID) {
        allTag_A[currentA].classList.add("active");
        console.log("DUINU");
      }
    }
  }
} */

async function replaceSiteContent(url, error_page) {
  displayPreloading(true);
  window.scrollTo(0, 0);

  /* let queryURL = url.replace(".html", ""); */
  let queryURL = url;
  /* console.log(queryURL); */
  try {
    const response = await fetch('internals/' + queryURL + '.html', {
      cache: 'no-store',
    });
    const data = await response.text();
    /* console.log(data); */

    /* console.log(response.status); */

    if (response.ok) {
      /* response.blob().then(function (miBlob) {
        var objectURL = URL.createObjectURL(miBlob);
        console.log(objectURL);
      }); */
      document.getElementById('site__content').innerHTML = data;

      setCurrentPage(queryURL);

      /* if (document.getElementById("site").classList.contains("in_home")) {
        document.getElementById("site").classList.remove("in_home");
      } */

      /* disableAllMenuActives(queryURL); */

      if (queryURL === 'home' || queryURL === 'explore') {
        setTimeout(() => {
          scanImageTracks();
        }, 100);
        /* document.getElementById("site").classList.add("in_home"); */
      }

      if (queryURL === 'cart_added') {
        if (ultimoBeatAgregado != null) {
          /* console.log('es null capo'); */
          actualizarPaginaCarrito();
        }
        {
          /* window.location = 'index.html'; */
        }
      }

      if (queryURL === 'cart') {
        updatePage_cart();
      }

      if (queryURL === '404') {
        if (error_page == undefined) {
          document.getElementById('error_404_cannot_text').innerHTML = 'Cannot find the page';
        } else {
          document.getElementById('error_404_cannot_page').innerHTML = error_page;
        }
      }

      displayPreloading(false);

      agregarScript();
    } else if (response.status == 404) {
      if (queryURL === '404') {
        /* replaceSiteContent("404.html", queryURL); */
        alert('Imposible cargar página de error (404)');
      } else {
        replaceSiteContent('404', queryURL);
      }
    } else {
      replaceSiteContent('404', queryURL);
    }
  } catch (err) {
    console.log('Hubo un problema con la petición Fetch:' + err.message);
    replaceSiteContent('404', queryURL);
  }
}

function actualizarPaginaCarrito() {
  let cartImage = document.getElementById('cart_added_track_image');
  if (cartImage != null) {
    cartImage.src = beats[findBeatArrayNumberById(ultimoBeatAgregado)].image;
  }

  let cartName = document.getElementById('cart_added_track_name');
  if (cartName != null) {
    cartName.innerText = beats[findBeatArrayNumberById(ultimoBeatAgregado)].name;
  }

  let cartLease = document.getElementById('cart_added_track_lease');
  if (cartLease != null) {
    cartLease.innerText = 'Limited Lease';
  }
}

function agregarScript() {
  /* const script = document.createElement("script"),
    text = document.createTextNode("console.log('holawachen');");

  script.appendChild(text);
  script.setAttribute("defer"); */
  /* script.attributes.add("jeje", "masbien"); */
  /* script.setAttribute("onload", "console.log('holawachen');"); */
  /* console.log(script);
  document.body.appendChild(script); */
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

var mediaqueryList = window.matchMedia('(min-width: 768px)');

function updateScreen() {
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit

  // document.getElementById("debug__text").innerHTML =
  'Absoulute: ' + screen.width + 'x' + screen.height + '<br>' + 'Available: ' + screen.availWidth + 'x' + screen.availHeight + '<br>';

  const parent_site = document.getElementById('site');
  const parent_site_menu = document.getElementById('site__menu');
  const child_menu = document.getElementById('site__menu__links');

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
  'resize',
  debounce(() => {
    updateScreen();
  }, 200)
);

/* if (document.readyState == "interactive") {
  document.querySelector("#menuToggler").addEventListener("click", () => {
    if (
      document.querySelector("#site__menu__links").classList.contains("active")
    ) {
      document.querySelector("#site__menu__links").classList.remove("active");
      document
        .querySelector(".hamburger__icon_line")
        .classList.remove("active");
      console.log("nav inactiva");
    } else {
      document.querySelector("#site__menu__links").classList.add("active");
      document.querySelector(".hamburger__icon_line").classList.add("active");
      console.log("nav activa");
    }
  });
} */

/* ToDo like this below */

/* window.addEventListener("mouseup", function (event) {
  var pol = document.getElementById("site__menu__links");
  if (event.target != pol && event.target.parentNode != pol) {
    pol.classList.remove("active");
  }
}); */

/* let sape = false; */

function displayPreloading(display) {
  /* console.log("DIOS"); */
  var theBody = document.getElementById('body');

  if (display === false) {
    theBody.classList.remove('preloading');
    /* sape = false; */
  } else {
    theBody.classList.add('preloading');
    /* sape = true; */
  }
}

/* window.onkeypress = function (event) {
  if (event.keyCode == 48) {
    sape = !sape;
    displayPreloading(sape);
  }
}; */

function scanImageTracks() {
  var allTag_DIVS = document.getElementsByTagName('div');
  for (var currentDIV = 0; currentDIV < allTag_DIVS.length; currentDIV++) {
    if (allTag_DIVS[currentDIV].getAttribute('data-track_src') != null || allTag_DIVS[currentDIV].getAttribute('data-artwork') != null) {
      var tracklist_track__img = allTag_DIVS[currentDIV].getElementsByClassName('tracklist_track__img');
      var featured_track__img = allTag_DIVS[currentDIV].getElementsByClassName('featured_track__img');

      if (tracklist_track__img[0] != undefined) {
        if (allTag_DIVS[currentDIV].getAttribute('data-artwork') !== null) {
          tracklist_track__img[0].src = allTag_DIVS[currentDIV].getAttribute('data-artwork');
          if (typeof sound !== 'undefined') {
            if (allTag_DIVS[currentDIV].getAttribute('data-track_src') == actualSongURL /* track_list[currentSrc][0] */) {
              /* allTag_DIVS[currentDIV].classList.add("playing"); */
            }
          }
        }
      }

      if (featured_track__img[0] != undefined) {
        if (allTag_DIVS[currentDIV].getAttribute('data-artwork') !== null) {
          featured_track__img[0].src = allTag_DIVS[currentDIV].getAttribute('data-artwork');
        }
      }
    }
  }
}

window.addEventListener('load', (event) => {
  /* var linesToAdd = [
    '<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet"/>',
  ];
  for (var i = 0; i < linesToAdd.length; i++) {
    document.head.innerHTML += linesToAdd[i];
  } */
  /* const scriptOne = document.createElement("script");
  scriptOne.type = "text/javascript";
  scriptOne.src = "scripts/howler.min.js?0.0.8";

  document.head.appendChild(scriptOne);

  const scriptTwo = document.createElement("script");
  scriptTwo.type = "text/javascript";
  scriptTwo.src = "scripts/player.js?0.0.6";

   document.head.appendChild(scriptTwo); */
  /*   setTimeout(() => {
    displayPreloading();
  }, 500); */
  /* setTimeout(() => {
    scanImageTracks();
  }, 750); */
});

// module.js
/* export function hello() {
  return "Hello";
} */

// main.js
/* import {playSound} from 'player'; // or './module' */
/* let val = hello(); // val is "Hello"; */

/* window.onbeforeunload = confirmExit;
function confirmExit() {} */

addMetaStylesheet('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap?v=0.0.15');
addMetaStylesheet('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap?v=0.0.15');
addMetaStylesheet('assets/css/external/uicons-regular-rounded/css/uicons-regular-rounded.css?v=0.0.15');
addMetaStylesheet('assets/css/external/uicons-bold-rounded/css/uicons-bold-rounded.css?v=0.0.15');
addMetaStylesheet('assets/css/external/uicons-solid-rounded/css/uicons-solid-rounded.css?v=0.0.15');

updateScreen();

function addMetaStylesheet(url) {
  let linkToAdd = document.createElement('link');
  linkToAdd.setAttribute('rel', 'stylesheet');
  linkToAdd.href = url;
  document.getElementsByTagName('head')[0].appendChild(linkToAdd);
}

site.onmouseover = site.onmouseout = handler;

function handler(event) {
  function str(el) {
    if (!el) return 'null';
    return el.className || el.tagName;
  }

  /* console.log(event.type + ':  ' + 'target=' + str(event.target) + ',  relatedTarget=' + str(event.relatedTarget) + '\n'); */
  /* console.log('Mouse out: ' + str(event.relatedTarget));
  console.log('Mouse over: ' + str(event.target)); */

  /* START ICONOS HOVER */

  /* let theIndex = 0;

  if (event.target.className.includes('fi-rr')) {

    while (event.target.classList[theIndex].includes('fi-rr') == false) {
      theIndex += 1;
      if (theIndex > 10) {
        break;
      }
    }

    let claseSolid = event.target.classList[theIndex].replace('fi-rr', 'fi-sr');

    event.target.classList.remove(event.target.classList[theIndex]);
    event.target.classList.add(claseSolid);
  } else if (event.target.className.includes('fi-sr')) {
    while (event.target.classList[theIndex].includes('fi-sr') == false) {
      theIndex += 1;
      if (theIndex > 10) {
        break;
      }
    }

    let claseRegular = event.target.classList[theIndex].replace('fi-sr', 'fi-rr');

    event.target.classList.remove(event.target.classList[theIndex]);
    event.target.classList.add(claseRegular);
  } */

  /* END ICONOS HOVER */

  /* if (event.type == 'mouseover') {
    event.target.style.background = 'pink';
  }
  if (event.type == 'mouseout') {
    event.target.style.background = '';
  } */
}
