
let tuy_chon_1 = ['viec_duoc_giao','viec_hoan_thanh_khong_dung_han','viec_hoan_thanh_dung_han','viec_chua_hoan_thanh'],
    tuy_chon_2 = ['viec_dang_thuc_hien','viec_tu_choi','viec_tam_dung','viec_khoi_tao_moi','viec_cho_duyet','viec_de_nghi_dung','viec_vuong_mac_de_xuat','viec_khac'];
function renderChart(myObj,chart,types,title){
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
                borderWidth: 0
            },
        },
        series: dataSeries(myObj,types),   
        drilldown: {
            series: dataDrilldown(myObj,types)
        },
        credits : false
    });
}

