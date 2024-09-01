<?php
$servername = "localhost"; 
$username = "root"; 
$dbname = "contact_manager";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>
