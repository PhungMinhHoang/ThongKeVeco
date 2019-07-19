function getDate(date) {
    date = new Date(date)
    return date.getTime();
}

function dataKPI(myObj){
    let data = []
    let names = Object.keys(myObj)
    for (const name of names) {
        let dataPoint = []
        for (const point of myObj[name]) {
                dataPoint.push([getDate(point.thoigian),Number(point.diem)])
        }
        data.push({name:name,data:dataPoint})
    }
    return data
}

function renderChartKPI(myObj){
    Highcharts.chart( {
        chart: {
            renderTo: 'chart_KPI_quytrinh',
            style: {
                fontFamily: 'Arial'
            },
            zoomType: 'x',
            //giu shift de keo
            panning: true,
            panKey: 'shift'
        },
        title: {
            useHTML:true,
            text: 'KPI Tuân thủ quy trình: '+$('#select_quy_trinh option:selected').text()
        },
        xAxis: {
            type: 'datetime',
            labels: {
                formatter: function() {
                  return Highcharts.dateFormat('%m-%Y',this.value);
                }
            },
        },
        yAxis: {
            title: {
                text: '% KPI',
            },
            allowDecimals: false,
            min: 0,
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
        legend: {
            
        },
        series: dataKPI(myObj),
        credits : false
    })
}

function renderChartKPI_TCT(myObj,title){
    let seri,data = [];
    for (const thoigian in myObj) {
        data.push([getDate(thoigian),Number(myObj[thoigian])])
    }
    seri = [{
        name: 'TCT',
        data: data
    }]
    
    Highcharts.chart( {
        chart: {
            renderTo: 'chart_KPI_quytrinh',
            style: {
                fontFamily: 'Arial'
            },
            zoomType: 'x',
            //giu shift de keo
            panning: true,
            panKey: 'shift'
        },
        title: {
            useHTML:true,
            text: title
        },
        xAxis: {
            type: 'datetime',
            labels: {
                formatter: function() {
                  return Highcharts.dateFormat('%m-%Y',this.value);
                }
            },
        },
        yAxis: {
            title: {
                text: '% KPI',
            },
            allowDecimals: false,
            min: 0,
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
        legend: {
            
        },
        series: seri,
        credits : false
    })
}