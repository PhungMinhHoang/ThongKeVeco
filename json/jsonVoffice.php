<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../database.php');
$thang = date('n');
$query="SELECT ten,khoi, tuy_chon_id, chi_so,MONTH(thoi_gian) as thang FROM chi_so_voffice INNER JOIN user ON user.id = chi_so_voffice.user_id WHERE MONTH(thoi_gian) IN ($thang-1,$thang-2) ORDER BY `khoi` ASC, `thoi_gian` DESC,`chi_so` DESC";
$statement = $db->prepare($query);
$statement->execute();
if($statement->rowCount() >= 1) $vanban = $statement->fetchAll(PDO::FETCH_OBJ);
$statement->closeCursor();

$myJSON = json_encode($vanban,JSON_UNESCAPED_UNICODE);
echo $myJSON;

?>