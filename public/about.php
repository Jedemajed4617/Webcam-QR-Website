<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR website</title>
    <link rel="stylesheet" href="/style.css">
    <script src="main.js" defer></script>
    <script src="https://kit.fontawesome.com/5a883bd754.js" crossorigin="anonymous"></script>
</head>

<body id="js--body">

    <div class="error-container">
        <div class="error">
            <div class="errorimg">
                <img src="./img/error-icon.webp" alt="">
            </div>
            <div class="errortext">
                <p>Error: No camera detected!</p>
                <small>Try reloading the page.</small>
            </div>
        </div>
    </div>

    <header class="header">
        <h1 class="headerTitle" class="noselect">Webcam QR Generator</h1>
        <button id="js--menu" class="headerButton" class="noselect">Menu</button>
    </header>

    <nav id="js--nav" class="mainNav">
        <ul class="mainNavList">
            <li class="mainNavListItem">
                <a href="index.php">Home</a>
            </li>
            <li class="mainNavListItem">
                <a href="about.php">About</a>
            </li>
            <li id="js--nav-close" class="mainNavListItem">
                <small>Close</small>
            </li>
        </ul>
    </nav>

    <div class="container">
        
    </div>

    <footer class="footer">
        <ul class="footerNav" class="noselect">
            <li class="footerNavItem">
                <a href="index.php">Home</a>
            </li>
            <li class="footerNavItem">
                <a href="about.php">About</a>
            </li>
        </ul>
        <address>
            Deze website is gemaakt om via JavaScript en PHP een image upload te implementeren en
            beveiligen en is gemaakt door: Tygo Jedema
        </address>
        <p>
            Contactweg 36,
            Amsterdam NL
        </p>
    </footer>
</body>

</html>