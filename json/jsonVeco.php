<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../database.php');

$week = date("W")-1;

$query="SELECT khoi, don_vi.ten AS ten_don_vi, tuy_chon.ten AS ten_tuy_chon, chi_so 
FROM kpi_veco 
INNER JOIN don_vi ON don_vi.id = kpi_veco.don_vi_id 
INNER JOIN tuy_chon ON tuy_chon_id = tuy_chon.id
WHERE WEEK(kpi_veco.thoi_gian,1) = $week";
$statement = $db->prepare($query);
$statement->execute();
$kpi= $statement->fetchAll(PDO::FETCH_ASSOC|PDO::FETCH_GROUP);
$statement->closeCursor();
$myJSON = json_encode($kpi,JSON_UNESCAPED_UNICODE);
echo $myJSON;
?>
