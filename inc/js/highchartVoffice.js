
function dataVoffice(myObj,khoi,thang){ 
    let data = [];
    if(khoi!=5){
        let dataKhoi = myObj.filter((x)=>{
            return (x.thang == thang && x.khoi == khoi);
        })
        for (let user of dataKhoi) {
            data.push({
                name: user.ten,
                y: parseInt(user.chi_so),
            })
        } 
    }
    // TCT
    else{
        let dataKhoi = [];
        for (let i=0;i<=4;i++){
             dataKhoi[i] = myObj.filter((x)=>{
                return (x.thang == thang && x.khoi == i);
            }).reduce(function(acc,cur){
                return acc + parseInt(cur.chi_so);
            },0)
        }
        data = [{
            name: 'Ban giám đốc',
            y: dataKhoi[0]
        },{
            name: 'Khối 1 + 3',
            y: dataKhoi[1]
            
        },{
            name: 'Khối 2',
            y: dataKhoi[2]
        },{
            name: 'Khối cơ quan',
            y: dataKhoi[4]
        }]
    }
    
    return data
}

function renderChartVoffice(myObj,chart,khoi,title,subtitle,chartType,height){
    Highcharts.chart({
        chart: {
            renderTo: chart,
            type: chartType,
            zoomType: 'y',
            height: height,
            style: {
                fontFamily: 'Arial'
            }
        },
        title: {
            text: title,
            useHTML:true
        },
        subtitle: {
            text: '<b>Đã trừ ĐƠN XIN NGHỈ PHÉP</b><br/>'+'<center>'+subtitle+'</center>',
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
            formatter: function () {
                //  console.log(this)
                let hieuso = this.points[1].y - this.points[0].y
                let html = `<b>${this.points[0].key}</b><br>So với tháng trước: `
                if(hieuso <= 0){
                    html += `<i class="fas fa-arrow-down" style="color: #51cf66;"></i>` + hieuso*-1;
                }
                else html += `<i class="fas fa-arrow-up" style="color: #ff6b6b;"></i>` + hieuso;

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
                }
            },
            bar: {
                dataLabels: {
                    enabled: true
                }
            },
        },
        series: [{
            name: `Số văn bản ký quá 4h làm việc Tháng ${m-1}`,
            data: dataVoffice(myObj,khoi,m-1),
            color: '#428bca',
        },{
            name: `Số văn bản ký quá 4h làm việc Tháng ${m}`,
            data: dataVoffice(myObj,khoi,m),
            color: '#a94442',
        }], 
        credits : false
    });
}
