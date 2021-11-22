// ----
// ----
// ----
// COMIENZO DEBUG BOX / AYUDA
// ----
// ----
// ----

let cartel_ayuda = document.getElementById("debug__box");
cartel_ayuda.onclick = (this_event) => clickEn_cartel_ayuda(this_event);

function clickEn_cartel_ayuda(this_event) {
  this_event.stopPropagation();
  if (localStorage.getItem("ocultar_ayuda") != null) {
    enableORdisableHelp();
  }
}

let debug__close_me = document.getElementById("debug__close_me");
debug__close_me.onclick = (this_event) => clickEn_debug__close_me(this_event);

function clickEn_debug__close_me(this_event) {
  this_event.stopPropagation();
  if (localStorage.getItem("ocultar_ayuda") == null) {
    enableORdisableHelp();
  }
}

if (localStorage.getItem("ocultar_ayuda") == null) {
  cartel_ayuda.classList.remove("cerrado");
} else {
  /* localStorage.setItem("ocultar_ayuda", "yes"); */
  if (parseInt(Date.now() - localStorage.getItem("ocultar_ayuda")) > 3600000) {
    localStorage.removeItem("ocultar_ayuda");
    cartel_ayuda.classList.remove("cerrado");
  } else {
    cartel_ayuda.classList.add("cerrado");
  }
}

function enableORdisableHelp() {
  if (localStorage.getItem("ocultar_ayuda") == null) {
    localStorage.setItem("ocultar_ayuda", Date.now());
    cartel_ayuda.classList.add("cerrado");
  } else {
    localStorage.removeItem("ocultar_ayuda");
    cartel_ayuda.classList.remove("cerrado");
  }
}

// ----
// ----
// ----
// FIN DEBUG BOX / AYUDA
// ----
// ----
// ----



// ----
// ----
// ----
// COMIENZO ICON HOVER
// ----
// ----
// ----


/* site.onmouseover = site.onmouseout = handler; */

//function handler(event) {
/* function str(el) {
    if (!el) return 'null';
    return el.className || el.tagName;
  } */

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
//}

// ----
// ----
// ----
// FIN ICON HOVER
// ----
// ----
// ----