
function getData(data, department) {
    let rs = [];
    data.forEach(element => {
        rs.push([getDate(element.thoigian), parseInt(element[department])])
    });
    return rs;
}

function dataSeries(myObj, pi) {
    let data = myObj[pi];
    let rs = [{
        name: 'TCT',
        data: getData(data, 'TCT')
    }, {
        name: 'Khối 1',
        data: getData(data, 'K1')
    }, {
        name: 'Khối 2',
        data: getData(data, 'K2')
    }, {
        name: 'Khối 3',
        data: getData(data, 'K3')
    }]
    if (pi != 'Pi5') {
        rs.push({
            name: 'Mục tiêu',
            data: getData(data, 'muc_tieu'),
            color: '#000',
        });
    }
    return rs;

}
function renderChart(myObj, chart, pi, title) {
    Highcharts.setOptions({
        colors: ["#0275d8", "#5cb85c", "#f0ad4e", "#d9534f"],
        lang: {
            drillUpText: 'Back'
        },
    });
    Highcharts.chart({
        chart: {
            renderTo: chart,
            type: "line",
            zoomType: "x",
            style: {
                fontFamily: "Arial"
            },
        },
        title: {
            text: title,
            useHTML: true
        },
        xAxis: {
            type: "datetime",
            minPadding: 0.1,
            maxPadding: 0.1,
            startOnTick: false,
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat("%m-%Y", this.value);
                }
            }
        },
        yAxis: {
            //min: 0,
            //max: 100,
            allowDecimals: false,
            //tickInterval: 20,
            title: {
                text: ""
            },
            labels: {
                formatter: function () {
                    return this.value + "%";
                }
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b><br/>',
            valueSuffix: ' %',
            shared: false
        },
        legend: {
            borderColor: "#CCC",
            borderWidth: 1,
            shadow: false
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.0f}%'
                },
                enableMouseTracking: true
            }
        },
        series: dataSeries(myObj, pi),
        credits: false,

    });
}

