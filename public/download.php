<?php
    if(!isset($_GET['imageurl'])){
        header("location: index.php");
        return;
    }

    $imageurl = "./uploads/" . $_GET['imageurl'] . ".png";

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QR website</title>
    <link rel="stylesheet" href="/style.css">
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="main.js" defer></script>
    <script src="https://kit.fontawesome.com/5a883bd754.js" crossorigin="anonymous"></script>
</head>

<body id="js--body">
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

    <div class="photoContainer">
        <img class="downloadphoto" src="<?php echo $imageurl; ?>" alt="">
        <div class="buttoncontainer">
            <button class="dwnButton" id="downloadBtn" onclick="downloadImg('<?php echo $imageurl; ?>')">Download Photo</button>
        </div>
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