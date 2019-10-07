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
            data: dataPoint,
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
 * @param {Object} data Bộ dữ liệu của đơn v
 *
 */
function getAverageDepartment(data) {
    let sum = data.reduce((acc, obj) => {
        return acc + Number(obj.diem)
    }, 0)
    return Math.round(sum / data.length);
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
 * @param {Object} data Bộ dữ liệu nhom theo thoigian
 * @param {Integer} point Mức tuân thủ quy trình 
 *
 */
function dataSeriesKPI(data, point) {
    let dataPoint = [],index = 0;
    let rs = [];
    //TCT
    for (const thoigian in data) {
        let ProjectRate = Math.round(data[thoigian].filter(obj => {
            return obj.diem >= point
        }).length * 100 / data[thoigian].length)
        dataPoint.push({
            y: ProjectRate,
            x: getDate(thoigian),
            name: thoigian,
        })
    }
    rs.push({
        name: 'TCT',
        data: dataPoint,
    })
    //Khối
    for (let khoi = 1; khoi <= 3; khoi++) {
        dataPoint = [];
        for (const thoigian in data) {
            let dataKhoi = data[thoigian].filter(obj => {
                return obj.khoi == khoi
            })
            ProjectRate = Math.round(data[thoigian].filter(obj => {
                return (obj.diem >= point && obj.khoi == khoi)
            }).length * 100 / dataKhoi.length)
            dataPoint.push({
                y: ProjectRate,
                x: getDate(thoigian),
                name: thoigian,
                drilldownName: khoi,
                drilldown: true,
            })
        }
        rs.push({
            name: `Khối ${khoi}`,
            data: dataPoint,
        })
    }
    //Mục tiêu
    dataPoint = [];
    for (const thoigian in data) {
        dataPoint.push({
            y: 70,
            x: getDate(thoigian),
            name: thoigian,
        })
    }
    rs.push({
        name: 'Mục tiêu',
        data: dataPoint,
        color: '#000',
    })
    return rs;
}

function dataKhoiKPI(myObj, khoi) {
    let dataPoint = [], rs = [], index = 0;
    let filterKhoi = myObj.filter(obj => {
        return obj.khoi == khoi
    })
    data = groupBy(filterKhoi, 'ten_don_vi')
    for (const department in data) {
        dataPoint = [];
        let dataDepartment = groupBy(data[department], 'thoigian');
        for (const thoigian in dataDepartment) {
            dataPoint.push({
                y: getAverageDepartment(dataDepartment[thoigian]),
                x: getDate(thoigian),
                name: thoigian,
                drilldownName: department,
                drilldown: true
            })
        }
        rs.push({
            name: department,
            data: dataPoint,
            color: Highcharts.getOptions().colors[index++],
        })
    }

    //Mục tiêu
    dataPoint = [];
    for (const thoigian in groupBy(filterKhoi,'thoigian')) {
        dataPoint.push({
            y: 70,
            x: getDate(thoigian),
            name: thoigian,
        })
    }
    rs.push({
        name: 'Mục tiêu',
        data: dataPoint,
        color: '#000',
    })
    return rs;
}
function dataDepartmentKPI(myObj, department) {
    let dataPoint = [], rs = [], index = 0;
    let filterDepartment = myObj.filter(obj => {
        return obj.ten_don_vi == department
    })
    let data = groupBy(filterDepartment, 'ten_du_an')
    for (const project in data) {
        dataPoint = [];
        let dataProject = groupBy(data[project], 'thoigian');
        for (const thoigian in dataProject) {
            dataPoint.push({
                y: Number(dataProject[thoigian][0].diem),
                x: getDate(thoigian),
                name: thoigian,
            })
        }
        rs.push({
            name: project,
            data: dataPoint,
            color: Highcharts.getOptions().colors[index++],
        })
    }
    //Mục tiêu
    dataPoint = [];
    for (const thoigian in groupBy(filterDepartment,'thoigian')) {
        dataPoint.push({
            y: 70,
            x: getDate(thoigian),
            name: thoigian,
        })
    }
    rs.push({
        name: 'Mục tiêu',
        data: dataPoint,
        color: '#000',
    })
    return rs;
}

function renderChartKPI_TCT(myObj, title, subtitle) {
    let drilldownLevel = 0;
    let newTitle = title + ' (TCT)';
    let drillupTitle = [title + ' (TCT)'];
    Highcharts.setOptions({
        colors: ["#0275d8", "#5cb85c", "#f0ad4e", "#d9534f"],
        lang: {
            drillUpText: 'Back'
        },
    });
    Highcharts.chart({
        chart: {
            renderTo: "chart_KPI_quytrinh",
            type: "line",
            zoomType: "x",
            style: {
                fontFamily: "Arial"
            },
            events: {
                drilldown: function (e) {
                    drilldownLevel++;
                    let series, khoi, department;
                    let chart = this;
                    //str = e.seriesOptions;
                    if (drilldownLevel == 1) {
                        khoi = e.point.drilldownName;
                        series = dataKhoiKPI(myObj, khoi);
                        newTitle = `PI<sub>1</sub>: Tỷ lệ ĐT,DA đạt mức tuân thủ (Khối ${khoi})`
                        drillupTitle[drilldownLevel] = newTitle;
                    }
                    else if (drilldownLevel == 2) {
                        department = e.point.drilldownName;
                        series = dataDepartmentKPI(myObj, department);
                        newTitle = `PI<sub>0</sub>: Mức độ tuân thủ quy trình (${department})`
                        drillupTitle[drilldownLevel] = newTitle;
                    }
                    series.forEach(seri => {
                        chart.addSingleSeriesAsDrilldown(e.point, seri);
                    });
                    chart.applyDrilldown();
                    this.setTitle({
                        text: newTitle
                    });
                    console.log('drilldown', drilldownLevel, drillupTitle)
                },
                drillup: function (e) {
                    str = e.seriesOptions.name;
                    if (str.indexOf("Khối") != -1) {
                        drilldownLevel = 0;
                        newTitle = drillupTitle[drilldownLevel];
                    }
                    else {
                        drilldownLevel = 1;
                        newTitle = drillupTitle[drilldownLevel];
                    }
                    this.setTitle({
                        text: newTitle
                    });
                    //console.log('up',drilldownLevel);
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
            title: {
                text: ""
            },
            //min: 0,
            //max: 100,
            allowDecimals: false,
            //tickInterval: 20,
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
        series: dataSeriesKPI(groupBy(myObj, 'thoigian'), 70),
        credits: false,

    });
}