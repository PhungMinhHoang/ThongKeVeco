

$(document).ready(function(){
  
    //submit
    $('#filter_button').on('click', function() {
        let qt = $('#select_quy_trinh option:selected').val();
        let kieu_xem = $('#select_kieu_xem option:selected').val();
        let data = {};
        if(kieu_xem == 'de_tai'){
            data.du_an = list
            data.quy_trinh = qt
        }
        else {
            data.du_an = null
            data.quy_trinh = null
            data.don_vi = list
        }
        console.log(data)
        post(data)
    });
  
    $('.searchable').multiSelect({
        selectableHeader: "<input type='text' class='search-input' autocomplete='off' placeholder='Tìm kiếm...'>",
        selectionHeader: "<input type='text' class='search-input' autocomplete='off' placeholder='Tìm kiếm...'>",
        afterInit: function (ms) {
        var that = this,
            $selectableSearch = that.$selectableUl.prev(),
            $selectionSearch = that.$selectionUl.prev(),
            selectableSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selectable:not(.ms-selected)',
            selectionSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selection.ms-selected';

        that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
            .on('keydown', function (e) {
            if (e.which === 40) {
                that.$selectableUl.focus();
                return false;
            }
            });

        that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
            .on('keydown', function (e) {
            if (e.which == 40) {
                that.$selectionUl.focus();
                return false;
            }
            });
        },
        afterSelect: function (values) {
        this.qs1.cache();
        this.qs2.cache();
        // console.log(typeof(values[0]))
        // console.log(parseInt(values[0]))
        let i = parseInt(values[0])
        list.push(i)
        },
        afterDeselect: function (values) {
        this.qs1.cache();
        this.qs2.cache();
        
        let i = parseInt(values[0])
        let index = list.indexOf(i)
        list.splice(index,1)
        },
        keepOrder:true
    });
})


//Post du lieu filter to server get json respond render chart
function post(data){
    $.post( "./json/jsonQT.php", 
        {
            data: data
        },
        // response
        function( data ) {
            if(data){
                let myObj = JSON.parse(data);
                console.log(myObj)
                renderChartKPI(myObj)
            }
            else $('#chart_KPI_quytrinh').html("")
            
        });
    }