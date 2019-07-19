function dataKhoi(myObj,khoi,type){
    let sum = myObj[khoi].filter((donvi)=>{
        return donvi.ten_tuy_chon == type 
    }).reduce((acc,cur)=>{
        return acc += parseInt(cur.chi_so)
    },0)
    return sum;
}

function dataDonVi(myObj,khoi,type){
    let data = [];

    for (let donvi of myObj[khoi]) {
        if( donvi.ten_tuy_chon == type ){
            data.push([donvi.ten_don_vi,parseInt(donvi.chi_so)]);
        }
    }
    return data;
}

function dataTCT(myObj,type){  
    const data = [
        {
            name: 'Khối 1',
            y: dataKhoi(myObj,1,type),
            drilldown: type+'_1'
        },
        {
            name: 'Khối 2',
            y: dataKhoi(myObj,2,type),
            drilldown: type+'_2'
        },
        {
            name: 'Khối 3',
            y: dataKhoi(myObj,3,type),
            drilldown: type+'_3'
        },
        {
            name: 'Khối cơ quan',
            y: dataKhoi(myObj,4,type),
            drilldown: type+'_4'
        },
    ]
    return data
}
function dataSeries(myObj,types,color){
    let data=[],name;
    for (const type of types) {
        switch(type) {
            //chart1
            case 'viec_duoc_giao':
                name = 'Việc được giao'; 
                break;
            case 'viec_hoan_thanh_dung_han':
                name = 'Việc hoàn thành đúng hạn'; 
                break;
            case 'viec_hoan_thanh_khong_dung_han':
                name = 'Việc hoàn thành không đúng hạn'; 
                break;
            case 'viec_chua_hoan_thanh':
                name = 'Việc chưa hoàn thành'; 
                break;
            //chart2
            case 'viec_dang_thuc_hien':
                name = 'Việc đang thực hiện'; 
                break;
            case 'viec_tu_choi':
                name = 'Việc từ chối'; 
                break;
            case 'viec_tam_dung':
                name = 'Việc tạm dừng'; 
                break;
            case 'viec_khoi_tao_moi':
                name = 'Việc khởi tạo mới'; 
                break;
            case 'viec_cho_duyet':
                name = 'Việc chờ duyệt'; 
                break;
            case 'viec_de_nghi_dung':
                name = 'Việc đề nghị dừng'; 
                break;
            case 'viec_vuong_mac_de_xuat':
                name = 'Việc vướng mắc đề xuất'; 
                break;
            case 'viec_khac':
                name = 'Việc khác'; 
                break;
            //chartVeco
            case 'khong_cap_nhat':
                name = 'Số người không cập nhật công việc trong tuần'; 
                break;
        }
        let obj = {
            name: name,
            data: dataTCT(myObj,type),
            color: color,
        }
        data.push(obj);
    }
    return data;
}
function dataDrilldown(myObj,types) {
    let data=[],name;
    for (let i =1 ;i <= 4;i++){
        for (const type of types) {
            switch(type) {
                //chart1
                case 'viec_duoc_giao':
                    name = 'Việc được giao'; 
                    break;
                case 'viec_hoan_thanh_dung_han':
                    name = 'Việc hoàn thành đúng hạn'; 
                    break;
                case 'viec_hoan_thanh_khong_dung_han':
                    name = 'Việc hoàn thành không đúng hạn'; 
                    break;
                case 'viec_chua_hoan_thanh':
                    name = 'Việc chưa hoàn thành'; 
                    break;
                //chart2
                case 'viec_dang_thuc_hien':
                    name = 'Việc đang thực hiện'; 
                    break;
                case 'viec_tu_choi':
                    name = 'Việc từ chối'; 
                    break;
                case 'viec_tam_dung':
                    name = 'Việc tạm dừng'; 
                    break;
                case 'viec_khoi_tao_moi':
                    name = 'Việc khởi tạo mới'; 
                    break;
                case 'viec_cho_duyet':
                    name = 'Việc chờ duyệt'; 
                    break;
                case 'viec_de_nghi_dung':
                    name = 'Việc đề nghị dừng'; 
                    break;
                case 'viec_vuong_mac_de_xuat':
                    name = 'Việc vướng mắc đề xuất'; 
                    break;
                case 'viec_khac':
                    name = 'Việc khác'; 
                    break;
                // chartVeco
                case 'khong_cap_nhat':
                name = 'Số người không cập nhật công việc trong tuần'; 
                break;
            }
            let obj = {
                name: name,
                id: type+"_"+i,
                data: dataDonVi(myObj,i,type)
            }
            data.push(obj);
        }
    }
    return data;
}

Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}
var d = new Date();
var m = d.getMonth();
var w = d.getWeek()-1;