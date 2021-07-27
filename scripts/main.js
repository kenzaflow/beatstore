function debounce(callback, wait) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

function updateScreen() {
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);
  console.log(window.innerHeight);
}

window.addEventListener(
  "resize",
  debounce(() => {
    updateScreen();
  }, 100)
);

updateScreen();

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

window.onload = function () {
  /* ready(); */
  var b = document.getElementsByTagName("body")[0];
  b.classList.remove("preloading");
  var b = document.getElementsByClassName("preloading__spinner")[0];
  b.classList.add("preloading__spinner--hide");

  setTimeout(function () {
    b.classList.remove("preloading__spinner--visible");
  }, 500);
};

window.onbeforeunload = confirmExit;
function confirmExit() {
  /* alert("confirm exit is being called"); */
  /* return false; */
  /* return "Texto de aviso"; */
  var b = document.getElementsByTagName("body")[0];
  b.classList.add("preloading");
  var b = document.getElementsByClassName("preloading__spinner")[0];
  b.classList.remove("preloading__spinner--hide");

  setTimeout(function () {
    b.classList.add("preloading__spinner--visible");
  }, 500);
}

document.getElementsByTagName("a").onclick = function () {
  /* document.getElementById("abc").href = "xyz.php"; */
  /* alert("confirm exit is being called");
  return false; */
};

/* document.body.querySelectorAll("a").forEach(function (node) {
  // Do whatever you want with the node object.

  node.preventDefault();
  setTimeout(function() { window.location = node.href }, 1000, node.href);
}); */
