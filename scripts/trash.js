var link3 = document.createElement("link");
link3.rel = "stylesheet";
link3.href =
  "https://fonts.googleapis.com/css2?family=Merriweather+Sans:wght@300;400;500;600;700;800&display=swap";

document.getElementsByTagName("head")[0].prepend(link3);

var link2 = document.createElement("link");

link2.rel = "preconnect";
link2.href = "https://fonts.gstatic.com";
/* link.setAttribute("crossorigin"); */

document.getElementsByTagName("head")[0].prepend(link2);

var link = document.createElement("link");

link.rel = "preconnect";
link.href = "https://fonts.googleapis.com";

document.getElementsByTagName("head")[0].prepend(link);