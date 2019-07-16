<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('database.php');

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


?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Checklist Quy Trình</title>

  <!-- bootsrap -->
  <link rel="stylesheet" href="./inc/bootstrap/bootstrap.min.css">
  <link rel="stylesheet" href="./inc/bootstrap/bootstrap-grid.min.css">
  <!-- css -->
    <style>
        select{
            border: none;
            width: 100%;
        }
    </style>
</head>

<body>
<br>
    <div class='container'>
        <table class="table table-bordered">
            <tr>
                <th scope="row">Tên Đề tài/Dự án</th>
                <td colspan="3">
                <select name="de_tai">
                    <option value="">Chọn đề tài</option>
                    <?php listDeTai($db); ?>
                </select>
                </td>
            </tr>
            <tr>
                <th scope="row">PM Đề tài/Dự án</th>
                <td>Tạ Hồng Nam</td>
                <th scope="row">QA Đề tài/Dự án</td>
                <td>thanghm</td>
            </tr>
            <tr>
                <th scope="row">Ngày đánh giá</th>
                <td>2019-07-09</td>
                <th scope="row">Quy trình áp dụng</th>
                <td>
                <select name="quy_trinh" id="select_quy_trinh" role="tablist">
                    <option value="">Chọn quy trình</option>
                    <?php listQuyTrinh($db); ?>
                </select>
                </td>
            </tr>
        </table>

    <div id='quy_trinh_1' style="display:none">
        <table class="table table-bordered">
            <tr>
                <th>STT</th>
                <th>Nội dung đánh giá</th>
                <th>Điểm tối đa</th>
                <th>Điểm thực tế</th>
            </tr>
            <tr>
                <th>1</th>
                <th>Lập kế hoạch sơ bộ, báo cáo Kick off</th>
                <th>5</th>
                <th>Chấm vào đây</th>
            </tr>
            <tr>
                <td>1.1</td>
                <td>Quyết định giao nhiệm vụ Đề tài được phê duyệt hay chưa?</td>
                <td>1</td>
                <td>Chấm vào đây</td>
            </tr>
            <tr>
                <td>1.2</td>
                <td>Đã có thuyết minh Đề tài hay chưa? Thuyết minh Đề tài đã được phê duyệt hay chưa?</td>
                <td>3</td>
                <td>Chấm vào đây</td>
            </tr>
        </table>
    </div>
    

    <div id='quy_trinh_2' style="display:none">Test2</div>
    <div id='quy_trinh_3' style="display:none">Test3</div>
  </div>
  <!-- script -->
  <script src="./inc/jquery.js"></script>
  <script src="./inc/bootstrap.js"></script>

  <script>
    $('#select_quy_trinh').on('change', function (e) {
        let id = `#quy_trinh_${e.target.value}`;
        $("[id^=quy_trinh]").hide()
        $(id).show()
    })
  </script>
</body>

</html>