<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>VHT Report</title>
    <!-- bootsrap -->
    <link rel="stylesheet" href="./inc/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="./inc/bootstrap/bootstrap-grid.min.css"> 
    <link rel="stylesheet" href="./inc/bootstrap/bootstrap-reboot.min.css">  
    <!-- css -->
    <link rel="stylesheet" href="./inc/css/main.css">  
    <link rel="stylesheet" href="./inc/css/fontawesome-free-5.9.0-web/css/all.css">   

</head>

<body >
    <header>
        <img src="./inc/img/logo.png" width="90px" height="90px">
        <h1>Hệ thống Thống kê báo cáo VHT</h1>
    </header>
    <div class='container-fluid'>

        <div class="row">
            <div class="col-md-6 ">
                <div class="content">
                    <div id="chart_NhiemVuK2" class="ct-chart"></div>
                </div>
            </div>

            <div class="col-md-6 ">
                <div class="content">
                    <div id="chart_KetLuanK2" class="ct-chart"></div>
                </div>
            </div>
        </div>

    </div>

    <!-- script -->
    <script src="./inc/jquery.js"></script>
    <script src="./inc/bootstrap.js"></script>

    <!-- highchart -->
    <script src="./inc/Highcharts-7.1.2/code/highcharts.src.js"></script>
    <script src="./inc/Highcharts-7.1.2/code/modules/exporting.js"></script>
    <script src="./inc/Highcharts-7.1.2/code/modules/export-data.js"></script>
    <script src="./inc/Highcharts-7.1.2/code/modules/data.js"></script>
    <script src="./inc/Highcharts-7.1.2/code/modules/drilldown.js"></script>

    <!-- my js -->
    <script src="inc/js/myFunction.js"></script>

    <script src="inc/js/highchart.js"></script>
    <script src="inc/js/highchartKetLuan.js"></script>
    
    <script>
        
        $.get( "./json/json.php", function(res) {
            let myObj = JSON.parse(res);
            renderChart(myObj,'chart_NhiemVuK2',tuy_chon_3,'<a href="thongkeNhiemVuThangK2.php">Thống Kê Nhiệm Vụ</a>');
            renderChartKetLuan(myObj,'chart_KetLuanK2',tuy_chon_4,'<a href="thongkeKetLuan.php">Thống Kê Kết Luận</a>');
        }); 
    
    </script>

</body>

</html>