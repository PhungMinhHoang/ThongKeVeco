<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../database.php');
$quy_trinh_id = $_POST['quy_trinh'] ?? null;
$du_an = $_POST['du_an'] ?? null;

if( !empty($quy_trinh_id) && !empty($du_an)){
    $ma_du_an='('.implode( ",", $du_an ).')';
    $query="SELECT kpi_quytrinh.diem, kpi_quytrinh.thoigian, du_an.ten , kpi_quytrinh.du_an_id
    FROM kpi_quytrinh
    Inner join du_an on du_an.id = kpi_quytrinh.du_an_id
    WHERE quy_trinh_id = $quy_trinh_id AND du_an_id IN $ma_du_an Order by thoigian";

    $statement = $db->prepare($query);
    $statement->execute();
    if($statement->rowCount() >= 1) $kpi = $statement->fetchAll();
    $statement->closeCursor();

    $myJSON = json_encode($kpi ?? '',JSON_UNESCAPED_UNICODE);
    echo $myJSON;
}
else {
    $query="SELECT thoigian , diem FROM kpi_quytrinh ORDER BY thoigian ";

    $statement = $db->prepare($query);
    $statement->execute();
    /* Group values by the first column */
    $kpi = $statement->fetchAll(PDO::FETCH_COLUMN|PDO::FETCH_GROUP);
    $statement->closeCursor();

    foreach ($kpi as $thoigian => $danh_sach_diem) {
        //Chi lay trong nam hien tai
        if($thoigian >= date("Y")){
            $average = array_sum($danh_sach_diem)/count($danh_sach_diem);
            $rs[$thoigian] = floor($average);
        }
        
    }
    $myJSON = json_encode($rs ?? '',JSON_UNESCAPED_UNICODE);
    echo $myJSON;

}

?>