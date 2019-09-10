<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>KPI Tuân thủ quy trình</title>
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
        <h1>kết quả đánh giá tuân thủ quy trình của các đề tài/dự án</h1>
    </header>
    <div class='container-fluid'>

        <div class="row">
            <div class="col-md-6 ">
                <div class="content">
                    <div id="chart_1" class="ct-chart"></div>
                </div>
            </div>

            <div class="col-md-6 ">
                <div class="content">
                    <div id="chart_2" class="ct-chart"></div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-6 ">
                <div class="content">
                    <div id="chart_3" class="ct-chart"></div>
                </div>
            </div>
        
            <div class="col-md-6 ">
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

    <!-- my js -->
    <script src="inc/js/highchartKPIDemo.js"></script>
    
    <script>
        let dataColumn1 = [[83,77,91,100],[84,71,100,100]],
            dataColumn2 = [[55,60,30,100],[76,90,100,0]],
            dataColumn3 = [[53,54,64,0],[33,20,71,0]],
            dataColumn4 = [[3,4,0,0],[19,20,0,50]];
        let dataLine1 = [80,80,80],
            dataLine2 = [100,100,100],
            dataLine3 = [70,70,70],
            dataLine4 = [3,3,3];
        renderChart('chart_1',dataColumn1,dataLine1, '<a href="quytrinh.php">TỶ LỆ CÁC ĐỀ TÀI/DỰ ÁN ĐƯỢC ĐÁNH GIÁ</a>');
        renderChart('chart_2',dataColumn2,dataLine2, '<a href="quytrinh.php">TỶ LỆ CÁC ĐỀ TÀI/DỰ ÁN ĐƯỢC AUDIT</a>');
        renderChart('chart_3',dataColumn3,dataLine3, '<a href="quytrinh.php">TỶ LỆ CÁC ĐỀ TÀI/DỰ ÁN ĐẠT MỨC ĐỘ TUÂN THỦ QUY TRÌNH YÊU CẦU</a>');
        renderChart('chart_4',dataColumn4,dataLine4, '<a href="quytrinh.php">TỶ LỆ CÁC ĐỀ TÀI/DỰ ÁN TUÂN THỦ QUY TRÌNH Ở MỨC THẤP</a>');

    </script>

</body>

</html>