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
        colors: ["#0275d8", "#5cb85c", "#f0ad4e", "#d9534f"],
        lang: {
            drillUpText: 'Back'
        },
    });
    Highcharts.chart({
        exporting: {
            filename: newTitle.substring(newTitle.indexOf(":")+2),
        },
        chart: {
            renderTo: "chart_KPI_quytrinh",
            type: "column",
            zoomType: "y",
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
                    this.options.exporting.filename = newTitle.substring(newTitle.indexOf(":")+2);
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
                    this.options.exporting.filename = newTitle.substring(newTitle.indexOf(":")+2);
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
        xAxis: [{
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
            max: 100,
            allowDecimals: false,
            //tickInterval: 10,
            title: {
                text: ""
            },
            labels: {
                formatter: function () {
                    return this.value + "%";
                }
            }
        },

        legend: {
            borderColor: "#CCC",
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            //enabled: false
        },
        plotOptions: {
            line: {
                color: "#000",
                tooltip: {
                    headerFormat: "",
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y} %</b></td></tr>',
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
                //colorByPoint: true,
                tooltip: {}
            }
        },
        series: [
            // Seri Line
            //Luu y khong gan bien vao data luc setData se lam thay doi bien
            {
                type: "line",
                name: "Mục tiêu",
                data: [70, 70, 70],
                xAxis: 1,
                yaxis: 1
            },
            //Seri Column
            {
                name: "T7",
                data: [{
                    name: "TCT",
                    y: 57,
                    drilldown: "dd-TCT-T7"
                }]
            },
            {
                name: "T8",
                data: [{
                    name: "TCT",
                    y: 58,
                    drilldown: "dd-TCT-T8"
                }],
                xAxis: 0,
                yaxis: 0
            },
            {
                name: "T9",
                data: [{
                    name: "TCT",
                    y: 67,
                    drilldown: "dd-TCT-T9"
                }],
                xAxis: 0,
                yaxis: 0
            }
        ],
        drilldown: {
            //allowPointDrilldown: false,
            series: [
                // dd Khối
                {
                    name: "T7",
                    id: "dd-TCT-T7",
                    data: [{
                        name: "Khối 1",
                        y: 43,
                        drilldown: "dd-K1-T7"
                    },
                    {
                        name: "Khối 2",
                        y: 71,
                        drilldown: "dd-K2-T7"
                    },
                    {
                        name: "Khối 3",
                        y: null,
                        //drilldown: "dd-K3-T7"
                    }
                    ]
                },
                ///T8
                {
                    name: "T8",
                    id: "dd-TCT-T8",
                    data: [{
                        name: "Khối 1",
                        y: 40,
                        drilldown: "dd-K1-T8"
                    },
                    {
                        name: "Khối 2",
                        y: 86,
                        drilldown: "dd-K2-T8"
                    },
                    {
                        name: "Khối 3",
                        y: 50,
                        drilldown: "dd-K3-T8"
                    }
                    ]
                },
                //T9
                {
                    name: "T9",
                    id: "dd-TCT-T9",
                    data: [{
                        name: "Khối 1",
                        y: 56,
                        drilldown: "dd-K1-T9"
                    },
                    {
                        name: "Khối 2",
                        y: 88,
                        drilldown: "dd-K2-T9"
                    },
                    {
                        name: "Khối 3",
                        y: 50,
                        drilldown: "dd-K3-T9"
                    }
                    ]
                },
                // dd Đơn vị
                //K1
                {
                    name: "T7",
                    id: "dd-K1-T7",
                    data: [{
                        name: "Trung tâm Rada",
                        y: null
                        //   drilldown: "dd-DV1-T7"
                    },
                    {
                        name: "Trung tâm Thông tin và Tác chiến điện tử",
                        y: 90,
                        drilldown: "dd-DV2-T7"
                    },
                    {
                        name: "Trung tâm Quang điện tử",
                        y: 45,
                        drilldown: "dd-DV3-T7"
                    },
                    {
                        name: "Trung tâm Mô hình mô phỏng",
                        y: 62,
                        drilldown: "dd-DV4-T7"
                    },
                    {
                        name: "Trung tâm Chỉ huy điều khiển",
                        y: 57,
                        drilldown: "dd-DV5-T7"
                    }
                    ]
                },
                {
                    name: "T8",
                    id: "dd-K1-T8",
                    data: [{
                        name: "Trung tâm Rada",
                        y: null
                        //   drilldown: "dd-DV1-T7"
                    },
                    {
                        name: "Trung tâm Thông tin và Tác chiến điện tử",
                        y: 74,
                        drilldown: "dd-DV2-T8"
                    },
                    {
                        name: "Trung tâm Quang điện tử",
                        y: 64,
                        drilldown: "dd-DV3-T8"
                    },
                    {
                        name: "Trung tâm Mô hình mô phỏng",
                        y: 60,
                        drilldown: "dd-DV4-T8"
                    },
                    {
                        name: "Trung tâm Chỉ huy điều khiển",
                        y: 49,
                        drilldown: "dd-DV5-T8"
                    }
                    ]
                },
                {
                    name: "T9",
                    id: "dd-K1-T9",
                    data: [{
                        name: "Trung tâm Rada",
                        y: null
                        //   drilldown: "dd-DV1-T9"
                    },
                    {
                        name: "Trung tâm Thông tin và Tác chiến điện tử",
                        y: 76,
                        drilldown: "dd-DV2-T9"
                    },
                    {
                        name: "Trung tâm Quang điện tử",
                        y: 70,
                        drilldown: "dd-DV3-T9"
                    },
                    {
                        name: "Trung tâm Mô hình mô phỏng",
                        y: 60,
                        drilldown: "dd-DV4-T9"
                    },
                    {
                        name: "Trung tâm Chỉ huy điều khiển",
                        y: 66,
                        drilldown: "dd-DV5-T9"
                    }
                    ]
                },
                //K2
                {
                    name: "T7",
                    id: "dd-K2-T7",
                    data: [{
                        name: "Trung tâm OCS",
                        y: 78,
                        drilldown: "dd-K2-DV1-T7"
                    },
                    {
                        name: "Trung tâm Nghiên cứu CN truyền dẫn",
                        y: 67,
                        drilldown: "dd-K2-DV2-T7"
                    },
                    {
                        name: "Trung tâm Công nghệ chuyển mạch",
                        y: 75,
                        drilldown: "dd-K2-DV3-T7"
                    },
                    {
                        name: "Trung tâm Smart Connect",
                        y: null
                        //   drilldown: "dd-K2-DV4-T7"
                    },
                    {
                        name: "Trung tâm Nghiên cứu thiết bị VTBR",
                        y: 81,
                        drilldown: "dd-K2-DV5-T7"
                    }
                    ]
                },
                {
                    name: "T8",
                    id: "dd-K2-T8",
                    data: [{
                        name: "Trung tâm OCS",
                        y: 80,
                        drilldown: "dd-K2-DV1-T8"
                    },
                    {
                        name: "Trung tâm Nghiên cứu CN truyền dẫn",
                        y: 83,
                        drilldown: "dd-K2-DV2-T8"
                    },
                    {
                        name: "Trung tâm Công nghệ chuyển mạch",
                        y: 77,
                        drilldown: "dd-K2-DV3-T8"
                    },
                    {
                        name: "Trung tâm Smart Connect",
                        y: null
                        //   drilldown: "dd-K2-DV4-T8"
                    },
                    {
                        name: "Trung tâm Nghiên cứu thiết bị VTBR",
                        y: 90,
                        drilldown: "dd-K2-DV5-T8"
                    }
                    ]
                },
                {
                    name: "T9",
                    id: "dd-K2-T9",
                    data: [{
                        name: "Trung tâm OCS",
                        y: 80,
                        drilldown: "dd-K2-DV1-T9"
                    },
                    {
                        name: "Trung tâm Nghiên cứu CN truyền dẫn",
                        y: 86,
                        drilldown: "dd-K2-DV2-T9"
                    },
                    {
                        name: "Trung tâm Công nghệ chuyển mạch",
                        y: 82,
                        drilldown: "dd-K2-DV3-T9"
                    },
                    {
                        name: "Trung tâm Smart Connect",
                        y: 63,
                        drilldown: "dd-K2-DV4-T9"
                    },
                    {
                        name: "Trung tâm Nghiên cứu thiết bị VTBR",
                        y: 81,
                        drilldown: "dd-K2-DV5-T9"
                    }
                    ]
                },

                //K3
                {
                    name: "T7",
                    id: "dd-K3-T7",
                    data: [{
                        name: "Trung tâm Chip 5G",
                        y: null
                        //drilldown: "dd-K3-DV1-T7"
                    },
                    {
                        name: "Phòng CORE",
                        y: null
                        //drilldown: "dd-K3-DV2-T7"
                    }
                    ]
                },
                {
                    name: "T8",
                    id: "dd-K3-T8",
                    data: [{
                        name: "Trung tâm Chip 5G",
                        y: null
                        //drilldown: "dd-K3-DV1-T8"
                    },
                    {
                        name: "Phòng CORE",
                        y: 73,
                        drilldown: "dd-K3-DV2-T8"
                    }
                    ]
                },
                {
                    name: "T9",
                    id: "dd-K3-T9",
                    data: [{
                        name: "Trung tâm Chip 5G",
                        y: null,
                        //drilldown: "dd-K3-DV1-T9"
                    },
                    {
                        name: "Phòng CORE",
                        y: 77,
                        drilldown: "dd-K3-DV2-T9"
                    }
                    ]
                },

                // dd Dự Án
                // K1-T7
                {
                    name: "T7",
                    id: "dd-DV2-T7",
                    data: [
                        ["Hệ thống truyền dẫn vô tuyến nhảy tần tốc độ cao (V-HCR)", 94],
                        ["Máy vô tuyến đa băng VRP712/S", 89],
                        [
                            "Nghiên cứu, thiết kế và chế tạo hệ thống Radar thụ động V-ELINT18",
                            87
                        ]
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
                    data: [
                        ["Hệ thống tự động hóa chi huy cho Hải Quân", 57]
                    ]
                },
                //K2-T7
                {
                    name: "T7",
                    id: "dd-K2-DV1-T7",
                    data: [
                        ["Nghiên cứu xây dựng cơ sở dữ liệu trên bộ nhớ (IMDB)", 78]
                    ]
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
                    data: [
                        ["Nghiên cứu xây dựng cơ sở dữ liệu trên bộ nhớ (IMDB)", 80]
                    ]
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
                        [
                            "Nghiên cứu phát triển hệ thống Gate MSC hỗ trợ TDM", 69
                        ]
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
                },

                //T9
                // K1-T9
                {
                    name: "T9",
                    id: "dd-DV2-T9",
                    data: [
                        ["Hệ thống truyền dẫn vô tuyến nhảy tần tốc độ cao (V-HCR)", 80],
                        ["Máy vô tuyến đa băng VRP712/S", 73],
                        ["HT thông tin HF băng rộng (WBHF)", 69],
                        [
                            "Nghiên cứu, thiết kế và chế tạo hệ thống Radar thụ động V-ELINT18",
                            81
                        ],

                    ]
                },
                {
                    name: "T9",
                    id: "dd-DV3-T9",
                    data: [
                        [
                            "Nghiên cứu, thiết kế, chế tạo đài quang điện tử tầm xa trên tàu",
                            70
                        ]
                    ]
                },
                {
                    name: "T9",
                    id: "dd-DV4-T9",
                    data: [
                        [
                            "Nghiên cứu, xây dựng Tổ hợp mô phỏng huấn luyện kíp chỉ huy bay và phi công Su-30MK2",
                            60
                        ],
                        [
                            "Nghiên cứu, thiết kế, xây dựng hệ thống Mô phỏng huấn luyện kĩ chiến thuật Trinh sát đặc nhiệm",
                            41
                        ],
                        [
                            "Hệ thống Sa bàn ảo 3D",
                            80
                        ]
                    ]
                },
                {
                    name: "T9",
                    id: "dd-DV5-T9",
                    data: [
                        ["Hệ thống tự động hóa chi huy cho Hải Quân", 66],
                    ]
                },

                //K2-T9
                {
                    name: "T9",
                    id: "dd-K2-DV1-T9",
                    data: [
                        ["Nghiên cứu xây dựng cơ sở dữ liệu trên bộ nhớ (IMDB)", 80]
                    ]
                },
                {
                    name: "T9",
                    id: "dd-K2-DV2-T9",
                    data: [
                        ["Nghiên cứu, thiết kế và chế thử thiết bị ONT", 91],
                        ["Nghiên cứu phát triển chế tạo thiết bị Site Router", 82]
                    ]
                },
                {
                    name: "T9",
                    id: "dd-K2-DV3-T9",
                    data: [
                        [
                            "Nghiên cứu sản xuất hệ thống mạng lõi chuyển mạch gói Evolved Packet Core (EPC) hỗ trợ 4G-LTE",
                            82
                        ],
                        [
                            "Nghiên cứu phát triển hệ thống đa phương tiện IP hỗ trợ mạng 4G (vIMS)",
                            81
                        ],
                        ["Nghiên cứu phát triển hệ thống Gate MSC hỗ trợ TDM", 82]
                    ]
                },
                {
                    name: "T9",
                    id: "dd-K2-DV4-T9",
                    data: [
                        ["Sản phẩm điện thoại Smartphone 4G bảo mật (Vipphone)", 63]
                    ]
                },
                {
                    name: "T9",
                    id: "dd-K2-DV5-T9",
                    data: [
                        ["Nghiên cứu, chế tạo trạm thu phát gốc Smallcell gNodeB 5G", 81]
                    ]
                },

                //K3-T9
                {
                    name: "T9",
                    id: "dd-K3-DV2-T9",
                    data: [
                        [
                            "Ứng dụng trí tuệ nhân tạo vào bài toán tự động giám sát toàn cảnh bằng công nghệ nhận diện khuôn mặt và nhận dạng người",
                            72
                        ],
                        ["Retail Analytics", 82]
                    ]
                },
            ]
        },
        credits: false,
        
    });
}