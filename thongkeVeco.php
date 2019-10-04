<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Thong Ke Sử dụng công cụ</title>

    <!-- bootsrap -->
    <link rel="stylesheet" href="./inc/bootstrap/bootstrap.min.css">
    <!-- css -->
    <link rel="stylesheet" href="./inc/css/main.css">  
    
</head>
<body>
    <header>
        <img src="./inc/img/logo.png" width="90px" height="90px">
        <h1>Thống kê sử dụng công cụ </h1>
    </header>
    <div class='container'>

        <div class="row">
            <div class="col-">
                <div class="content">
                    <div id="chart_Veco" class="ct-chart"></div>
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
    <script src="inc/js/highchartVeco.js"></script>
    <script>
        $.get( "./json/jsonVeco.php", function(res) {
            let myObj = JSON.parse(res);
            console.log(myObj)
            renderChartVeco(myObj,'chart_Veco',tuy_chon, `Sử dụng công cụ tuần ${w} `);

        }); 
    
    </script>
    
</body>
</html>
