function renderChart(chart,dataColumn,dataLine,title,maxY){
    maxY = (maxY==undefined) ? 100 : maxY;
    Highcharts.setOptions({
        //colors: ['#0275d8','#5cb85c']
    });
    Highcharts.chart({
        chart: {
            renderTo: chart,
            type: 'column',
            zoomType: 'y',
            style: {
                fontFamily: 'Arial'
            },
			/*
			events: {
				load: function() {
					const chart = this;
					setTimeout(function(){
						chart.exportChart()
					},1000)
				}
			}
			*/
        },
        title: {
            text: title,
            useHTML:true
        },
        subtitle: {
            text: ''
        },
        xAxis: [
            {
                categories: ['TCT','Khối 1','Khối 2','Khối 3'],
                crosshair:true,
            },
            //xAxis for line
            {
                visible: false,
                //"opposite": true,
            }
        ],
        yAxis: {
            min: 0,
            max: maxY,
            allowDecimals: false,
            //tickInterval: 10,
            title: {
                text: ''
            },
            labels: {
                formatter: function () {
                    return this.value + '%';
                }
            }
        },
        
        legend: {
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.0f}%'
                },
                // colorByPoint: true,
                tooltip: {
                },
            },
            line:{
                color: '#000',
                tooltip: {
                    headerFormat: '',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y} %</b></td></tr>',
                    footerFormat: '</table>',
                    shared: false,
                    useHTML: true
                }
            }
        },
        series: [
            {
                name: 'Tỷ lệ tháng 7',
                data: dataColumn[0],
                "xAxis": 0,
                "yaxis": 0,
            },
            {
                name: 'Tỷ lệ tháng 8',
                data: dataColumn[1],
                "xAxis": 0,
                "yaxis": 0,
            },
			{
                name: 'Tỷ lệ tháng 9',
                data: dataColumn[2],
                "xAxis": 0,
                "yaxis": 0,
            },
            {
                type: 'line',
                name: 'Mục tiêu',
                data: dataLine,
                "xAxis": 1,
                "yaxis": 1,
            }

        ],   
        credits : false
    });
}

