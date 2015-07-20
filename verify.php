<?php 
 
session_start(); 

// Check if the session is already set.
if(!isset($_SESSION["client_id"]) || !isset($_SESSION["client_name"])) 
{ 
    // Client not logged in
    header("Location: login.html"); 
    exit; 
} 
?>