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

let track_list = [];

function scanTracks() {
  track_list = [];
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
}

scanTracks();

document.getElementById("site__playlist_player").classList.add("enabled");
document.getElementById("player__menu").classList.remove("invisible");

/* console.table(track_list); */

var actualSongID;
var actualSongURL;

function playSound(element_clicked_id) {
  var newAudioIndex = findTrackIndex(
    track_list,
    element_clicked_id.getAttribute("data-track_src")
  );

  playSoundById(newAudioIndex);
}

function playSoundById(newAudioIndex) {
  /* var newAudioIndex = findTrackIndex(
    track_list,
    element_clicked_id.getAttribute("data-track_src")
  ); */

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

function ActualizarPlaylist(newAudioIndex) {
  var site__playlist_player = document.getElementById("site__playlist_player");

  site__playlist_player.innerHTML =
    '<div class="playlist__top"><span class="playlist__topText">Playlist</span></div>';

  /* var theNewDiv = document.createElement("div");
  theNewDiv.innerHTML =
    '<div class="playlist__top"><span class="playlist__topText">Playlist</span></div>';
  theNewDiv.id = "site__playlist_player";
  theNewDiv.classList.add("site__playlist_player");
  theNewDiv.classList.add("enabled"); */

  for (var id = 0; id < track_list.length; id++) {
    var div = document.createElement("div");
    div.id = "playlist__track_" + id;
    div.innerHTML +=
      '<img loading="lazy" class="playlist__track__img" src="' +
      (track_list[id][3] !== null
        ? track_list[id][3]
        : "img/placeholders/track.svg") +
      '" alt="Artwork">';
    if (id == newAudioIndex) {
      div.innerHTML +=
        '<span class="playlist__track__name">' +
        track_list[id][1] +
        '<span class="playlist__track__playing">Playing</span></span>';
    } else {
      div.innerHTML +=
        '<span class="playlist__track__name">' + track_list[id][1] + "</span>";
    }

    div.innerHTML += '<span class="playlist__track__play_button">Play</span>';
    div.className = "playlist__track";
    /* console.log("actualSongID: " + actualSongID);
    console.log("newAudioIndex: " + newAudioIndex); */
    if (id == newAudioIndex) {
      div.classList.add("active");
    }
    div.setAttribute("onclick", "playSoundById(" + id + ")");

    site__playlist_player.appendChild(div);
  }

  /* if (site__playlist_player.innerHTML == theNewDiv.innerHTML) {
    console.log("Son iguales");
  } else {
    console.log("No son iguales");
  }

  console.log(site__playlist_player);
  console.log(theNewDiv);

  site__playlist_player.appendChild(theNewDiv); */
}

var player__control_play = document.getElementById("player__control_play");
var player__control_pause = document.getElementById("player__control_pause");

function play_Sound_Now(newAudioIndex) {
  scanTracks();
  console.table(track_list);
  if (track_list[actualSongID] !== undefined) {
    var OldAudioIndex = findTrackIndex(track_list, actualSongURL);
    var old_track_div =
      document.getElementsByTagName("div")[track_list[OldAudioIndex][4]];

    if (old_track_div !== undefined) {
      old_track_div.classList.remove("playing");
    }
  }

  actualSongID = newAudioIndex;
  actualSongURL = track_list[newAudioIndex][0];
  ActualizarPlaylist(actualSongID);

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
  player__info_image.setAttribute(
    "src",
    player__info_image.getAttribute("data-src")
  );
  var player__control_spinner = document.getElementById(
    "player__control_spinner"
  );
  var player__control_back = document.getElementById("player__control_back");
  var player__control_stop = document.getElementById("player__control_stop");

  var player__control_next = document.getElementById("player__control_next");
  var player__controls_slider = document.getElementById(
    "player__controls_slider"
  );

  if (sound != null) {
    sound.stop();
    sound.unload();
    sound = null;
  }

  if (track_div !== undefined) {
    track_div.classList.add("playing");
  }

  site__player.classList.add("active");

  document.getElementById("site").classList.add("expanded");

  player__controls_slider.classList.remove("visible");
  player__control_spinner.classList.add("visible");

  player__control_back.classList.remove("visible");
  player__control_pause.classList.remove("visible");
  player__control_next.classList.remove("visible");
  player__control_pause.classList.remove("visible");
  player__control_play.classList.remove("visible");

  player__info_text_track_name.innerHTML = track_list[newAudioIndex][1];
  player__info_text_artist.innerHTML = track_list[newAudioIndex][2];
  player__info_image.src =
    track_list[newAudioIndex][3] !== null
      ? track_list[newAudioIndex][3]
      : "img/placeholders/track.svg";

  track_div.classList.remove("playing");

  sound = new Howl({
    src: track_list[newAudioIndex][0],
    preload: true,
    html5: true,
    volume: playerVolume,

    onfade: function () {
      if (track_div !== undefined) {
        track_div.classList.remove("playing");
      }
    },
    onend: function () {
      if (track_div !== undefined) {
        track_div.classList.remove("playing");
      }

      if (newAudioIndex + 1 == track_list.length) {
        play_Sound_Now(0);
      } else {
        play_Sound_Now(newAudioIndex + 1);
      }
    },
    onplay: function () {
      stop_TimerSliderUpdater();
      start_TimerSliderUpdater();
      player__control_pause.classList.add("visible");
      player__control_play.classList.remove("visible");
      track_div.classList.add("playing");
    },
    onseek: function () {
      stop_TimerSliderUpdater();
      start_TimerSliderUpdater();
    },
    onpause: function () {
      player__control_pause.classList.remove("visible");
      player__control_play.classList.add("visible");
    },
    onvolume: function () {},
    onload: function () {
      sound.play();

      player__controls_slider.classList.add("visible");
      player__control_spinner.classList.remove("visible");

      player__control_back.classList.add("visible");
      player__control_pause.classList.add("visible");
      player__control_next.classList.add("visible");

      player__control_pause.classList.add("visible");
      /* player__control_play.classList.remove("visible"); */
    },
  });
}

/* ======================== */

function TimerSliderUpdater() {
  if (sound != null) {
    var player_controls_slider = document.getElementById(
      "player__controls_slider"
    );

    if (player_controls_slider.classList.contains("visible")) {
      player_controls_slider.setAttribute("max", sound.duration(0));
      player_controls_slider.value = sound.seek();
    }

    const percentValueOverDuration = (sound.seek() / sound.duration(0)) * 100;

    var subTotalFormatted = parseFloat(percentValueOverDuration).toFixed(1); //"12.13"

    let newVar = "ScaleX(" + subTotalFormatted / 100.0 + ")";

    var player__top_slider__inner = document.getElementById(
      "player__top_slider__inner"
    );

    player__top_slider__inner.style.transform = newVar;
  }
}

var timer_update_slider = null;
function start_TimerSliderUpdater() {
  /* TODO */
  /* TODO */
  /* works on composite aka delay on CLS (Cumulative Layout Shift) */
  timer_update_slider = setInterval(TimerSliderUpdater, 100);
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

document.getElementById("player__controls_slider").oninput = function () {
  var element = document.getElementById("player__controls_slider");
  updateSeek(element);
};

document.getElementById("player__control_play").onclick = function () {
  if (sound != null) {
    if (sound.playing() == false) {
      sound.play();
      player__control_play.classList.remove("visible");
      player__control_pause.classList.add("visible");
      stop_TimerSliderUpdater();
      start_TimerSliderUpdater();
    } else {
      /* wtf */
      /* error, report xd */
    }
  }
};

document.getElementById("player__control_pause").onclick = function () {
  if (sound != null) {
    if (sound.playing() == true) {
      sound.pause();
      player__control_pause.classList.remove("visible");
      player__control_play.classList.add("visible");
      stop_TimerSliderUpdater();
    } else {
      /* wtf */
      /* error, report xd */
    }
  }
};

document.getElementById("player__control_next").onclick = function () {
  if (sound != null) {
    if (actualSongID + 1 == track_list.length) {
      playSoundById(0);
    } else {
      playSoundById(actualSongID + 1);
    }
  }
};

document.getElementById("player__control_back").onclick = function () {
  if (sound != null) {
    if (actualSongID - 1 == -1) {
      playSoundById(track_list.length - 1);
    } else {
      playSoundById(actualSongID - 1);
    }
  }
};

/* document.getElementById("player__menu_volume").onclick = function (e) {
  if (e.target == this) {
    var vol_slider = document.getElementById("player__menu_volume_container");
    if (vol_slider.classList.contains("visible")) {
      vol_slider.classList.remove("visible");
    } else {
      vol_slider.classList.add("visible");
    }
  }
}; */

document.getElementById("player__menu_open_playlist").onclick = function () {
  if (sound != null) {
    var site__playlist_player = document.getElementById(
      "site__playlist_player"
    );

    if (site__playlist_player.classList.contains("visible")) {
      site__playlist_player.classList.remove("visible");
    } else {
      site__playlist_player.classList.add("visible");
    }
  }
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

document.getElementById("player__top_slider").onclick = function clickEvent(e) {
  if (sound != null) {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top; //y position within the element.

    var player__top_slider = document.getElementById("player__top_slider");
    var positionInfo = player__top_slider.getBoundingClientRect();
    var width = positionInfo.width;

    let percentValueOverDuration = (x / width) * 100;
    /* BOUYA */
    /* console.log("Percent: " + percentValueOverDuration);

    console.log("Song_Duration: " + sound.duration(0));
    console.log("Song_Seek: " + sound.seek()); */

    let percentOfSongOverDuration =
      (percentValueOverDuration / 100) * sound.duration(0);

    /* console.log("Calculated_Song_Seek: " + percentOfSongOverDuration); */

    sound.seek(percentOfSongOverDuration);
  }
};
