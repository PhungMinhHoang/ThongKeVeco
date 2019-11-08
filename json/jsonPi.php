<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../database.php');

$query = "SELECT tuy_chon.ten, TCT,K1,K2,K3,muc_tieu,thoigian FROM `chi_so_pi` INNER JOIN tuy_chon ON tuy_chon_id = tuy_chon.id";

$statement = $db->prepare($query);
$statement->execute();
if ($statement->rowCount() >= 1) $kpi = $statement->fetchAll(PDO::FETCH_ASSOC | PDO::FETCH_GROUP);
$statement->closeCursor();
$myJSON = json_encode($kpi ?? '', JSON_UNESCAPED_UNICODE);
echo $myJSON;
