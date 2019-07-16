
let tuy_chon = ['khong_cap_nhat']    
function renderChartVeco(myObj,chart,types,title){
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
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px"><b>{point.key}</b></span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} người</b></td></tr>',
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
                dataLabels: {
                    enabled: true,
                }
            },
        },
        series: dataSeries(myObj,types,'#a94442'),  
        drilldown: {
            series: dataDrilldown(myObj,types)
        },
        credits : false
    });
}

