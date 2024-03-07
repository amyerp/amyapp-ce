$('#invoicestable').on('scroll-body.bs.table', async function () {
console.log("#invoicestable");
  var scrollPosition = $('.fixed-table-body').scrollTop() + $('.fixed-table-body').outerHeight();
  var divTotalHeight = $('.fixed-table-body')[0].scrollHeight
                        + parseInt($('.fixed-table-body').css('padding-top'), 10)
                        + parseInt($('.fixed-table-body').css('padding-bottom'), 10)
                        + parseInt($('.fixed-table-body').css('border-top-width'), 10)
                        + parseInt($('.fixed-table-body').css('border-bottom-width'), 10);

  if( scrollPosition >= divTotalHeight )
  {
    var loaded = $('#invoicestable').attr("loaded"); //25
    var total = $('#invoicestable').attr("total"); //31
    var action = $('#invoicestable').attr("action");
if (action == "0"){
if (parseInt(loaded) < parseInt(total)) {
$('#invoicestable').attr("action", "1");

var token =  await gettoken();
// var SessionStore = new Store('erp-db', 'session')
var companyid = await  get('sessionid', SessionStore).then( result => {
      if (result !== undefined) {
        var session = JSON.parse(result);
        console.log(session.companyid);
        return session.companyid
      } else {
        console.log("no");
        return ""
      }
    });
    var filter = $('#invoicestable').attr("filter");
    showincomeinvoices(companyid, token, 25, loaded, filter).done(function(resp){

      var data = resp.data.invoices;

      var newloaded = parseInt(loaded) + parseInt(data.length)
     $('#invoicestable').attr("loaded", newloaded);
     $('#invoicestable').attr("total", resp.data.invoicecount);
     $('#findrecords').text(resp.data.invoicecount);
     $('#invoicestable').attr("action", "0");

     $('#invoicestable').bootstrapTable('append', data);



    }).fail(function(resp){failedanswer(resp)});
  }
}
  }
});

$('#paymantstable').on('scroll-body.bs.table', async function () {

  var scrollPosition = $('.fixed-table-body').scrollTop() + $('.fixed-table-body').outerHeight();
  var divTotalHeight = $('.fixed-table-body')[0].scrollHeight
                        + parseInt($('.fixed-table-body').css('padding-top'), 10)
                        + parseInt($('.fixed-table-body').css('padding-bottom'), 10)
                        + parseInt($('.fixed-table-body').css('border-top-width'), 10)
                        + parseInt($('.fixed-table-body').css('border-bottom-width'), 10);

  if( scrollPosition >= divTotalHeight )
  {
    var loaded = $('#paymantstable').attr("loaded"); //25
    var total = $('#paymantstable').attr("total"); //31
    var action = $('#paymantstable').attr("action");
if (action == "0"){
if (parseInt(loaded) < parseInt(total)) {
$('#paymantstable').attr("action", "1");

var token =  await gettoken();
// var SessionStore = new Store('erp-db', 'session')
var companyid = await  get('sessionid', SessionStore).then( result => {
      if (result !== undefined) {
        var session = JSON.parse(result);
        console.log(session.companyid);
        return session.companyid
      } else {
        console.log("no");
        return ""
      }
    });
    var filter = $('#paymantstable').attr("filter");

    showpayments(companyid, token, 25, loaded, filter).done(function(resp){

      var data = resp.data.payments;

      var newloaded = parseInt(loaded) + parseInt(data.length)
     $('#paymantstable').attr("loaded", newloaded);
     $('#paymantstable').attr("total", resp.data.paymentscount);
     $('#findrecords').text(resp.data.paymentscount);
     $('#paymantstable').attr("action", "0");

     $('#paymantstable').bootstrapTable('append', data);



    }).fail(function(resp){failedanswer(resp)});
  }
}
  }
});

$(document).on('change keyup paste', '.priceclass', function () {

  var ia = $(this).attr("name");
  var resa = ia.split("]");
  var resb = resa[0];
  var ib = resb.split("[");
  var iname = ib[1];
  var price = parseFloat($("[name='car["+iname+"][priceinput]']").val());
  var quantity = parseFloat($("[name='car["+iname+"][quantityinput]']").val());
  var vat = $("[name='car["+iname+"][vatpercentinput]']").val();
  var amount = price * quantity;
  $("[name='car["+iname+"][amountinput]']").val(amount);
  if (vat != "0") {
    var vatf = parseFloat(vat);
    var vatam  = amount / 100 * vatf;
    var totam = amount + vatam;
    $("[name='car["+iname+"][totamountinput]']").val(totam);
  } else {
    $("[name='car["+iname+"][totamountinput]']").val(amount);
  }
});
