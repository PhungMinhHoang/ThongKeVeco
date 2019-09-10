
//chartKetLuan
let tuy_chon_4 = ['ket-luan-qua-han-TD','ket-luan-TD','ket-luan-qua-han-TCT','ket-luan-TCT','ket-luan-qua-han-K2','ket-luan-K2'];

function renderChartKetLuan(myObj,chart,types,title){
    Highcharts.chart({
        chart: {
            renderTo: chart,
            type: 'column',
            zoomType: 'y',
            style: {
                fontFamily: 'Arial'
            },
        },
        title: {
            text: title,
            useHTML:true
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'category',
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },
            stackLabels: {
                enabled: true,
                align: 'center',
                formatter: function() {
                    return this.stack;
                }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px"><b>{point.key}</b></span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} việc</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
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
                stacking: 'normal',
                dataLabels: {
                    enabled: true
                }
            },
        },
        series: dataSeriesStack(myObj,types),   
        drilldown: {
            series: dataDrilldownStack(myObj,types)
        },
        credits : false
    });
}

