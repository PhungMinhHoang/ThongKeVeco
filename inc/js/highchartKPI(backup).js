function getDate(date) {
    date = new Date(date);
    return date.getTime();
}

function dataKPI(myObj) {
    let data = [];
    let names = Object.keys(myObj);
    for (const name of names) {
        let dataPoint = [];
        for (const point of myObj[name]) {
            dataPoint.push([getDate(point.thoigian), Number(point.diem)]);
        }
        data.push({
            name: name,
            data: dataPoint
        });
    }
    return data;
}

function renderChartKPI(myObj) {
    Highcharts.chart({

        chart: {
            renderTo: "chart_KPI_quytrinh",
            style: {
                fontFamily: "Arial"
            },
            zoomType: "x",
            //giu shift de keo
            panning: true,
            panKey: "shift"
        },
        title: {
            useHTML: true,
            text: "KPI Tuân thủ quy trình: " +
                $("#select_quy_trinh option:selected").text()
        },
        xAxis: {
            type: "datetime",
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat("%m-%Y", this.value);
                }
            }
        },
        yAxis: {
            title: {
                text: "% KPI"
            },
            allowDecimals: false,
            min: 0
            // tickInterval: 10,
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        legend: {},
        series: dataKPI(myObj),
        credits: false
    });
}

/**
 *
 * @param {Object} myObj Bộ dữ liệu
 * @param {String} department Tên của bộ phận được thống kê
 * @param {String} time Mốc thời gian  
 *
 */
function getAverageProject(myObj, department, time) {
    let array = myObj.filter(obj => {
        return obj.ten_don_vi == department && obj.thoigian == time;
    })
    let sum = array.reduce((acc, obj) => {
        return acc + Number(obj.diem)
    }, 0)
    return Math.round(sum / array.length);
}

function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
        let key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
}
/**
 *
 * @param {Object} myObj Bộ dữ liệu
 * @param {Integer} point Mức tuân thủ quy trình 
 *
 */
function dataSeriesKPI(data, point) {
    let dataPoint = [];
    let rs = [];
    //TCT
    for (const thoigian in data) {
        let ProjectRate = Math.round(data[thoigian].filter(obj => {
            return obj.diem >= point
        }).length * 100 / data[thoigian].length)
        dataPoint.push([getDate(thoigian), ProjectRate])
    }
    rs.push({
        name: 'TCT',
        data: dataPoint
    })
    //Khối
    for (let index = 1; index <= 3; index++) {
        dataPoint = [];
        for (const thoigian in data) {
            let dataKhoi = data[thoigian].filter(obj => {
                return obj.khoi == index
            })
            ProjectRate = Math.round(data[thoigian].filter(obj => {
                return (obj.diem >= point && obj.khoi == index)
            }).length * 100 / dataKhoi.length)
            dataPoint.push([getDate(thoigian), ProjectRate])
        }
        rs.push({
            name: `Khối ${index}`,
            data: dataPoint
        })

    }
    return rs;
}

function renderChartKPI_TCT(myObj, title, subtitle) {

    // du lieu bieu do line 4 lop TCT->khoi->donvi->detai
    let dataLine = [
        [70, 70, 70],
        [70, 70, 70],
        [70, 70, 70],
        [70, 70, 70]
    ];
    let index = 0;
    let str;
    let newTitle = title + ' (TCT)';
    let drillupTitle = [title + ' (TCT)'];
    Highcharts.setOptions({
        //colors: ["#0275d8", "#5cb85c", "#f0ad4e", "#d9534f"],
        lang: {
            drillUpText: 'Back'
        },
    });
    Highcharts.chart({
        exporting: {
            filename: newTitle.substring(newTitle.indexOf(":") + 2),
        },
        chart: {
            renderTo: "chart_KPI_quytrinh",
            type: "line",
            zoomType: "x",
            style: {
                fontFamily: "Arial"
            },
            events: {
                drilldown: function (e) {
                    str = e.seriesOptions.id;
                    if (str.indexOf("DV") != -1) {
                        index = 3;
                        drillupTitle[index] = newTitle;
                        newTitle = `PI<sub>0</sub>: Mức độ tuân thủ quy trình (${e.point.name})`
                    } else if (str.indexOf("K") != -1) {
                        index = 2;
                        drillupTitle[index] = newTitle;
                        newTitle = `PI<sub>0</sub>: Mức độ tuân thủ quy trình (${e.point.name})`
                    }
                    else if (str.indexOf("TCT") != -1) {
                        index = 1;
                        drillupTitle[index] = newTitle;
                        newTitle = title + ` (${e.point.name})`
                    }
                    this.series[0].setData(dataLine[index]);
                    this.setTitle({
                        text: newTitle
                    });
                    this.options.exporting.filename = newTitle.substring(newTitle.indexOf(":") + 2);
                },
                drillup: function (e) {
                    str = e.seriesOptions.id;
                    if (str === undefined) {
                        index = 0;
                        newTitle = drillupTitle[index];
                    }
                    else if (str.indexOf("K") != -1) {
                        index = 2;
                        newTitle = drillupTitle[index];
                    }
                    else if (str.indexOf("TCT") != -1) {
                        index = 1;
                        newTitle = drillupTitle[index];
                    }
                    this.series[0].setData(dataLine[index]);
                    this.setTitle({
                        text: newTitle
                    });
                    this.options.exporting.filename = newTitle.substring(newTitle.indexOf(":") + 2);
                }
            }
        },
        title: {
            text: title + ' (TCT)',
            useHTML: true
        },
        subtitle: {
            text: subtitle,
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
            min: 0,
            max: 100,
            allowDecimals: false,
            tickInterval: 20,
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
                enableMouseTracking: false
            }
        },
        series: dataSeriesKPI(groupBy(myObj, 'thoigian'), 70),
        drilldown: {
        },
        credits: false,

    });
}