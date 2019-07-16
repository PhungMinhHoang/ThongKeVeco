function getDate(date) {
    date = new Date(date)
    return date.getTime();
}


function dataDuAn(myObj,idDuAn){
    let data = []
    let tenDuAn
    for (const point of myObj) {
        if (point.du_an_id == idDuAn) {
            tenDuAn = point.ten
            // console.log(point.thoigion+typeof(point.thoigion))
            data.push([getDate(point.thoigian),Number(point.diem)])
        }
    }
    // console.log("dataDuAn")
    // console.log({name: tenDuAn,data:data})
    return {name: tenDuAn,data:data}
}

function dataKPI(myObj,du_an){
    data = []
    for (const id of du_an) {
        data.push(dataDuAn(myObj,id))
    }
    return data
}

function renderChartKPI(myObj,du_an,title){
    let seri;
    if(du_an==null){
        let data = []
        
        for (const thoigian in myObj) {
            data.push([getDate(thoigian),Number(myObj[thoigian])])
        }
        seri = [{
            name: 'TCT',
            data: data
        }]
    }
    else seri = dataKPI(myObj,du_an)

    title = (title === undefined) ? 'KPI Tuân thủ quy trình: '+$('#select_quy_trinh option:selected').text() : title;
    
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