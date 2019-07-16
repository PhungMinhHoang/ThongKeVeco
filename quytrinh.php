<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once('database.php');

$query="SELECT id,ten FROM du_an";
$statement = $db->prepare($query);
$statement->execute();
$list_du_an = $statement->fetchAll();
$statement->closeCursor();

$query="SELECT id,ten FROM quy_trinh";
$statement = $db->prepare($query);
$statement->execute();
$list_quy_trinh = $statement->fetchAll();
$statement->closeCursor();
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
</head>

<body>
    <header>
        <img src="./inc/img/logo.png" width="90px" height="90px">
        <h1>THỐNG KÊ TUÂN THỦ QUY TRÌNH</h1>
    </header>

    <div class='container'>

        <div class = "row">
            <div id='filter'>
                <select name="quy_trinh" id='select_quy_trinh'>
                    <!-- <option value="">Chọn quy trình áp dụng</option> -->
                    <?php
                        foreach ($list_quy_trinh as $key => $quy_trinh) {
                            $id = $quy_trinh['id'];
                            $ten = $quy_trinh['ten'];
                            echo "<option value=$id>$ten</option>";
                        }
                    ?>
                </select>
                <select id='select_multi' multiple='multiple' class='searchable'>
                    <?php 

                        foreach ($list_du_an as $key => $du_an) {
                            $id = $du_an['id'];
                            $ten = $du_an['ten'];
                            echo "<option value=$id>$ten</option>";
                        }
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

    <script src="./inc/jquery.js"></script>
    <script src="./inc/bootstrap.js"></script>
    <!-- highchart -->
    <script src="inc/Highcharts-7.1.2/code/highcharts.src.js"></script>
    <script src="inc/Highcharts-7.1.2/code/modules/exporting.js"></script>
    <script src="inc/Highcharts-7.1.2/code/modules/export-data.js"></script>
    <script src="inc/Highcharts-7.1.2/code/modules/data.js"></script>
    <script src="inc/Highcharts-7.1.2/code/modules/drilldown.js"></script>

    <script src="inc/js/highchartKPI.js"></script>
    <!-- quicksearch -->
    <script src="inc/js/quicksearch.js"></script>
    <!-- multiSelect -->
    <script src="inc/js/jquery.multi-select.js"></script>
    <script src="inc/js/multi-select-config.js"></script>
    
</body>


</html>
