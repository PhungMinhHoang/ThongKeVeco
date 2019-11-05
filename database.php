<?php
//$dsn = 'mysql:host=localhost;dbname=thongke';
//$username = 'root';
//$password = '';

$dsn1 = 'mysql:host=localhost;dbname=Report';
$dsn2 = 'mysql:host=localhost;dbname=VHTReport';
$username = 'root';
$password = 'Report@VHT2019';

try {
$db = new PDO($dsn1, $username, $password);
        $db->exec("SET NAMES 'utf8';");
$dbVHT = new PDO($dsn2, $username, $password);
        $dbVHT->exec("SET NAMES 'utf8';");
} catch (PDOException $e) {
$error_message = $e->getMessage();
exit();
}
?>