<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../database.php');
$quy_trinh_id = $_POST['data']['quy_trinh'] ?? null;
$du_an = $_POST['data']['du_an'] ?? null;
$don_vi = $_POST['data']['don_vi'] ?? null;
if( !empty($quy_trinh_id) && !empty($du_an)){
    $ma_du_an='('.implode( ",", $du_an ).')';
    $query="SELECT du_an.ten, kpi_quytrinh.diem, kpi_quytrinh.thoigian
    FROM kpi_quytrinh
    Inner join du_an on du_an.id = kpi_quytrinh.du_an_id
    WHERE quy_trinh_id = $quy_trinh_id AND du_an_id IN $ma_du_an Order by thoigian";

    $statement = $db->prepare($query);
    $statement->execute();
    if($statement->rowCount() >= 1) $kpi = $statement->fetchAll(PDO::FETCH_ASSOC|PDO::FETCH_GROUP);
    $statement->closeCursor();
    $myJSON = json_encode($kpi ?? '',JSON_UNESCAPED_UNICODE);
    echo $myJSON;
}
else if (!empty($don_vi)){
    $don_vi = '('.implode( ",", $don_vi ).')';
    $query="SELECT don_vi.ten, ROUND(AVG(diem)) as diem, thoigian 
    FROM kpi_quytrinh AS kpi 
    Inner JOIN du_an ON kpi.du_an_id = du_an.id 
    INNER JOIN don_vi ON du_an.donvi_id = don_vi.id 
    WHERE quy_trinh_id = 7 AND don_vi.id IN $don_vi group by thoigian, don_vi.id";

    $statement = $db->prepare($query);
    $statement->execute();
    if($statement->rowCount() >= 1) $kpi = $statement->fetchAll(PDO::FETCH_ASSOC|PDO::FETCH_GROUP);
    $statement->closeCursor();
    $myJSON = json_encode($kpi ?? '',JSON_UNESCAPED_UNICODE);
    echo $myJSON;

    
}
else {
    //Lấy kpi trung binh tat ca du an
    $query="SELECT don_vi.khoi,don_vi.ten AS ten_don_vi,temp.ten_du_an,temp.diem,temp.thoigian
    FROM (
        SELECT du_an.ten AS ten_du_an, kpi_quytrinh.diem, kpi_quytrinh.thoigian, du_an.donvi_id AS don_vi_id
        FROM kpi_quytrinh
        Inner join du_an on du_an.id = kpi_quytrinh.du_an_id
        WHERE quy_trinh_id = 8
    ) AS temp
    INNER JOIN don_vi ON temp.don_vi_id = don_vi.id
    ORDER BY don_vi.khoi, thoigian";

    $statement = $db->prepare($query);
    $statement->execute();
    /* Group values by the first column */
    $kpi = $statement->fetchAll(PDO::FETCH_ASSOC);
    $statement->closeCursor();
    $myJSON = json_encode($kpi ?? '',JSON_UNESCAPED_UNICODE);
    echo $myJSON;
}

?>