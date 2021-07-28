var sound = null;
function playSound(element_clicked_id) {
  if (sound != null) {
    sound.fade(1, 0, 250);
    setTimeout(() => {
      sound.stop();
      sound.unload();
      sound = null;
      play_Sound_Now(element_clicked_id);
    }, 500);
  } else {
    play_Sound_Now(element_clicked_id);
  }
}

function play_Sound_Now(element_clicked_id, elquesigue) {
  const track_urls = [
    "audio/luz.mp3",
    "audio/karma.mp3",
    "audio/quizas.mp3",
    "audio/sufres.mp3",
  ];

  var audioURL = element_clicked_id.getAttribute("data-src");

  var audioIndex_toPlay = track_urls.findIndex(
    (element) => element == audioURL
  );

  if (elquesigue != null) {
    audioIndex_toPlay = elquesigue;
  }

  console.log(audioIndex_toPlay);
  // expected output: yeah

  sound = new Howl({
    src: [track_urls[audioIndex_toPlay]],
    preload: true,
    html5: true,
    volume: 1,
    onend: function () {
      if (audioIndex_toPlay + 1 == track_urls.length) {
        play_Sound_Now(element_clicked_id, 0);
      } else {
        play_Sound_Now(element_clicked_id, audioIndex_toPlay + 1);
      }
    },
    onload: function () {
      sound.play();

      var element = document.getElementById("site__player");
      element.classList.add("active");

      document.getElementById("track__info").innerHTML =
        element_clicked_id.getAttribute("data-track_name");
    },
  });
}
