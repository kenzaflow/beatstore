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
  <link rel="stylesheet" href="css/style.css?v=0.0.2" />
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

        <div class="featured_track">
          <img class="featured_track__img" src="data/luz.png" alt="Artwork of Luz">
          <span class="featured_track__name">Luz</span>
          <div class="featured_track__info">
            <span class="featured_track__info__line">Featured Track</span>
            <span class="featured_track__info__line">90 BPM</span>
            <span class="featured_track__info__line">G#Min</span>
          </div>
          <div class="featured_track__tags">
            <a class="featured_track__tags_link" href="">#justinquiles</a>
            <a class="featured_track__tags_link" href="">#latin</a>
            <a class="featured_track__tags_link" href="">#elkenza</a>
          </div>
          <a class="featured_track__buy_button" href="">Add to cart</a>
        </div>

      </div>

    </div>

    <div class="site__player shade--medium">.player</div>

  </div>

  <div class="debug__box">
    <p id="debug__text">Size: 1920x1080</p>
  </div>
  <script src="scripts/main.js?0.0.2" defer></script>
</body>

</html>