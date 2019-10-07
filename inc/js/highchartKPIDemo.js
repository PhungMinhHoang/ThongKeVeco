function renderChart(chart,dataSeries,title){
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
			title:{
				text:""
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
        series: dataSeries,
        credits: false,

    });
}

