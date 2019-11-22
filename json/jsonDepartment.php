<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../database.php');
$thang = date('n');
$query="SELECT id,level, name AS ten_don_vi, hasChild, (SELECT name from departments as dp WHERE dp.id = departments.parent_id) AS parent, (SELECT id from departments as dp WHERE dp.id = departments.parent_id) AS parent_id
FROM departments
WHERE isReport = 1";

$statement = $dbVHT->prepare($query);
$statement->execute();
$rs = $statement->fetchAll(PDO::FETCH_ASSOC);
$statement->closeCursor();
$myJSON = json_encode($rs,JSON_UNESCAPED_UNICODE);
echo $myJSON;
