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
function renderChart3(myObj, chart, types, title) {
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
        series: dataSeries(myObj, types, ["#0275d8", "#5cb85c"]),
        drilldown: {
            series: dataDrilldown(myObj, types)
        },
        credits: false
    });
}
function renderChart4(myObj, chart, types, title) {
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
        series: dataSeries(myObj, types, ['#FFA500', '#a94442']),
        drilldown: {
            series: dataDrilldown(myObj, types)
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
        series: dataSeriesChart6(myObj),
        drilldown: {
            series: dataDrillDownChart6(myObj, department)
        },
        credits: false
    });
}