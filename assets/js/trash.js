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
