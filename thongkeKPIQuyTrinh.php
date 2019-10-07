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
        $.post("./json/jsonQT.php", function(res) {
            let myObj = JSON.parse(res);
            renderChartKPI_TCT(myObj, 'PI<sub>1</sub>: Tỷ lệ ĐT,DA đạt mức tuân thủ',null)
        });
        let Pi2 = [
            {
                name: 'TCT',
                data: [
                    [getDate('2019-07'),82],
                    [getDate('2019-08'),84],
                    [getDate('2019-09'),84],
                    [getDate('2019-10'),84],
                ],
            },
            {
                name: 'Khối 1',
                data: [
                    [getDate('2019-07'),78],
                    [getDate('2019-08'),71],
                    [getDate('2019-09'),64],
                    [getDate('2019-10'),64],
                ],
            },
            {
                name: 'Khối 2',
                data: [
                    [getDate('2019-07'),88],
                    [getDate('2019-08'),100],
                    [getDate('2019-09'),100],
                    [getDate('2019-10'),100],
                ],
            },
            {
                name: 'Khối 3',
                data: [
                    [getDate('2019-07'),0],
                    [getDate('2019-08'),100],
                    [getDate('2019-09'),100],
                    [getDate('2019-10'),100],
                ],
            },
            {
                name: 'Mục tiêu',
                data: [
                    [getDate('2019-07'),80],
                    [getDate('2019-08'),80],
                    [getDate('2019-09'),80],
                    [getDate('2019-10'),80],
                ],
                color: '#000'
            },
        ];
        let Pi3 = [
            {
                name: 'TCT',
                data: [
                    [getDate('2019-07'),50],
                    [getDate('2019-08'),76],
                    [getDate('2019-09'),76],
                    [getDate('2019-10'),76],
                ]
            },
            {
                name: 'Khối 1',
                data: [
                    [getDate('2019-07'),71],
                    [getDate('2019-08'),90],
                    [getDate('2019-09'),100],
                    [getDate('2019-10'),100],
                ]
            },
            {
                name: 'Khối 2',
                data: [
                    [getDate('2019-07'),29],
                    [getDate('2019-08'),100],
                    [getDate('2019-09'),88],
                    [getDate('2019-10'),88],
                ]
            },
            {
                name: 'Khối 3',
                data: [
                    [getDate('2019-07'),100],
                    [getDate('2019-08'),0],
                    [getDate('2019-09'),0],
                    [getDate('2019-10'),0],
                ]
            },
            {
                name: 'Mục tiêu',
                data: [
                    [getDate('2019-07'),100],
                    [getDate('2019-08'),100],
                    [getDate('2019-09'),100],
                    [getDate('2019-10'),100],
                ],
                color: '#000'
            },
        ];
        let Pi4 = [
            {
                name: 'TCT',
                data: [
                    [getDate('2019-07'),7],
                    [getDate('2019-08'),10],
                    [getDate('2019-09'),14],
                    [getDate('2019-10'),14],
                ]
            },
            {
                name: 'Khối 1',
                data: [
                    [getDate('2019-07'),14],
                    [getDate('2019-08'),20],
                    [getDate('2019-09'),11],
                    [getDate('2019-10'),11],
                ]
            },
            {
                name: 'Khối 2',
                data: [
                    [getDate('2019-07'),0],
                    [getDate('2019-08'),0],
                    [getDate('2019-09'),0],
                    [getDate('2019-10'),0],
                ]
            },
            {
                name: 'Khối 3',
                data: [
                    [getDate('2019-07'),null],
                    [getDate('2019-08'),0],
                    [getDate('2019-09'),50],
                    [getDate('2019-10'),50],
                ]
            },
            {
                name: 'Mục tiêu',
                data: [
                    [getDate('2019-07'),3],
                    [getDate('2019-08'),3],
                    [getDate('2019-09'),3],
                    [getDate('2019-10'),3],
                ],
                color: '#000'
            },
        ];
        let Pi5 = [
            {
                name: 'TCT',
                data: [
                    [getDate('2019-07'),72],
                    [getDate('2019-08'),73],
                    [getDate('2019-09'),75],
                    [getDate('2019-10'),75],
                ]
            },
            {
                name: 'Khối 1',
                data: [
                    [getDate('2019-07'),71],
                    [getDate('2019-08'),64],
                    [getDate('2019-09'),69],
                    [getDate('2019-10'),69],
                ]
            },
            {
                name: 'Khối 2',
                data: [
                    [getDate('2019-07'),74],
                    [getDate('2019-08'),81],
                    [getDate('2019-09'),80],
                    [getDate('2019-10'),80],
                ]
            },
            {
                name: 'Khối 3',
                data: [
                    [getDate('2019-07'),null],
                    [getDate('2019-08'),73],
                    [getDate('2019-09'),77],
                    [getDate('2019-10'),77],
                ]
            }
        ];
        renderChart('chart_2', Pi2, '<a href="quytrinh.php"><div>PI<sub>2</sub>: Tỷ lệ ĐT,DA được đánh giá (TCT)</div></a>');
        renderChart('chart_3', Pi3, '<a href="quytrinh.php"><div>PI<sub>3</sub>: Tỷ lệ ĐT,DA được audit (TCT)</div></a>');
        renderChart('chart_4', Pi4, '<a href="quytrinh.php"><div>PI<sub>4</sub>: Tỷ lệ ĐT,DA có mức tuân thủ thấp (TCT)</div></a>');
        renderChart('chart_5', Pi5, '<a href="quytrinh.php"><div>PI<sub>5</sub>: Mức độ ĐT,DA tuân thủ trung bình (TCT)</div></a>');
    </script>

</body>

</html>