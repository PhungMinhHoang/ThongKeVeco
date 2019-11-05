<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../database.php');
$thang = date('n');
$query="SELECT departments.level,departments.name AS ten_don_vi, (SELECT name from departments as dp WHERE dp.id = departments.parent_id) AS parent ,options.name AS tuy_chon,options.description,data,MONTH(reported_date) AS thang
FROM `data`
INNER JOIN departments ON department_id = departments.id
INNER JOIN options ON options_id = options.id
WHERE departments.isReport = 1
AND MONTH(reported_date) IN ($thang-1,$thang-2)";

$statement = $dbVHT->prepare($query);
$statement->execute();
$rs = $statement->fetchAll(PDO::FETCH_ASSOC);
$statement->closeCursor();
$myJSON = json_encode($rs,JSON_UNESCAPED_UNICODE);
echo $myJSON;
