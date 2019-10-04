<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Thong Ke Veco</title>

    <!-- bootsrap -->
    <link rel="stylesheet" href="./inc/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="./inc/bootstrap/bootstrap-grid.min.css">
    <!-- css -->
    <link rel="stylesheet" href="./inc/css/main.css"> 
    <link rel="stylesheet" href="./inc/css/fontawesome-free-5.9.0-web/css/all.css"> 
    
</head>
<body>
    <header>
        <img src="./inc/img/logo.png" width="90px" height="90px">
        <h1>Thống kê Veco</h1>
    </header>
    <div class='container-fluid'>
        <div class="row">
            <div class="col-xl-6 col-lg-12 ">
                <div class="content">
                    <div id="chart_1" class="ct-chart"></div>
                </div>
            </div>
            <div class="col-xl-6 col-lg-12 ">
                <div class="content">
                    <div id="chart_2" class="ct-chart"></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-6 col-lg-12 ">
                <div class="content">
                    <div id="chart_3" class="ct-chart"></div>
                </div>
            </div>
            <div class="col-xl-6 col-lg-12 ">
                <div class="content">
                    <div id="chart_4" class="ct-chart"></div>
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

    <script src="inc/js/myFunction.js"></script>
    <script src="inc/js/highchart.js"></script>
    <script>
        $.get( "./json/json.php", function(res) {
            let myObj = JSON.parse(res);
            renderChart(myObj,'chart_1',tuy_chon_1,'Tổng quan công việc trên Veco ');
            renderChart(myObj,'chart_2',tuy_chon_2,'Tình hình thực hiện công việc ');
            renderChart3(myObj,'chart_3',tuy_chon_4,'Tổng số công việc cần hoàn thành trong tháng ');
            renderChart4(myObj,'chart_4',tuy_chon_5,'Thống kê % việc hoàn thành chậm trong tháng ');
        }); 
    
    </script>
    
</body>
</html>
