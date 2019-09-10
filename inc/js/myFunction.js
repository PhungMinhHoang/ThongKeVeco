Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}
var d = new Date();
var m = d.getMonth();
var w = d.getWeek()-1;

function dataKhoi(myObj,khoi,type){
    //console.log(khoi)
    let sum = myObj[khoi].filter((donvi)=>{
        if(type === 'khong_cap_nhat_tuan_truoc'){
            return (donvi.thoi_gian == w-1)
        }
        else if (type === 'khong_cap_nhat'){
            return (donvi.thoi_gian == w);
        }
        return donvi.ten_tuy_chon == type 
    }).reduce((acc,cur)=>{
        return acc += parseInt(cur.chi_so)
    },0)
    return sum;
}

function dataKhoi2(myObj,type){
    return parseInt(myObj[2].filter((donvi)=>{
        return (donvi.ten_tuy_chon == type && donvi.ten_don_vi == 'Khối 2')
    })[0].chi_so)
}

function dataDonVi(myObj,khoi,type){
    let data = [];
    let filter = myObj[khoi].filter((donvi)=>{
        if(type === 'khong_cap_nhat_tuan_truoc'){
            return (donvi.thoi_gian == w-1);
        }
        else if (type === 'khong_cap_nhat'){
            return (donvi.thoi_gian == w);
        }
        return (donvi.ten_tuy_chon == type && donvi.ten_don_vi != 'Khối 2');
    })
    for (let donvi of filter) {
        data.push([donvi.ten_don_vi,parseInt(donvi.chi_so)]);
    }
    return data;
}

function dataTCT(myObj,type){  
    let data = [
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
function dataK2(myObj,type){  
    let data = [
        {
            name: 'Khối 2',
            //y: dataKhoi(myObj,2,type),
            y: dataKhoi2(myObj,type),
            drilldown: type+'_2'
        }
    ]
    return data
}

function dataSeries(myObj,types,color){
    let data=[],name;
    let i =0;
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
                    name = `Số người không cập nhật công việc trong tuần`; 
                break;
            case 'khong_cap_nhat_tuan_truoc':
                    name = `Số người không cập nhật công việc trong tuần trước`; 
                break;
            //chartNhiemVuThangK2
            case 'nhiem-vu-TGD-giao':
                name = 'Nhiệm vụ TGĐ giao'; 
                break;
            case 'nhiem-vu-PTGD-giao':
                name = 'Nhiệm vụ PTGĐ giao'; 
                break;
        }
        let obj;
        if(type === 'nhiem-vu-TGD-giao' || type === 'nhiem-vu-PTGD-giao'){
            obj = {
                name: name,
                data: dataK2(myObj,type),
                color: color,
            }
        }
        else if(type === 'khong_cap_nhat' || type === 'khong_cap_nhat_tuan_truoc'){
            obj = {
                name: name,
                data: dataTCT(myObj,type),
                color: color[i++],
            }
        }
        else{
            obj = {
                name: name,
                data: dataTCT(myObj,type),
                color: color,
            }
        }
        data.push(obj);
    }
    console.log("seri",data);
    return data;
}
function dataSeriesStack(myObj,types,color){
    let data=[],name;
    for (const type of types) {
        switch(type) {
            //chartKetLuan
            case 'ket-luan-TD':
                name = 'Kết luận đang thực hiện';
                color =  '#428bca';
                break;
            case 'ket-luan-TCT':
                name = 'Kết luận TCT';
                color =  '#428bca'; 
                break;
            case 'ket-luan-K2':
                name = 'Kết luận Khối 2';
                color =  '#428bca'; 
                break;
            case 'ket-luan-qua-han-TD':
                name = 'Kết luận quá hạn'; 
                color =  '#a94442';
                break;
            case 'ket-luan-qua-han-TCT':
                name = 'Kết luận quá hạn TCT';
                color =  '#a94442'; 
                break;
            case 'ket-luan-qua-han-K2':
                name = 'Kết luận quá hạn Khối 2';
                color =  '#a94442'; 
                break;
        }
        let obj;
        if(type === 'ket-luan-TD' || type === 'ket-luan-qua-han-TD'){
            obj = {
                
                name: name,
                data: dataK2(myObj,type),
                color: color,
                stack: 'Kết luận TĐ'
            }
        }
        else if(type === 'ket-luan-TCT' || type === 'ket-luan-qua-han-TCT'){
            obj = {
                showInLegend: false,
                name: name,
                data:dataK2(myObj,type),
                color: color,
                stack: 'Kết luận TCT'
            }
        }
        else{
            obj = {
                showInLegend: false,
                name: name,
                data: dataK2(myObj,type),
                color: color,
                stack: 'Kết luận Khối 2'
            }
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
                case 'khong_cap_nhat_tuan_truoc':
                    name = 'Số người không cập nhật công việc trong tuần trước'; 
                break;
                //chartNhiemVuThangK2
                case 'nhiem-vu-TGD-giao':
                    name = 'Nhiệm vụ TGĐ giao'; 
                    break;
                case 'nhiem-vu-PTGD-giao':
                    name = 'Nhiệm vụ PTGĐ giao'; 
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
    console.log("drilldown",data);
    return data;
}
function dataDrilldownStack(myObj,types) {
    let data=[],name;
    for (let i =1 ;i <= 4;i++){
        for (const type of types) {
            switch(type) {
                //chartKetLuan
                case 'ket-luan-TD':
                    name = 'Kết luận đang thực hiện'; 
                    break;
                case 'ket-luan-TCT':
                    name = 'Kết luận TCT'; 
                    break;
                case 'ket-luan-K2':
                    name = 'Kết luận Khối 2'; 
                    break;
                case 'ket-luan-qua-han-TD':
                    name = 'Kết luận quá hạn'; 
                    break;
                case 'ket-luan-qua-han-TCT':
                    name = 'Kết luận quá hạn TCT'; 
                    break;
                case 'ket-luan-qua-han-K2':
                    name = 'Kết luận quá hạn Khối 2'; 
                    break;
            }
            let obj;
            if(type === 'ket-luan-TD' || type === 'ket-luan-qua-han-TD'){
                obj = {
                    name: name,
                    id: type+"_"+i,
                    data: dataDonVi(myObj,i,type),
                    stack: 'Kết luận TĐ'
                }
            }
            else if(type === 'ket-luan-TCT' || type === 'ket-luan-qua-han-TCT'){
                obj = {
                    showInLegend: false,
                    name: name,
                    id: type+"_"+i,
                    data: dataDonVi(myObj,i,type),
                    stack: 'Kết luận TCT'
                }
            }
            else{
                obj = {
                    showInLegend: false,
                    name: name,
                    id: type+"_"+i,
                    data: dataDonVi(myObj,i,type),
                    stack: 'Kết luận Khối 2'
                }
            }
            data.push(obj);
        }
    }
    
    return data;
}

