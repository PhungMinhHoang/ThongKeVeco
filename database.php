<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//$dsn = 'mysql:host=localhost;dbname=thongke';
//$username = 'root';
//$password = '';

$dsn1 = 'mysql:host=localhost;dbname=Report';
//$dsn2 = 'mysql:host=localhost;dbname=VHTReport';
$username = 'root';
$password = '';

try {
$db = new PDO($dsn1, $username, $password);
        $db->exec("SET NAMES 'utf8';");
//$dbVHT = new PDO($dsn2, $username, $password);
        //$dbVHT->exec("SET NAMES 'utf8';");
} catch (PDOException $e) {
        $error_message = $e->getMessage();
        echo $error_message;
        exit();
}
