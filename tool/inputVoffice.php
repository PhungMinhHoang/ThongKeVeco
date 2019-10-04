<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once('../database.php');
require('XLSXReader.php');
require_once 'PHPExcel/Classes/PHPExcel.php';
function user_id($db,$ten){
    $query="SELECT id FROM user WHERE ten = '$ten'";
    $statement = $db->prepare($query);
    $statement->execute();
    $user_id = $statement->fetch(PDO::FETCH_COLUMN);
    $statement->closeCursor();
    return $user_id;
}
function getListUserName($db){
    $query="SELECT id, ten FROM user";
    $statement = $db->prepare($query);
    $statement->execute();
    $users = $statement->fetchall(PDO::FETCH_ASSOC);
    $statement->closeCursor();
    return $users;
}


if(isset($_POST['submit'])){
    // Count total files
    $countfiles = count($_FILES['file']['name']);
    $thoi_gian = date("Y-m-d",strtotime($_POST['thoi_gian']));
    // Looping all files
    $ds = [];
    for($f = 0 ; $f < $countfiles ; $f++){
        $filename = $_FILES['file']['tmp_name'][$f];
        $name = $_FILES['file']['name'][$f];
        //Tiến hành xác thực file
        $objFile = PHPExcel_IOFactory::identify($filename);
        $objData = PHPExcel_IOFactory::createReader($objFile);
        //Chỉ đọc dữ liệu
        $objData->setReadDataOnly(true);
        // Load dữ liệu sang dạng đối tượng
        $objPHPExcel = $objData->load($filename);
        //Chọn trang cần truy xuất
        $sheet = $objPHPExcel->setActiveSheetIndex(0);
        //Lấy ra số dòng cuối cùng
        $Totalrow = $sheet->getHighestRow();
        //Lấy ra tên cột cuối cùng
        $LastColumn = $sheet->getHighestColumn();
        //Chuyển đổi tên cột đó về vị trí thứ, VD: C là 3,D là 4
        $TotalCol = PHPExcel_Cell::columnIndexFromString($LastColumn);
        //Tạo mảng chứa dữ liệu
        $data = [];
        //Tiến hành lặp qua từng ô dữ liệu
        //----Lặp dòng, Lấy từ dòng thứ 5
        for ($i = 5; $i <= $Totalrow; $i++) {
            //----Lặp cột
            $cell_content = $sheet->getCellByColumnAndRow(2, $i)->getValue();
            $boolen = strpos($cell_content, 'DON_XIN_NGHI');
            if($boolen === false) {
                for ($j = 0; $j < $TotalCol; $j++) {
                    // Tiến hành lấy giá trị của từng ô đổ vào mảng
                    $data[$i - 5][$j] = $sheet->getCellByColumnAndRow($j, $i)->getValue();
                }  
            }               
        }
        foreach ($data as $row) {
            $ten = $row[6];
            if(!isset($ds[$ten]))  $ds[$ten] = 1;
            else $ds[$ten]++;
        }
        //Hiển thị mảng dữ liệu  
    }
	print_r($ds);
    //Tim kiem data theo list user lay duoc tu db
	$users = getListUserName($db);
    foreach ($users as $user) {
        $user_id = $user['id'];
        $user_name = $user['ten'];
        if(array_key_exists($user_name,$ds))
            $chi_so = $ds[$user_name];
        else
            $chi_so = 0;
        $query="INSERT INTO `chi_so_voffice`( `user_id`, `tuy_chon_id`, `chi_so`, `thoi_gian`) VALUES ($user_id,13,$chi_so,'$thoi_gian')";
        $statement = $db->prepare($query);
        $statement->execute();
        $statement->closeCursor();
    }
	
    echo "<script type=\"text/javascript\">alert('Thêm thành công')</script>";
    header("Refresh:0");
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Upload Excel</title>
</head>

<body>
    <!-- Upload file -->
    <form method='post' action='' enctype='multipart/form-data' >
        <p class="help-block"><b>Only Excel/XLSX File Import.</b></p>
        Thời gian: <input type="date" name="thoi_gian" required/>
        <input type="file" name="file[]" id="file" required multiple accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
        <input type='submit' name='submit' value='Upload' />
    </form>
    
</body>

</html>