<?php
$dsn = 'mysql:host=localhost;dbname=report';
$username = 'root';
$password = '';

try {
$db = new PDO($dsn, $username, $password);
        $db->exec("SET NAMES 'utf8';");
} catch (PDOException $e) {
$error_message = $e->getMessage();
exit();
}
?>
