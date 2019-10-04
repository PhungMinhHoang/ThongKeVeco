
let tuy_chon = ['khong_cap_nhat_tuan_truoc','khong_cap_nhat']    
function renderChartVeco(myObj,chart,types,title){
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
						text: title+str
					});
				},
				drillup: function (e) {
					this.setTitle({
						text: title+'(TCT)'
					});
				}
			},
        },
        title: {
            text: title+'(TCT)',
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
            formatter: function () {
                //  console.log(this)
                let hieuso = this.points[1].y - this.points[0].y
                let html = `<b>${this.points[0].key}</b><br>So với tuần trước: `
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
                },
            },
        },
        series: dataSeries(myObj,types,['#FFA500','#a94442']),  
        drilldown: {
            series: dataDrilldown(myObj,types)
        },
        credits : false
    });
}

