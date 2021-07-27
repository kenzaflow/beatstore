<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <title>SASS</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css" />
</head>

<body class="preloading">

  <div class="preloading__spinner preloading__spinner--visible">
    <div class="shade--medium">
      <div class="inner"></div>
    </div>
  </div>

  <div class="site">

    <div class="site__menu shade--medium">

      <img loading="lazy" class="logo__img" src="img/logos/logo-white.svg" alt="Logo">

      <a class="site__menu__hamburger" href="#" id="menuToggler">

        <div class="hamburger__icon">
          <span class="hamburger__icon_line hamburger__icon_line--one"></span>
          <span class="hamburger__icon_line hamburger__icon_line--two"></span>
          <span class="hamburger__icon_line hamburger__icon_line--three"></span>
        </div>

      </a>

      <div id="site__menu__links">
        <a href="index.php">Home</a>
        <a href="index.php">Explore</a>
        <a href="index.php">Cart</a>
        <a href="index.php">Account</a>
      </div>

    </div>


    <div class="site__content shade--small">

      <div class="header">

      </div>

    </div>

    <div class="site__player shade--medium">.player</div>

  </div>
  <script src="scripts/main.js" defer></script>
</body>

</html>