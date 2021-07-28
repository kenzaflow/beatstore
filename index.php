<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />
  <title>SASS</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css?v=0.0.4" />
</head>

<body class="preloading">

  <div class="preloading__spinner preloading__spinner--visible">
    <div class="shade--medium">
      <div class="inner"></div>
    </div>
  </div>

  <div class="site">

    <div class="site__menu shade--medium">

      <a href="" class="site__logo">
        <img loading="lazy" class="logo__img" src="img/logos/logo-white.svg" alt="Logo">
      </a>

      <a class="site__menu__hamburger" href="#" id="menuToggler">

        <div class="hamburger__icon">
          <span class="hamburger__icon_line hamburger__icon_line--one"></span>
          <span class="hamburger__icon_line hamburger__icon_line--two"></span>
          <span class="hamburger__icon_line hamburger__icon_line--three"></span>
        </div>

      </a>

      <div id="site__menu__links">
        <a href="">Home</a>
        <a href="">Explore</a>
        <a href="">Cart</a>
        <a href="">Account</a>
      </div>

    </div>

    <div class="site__content shade--small">

      <div class="header">

        <!-- <div class="search_bar">
          <input class="search_bar__search_input" type="search" name="header-seach" id="header-seach" placeholder="What type of track are you looking for?">
          <a class="search_bar__search_button" href="" for="header-seach">Search</a>
        </div> -->

        <div class="featured_track">
          <img class="featured_track__img" src="data/luz.png" alt="Artwork">
          <span class="featured_track__name">Luz</span>
          <div class="featured_track__info">
            <span class="featured_track__info__line">Featured Track</span>
            <!-- <span class="featured_track__info__line">90 BPM</span>
            <span class="featured_track__info__line">G#Min</span> -->
          </div>
          <div class="featured_track__tags">
            <a class="featured_track__tags_link" href="">#justinquiles</a>
            <a class="featured_track__tags_link" href="">#latin</a>
            <a class="featured_track__tags_link" href="">#elkenza</a>
          </div>
          <a class="featured_track__buy_button" href="">Add to cart</a>
        </div>

      </div>

      <div class="tracklist">

        <div class="tracklist_track" data-src="audio/luz.mp3" data-track_name="Luz" onclick="playSound(this);">
          <img class="tracklist_track__img" src="data/luz.png" alt="Artwork">
          <span class="tracklist_track__name">Luz</span>
          <div class="tracklist_track__info">
            <span class="tracklist_track__info__line">90 BPM</span>
            <span class="tracklist_track__info__line">G#Min</span>
            <span class="tracklist_track__info__line">3:30</span>
          </div>
          <div class="tracklist_track__tags">
            <a class="tracklist_track__tags_link" href="">#justinquiles</a>
            <a class="tracklist_track__tags_link" href="">#latin</a>
            <a class="tracklist_track__tags_link" href="">#elkenza</a>
          </div>
          <a class="tracklist_track__buy_button" href="">Add to cart</a>
        </div>

        <div class="tracklist_track" data-src="audio/karma.mp3" data-track_name="Karma" onclick="playSound(this);">
          <img class="tracklist_track__img" src="data/karma.png" alt="Artwork">
          <span class="tracklist_track__name">Karma</span>
          <div class="tracklist_track__info">
            <span class="tracklist_track__info__line">90 BPM</span>
            <span class="tracklist_track__info__line">G#Min</span>
            <span class="tracklist_track__info__line">3:30</span>
          </div>
          <div class="tracklist_track__tags">
            <a class="tracklist_track__tags_link" href="">#justinquiles</a>
            <a class="tracklist_track__tags_link" href="">#latin</a>
            <a class="tracklist_track__tags_link" href="">#elkenza</a>
          </div>
          <a class="tracklist_track__buy_button" href="">Add to cart</a>
        </div>

        <div class="tracklist_track" data-src="audio/quizas.mp3" data-track_name="Quizás" onclick="playSound(this);">
          <img class="tracklist_track__img" src="data/quizas.jpg" alt="Artwork">
          <span class="tracklist_track__name">Quizás</span>
          <div class="tracklist_track__info">
            <span class="tracklist_track__info__line">90 BPM</span>
            <span class="tracklist_track__info__line">G#Min</span>
            <span class="tracklist_track__info__line">3:30</span>
          </div>
          <div class="tracklist_track__tags">
            <a class="tracklist_track__tags_link" href="">#justinquiles</a>
            <a class="tracklist_track__tags_link" href="">#latin</a>
            <a class="tracklist_track__tags_link" href="">#elkenza</a>
          </div>
          <a class="tracklist_track__buy_button" href="">Add to cart</a>
        </div>

        <div class="tracklist_track" data-src="audio/sufres.mp3" data-track_name="Sufres" onclick="playSound(this);">
          <img class="tracklist_track__img" src="data/sufres.jpg" alt="Artwork">
          <span class="tracklist_track__name">Sufres</span>
          <div class="tracklist_track__info">
            <span class="tracklist_track__info__line">90 BPM</span>
            <span class="tracklist_track__info__line">G#Min</span>
            <span class="tracklist_track__info__line">3:30</span>
          </div>
          <div class="tracklist_track__tags">
            <a class="tracklist_track__tags_link" href="">#justinquiles</a>
            <a class="tracklist_track__tags_link" href="">#latin</a>
            <a class="tracklist_track__tags_link" href="">#elkenza</a>
          </div>
          <a class="tracklist_track__buy_button" href="">Add to cart</a>
        </div>

      </div>

    </div>

    <div id="site__player" class="site__player shade--medium">
      <div id="track__info">.hola</div>
      <div id="track__controls">.hola</div>
      <div id="track__menu">.hola</div>
    </div>

  </div>

  <div class="debug__box">
    <p id="debug__text">Size: 1920x1080</p>
  </div>
  <script defer src="scripts/main.js?0.0.3"></script>
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.3/howler.min.js" integrity="sha512-6+YN/9o9BWrk6wSfGxQGpt3EUK6XeHi6yeHV+TYD2GR0Sj/cggRpXr1BrAQf0as6XslxomMUxXp2vIl+fv0QRA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script defer src="scripts/player.js?0.0.3"></script>
</body>

</html>