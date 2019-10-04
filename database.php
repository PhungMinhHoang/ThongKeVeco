<?php
//$dsn = 'mysql:host=localhost;dbname=thongke';
//$username = 'root';
//$password = '';

$dsn = 'mysql:host=localhost;dbname=Report';
$username = 'root';
$password = 'Report@VHT2019';

try {
$db = new PDO($dsn, $username, $password);
        $db->exec("SET NAMES 'utf8';");
} catch (PDOException $e) {
$error_message = $e->getMessage();
exit();
}
?>