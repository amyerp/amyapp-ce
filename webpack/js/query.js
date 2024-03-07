(function ($) {


//Global Variables
/*
  var date_input=$('input[name="date"]'); //our date input has the name "date"
        var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
        var options={
          format: 'dd/mm/yyyy',
          container: container,
          todayHighlight: true,
          autoclose: true,
        };
        date_input.datepicker(options);
*/
//Main Function
// var SessionStore = new Store('erp-db', 'session')
get('theme', SessionStore).then( result => {

  if (result != undefined) {
//Get current theme
if (result == 'dark') {
  darktheme();


}
if (result == 'light')  {

lighttheme()


}
  }
});

getsession();




})(jQuery);
