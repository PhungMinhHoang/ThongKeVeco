//chartThongKeCongViec
let tuy_chon_1 = ['viec_duoc_giao', 'viec_hoan_thanh_khong_dung_han', 'viec_hoan_thanh_dung_han', 'viec_chua_hoan_thanh'],
    tuy_chon_2 = ['viec_dang_thuc_hien', 'viec_tu_choi', 'viec_tam_dung', 'viec_khoi_tao_moi', 'viec_cho_duyet', 'viec_de_nghi_dung', 'viec_vuong_mac_de_xuat', 'viec_khac'];
//chartThongKeNhiemVuThangK2
let tuy_chon_3 = ['nhiem-vu-TGD-giao', 'nhiem-vu-PTGD-giao'];

function renderChart(myObj, chart, types, title, subtitle) {
    Highcharts.setOptions({
        colors: ['#058DC7', '#ED561B', '#50B432', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
        lang: {
            drillUpText: 'Back'
        }
    });
    Highcharts.chart({
        chart: {
            renderTo: chart,
            type: 'column',
            zoomType: 'y',
            style: {
                fontFamily: 'Arial'
            },
            events: {
                drilldown: function (e) {
                    //console.log(e)
                    let str = e.seriesOptions.id;
                    //console.log(str);
                    if (str.indexOf("1") != -1) {
                        str = '(Khối 1)'
                    }
                    else if (str.indexOf("2") != -1) {
                        str = '(Khối 2)'
                    }
                    else if (str.indexOf("3") != -1) {
                        str = '(Khối 3)'
                    }
                    else if (str.indexOf("4") != -1) {
                        str = '(Khối cơ quan)'
                    }
                    this.setTitle({
                        text: title + str
                    });
                },
                drillup: function (e) {
                    this.setTitle({
                        text: title + '(TCT)'
                    });
                }
            },
        },
        title: {
            text: title + '(TCT)',
            useHTML: true
        },
        subtitle: {
            text: subtitle,
            useHTML: true
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
                borderWidth: 0,
                // stacking: 'normal',
                // dataLabels: {
                //     enabled: true
                // }
            },
        },
        series: dataSeries(myObj, types),
        drilldown: {
            series: dataDrilldown(myObj, types)
        },
        credits: false
    });
}

let tuy_chon_4 = ['viec_duoc_giao_thang_truoc', 'viec_duoc_giao_thang'],
    tuy_chon_5 = ['viec_hoan_thanh_khong_dung_han_thang_truoc', 'viec_hoan_thanh_khong_dung_han_thang']

function renderChart3(myObj, department, chart, title) {
    Highcharts.chart({
        chart: {
            renderTo: chart,
            type: 'column',
            zoomType: 'y',
            style: {
                fontFamily: 'Arial'
            },
            events: {
                drilldown: function (e) {
                    let str = e.seriesOptions.id.split('-')[1];
                    this.setTitle({
                        text: title + '(' + str + ')'
                    });
                },
                drillup: function (e) {
                    let str = 'TCT';
                    if (e.seriesOptions.hasOwnProperty('id')) {
                        str = e.seriesOptions.id.split('-')[1];
                    }
                    this.setTitle({
                        text: title + '(' + str + ')'
                    });
                }
            },
        },
        title: {
            text: title + '(TCT)',
            useHTML: true
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
            formatter: function () {
                //  console.log(this)
                let hieuso = this.points[1].y - this.points[0].y
                let html = `<b>${this.points[0].key}</b><br>So với tháng trước: `
                if (hieuso <= 0) {
                    html += `<i class="fas fa-arrow-down"></i>` + hieuso * -1;
                }
                else html += `<i class="fas fa-arrow-up"></i>` + hieuso;

                return html;
            },
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
                },
            },
        },
        series: dataSeriesChart3(myObj),
        drilldown: {
            series: dataDrillDownChart3(myObj, department)
        },
        credits: false
    });
}
function renderChart4(myObj, department, chart, title) {
    Highcharts.chart({
        chart: {
            renderTo: chart,
            type: 'column',
            zoomType: 'y',
            style: {
                fontFamily: 'Arial'
            },
            events: {
                drilldown: function (e) {
                    let str = e.seriesOptions.id.split('-')[1];
                    this.setTitle({
                        text: title + '(' + str + ')'
                    });
                },
                drillup: function (e) {
                    let str = 'TCT';
                    if (e.seriesOptions.hasOwnProperty('id')) {
                        str = e.seriesOptions.id.split('-')[1];
                    }
                    this.setTitle({
                        text: title + '(' + str + ')'
                    });
                }
            },
        },
        title: {
            text: title + '(TCT)',
            useHTML: true
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
            formatter: function () {
                //  console.log(this)
                let hieuso = Math.round(this.points[1].y - this.points[0].y);
                let html = `<b>${this.points[0].key}</b><br>So với tháng trước: `
                if (hieuso <= 0) {
                    html += `<i class="fas fa-arrow-down" style="color: #51cf66;"></i>` + hieuso * -1 + '%';
                }
                else html += `<i class="fas fa-arrow-up" style="color: #ff6b6b;"></i>` + hieuso + '%';

                return html;
            },
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
                    format: "{point.y:.0f}%"
                },
            },
        },
        series: dataSeriesChart4(myObj),
        drilldown: {
            series: dataDrillDownChart4(myObj, department)
        },
        credits: false
    });
}
function renderChart5(myObj, department, chart, title) {
    Highcharts.chart({
        chart: {
            renderTo: chart,
            type: 'column',
            zoomType: 'y',
            style: {
                fontFamily: 'Arial'
            },
            events: {
                drilldown: function (e) {
                    let str = e.seriesOptions.id.split('-')[1];
                    this.setTitle({
                        text: title + '(' + str + ')'
                    });
                },
                drillup: function (e) {
                    let str = 'TCT';
                    if (e.seriesOptions.hasOwnProperty('id')) {
                        str = e.seriesOptions.id.split('-')[1];
                    }
                    this.setTitle({
                        text: title + '(' + str + ')'
                    });
                }
            },
        },
        title: {
            text: title + '(TCT)',
            useHTML: true
        },
        subtitle: {
            text: ''
        },
        xAxis: [{
            type: 'category',
            crosshair: true
        },
        //xAxis for line
        {
            visible: false
        }],
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            formatter: function () {
                let points = this.points;
                if (points[points.length - 1] != undefined && points[points.length - 2] != undefined) {
                    let hieuso = points[points.length - 1].y - points[points.length - 2].y
                    let html = `<b>${points[1].key}</b><br>So với tháng trước: `
                    if (hieuso <= 0) {
                        html += `<i class="fas fa-arrow-down" style="color: #51cf66;"></i>` + hieuso * -1 + '%';
                    }
                    else html += `<i class="fas fa-arrow-up" style="color: #ff6b6b;"></i>` + hieuso + '%';

                    return html;
                }
            },
            shared: true,
            useHTML: true
        },
        legend: {
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        plotOptions: {
            line: {
                color: "#dc3545",
                tooltip: {
                    headerFormat: "",
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y}%</b></td></tr>',
                    footerFormat: "</table>",
                    shared: false,
                    useHTML: true
                }
            },
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: "{point.y:.0f}%"
                },
            },
        },
        series: dataSeriesChart5(myObj),
        drilldown: {
            series: dataDrillDownChart5(myObj, department)
        },
        credits: false
    });
}
function renderChart6(myObj, department, chart, title) {
    Highcharts.chart({
        chart: {
            renderTo: chart,
            type: 'column',
            zoomType: 'y',
            style: {
                fontFamily: 'Arial'
            },
            events: {
                drilldown: function (e) {
                    let str = e.seriesOptions.id.split('-')[1];
                    this.setTitle({
                        text: title + '(' + str + ')'
                    });
                },
                drillup: function (e) {
                    let str = 'TCT';
                    if (e.seriesOptions.hasOwnProperty('id')) {
                        str = e.seriesOptions.id.split('-')[1];
                    }
                    this.setTitle({
                        text: title + '(' + str + ')'
                    });
                }
            },
        },
        title: {
            text: title + '(TCT)',
            useHTML: true
        },
        subtitle: {
            text: ''
        },
        xAxis: [{
            type: 'category',
            crosshair: true
        },
        //xAxis for line
        {
            visible: false
        }],
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            formatter: function () {
                let points = this.points;
                if (points[points.length - 1] != undefined && points[points.length - 2] != undefined) {
                    let hieuso = points[points.length - 1].y - points[points.length - 2].y
                    let html = `<b>${points[1].key}</b><br>So với tháng trước: `
                    if (hieuso <= 0) {
                        html += `<i class="fas fa-arrow-down" style="color: #ff6b6b;"></i>` + Math.round(hieuso) * -1 + '%';
                    }
                    else html += `<i class="fas fa-arrow-up" style="color:  #51cf66;"></i>` + Math.round(hieuso) + '%';

                    return html;
                }
            },
            shared: true,
            useHTML: true
        },
        legend: {
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        plotOptions: {
            line: {
                color: "#28a745",
                tooltip: {
                    headerFormat: "",
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y}%</b></td></tr>',
                    footerFormat: "</table>",
                    shared: false,
                    useHTML: true
                }
            },
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: "{point.y:.0f}%"
                },
            },
        },
        series: dataSeriesChart6(myObj),
        drilldown: {
            series: dataDrillDownChart6(myObj, department)
        },
        credits: false
    });
}
function renderChart7(myObj, department, chart, title) {
    Highcharts.chart({
        chart: {
            renderTo: chart,
            type: 'column',
            zoomType: 'y',
            style: {
                fontFamily: 'Arial'
            },
            events: {
                drilldown: function (e) {
                    let str = e.seriesOptions.id.split('-')[1];
                    this.setTitle({
                        text: title + '(' + str + ')'
                    });
                },
                drillup: function (e) {
                    let str = 'TCT';
                    if (e.seriesOptions.hasOwnProperty('id')) {
                        str = e.seriesOptions.id.split('-')[1];
                    }
                    this.setTitle({
                        text: title + '(' + str + ')'
                    });
                }
            },
        },
        title: {
            text: title + '(TCT)',
            useHTML: true
        },
        subtitle: {
            text: ''
        },
        xAxis: [{
            type: 'category',
            crosshair: true
        },
        //xAxis for line
        {
            visible: false
        }],
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            formatter: function () {
                let points = this.points;
                if (points[points.length - 1] != undefined && points[points.length - 2] != undefined) {
                    let hieuso = points[points.length - 1].y - points[points.length - 2].y
                    let html = `<b>${points[1].key}</b><br>So với tháng trước: `
                    if (hieuso <= 0) {
                        html += `<i class="fas fa-arrow-down" style="color: #ff6b6b;"></i>` + Math.round(hieuso) * -1 + ' việc';
                    }
                    else html += `<i class="fas fa-arrow-up" style="color:  #51cf66;"></i>` + Math.round(hieuso) + ' việc';

                    return html;
                }
            },
            shared: true,
            useHTML: true
        },
        legend: {
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        plotOptions: {
            line: {
                color: "#28a745",
                tooltip: {
                    headerFormat: "",
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y} việc</b></td></tr>',
                    footerFormat: "</table>",
                    shared: false,
                    useHTML: true
                }
            },
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: "{point.y:.0f} việc"
                },
            },
        },
        series: dataSeriesChart7(myObj),
        drilldown: {
            series: dataDrillDownChart7(myObj, department)
        },
        credits: false
    });
}
function renderChart8(myObj, department, chart, title) {
    Highcharts.chart({
        chart: {
            renderTo: chart,
            type: 'column',
            zoomType: 'y',
            style: {
                fontFamily: 'Arial'
            },
            events: {
                drilldown: function (e) {
                    let str = e.seriesOptions.id.split('-')[1];
                    this.setTitle({
                        text: title + '(' + str + ')'
                    });
                },
                drillup: function (e) {
                    let str = 'TCT';
                    if (e.seriesOptions.hasOwnProperty('id')) {
                        str = e.seriesOptions.id.split('-')[1];
                    }
                    this.setTitle({
                        text: title + '(' + str + ')'
                    });
                }
            },
        },
        title: {
            text: title + '(TCT)',
            useHTML: true
        },
        subtitle: {
            text: ''
        },
        xAxis: [{
            type: 'category',
            crosshair: true
        },
        //xAxis for line
        {
            visible: false
        }],
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            formatter: function () {
                let points = this.points;
                if (points[points.length - 1] != undefined && points[points.length - 2] != undefined) {
                    let hieuso = points[points.length - 1].y - points[points.length - 2].y
                    let html = `<b>${points[1].key}</b><br>So với tháng trước: `
                    if (hieuso <= 0) {
                        html += `<i class="fas fa-arrow-down" style="color: #ff6b6b;"></i>` + Math.round(hieuso) * -1 + '%';
                    }
                    else html += `<i class="fas fa-arrow-up" style="color:  #51cf66;"></i>` + Math.round(hieuso) + '%';

                    return html;
                }
            },
            shared: true,
            useHTML: true
        },
        legend: {
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        plotOptions: {
            line: {
                color: "#28a745",
                tooltip: {
                    headerFormat: "",
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y}%</b></td></tr>',
                    footerFormat: "</table>",
                    shared: false,
                    useHTML: true
                }
            },
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: "{point.y:.0f}%"
                },
            },
        },
        series: dataSeriesChart8(myObj),
        drilldown: {
            series: dataDrillDownChart8(myObj, department)
        },
        credits: false
    });
}
function renderChart9(myObj, department, chart, title) {
    Highcharts.chart({
        chart: {
            renderTo: chart,
            type: 'column',
            zoomType: 'y',
            style: {
                fontFamily: 'Arial'
            },
            events: {
                drilldown: function (e) {
                    let str = e.seriesOptions.id.split('-')[1];
                    this.setTitle({
                        text: title + '(' + str + ')'
                    });
                },
                drillup: function (e) {
                    let str = 'TCT';
                    if (e.seriesOptions.hasOwnProperty('id')) {
                        str = e.seriesOptions.id.split('-')[1];
                    }
                    this.setTitle({
                        text: title + '(' + str + ')'
                    });
                }
            },
        },
        title: {
            text: title + '(TCT)',
            useHTML: true
        },
        subtitle: {
            text: ''
        },
        xAxis: [{
            type: 'category',
            crosshair: true
        },
        //xAxis for line
        {
            visible: false
        }],
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            formatter: function () {
                let points = this.points;
                if (points[points.length - 1] != undefined && points[points.length - 2] != undefined) {
                    let hieuso = points[points.length - 1].y - points[points.length - 2].y
                    let html = `<b>${points[1].key}</b><br>So với tháng trước: `
                    if (hieuso <= 0) {
                        html += `<i class="fas fa-arrow-down" style="color: #51cf66;"></i>` + hieuso * -1 + '%';
                    }
                    else html += `<i class="fas fa-arrow-up" style="color: #ff6b6b;"></i>` + hieuso + '%';

                    return html;
                }
            },
            shared: true,
            useHTML: true
        },
        legend: {
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        plotOptions: {
            line: {
                color: "#dc3545",
                tooltip: {
                    headerFormat: "",
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y}%</b></td></tr>',
                    footerFormat: "</table>",
                    shared: false,
                    useHTML: true
                }
            },
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: "{point.y:.0f}%"
                },
            },
        },
        series: dataSeriesChart9(myObj),
        drilldown: {
            series: dataDrillDownChart9(myObj, department)
        },
        credits: false
    });
}
