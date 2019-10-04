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

<body>
    <header>
        <img src="./inc/img/logo.png" width="90px" height="90px">
        <h1>kết quả đánh giá tuân thủ quy trình của các đề tài/dự án</h1>
    </header>
    <div class='container-fluid'>
        <div class="row">
            <div class="col-xl-6 col-lg-12 ">
                <div class="content">
                    <div id="chart_KPI_quytrinh" class="ct-chart"></div>
                    <img src="./inc/img/PI1.png" alt="" style="height: 30px;margin: 0;">
                </div>
            </div>
            <div class="col-xl-6 col-lg-12 ">
                <div class="content">
                    <div id="chart_2" class="ct-chart"></div>
                    <img src="./inc/img/PI2.png" alt="" style="height: 30px;margin: 0;">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-6 col-lg-12 ">
                <div class="content">
                    <div id="chart_3" class="ct-chart"></div>
                    <img src="./inc/img/PI3.png" alt="" style="height: 30px;margin: 0;">
                </div>
            </div>
            <div class="col-xl-6 col-lg-12 ">
                <div class="content">
                    <div id="chart_5" class="ct-chart"></div>
                    <img src="./inc/img/PI5.png" alt="" style="height: 30px;margin: 0;">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-6 col-lg-12 ">
                <div class="content">
                    <div id="chart_4" class="ct-chart"></div>
                    <img src="./inc/img/PI4.png" alt=""  style="height: 30px;">
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
    <script src="inc/js/highchartKPI.js"></script>

    <script>
        let dataColumn2 = [
                [82,78,88,0],
                [76,71,100,50],
				[84,64,100,100]
            ],
            dataColumn3 = [
                [50,71,29,100],
                [84,90,100,0],
				[76,100,88,0]
            ],
            dataColumn4 = [
                [7, 14, 0, 0],
                [11, 20, 0, 0],
				[14,11,0,50]
            ];
        dataColumn5 = [
            [72,71,74,null],
            [73,64,81,73],
			[75,69,80,77]
        ]
        let dataLine2 = [80, 80, 80],
            dataLine3 = [100, 100, 100],
            dataLine4 = [3, 3, 3];

        renderChartKPI_TCT(null, '<div title="Tỷ lệ các đề tài/dự án đạt mức độ tuân thủ quy trình">PI<sub>1</sub>:Tỷ lệ ĐT,DA đạt mức tuân thủ</div>')
        renderChart('chart_2', dataColumn2, dataLine2, '<a href="quytrinh.php"><div title="TỶ LỆ CÁC ĐỀ TÀI,DỰ ÁN ĐƯỢC ĐÁNH GIÁ">PI<sub>2</sub>: Tỷ lệ ĐT,DA được đánh giá</div></a>');
        renderChart('chart_3', dataColumn3, dataLine3, '<a href="quytrinh.php"><div title="TỶ LỆ CÁC ĐỀ TÀI,DỰ ÁN ĐƯỢC AUDIT">PI<sub>3</sub>: Tỷ lệ ĐT,DA được audit</div></a>');
        renderChart('chart_4', dataColumn4, dataLine4, '<a href="quytrinh.php"><div title="TỶ LỆ CÁC ĐỀ TÀI,DỰ ÁN TUÂN THỦ QUY TRÌNH Ở MỨC THẤP">PI<sub>4</sub>: Tỷ lệ ĐT,DA có mức tuân thủ thấp</div></a>');
        renderChart('chart_5', dataColumn5, null, '<a href="quytrinh.php"><div title="MỨC ĐỘ TUÂN THỦ TRUNG BÌNH">PI<sub>5</sub>: Mức độ ĐT,DA tuân thủ trung bình</div></a>');
    </script>

</body>

</html>