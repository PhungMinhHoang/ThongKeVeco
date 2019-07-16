<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('../database.php');
require('XLSXReader.php');

function checkInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
function listDonVi($db){
    $query="SELECT id,ten FROM don_vi";
    $statement = $db->prepare($query);
    $statement->execute();
    $listDonVi = $statement->fetchall(PDO::FETCH_ASSOC);
    $statement->closeCursor();
    $option = "";
    foreach ($listDonVi as $don_vi) {
        $id = $don_vi['id'];
        $ten = $don_vi['ten'];
        $option .= "<option value=$id>$ten</option>";
    }
    echo $option;
}
function listQuyTrinh($db){
    $query="SELECT id,ten FROM quy_trinh";
    $statement = $db->prepare($query);
    $statement->execute();
    $listQuyTrinh = $statement->fetchall(PDO::FETCH_ASSOC);
    $statement->closeCursor();
    $option = "";
    foreach ($listQuyTrinh as $quy_trinh) {
        $id = $quy_trinh['id'];
        $ten = $quy_trinh['ten'];
        $option .= "<option value=$id>$ten</option>";
    }
    echo $option;
}
function listDeTai($db){
    $query="SELECT id,ten FROM du_an";
    $statement = $db->prepare($query);
    $statement->execute();
    $listDeTai = $statement->fetchall(PDO::FETCH_ASSOC);
    $statement->closeCursor();
    $option = "";
    foreach ($listDeTai as $de_tai) {
        $id = $de_tai['id'];
        $ten = $de_tai['ten'];
        $option .= "<option value=$id>$ten</option>";
    }
    echo $option;
}


if(isset($_POST['submit'])){
    // Count total files
    $countfiles = count($_FILES['file']['name']);
    $check =1;
    if ($_FILES['file']['size'][0] == 0 && $_FILES['file']['error'][0] != 0){
        echo 'Chưa có file nào được upload';
        $check = 0 ;
    }
    else{
         // Looping all files
        for($i = 0 ; $i < $countfiles ; $i++){
            $filename = $_FILES['file']['tmp_name'][$i];
            $name = $_FILES['file']['name'][$i];
            $xlsx = new XLSXReader($filename);
            // $sheets = $xlsx->getSheetNames();
            // print_r($sheets);
            $data = $xlsx->getSheetData('ThongKe');
            
            
            //Kiểm tra format
            if($data[0] == ['ma_quy_trinh','ma_de_tai','diem','thoigian']){
                for ($i=1; $i < count($data) ; $i++) { 
                    //Query quy_trinh_id
                    $ma_quy_trinh = $data[$i][0];
                    $query="SELECT id FROM quy_trinh WHERE ma_quy_trinh = '$ma_quy_trinh'";
                    $statement = $db->prepare($query);
                    $statement->execute();
                    $quy_trinh_id = $statement->fetch(PDO::FETCH_ASSOC);
                    $statement->closeCursor();
                    $quy_trinh_id = $quy_trinh_id['id'];

                    //Query du_an_id
                    $ma_de_tai = $data[$i][1];
                    $query="SELECT id FROM du_an WHERE ma_de_tai = '$ma_de_tai'";
                    $statement = $db->prepare($query);
                    $statement->execute();
                    $du_an_id = $statement->fetch(PDO::FETCH_ASSOC);
                    $statement->closeCursor();  
                    $du_an_id = $du_an_id['id'];

                    if(empty($quy_trinh_id) || empty($du_an_id)){
                        $mes = '';
                        if(empty($quy_trinh_id)) $mes .= "Không tồn tại mã quy trình: $ma_quy_trinh \\n";
                        if(empty($du_an_id)) $mes .= "Không tồn tại mã đề tài: $ma_de_tai \\n";
                        $mes .= "Trong file: $name";
                        echo "<script>alert('$mes')</script>";
                    }
                    else{
                        //Insert to database
                        $diem = $data[$i][2];
                        $thoigian = $data[$i][3];
                        $query="INSERT INTO `kpi_quytrinh`( `quy_trinh_id`, `du_an_id`, `diem`, `thoigian`) VALUES ($quy_trinh_id,$du_an_id,$diem,'$thoigian')";
                        $statement = $db->prepare($query);
                        $statement->execute();
                        $statement->closeCursor();
                    }
                }
            }
            else {
                $check = 0;
                echo "<script>alert('File excel không đúng format')</script>";
            }
        }
    }

    if($check == 1) {
        echo "<script type=\"text/javascript\">alert('Thêm thành công')</script>";
        header("Refresh:0");
    }
}

if(isset($_POST['submitQuyTrinh'])){
    $ten = $ma_quy_trinh = '';
    $ten = checkInput($_POST["ten"]);
    $ma_quy_trinh = checkInput($_POST["ma_quy_trinh"]);

    $query="INSERT INTO `quy_trinh`( `ten`,`ma_quy_trinh`) VALUES (:ten,:ma_quy_trinh)";
    $statement = $db->prepare($query);
    $statement->bindParam(':ten',$ten);
    $statement->bindParam(':ma_quy_trinh',$ma_quy_trinh);
    $statement->execute();
    print_r( $statement);
    $statement->closeCursor();
    echo "<script>alert('Đã thêm quy trình: $ten')</script>";
    header("Refresh:0");
}

if(isset($_POST['submitDeTai'])){
    $ten = $ma_de_tai = $don_vi = '';
    $ten = checkInput($_POST["ten"]);
    $ma_de_tai = checkInput($_POST["ma_de_tai"]);
    $don_vi = checkInput($_POST['don_vi']);
    $query="INSERT INTO `du_an`( `ten`,`ma_de_tai`,`donvi_id`) VALUES (:ten , :ma_de_tai , :don_vi_id)";
    $statement = $db->prepare($query);
    $statement->bindParam(':ten', $ten);
    $statement->bindParam(':ma_de_tai', $ma_de_tai);
    $statement->bindParam(':don_vi_id', $don_vi);
    $statement->execute();
    $statement->closeCursor();
    echo "<script>alert('Đã thêm đề tài: $ten')</script>";
    header("Refresh:0");
}
if(isset($_POST['submitKpiQuyTrinh'])){
    $quy_trinh = $de_tai = $diem = $thoigian='';
    $quy_trinh = checkInput($_POST["quy_trinh"]);
    $de_tai = checkInput($_POST["de_tai"]);
    $diem = checkInput($_POST['diem']);
    $thoigian = checkInput($_POST['thoigian']);
    if(empty($thoigian)) $thoigian = date("Y-m");
    else $thoigian = date("Y-m",strtotime($thoigian));
    $query="INSERT INTO `kpi_quytrinh`( `quy_trinh_id`,`du_an_id`,`diem`,`thoigian`) VALUES (:quy_trinh , :de_tai , :diem , :thoigian)";
    $statement = $db->prepare($query);
    $statement->bindParam(':quy_trinh', $quy_trinh);
    $statement->bindParam(':de_tai', $de_tai);
    $statement->bindParam(':diem', $diem);
    $statement->bindParam(':thoigian', $thoigian);
    $statement->execute();
    $statement->closeCursor();
    echo "<script>alert('Chấm thành công')</script>";
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
        <input type="file" name="file[]" id="file" multiple accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
        <input type='submit' name='submit' value='Upload' />
    </form>
    <!-- Thêm quy trình -->
    <form method='post' action=''>
        <p class="help-block"><b>Thêm quy trình</b></p>
        Tên: <input type="text" name="ten" required>
        Mã quy trình: <input type="text" name="ma_quy_trinh" required>
        <input type='submit' name='submitQuyTrinh' value='Thêm' />
    </form>
    <!-- Thêm đề tài -->
    <form method='post' action=''>
        <p class="help-block"><b>Thêm đề tài</b></p>
        Tên: <input type="text" name="ten" required>
        Mã đề tài: <input type="text" name="ma_de_tai" required>
        Đơn vị: <select name="don_vi" required>
                    <option value = "">Chọn đơn vị</option>
                    <?php listDonVi($db); ?>
                </select>

        <input type='submit' name='submitDeTai' value='Thêm' />
    </form>
    <!-- Chấm điểm kpi quy trình -->
    <form method='post' action=''>
        <p class="help-block"><b>Chấm điểm kpi</b></p>
        Quy Trình: <select name="quy_trinh" required>
                    <option value = "">Chọn quy trình</option>
                    <?php listQuyTrinh($db); ?>
                </select>
        Đề tài/Dự án:<select name="de_tai" required>
                    <option value = "">Chọn đề tài/dự án</option>
                    <?php listDeTai($db); ?>
                </select>
        Điểm: <input type="text" name="diem" required>
        Thời gian: <input type="date" name="thoigian">

        <input type='submit' name='submitKpiQuyTrinh' value='Thêm' />
    </form>
</body>

</html>