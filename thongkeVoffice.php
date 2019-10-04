<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Thong Ke Voffice</title>

    <!-- bootsrap -->
    <link rel="stylesheet" href="./inc/bootstrap/bootstrap.min.css">
    <!-- css -->
    <link rel="stylesheet" href="./inc/css/main.css">
    <link rel="stylesheet" href="./inc/css/fontawesome-free-5.9.0-web/css/all.css">    
    
</head>
<body>
    <header>
        <img src="./inc/img/logo.png" width="90px" height="90px">
        <h1></h1>
    </header>
    <div class='container'>

        <div class="row">
            <div class="col-md-12">
                <div class="content">
                    <div id="chart_TCT" class=""></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <div class="content">
                    <div id="chart_1" class=""></div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="content">
                    <div id="chart_2" class=""></div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="content">
                    <div id="chart_4" class=""></div>
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

    <script src="inc/js/highchartVoffice.js"></script>
    <script>
        var d = new Date();
        var m = d.getMonth();
        $('h1').html(`Thống kê Voffice tháng ${m}`)
        $.get( "./json/jsonVoffice.php", function(res) {
            let myObj = JSON.parse(res);
            renderChartVoffice(myObj,'chart_TCT',0, 'Ban Tổng Giám đốc','','column',300);
            renderChartVoffice(myObj,'chart_1',1, 'Chỉ huy khối 1 + 3','','bar',1000);
            renderChartVoffice(myObj,'chart_2',2, 'Chỉ huy khối 2','','bar',1000);
            renderChartVoffice(myObj,'chart_4',4, 'Chỉ huy khối cơ quan','','bar',1000);
        });
    </script>
    
</body>
</html>
