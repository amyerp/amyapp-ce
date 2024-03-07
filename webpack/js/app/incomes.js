(function ($) {
$(document).ready(function() {

$('#acctype, #acctypeb').on("change", async function () {
  var param = $(this).attr("id");
  var type = $(this).val();

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
  if (type == "bank") {
  //  $('#acctypelabel').text("Bank");
    showcompanybanks(companyid, token, 25, 0).done(function(resp) {

if (param == "acctype") {
      if (resp.data.banks.length != 0) {
                 var banks = [];

                  $('#acctypeselect').attr("hidden", false);
                 var i;
                 var select = document.getElementById("acctypes"),
                     length = select.options.length;
                 while(length--){
                   select.remove(length);
                 }
                 $('#acctypes').append('<option value="">Choose Bank</option> ');
    for (i = 0; i < resp.data.banks.length; i++) {
    	var n = i + 1;
    	var bank = resp.data.banks[i];
      $('#acctypes').append('<option value="'+bank.BankID+'">'+bank.Name+' ' +bank.IBAN +'</option> ');


    }
    }
  }
  if (param == "acctypeb") {
        if (resp.data.banks.length != 0) {
                   var banks = [];

                    $('#acctypebselect').attr("hidden", false);
                   var i;
                   var select = document.getElementById("acctypesb"),
                       length = select.options.length;
                   while(length--){
                     select.remove(length);
                   }
                   $('#acctypesb').append('<option value="">Choose Bank</option> ');
      for (i = 0; i < resp.data.banks.length; i++) {
      	var n = i + 1;
      	var bank = resp.data.banks[i];
        $('#acctypesb').append('<option value="'+bank.BankID+'">'+bank.Name+' ' +bank.IBAN +'</option> ');


      }
      }
    }

    }).fail(function(resp){failedanswer(resp)});

  }
  /*
  if (type == "crypto") {
    $('#acctypelabel').text("CryptoCurrency");
  }
  */

});

$("#completeincome").click(async function(event){
  event.preventDefault();
  var token =  await gettoken();
  var incomeid = GetUrlParameter("id");
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
compliteincome(incomeid, companyid, token).done(function(resp){
 var incomeid =  GetUrlParameter("id");
 document.location.href = '/income?id=' + incomeid;
}).fail(function(resp){failedanswer(resp)})

});


$(document).on( "change", ".basis", async function () {
  var type = $(this).val();
  var ia = $(this).attr("name");
  var resa = ia.split("]");
  var resb = resa[0];
  var ib = resb.split("[");
  var iname = ib[1];
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
  if (type == "invoice") {
    //TODO:
    // Filtered by:
    // Counterparty, sent, not paid
    showinvoices(companyid, token, 25, 0, "").done(function(resp){

      var data = resp.data.invoices;

      for (var i = 0; i < data.length; i++) {
        var n = i + 1;
        $("[name='car["+iname+"][basis]']").append('<option value="'+data[i].UID+'">'+data[i].Num+' ' +data[i].CreatedAt +'</option> ');

        }

    }).fail(function(resp){failedanswer(resp)})
  }
});

$("#saveincome").click(async function(event){
  event.preventDefault();
  var token =  await gettoken();
  var lindex = $("#invoicecontent").attr("index");
  var index = parseInt(lindex) - 1;
  var invoicebodyarray = [];



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

  for (var i = 0; i < lindex; i++) {

    iscomvat = "0";
  if ($("[name='car["+i+"][vatineu][]']").prop('checked')) {
    iscomvat = "1";
  }

  var invoicebodystr = {
    amount: $("[name='car["+i+"][amountinput]']").val(),
    totalamount: $("[name='car["+i+"][totalamountinput]']").val(),
    description: $("[name='car["+i+"][descinput]']").val(),
    vatpercent: $("[name='car["+i+"][vatpercentinput]']").val(),
    vat: $("[name='car["+i+"][VATinput]']").val(),
    iscomunityvat: iscomvat,
    lineid: $("[name='car["+i+"][basis]']").attr("line"),
    basetype: $("[name='car["+i+"][basistype]']").val(),
    baseid: $("[name='car["+i+"][basis]']").attr("code"),
    category: $("[name='car["+i+"][categoryinput]']").attr("code"),
    comment: $("[name='car["+i+"][commentinput]']").val(),
  }
  invoicebodyarray.push(invoicebodystr);
}




var incomeid = ""
if (GetUrlParameter("id") != "") {
    incomeid = GetUrlParameter("id");
    //companyid =  $('#saveimportinvoice').attr("company");
  }



  var lang = getlang();
  var args =
   {
     incomeid: incomeid,
     amount : $("#amount").val(),
     companyid: companyid,
     currency: $("#currencies").val(),
     date: $("#indate").val(),
     counterparty: $("#counerparty").val(),
     accounttype: $("#acctype").val(),
     accountid: $("#acctypes").val(),
     comment: $("#comment").val(),
     incomedetails: invoicebodyarray,
   };

   var argsjson = JSON.stringify(args);
   console.log("invoiceargs", argsjson);

   addincome(args, lang, token).done(function(resp){
     var incomeid = resp.data.incomeid;
    document.location.href = '/income?id=' + incomeid;


   }).fail(function(resp){failedanswer(resp)})


});

$(document).on("click", ".incometr", function () {
  var incomeid = $(this).attr("data-name");
  document.location.href = '/income?id=' + incomeid;
})


});
})(jQuery);
