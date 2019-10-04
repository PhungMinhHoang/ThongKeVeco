<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../database.php');

$query="SELECT khoi, don_vi.ten AS ten_don_vi, tuy_chon.ten AS ten_tuy_chon, chi_so , MONTH(thoi_gian) AS thoi_gian
    FROM chi_so_veco
    INNER JOIN don_vi ON don_vi_id = don_vi.id 
    INNER JOIN tuy_chon ON tuy_chon_id = tuy_chon.id
    WHERE don_vi.ten <> 'Khối 1' AND don_vi.ten <> 'Khối 2'";

$statement = $db->prepare($query);
$statement->execute();
$rs = $statement->fetchAll(PDO::FETCH_ASSOC|PDO::FETCH_GROUP);
$statement->closeCursor();
$myJSON = json_encode($rs,JSON_UNESCAPED_UNICODE);
echo $myJSON;
?>