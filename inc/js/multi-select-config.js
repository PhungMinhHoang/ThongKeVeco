let du_an = [];
//Post du lieu filter to server get json respond render chart
function post(du_an,qt){
  $.post( "./json/jsonQT.php", 
  {
    du_an: du_an,
    quy_trinh: qt
  },
  // response
  function( data ) {
    if(data){
    let myObj = JSON.parse(data);
    renderChartKPI(myObj,du_an)
    }
    else $('#chart_KPI_quytrinh').html("")
     
  });
}


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
      du_an.push(i)
    },
    afterDeselect: function (values) {
      this.qs1.cache();
      this.qs2.cache();
      
      let i = parseInt(values[0])
      let index = du_an.indexOf(i)
      du_an.splice(index,1)
    },
    keepOrder:true
});

//submit
$('#filter_button').on('click', function() {
  let qt = $('#select_quy_trinh option:selected').val();
  post(du_an,qt)
});
