<?php
// A simple web site in Cloud9 that runs through Apache
// Press the 'Run' button on the top to start the web server,
// then click the URL that is emitted to the Output tab of the console
require "verify.php";
echo $_SESSION["client_name"] . ' ,welcome to webshop!';
echo " | <a href=\"logout.php\">Logout</a>";

?>
