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
    data.push({ name: name, data: dataPoint });
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
      text:
        "KPI Tuân thủ quy trình: " +
        $("#select_quy_trinh option:selected").text()
    },
    xAxis: {
      type: "datetime",
      labels: {
        formatter: function() {
          return Highcharts.dateFormat("%m-%Y", this.value);
        }
      }
    },
    yAxis: {
      title: {
        text: "% KPI"
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
    legend: {},
    series: dataKPI(myObj),
    credits: false
  });
}

function renderChartKPI_TCT(myObj, title) {
  Highcharts.setOptions({
    colors: ["#0275d8", "#5cb85c", "#f0ad4e", "#d9534f"]
  });
  Highcharts.chart({
    chart: {
      renderTo: "chart_KPI_quytrinh",
      type: "column",
      zoomType: "y",
      style: {
        fontFamily: "Arial"
      },
      events: {
        drilldown: function(e) {
          var str = "dd-TCT";
          //console.log(this);
          if (e.seriesOptions.id.indexOf("DV") != -1) {
            this.series[0].setData([80,80,80])
          }
          //console.log(e.seriesOptions.id);
        }
      }
    },
    title: {
      text: title,
      useHTML: true
    },
    subtitle: {
      text: ""
    },
    xAxis: [
      {
        //   categories: ['Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
        type: "category",
        crosshair: true
      },
      //xAxis for line
      {
        visible: false
        //"opposite": true,
      }
    ],
    yAxis: {
      min: 0,
      max:100,
      allowDecimals: false,
      //tickInterval: 10,
      title: {
        text: ""
      },
      labels: {
        formatter: function() {
          return this.value + "%";
        }
      }
    },

    legend: {
      borderColor: "#CCC",
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
        //colorByPoint: true,
        tooltip: {
          enabled: false
        }
      },
      line: {
        color: "#000",
        tooltip: {
          enabled: false,
          headerFormat: "",
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} %</b></td></tr>',
          footerFormat: "</table>",
          shared: false,
          useHTML: true
        }
      }
    },
    series: [
      {
        name: "T7",
        data: [
          {
            name: "TCT",
            y: 53,
            drilldown: "dd-TCT-T7"
          }
        ]
      },
      {
        name: "T8",
        data: [
          {
            name: "TCT",
            y: 33,
            drilldown: "dd-TCT-T8"
          }
        ],
        xAxis: 0,
        yaxis: 0
      },
      // Seri Line
      {
        type: "line",
        name: "Mục tiêu",
        data: [70, 70, 70],
        xAxis: 1,
        yaxis: 1,
        drilldown: "line-drilldown"
      }
    ],
    drilldown: {
      //allowPointDrilldown: false,
      series: [
        {
          type: "line",
          name: "Mục tiêu",
          id: "dd-TCT-T7",
          xAxis: 1,
          yaxis: 1,
          data: [80, 80, 80]
        },
        // dd Khối
        {
          name: "T7",
          id: "dd-TCT-T7",
          data: [
            {
              name: "Khối 1",
              y: 54,
              drilldown: "dd-K1-T7"
            },
            {
              name: "Khối 2",
              y: 64,
              drilldown: "dd-K2-T7"
            },
            {
              name: "Khối 3",
              y: 0,
              drilldown: "dd-K3-T7"
            }
          ]
        },
        ///T8
        {
          name: "T8",
          id: "dd-TCT-T8",
          data: [
            {
              name: "Khối 1",
              y: 20,
              drilldown: "dd-K1-T8"
            },
            {
              name: "Khối 2",
              y: 71,
              drilldown: "dd-K2-T8"
            },
            {
              name: "Khối 3",
              y: 0,
              drilldown: "dd-K3-T8"
            }
          ]
        },
        // dd Đơn vị
        //K1
        {
          name: "T7",
          id: "dd-K1-T7",
          data: [
            {
              name: "Trung tâm Thông tin và Tác chiến điện tử",
              y: 100,
              drilldown: "dd-DV2-T7"
            },
            {
              name: "Trung tâm Quang điện tử",
              y: 0,
              drilldown: "dd-DV3-T7"
            },
            {
              name: "Trung tâm Mô hình mô phỏng",
              y: 0,
              drilldown: "dd-DV4-T7"
            },
            {
              name: "Trung tâm Chỉ huy điều khiển",
              y: 0,
              drilldown: "dd-DV5-T7"
            }
          ]
        },
        {
          name: "T8",
          id: "dd-K1-T8",
          data: [
            {
              name: "Trung tâm Thông tin và Tác chiến điện tử",
              y: 25,
              drilldown: "dd-DV2-T8"
            },
            {
              name: "Trung tâm Quang điện tử",
              y: 0,
              drilldown: "dd-DV3-T8"
            },
            {
              name: "Trung tâm Mô hình mô phỏng",
              y: 33,
              drilldown: "dd-DV4-T8"
            },
            {
              name: "Trung tâm Chỉ huy điều khiển",
              y: 0,
              drilldown: "dd-DV5-T8"
            }
          ]
        },
        //K2
        {
          name: "T7",
          id: "dd-K2-T7",
          data: [
            {
              name: "Trung tâm OCS",
              y: 0,
              drilldown: "dd-K2-DV1-T7"
            },
            {
              name: "Trung tâm Nghiên cứu CN truyền dẫn",
              y: 0,
              drilldown: "dd-K2-DV2-T7"
            },
            {
              name: "Trung tâm Công nghệ chuyển mạch",
              y: 33,
              drilldown: "dd-K2-DV3-T7"
            },
            {
              name: "Trung tâm Nghiên cứu thiết bị VTBR",
              y: 100,
              drilldown: "dd-K2-DV5-T7"
            }
          ]
        },
        {
          name: "T8",
          id: "dd-K2-T8",
          data: [
            {
              name: "Trung tâm OCS",
              y: 100,
              drilldown: "dd-K2-DV1-T8"
            },
            {
              name: "Trung tâm Nghiên cứu CN truyền dẫn",
              y: 50,
              drilldown: "dd-K2-DV2-T8"
            },
            {
              name: "Trung tâm Công nghệ chuyển mạch",
              y: 67,
              drilldown: "dd-K2-DV3-T8"
            },
            {
              name: "Trung tâm Nghiên cứu thiết bị VTBR",
              y: 100,
              drilldown: "dd-K2-DV5-T8"
            }
          ]
        },

        //K3
        {
          name: "T7",
          id: "dd-K3-T7",
          data: [
            {
              name: "Trung tâm Chip 5G",
              y: 0,
              drilldown: "dd-K3-DV1-T7"
            },
            {
              name: "Phòng CORE",
              y: 0,
              drilldown: "dd-K3-DV2-T7"
            }
          ]
        },
        {
          name: "T8",
          id: "dd-K3-T8",
          data: [
            {
              name: "Trung tâm Chip 5G",
              y: 0,
              drilldown: "dd-K3-DV1-T8"
            },
            {
              name: "Phòng CORE",
              y: 0,
              drilldown: "dd-K3-DV2-T8"
            }
          ]
        },

        // dd Dự Án
        ///T7
        // K1
        {
          name: "T7",
          id: "dd-DV1-T7",
          data: [
            [
              "Nghiên cứu, thiết kế và chế tạo hệ thống Radar thụ động V-ELINT18",
              87
            ]
          ]
        },
        {
          name: "T7",
          id: "dd-DV2-T7",
          data: [
            ["Hệ thống truyền dẫn vô tuyến nhảy tần tốc độ cao (V-HCR)", 94],
            ["Máy vô tuyến đa băng VRP712/S", 89]
          ]
        },
        {
          name: "T7",
          id: "dd-DV3-T7",
          data: [
            [
              "Nghiên cứu, thiết kế, chế tạo đài quang điện tử tầm xa trên tàu",
              45
            ]
          ]
        },
        {
          name: "T7",
          id: "dd-DV4-T7",
          data: [
            [
              "Nghiên cứu, xây dựng Tổ hợp mô phỏng huấn luyện kíp chỉ huy bay và phi công Su-30MK2",
              67
            ],
            [
              "Nghiên cứu, thiết kế, xây dựng hệ thống Mô phỏng huấn luyện kĩ chiến thuật Trinh sát đặc nhiệm",
              57
            ]
          ]
        },
        {
          name: "T7",
          id: "dd-DV5-T7",
          data: [["Hệ thống tự động hóa chi huy cho Hải Quân", 57]]
        },
        //K2-T7
        {
          name: "T7",
          id: "dd-K2-DV1-T7",
          data: [["Nghiên cứu xây dựng cơ sở dữ liệu trên bộ nhớ (IMDB)", 78]]
        },
        {
          name: "T7",
          id: "dd-K2-DV2-T7",
          data: [
            ["Nghiên cứu, thiết kế và chế thử thiết bị ONT", 64],
            ["Nghiên cứu phát triển chế tạo thiết bị Site Router", 71]
          ]
        },
        {
          name: "T7",
          id: "dd-K2-DV3-T7",
          data: [
            [
              "Nghiên cứu sản xuất hệ thống mạng lõi chuyển mạch gói Evolved Packet Core (EPC) hỗ trợ 4G-LTE",
              80
            ],
            [
              "Nghiên cứu phát triển hệ thống đa phương tiện IP hỗ trợ mạng 4G (vIMS)",
              79
            ],
            ["Nghiên cứu phát triển hệ thống Gate MSC hỗ trợ TDM", 66]
          ]
        },

        {
          name: "T7",
          id: "dd-K2-DV5-T7",
          data: [
            ["Nghiên cứu, chế tạo trạm thu phát gốc Smallcell gNodeB 5G", 81]
          ]
        },

        ///T8
        {
          name: "T8",
          id: "dd-DV2-T8",
          data: [
            ["Hệ thống truyền dẫn vô tuyến nhảy tần tốc độ cao (V-HCR)", 72],
            ["Máy vô tuyến đa băng VRP712/S", 73],
            ["HT thông tin HF băng rộng (WBHF)", 69],
            [
              "Nghiên cứu, thiết kế và chế tạo hệ thống Radar thụ động V-ELINT18",
              81
            ]
          ]
        },
        {
          name: "T8",
          id: "dd-DV3-T8",
          data: [
            [
              "Nghiên cứu, thiết kế, chế tạo đài quang điện tử tầm xa trên tàu",
              64
            ]
          ]
        },
        {
          name: "T8",
          id: "dd-DV4-T8",
          data: [
            [
              "Nghiên cứu, xây dựng Tổ hợp mô phỏng huấn luyện kíp chỉ huy bay và phi công Su-30MK2",
              60
            ],
            [
              "Nghiên cứu, thiết kế, xây dựng hệ thống Mô phỏng huấn luyện kĩ chiến thuật Trinh sát đặc nhiệm",
              41
            ],
            ["Hệ thống Sa bàn ảo 3D", 80]
          ]
        },
        {
          name: "T8",
          id: "dd-DV5-T8",
          data: [
            ["Hệ thống tự động hóa chi huy cho Hải Quân", 54],
            [
              "Nghiên cứu, thiết kế, xây dựng, triển khai Bộ mẫu Hệ thống cảnh giới và bảo vệ vùng trời quốc gia GĐ2",
              44
            ]
          ]
        },

        //K2-T8
        {
          name: "T8",
          id: "dd-K2-DV1-T8",
          data: [["Nghiên cứu xây dựng cơ sở dữ liệu trên bộ nhớ (IMDB)", 80]]
        },
        {
          name: "T8",
          id: "dd-K2-DV2-T8",
          data: [
            ["Nghiên cứu, thiết kế và chế thử thiết bị ONT", 91],
            ["Nghiên cứu phát triển chế tạo thiết bị Site Router", 76]
          ]
        },
        {
          name: "T8",
          id: "dd-K2-DV3-T8",
          data: [
            [
              "Nghiên cứu sản xuất hệ thống mạng lõi chuyển mạch gói Evolved Packet Core (EPC) hỗ trợ 4G-LTE",
              82
            ],
            [
              "Nghiên cứu phát triển hệ thống đa phương tiện IP hỗ trợ mạng 4G (vIMS)",
              81
            ],
            [["Nghiên cứu phát triển hệ thống Gate MSC hỗ trợ TDM", 69]]
          ]
        },
        {
          name: "T8",
          id: "dd-K2-DV5-T8",
          data: [
            ["Nghiên cứu, chế tạo trạm thu phát gốc Smallcell gNodeB 5G", 90]
          ]
        },

        //K3-T8
        {
          name: "T8",
          id: "dd-K3-DV2-T8",
          data: [
            [
              "Ứng dụng trí tuệ nhân tạo vào bài toán tự động giám sát toàn cảnh bằng công nghệ nhận diện khuôn mặt và nhận dạng người",
              69
            ],
            ["Retail Analytics", 78]
          ]
        }
      ]
    },
    credits: false
  });
}
