function storageAvailable(type) {
  try {
    var storage = window[type],
      x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0
    );
  }
}

var playerVolume;

if (storageAvailable("localStorage")) {
  // Yippee! We can use localStorage awesomeness
  if (!localStorage.getItem("playerVolume")) {
    localStorage.setItem("playerVolume", "0.75");
    playerVolume = parseFloat(localStorage.getItem("playerVolume"));
  } else {
    playerVolume = parseFloat(localStorage.getItem("playerVolume"));
  }
} else {
  // Too bad, no localStorage for us
  playerVolume = 0.75;
}

var player__menu_volume_slider = document.getElementById(
  "player__menu_volume-slider"
);
player__menu_volume_slider.value = playerVolume;

var sound = null;
var track_duration = 0;

function findTrackIndex(array, value) {
  if (array.length > 0) {
    for (
      var currentElement = 0;
      currentElement < array.length;
      currentElement++
    ) {
      if (array[currentElement][0] == value) {
        return currentElement;
      }
    }
  }
  return -1;
}

const track_list = [];

var allTag_DIVS = document.getElementsByTagName("div");
for (var currentDIV = 0; currentDIV < allTag_DIVS.length; currentDIV++) {
  if (allTag_DIVS[currentDIV].getAttribute("data-track_src") != null) {
    track_src = allTag_DIVS[currentDIV].getAttribute("data-track_src");
    track_name = allTag_DIVS[currentDIV].getAttribute("data-track_name");
    artist = allTag_DIVS[currentDIV].getAttribute("data-artist");
    artwork = allTag_DIVS[currentDIV].getAttribute("data-artwork");

    if (allTag_DIVS[currentDIV].getAttribute("data-ignore") != "ignore") {
      if (findTrackIndex(track_list, track_src) == -1) {
        track_list.push([track_src, track_name, artist, artwork, currentDIV]);
      }
    }
  }
}

/* console.table(track_list); */

function playSound(element_clicked_id) {
  var newAudioIndex = findTrackIndex(
    track_list,
    element_clicked_id.getAttribute("data-track_src")
  );

  if (sound != null) {
    sound.fade(playerVolume, 0, 250);
    setTimeout(() => {
      sound.stop();
      sound.unload();
      sound = null;
      play_Sound_Now(newAudioIndex);
    }, 500);
  } else {
    play_Sound_Now(newAudioIndex);
  }
}

function play_Sound_Now(newAudioIndex) {
  /* Declaraciones */
  var track_div =
    document.getElementsByTagName("div")[track_list[newAudioIndex][4]];

  var site__player = document.getElementById("site__player");
  var site__content = document.getElementById("site__content");
  var player__info_text_track_name = document.getElementById(
    "player__info-text-track_name"
  );
  var player__info_text_artist = document.getElementById(
    "player__info-text-artist"
  );
  var player__info_image = document.getElementById("player__info-image");

  if (sound != null) {
    sound.stop();
    sound.unload();
    sound = null;
  }

  sound = new Howl({
    src: track_list[newAudioIndex][0],
    preload: true,
    html5: true,
    volume: playerVolume,

    onfade: function () {
      track_div.classList.remove("playing");
    },
    onend: function () {
      track_div.classList.remove("playing");

      if (newAudioIndex + 1 == track_list.length) {
        play_Sound_Now(0);
      } else {
        play_Sound_Now(newAudioIndex + 1);
      }
    },
    onplay: function () {
      stop_TimerSliderUpdater();
      start_TimerSliderUpdater();
    },
    onseek: function () {
      stop_TimerSliderUpdater();
      start_TimerSliderUpdater();
    },
    onvolume: function () {},
    onload: function () {
      sound.play();

      track_div.classList.add("playing");
      site__player.classList.add("active");
      site__content.classList.add("expanded");
      player__info_text_track_name.innerHTML = track_list[newAudioIndex][1];
      player__info_text_artist.innerHTML = track_list[newAudioIndex][2];
      player__info_image.src = track_list[newAudioIndex][3];
    },
  });
}

/* ======================== */

function TimerSliderUpdater() {
  if (sound != null) {
    var player_controls_slider = document.getElementById(
      "player__controls-slider"
    );
    player_controls_slider.setAttribute("max", sound.duration(0));
    player_controls_slider.value = sound.seek();
  }
}

var timer_update_slider = null;
function start_TimerSliderUpdater() {
  /* TODO */
  /* TODO */
  /* works on composite aka delay on CLS (Cumulative Layout Shift) */
  timer_update_slider = setInterval(TimerSliderUpdater, 1);
  /* TODO */
  /* TODO */
}

function stop_TimerSliderUpdater() {
  clearInterval(timer_update_slider);
}

/* ======================== */

function updateVolume(element_clicked_id) {
  playerVolume = element_clicked_id.value;
  sound.volume(playerVolume);
}

document.getElementById("player__menu_volume-slider").oninput = function () {
  var element = document.getElementById("player__menu_volume-slider");
  updateVolume(element);
  processChange();
};

const processChange = debounce(() => saveVolume());

function updateSeek(element_clicked_id) {
  sound.seek(element_clicked_id.value);
}

document.getElementById("player__controls-slider").oninput = function () {
  var element = document.getElementById("player__controls-slider");
  updateSeek(element);
};

function saveVolume() {
  if (storageAvailable("localStorage")) {
    // Yippee! We can use localStorage awesomeness
    localStorage.setItem("playerVolume", playerVolume.toString());
  } else {
    // Too bad, no localStorage for us
  }
  /* console.log("volumen_guardado"); */
}
