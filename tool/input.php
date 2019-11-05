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
function average($db){

    $query="SELECT id AS du_an_id FROM du_an";
    $statement = $db->prepare($query);
    $statement->execute();
    /* Group values by the first column */
    $danh_sach_du_an = $statement->fetchAll(PDO::FETCH_ASSOC);
    
    
    foreach ($danh_sach_du_an as $k => $du_an) {
        $du_an_id = $du_an['du_an_id'];
        $query="SELECT thoigian , diem 
            FROM kpi_quytrinh 
            WHERE quy_trinh_id <> 8 AND du_an_id = $du_an_id AND diem IS NOT NULL
            ORDER BY thoigian";
        $statement = $db->prepare($query);
        $statement->execute();
        /* Group values by the first column */
        $kpi = $statement->fetchAll(PDO::FETCH_COLUMN|PDO::FETCH_GROUP);

        foreach ($kpi as $thoigian => $danh_sach_diem) {
            //Chi lay trong nam hien tai
            $average = array_sum($danh_sach_diem)/count($danh_sach_diem);
            $tb = round($average);
			$query="INSERT INTO kpi_quytrinh (quy_trinh_id,du_an_id,diem,thoigian) VALUES (8,$du_an_id,$tb,'$thoigian')";
            $statement = $db->prepare($query);
            $statement->execute();
        }
    }
    $statement->closeCursor();
}


if(isset($_POST['submit'])){
    // Count total files
    $countfiles = count($_FILES['file']['name']);
    print_r($_FILES['file']);
	 // Looping all files
	for($i = 0 ; $i < $countfiles ; $i++){
		$filename = $_FILES['file']['tmp_name'][$i];
		$name = $_FILES['file']['name'][$i];
		$xlsx = new XLSXReader($filename);
		// $sheets = $xlsx->getSheetNames();
		// print_r($sheets);
		$data = $xlsx->getSheetData('ThongKe');
		
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
			$ma_de_tai = $data[$i][6];
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
                $diem = $data[$i][1];
                //var_dump($diem);
                $diem = $diem*100;
                $thoigian = $data[$i][2];
				$query="INSERT INTO `kpi_quytrinh`( `quy_trinh_id`, `du_an_id`, `diem`, `thoigian`) VALUES ($quy_trinh_id,$du_an_id,$diem,'$thoigian')";
				$statement = $db->prepare($query);
				$statement->execute();
				$statement->closeCursor();
			}
		}
	}
	
	echo "<script type=\"text/javascript\">alert('Thêm thành công')</script>";
	header("Refresh:0");

	
}
if(isset($_POST['submitTrungBinh'])){
    average($db);
    echo "<script>alert('Đã cập nhật quy trình trung bình cho tất cả dự án')</script>";
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
        <input type="file" name="file[]" id="file" multiple accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" required/>
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
        Điểm: <input type="text" name="diem" required value = 0>
        Thời gian: <input type="date" name="thoigian" id="myDate" value=<?php echo date('Y-m-d') ?>>
        
        <input type='submit' name='submitKpiQuyTrinh'  value = 'Thêm' />
    </form>
    <!-- Update điểm trung bình quy trình -->
    <!-- Thêm đề tài -->
    <form method='post' action=''>
        <p class="help-block"><b>Cập nhật điểm trung bình quy trình</b><b style="color:red">(Thực hiện sau khi đã chấm điểm cho quy trình trung bình)</b></p>
        <input type='submit' name='submitTrungBinh' value='Cập nhật' />
    </form>
    <script src="../inc/jquery.js"></script>
</body>

</html>