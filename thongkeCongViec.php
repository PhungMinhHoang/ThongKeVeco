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
        <div class="row">
            <div class="col-xl-6 col-lg-12 ">
                <div class="content">
                    <div id="chart_5" class="ct-chart"></div>
                </div>
            </div>
            <div class="col-xl-6 col-lg-12 ">
                <div class="content">
                    <div id="chart_6" class="ct-chart"></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-6 col-lg-12 ">
                <div class="content">
                    <div id="chart_7" class="ct-chart"></div>
                </div>
            </div>
            <div class="col-xl-6 col-lg-12 ">
                <div class="content">
                    <div id="chart_8" class="ct-chart"></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-6 col-lg-12 ">
                <div class="content">
                    <div id="chart_9" class="ct-chart"></div>
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
        $.get("./json/json.php", function(res) {
            let myObj = JSON.parse(res);
            renderChart(myObj, 'chart_1', tuy_chon_1, 'Tổng quan công việc trên Veco ');
            renderChart(myObj, 'chart_2', tuy_chon_2, 'Tình hình thực hiện công việc ');
        });
        let department;
        $.get("./json/jsonDepartment.php", function(res) {
            department = JSON.parse(res);
        });
        $.get("./json/jsonVHTReport.php", function(res) {
            let myObj = JSON.parse(res);
            renderChart3(myObj,department, 'chart_3', 'Tổng số công việc cần hoàn thành ');
            renderChart4(myObj,department, 'chart_4', 'Tỷ lệ việc chưa hoàn thành ');
            renderChart5(myObj,department, 'chart_5', 'Tỷ lệ việc hoàn thành không đúng hạn ');
            renderChart6(myObj,department, 'chart_6', 'Tỷ lệ giải quyết việc tồn đọng ');
            renderChart7(myObj,department, 'chart_7', 'Tỷ lệ hoàn thành việc trong tháng/người ');
            renderChart8(myObj,department, 'chart_8', 'Tỷ lệ chuyển việc thực hiện nhỏ hơn 2 ngày ');
            renderChart9(myObj,department, 'chart_9', 'Tỷ lệ việc chờ duyệt quá 3 ngày ');
        });
    </script>

</body>

</html>