<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('database.php');

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
    return $option;
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
    return $option;
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
    return $option;
}
$listDeTai = listDeTai($db);
$listDonVi = listDonVi($db);

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Thong Ke Quy Trinh</title>
    <!-- bootstrap -->
    <link rel="stylesheet" href="./inc/bootstrap/bootstrap.min.css">
    <!-- css -->
    <link rel="stylesheet" type="text/css" href="inc/css/multi-select.css">
    <link rel="stylesheet" type="text/css" href="inc/css/main.css">
    <style>
        select {width: 100%}
        div {margin: 5px auto}
        .ms-container { width: 100%;}
    </style>
    <script src="./inc/jquery.js"></script>

    <!-- quicksearch -->
    <script src="inc/js/quicksearch.js"></script>
    <!-- multiSelect -->
    <script src="inc/js/jquery.multi-select.js"></script>
    <script src="inc/js/multi-select-config.js"></script>
    
</head>

<body>
    <header>
        <img src="./inc/img/logo.png" width="90px" height="90px">
        <h1>THỐNG KÊ TUÂN THỦ QUY TRÌNH</h1>
    </header>

    <div class='container'>

        <div id='filter'>
            <div class = "row">
                <select name="kieu_xem" id='select_kieu_xem'>
                    <!-- <option value="">Chọn kiểu xem</option> -->
                    <option value='de_tai'>Đề tài/Dự án</option>
                    <option value='don_vi'>Đơn vị</option>
                </select>
            </div>
            <div class = "row">
                <select name="quy_trinh" id='select_quy_trinh'>
                    <!-- <option value="">Chọn quy trình áp dụng</option> -->
                    <?php
                        echo listQuyTrinh($db);
                    ?>
                </select>
            </div>
            <div class = "row">
                <select id='select_multi' multiple='multiple' class='searchable'>
                    <?php
                        // Bien list chua danh sach duoc chon tu multi select
                        echo 
                        "<script>
                            $('#select_multi').html('$listDeTai')
                            var list = []
                            $('#select_kieu_xem').change(function(){
                                list= []
                                let kieu_xem = $(this).val()
                                if(kieu_xem == 'de_tai'){
                                    $('#select_multi').html('$listDeTai')
                                    $('.searchable').multiSelect('refresh')
                                    $('#select_quy_trinh').attr('disabled',false)
                                }
                                else {
                                    $('#select_multi').html('$listDonVi')
                                    $('.searchable').multiSelect('refresh')
                                    $('#select_quy_trinh').val(7)
                                    $('#select_quy_trinh').attr('disabled',true)
                                }
                            })
                        </script>"; 
                    ?>
                </select>
                <div style="width: fit-content; margin: 0 auto;"><button id='filter_button'>Xác nhận</button></div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-">
                <div class="content">
                    <div id='chart_KPI_quytrinh' style="min-width: 310px; height: 400px; margin: 0 auto" class="ct-chart"></div>
                </div>
            </div>
        </div>      

    </div>


    <script src="./inc/bootstrap.js"></script>
    <!-- highchart -->
    <script src="inc/Highcharts-7.1.2/code/highcharts.src.js"></script>
    <script src="inc/Highcharts-7.1.2/code/modules/exporting.js"></script>
    <script src="inc/Highcharts-7.1.2/code/modules/export-data.js"></script>
    <script src="inc/Highcharts-7.1.2/code/modules/data.js"></script>
    <script src="inc/Highcharts-7.1.2/code/modules/drilldown.js"></script>

    <script src="inc/js/highchartKPI.js"></script>
    
</body>


</html>
