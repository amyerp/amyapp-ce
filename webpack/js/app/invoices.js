(function ($) {
$(document).ready(function() {



$('#outinvoicestable').on('scroll-body.bs.table', async function () {
console.log("#outinvoicetable");
    var scrollPosition = $('.fixed-table-body').scrollTop() + $('.fixed-table-body').outerHeight();
    var divTotalHeight = $('.fixed-table-body')[0].scrollHeight
                          + parseInt($('.fixed-table-body').css('padding-top'), 10)
                          + parseInt($('.fixed-table-body').css('padding-bottom'), 10)
                          + parseInt($('.fixed-table-body').css('border-top-width'), 10)
                          + parseInt($('.fixed-table-body').css('border-bottom-width'), 10);


    if( scrollPosition >= divTotalHeight )
    {
      console.log("test");
      var loaded = $('#outinvoicestable').attr("loaded"); //25
      var total = $('#outinvoicestable').attr("total"); //31
      var action = $('#outinvoicestable').attr("action");
if (action == "0"){
if (parseInt(loaded) < parseInt(total)) {
  $('#outinvoicestable').attr("action", "1");

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

      showinvoices(companyid, token, 25, loaded, "").done(function(resp){

        var data = resp.data.invoices;
        var newloaded = parseInt(loaded) + parseInt(data.length)
       $('#outinvoicestable').attr("loaded", newloaded);
       $('#outinvoicestable').attr("total", resp.data.invoicecount);
       $('#outinvoicestable').attr("action", "0");

       $('#outinvoicestable').bootstrapTable('append', data);

/*
        for (var i = 0; i < data.length; i++) {
          var n = i + 1;

         var status = "<div class='badge badge-secondary'>Draft</div>";
          if (data[i].Complited != 0) {
            var status = "<div class='badge badge-success'>Complited</div>";
          }

    var sent = "";
        if (data[i].Sent != 0) {
          sent = "<i class='la la-check-circle' style='color:green;'></i>";
        }

              $('#invoicestbody').append('<tr data-name="'+data[i].UID+'"  class="invoicetr" style="cursor:pointer;"> \
              <td class="filterable-cell ">'+ data[i].Num +'</td> \
              <td class="filterable-cell ">'+data[i].Type+'</td>\
              <td class="filterable-cell ">'+data[i].Counterparty+'</td>\
              <td  class="filterable-cell">'+ status +'</td>\
              <td class="filterable-cell">'+data[i].CreatedAt+'</td>\
              <td  class="filterable-cell">'+data[i].TotalAmount+' '+data[i].Currency.toUpperCase()+'</td>\
              <td  class="filterable-cell">'+data[i].VAT+' '+data[i].Currency.toUpperCase()+'</td>\
              <td class="filterable-cell">'+ sent +'</td>\
              </tr>');

          }
          */

      }).fail(function(resp){failedanswer(resp)});
    }
  }
    }
  });



$(document).on( "click", ".invoicetr", function () {
  invoiceid = $(this).attr("data-name");
  	document.location.href = '/outgoing_invoice?id=' + invoiceid;
});



$(document).on( "click", "#uploadfile", async function () {
event.preventDefault();
$('#icon-tabs').attr("hidden", true);
$('#fileup').attr("hidden", false);
});

$(document).on( "click", "#upfilescancel", async function () {
event.preventDefault();
$('#icon-tabs').attr("hidden", false);
$('#fileup').attr("hidden", true);
});



$(document).on( "click", ".incominginvoicetr", function () {
  invoiceid = $(this).attr("data-name");
  	document.location.href = '/incoming_invoice?id=' + invoiceid;
});

$(document).on( "click", "#markassent", async function () {
event.preventDefault();
var token =  await gettoken();
var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var invoiceid = urlParams.get('id');
var lang = getlang();
markassent(invoiceid, lang, token).done(function(resp){
  document.location.href = '/outgoing_invoice?id=' + invoiceid;
}).fail(function(resp){failedanswer(resp)})
});

$("#completeinvoice").click(async function(event){
  event.preventDefault();
  var token =  await gettoken();
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var invoiceid = urlParams.get('id');
  var lang = getlang();
  compliteinvoice(invoiceid, lang, token).done(function(resp){
    document.location.href = '/outgoing_invoice?id=' + invoiceid;
  }).fail(function(resp){failedanswer(resp)})
});

$("#compliteincinv").click(async function(event){
  event.preventDefault();
  var token =  await gettoken();
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var invoiceid = urlParams.get('id');
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
      compliteincominginvoice(invoiceid, companyid, token).done(function(resp){
   document.location.href = '/incoming_invoice?id=' + invoiceid;
  }).fail(function(resp){failedanswer(resp)})
});

$(document).on( "click", "#showfile", async function () {
  event.preventDefault();
  var fileid = $(this).attr("fileid");
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
    var docid = urlParams.get('id');
  var token = await gettoken();
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
      showincomeinvoicefile(fileid, docid, companyid, token).done(function(resp){
    openfile(resp)
  }).fail(function(resp){failedanswer(resp)})
//	 $('<a href="/files?fid='+ fileid +'&cid='+companyid+'" target="blank"></a>')[0].click();


});

$("#saveinvoice").click(async function(event){
  event.preventDefault();
  var token =  await gettoken();
  var lindex = $("#invoicecontent").attr("index");
  var index = parseInt(lindex) - 1;
  var invoicebodyarray = [];
  var invoiceamount = 0;
  var invoicevat = 0;
  var vats = [];

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
    var amount = parseFloat($("[name='car["+i+"][amountinput]']").val());
    var vatpercent = parseFloat($("[name='car["+i+"][vatpercentinput]']").val());
    if (!vats.includes(vatpercent)) {
      if (vatpercent != 0) {
      vats.push(vatpercent);
    }
    }
    var vat = amount / 100 * vatpercent;
    var total = amount + vat;
    invoiceamount = invoiceamount + amount;
    invoicevat = invoicevat + vat;
console.log("amount", $("[name='car["+i+"][amountinput]']").val());
  var invoicebodystr = {
    subscribtion: $("[name='car["+i+"][subscriptioninput]']").val(),
    price: $("[name='car["+i+"][priceinput]']").val(),
    quantity: $("[name='car["+i+"][quantityinput]']").val(),
    amount: amount.toString(),
    vatpercent: vatpercent.toString(),
    vat: vat.toString(),
    total: total.toString(),
    periodfrom: $("[name='car["+i+"][periodfrominput]']").val(),
    periodto: $("[name='car["+i+"][periodtoinput]']").val(),
    soll: $("[name='car["+i+"][sollinput]']").attr("code"),
    haben: $("[name='car["+i+"][habeninput]']").attr("code"),
  }
  invoicebodyarray.push(invoicebodystr);
}

var invoicetotal = invoiceamount + invoicevat;
if ($("#prepayment").val() != "") {
  if ($("#prepayment").val() == invoicetotal){
    invoicetotal = 0
  } else {
if (vats.length == 0) {
// if VAT == 0

    invoicetotal = invoicetotal - $("#prepayment").val();

}
if (vats.length == 1) {
  //we have one vat
  //Sepatate prepayment and vat
  vatper = vats[0]
  prepam = $("#prepayment").val() / (100 + vatper) * 100
  prepvat = $("#prepayment").val() / (100 + vatper) * vatper

  invoicevat = invoicevat - prepvat;
  invoicetotal = invoiceamount - prepam + invoicevat;
}
}
}


  var lang = getlang();
  var args =
   { type: $("#invoicetype").val(),
     action: "create",
     companyid: companyid,
     invoicenumber: $("#invoicenum").val(),
     amount : invoiceamount.toString(),
     prepayment: $("#prepayment").val().toString(),
     vat: invoicevat.toString(),
     totalamount: invoicetotal.toString(),
     currency: $("#cur").val(),
     description: $("#description").val(),
     companyid: $('#invoiceform').attr("companyid"),
     counterparty: $("#counerparty").val(),
     counterpartytype: $("#counerpartytype").val(),
     address: $("#counerpartyaddress").val(),
     billingdate: $("#bildate").val(),
     basistype: $("#basis").attr("name"),
     basisid: $("#basis").val(),
     invoicebody: invoicebodyarray,
   };

   addinvoice(args, lang, token).done(function(resp){
     var invoiceid = resp.data.invoiceid;
     document.location.href = '/outgoing_invoice?id=' + invoiceid;
   }).fail(function(resp){failedanswer(resp)})


});

$("#duplicateinvoice").click(async function(event){

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

    var invoiceid = GetUrlParameter("id");
    var token =  await gettoken();

  duplicateinvoice(invoiceid, companyid, token).done(function(resp){
      var invoice = resp.data.invoicedata;
      var newinvoiceid = invoice.UID;
      var urlstring = "/edit_invoice?id=" + newinvoiceid;
      document.location.href = urlstring;
  }).fail(function(resp){failedanswer(resp)});

});



$("#sendinvoicetoemail").click(async function(event){
  var title = "Confirmation required"
  var email = $('#invemail').text();
  var body = '<div class="row" > \
    <div class="col-md-12"> \
    Would you like to send invoice to '+ email +'? \
    <label for="bildate">or Customize Email :</label> \
    <input type="text" class="form-control" id="customemail" > \
    </div>\
    <div class="col-md-12"> \
    <div class="form-group"> \
        <button class="btn btn-sm btn-primary ml-50 mb-2 mr-2" id="confemailbtn" >Yes</button> \
        <button class="btn btn-sm btn-primary ml-50 mb-2 mr-2" id="noconfemailbtn" >No</button> \
    </div> \
    </div>';
  alertwindow(title, body, "")

});
$(document).on( "click", "#noconfemailbtn", async function () {
  $('#generalmodal').modal('hide');
});

$(document).on( "click", "#confemailbtn", async function () {
  $('#generalmodal').modal('hide');
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

    var invoiceid = GetUrlParameter("id");
    var token =  await gettoken();
    var castomemail = $('#customemail').val();

  emailinvoice(invoiceid, companyid, castomemail, token).done(function(resp){
      //var invoice = resp.data.invoicedata;
      //var newinvoiceid = invoice.UID;
      //var urlstring = "/edit_invoice?id=" + newinvoiceid;
      //document.location.href = urlstring;
  }).fail(function(resp){failedanswer(resp)});
});

$("#saveimportinvoice").click(async function(event){
  event.preventDefault();
  var token =  await gettoken();
  var lindex = $("#invoicecontent").attr("index");
  var index = parseInt(lindex) - 1;
  var invoicebodyarray = [];
  var invoiceamount = 0.0;
  var invoicevat = 0.0;
  var vats = [];

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
    var amount = parseFloat($("[name='car["+i+"][amountinput]']").val());
    var vatpercent = parseFloat($("[name='car["+i+"][vatpercentinput]']").val());
    if (!vats.includes(vatpercent)) {
      if (vatpercent != 0) {
      vats.push(vatpercent);
    }
    }
    var vat = amount / 100 * vatpercent;

    var total = amount + vat;
    invoiceamount = invoiceamount + amount;
    console.log("invoicevat_before", invoicevat);
    invoicevat = invoicevat + vat;
    console.log("invoicevat_after", invoicevat);


  var invoicebodystr = {
    subscribtion: $("[name='car["+i+"][subscriptioninput]']").val(),
    price: $("[name='car["+i+"][priceinput]']").val(),
    quantity: $("[name='car["+i+"][quantityinput]']").val(),
    amount: amount.toString(),
    vatpercent: vatpercent.toString(),
    vat: vat.toString(),
    total: total.toString(),
    periodfrom: $("[name='car["+i+"][periodfrominput]']").val(),
    periodto: $("[name='car["+i+"][periodtoinput]']").val(),
    soll: $("[name='car["+i+"][sollinput]']").attr("code"),
    haben: $("[name='car["+i+"][habeninput]']").attr("code"),
  }
  invoicebodyarray.push(invoicebodystr);
}

console.log("invoicevat_after_cycle", invoicevat);
var invoicetotal = invoiceamount + invoicevat;
if ($("#prepayment").val() != "") {
  if ($("#prepayment").val() == invoicetotal){
    invoicetotal = 0
  } else {
if (vats.length == 0) {
// if VAT == 0

    invoicetotal = invoicetotal - $("#prepayment").val();

}
if (vats.length == 1) {
  //we have one vat
  //Sepatate prepayment and vat
  vatper = vats[0]
  prepam = $("#prepayment").val() / (100 + vatper) * 100
  prepvat = $("#prepayment").val() / (100 + vatper) * vatper

  invoicevat = invoicevat - prepvat;
  invoicetotal = invoiceamount - prepam + invoicevat;
}
}
}

var invoiceid = ""
if (GetUrlParameter("id") != "") {
    invoiceid = GetUrlParameter("id");
  //  companyid =  $('#saveimportinvoice').attr("company");
  }

  var lang = getlang();
  console.log("VAT4", invoicevat);
  var args =
   { type: $("#invoicetype").val(),
     invoiceid: invoiceid,
     action: "create",
     invoicenumber: $("#invoicenum").val(),
     amount : invoiceamount.toString(),
     vat: invoicevat.toString(),
     prepayment: $("#prepayment").val(),
     totalamount: invoicetotal.toString(),
     currency: $("#cur").val(),
     description: $("#description").val(),
     companyid: companyid,
     counterparty: $("#counerparty").val(),
     counterpartytype: $("#counerpartytype").val(),
     address: $("#counerpartyaddress").val(),
     billingdate: $("#bildate").val(),
     basistype: $("#basis").attr("name"),
     basisid: $("#basis").val(),
     invoicebody: invoicebodyarray,
   };

   var argsjson = JSON.stringify(args);
   console.log("invoiceargs", argsjson);

   addinvoice(args, lang, token).done(function(resp){
     var invoiceid = resp.data.invoiceid;

document.location.href = '/outgoing_invoice?id=' + invoiceid;
//$('#importinvoice').attr("invoiceid", invoiceid);
//$('#importinvoice').attr("hidden", false);

   }).fail(function(resp){failedanswer(resp)})


});

$("#saveincominginvoice").click(async function(event){
  event.preventDefault();
  var token =  await gettoken();
  var lindex = $("#invoicecontent").attr("index");
  var index = parseInt(lindex) - 1;
  var invoicebodyarray = [];
  var invoiceamount = 0;
  var invoicevat = 0;
  var vats = [];

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
    var amount = parseFloat($("[name='car["+i+"][amountinput]']").val());
    var vatpercent = parseFloat($("[name='car["+i+"][vatpercentinput]']").val());
    if (!vats.includes(vatpercent)) {
      if (vatpercent != 0) {
      vats.push(vatpercent);
    }
    }
    var vat = amount / 100 * vatpercent;
    var total = amount + vat;
    invoiceamount = invoiceamount + amount;
    invoicevat = invoicevat + vat;
      iscomvat = "0";
    if ($("[name='car["+i+"][iscomvat][]']").prop('checked')) {
      iscomvat = "1";
    }
  var invoicebodystr = {
    subscribtion: $("[name='car["+i+"][subscriptioninput]']").val(),
    price: $("[name='car["+i+"][priceinput]']").val(),
    quantity: $("[name='car["+i+"][quantityinput]']").val(),
    amount: amount.toString(),
    vatpercent: vatpercent.toString(),
    vat: vat.toString(),
    iscomunityvat: iscomvat,
    total: total.toString(),
    periodfrom: $("[name='car["+i+"][periodfrominput]']").val(),
    periodto: $("[name='car["+i+"][periodtoinput]']").val(),
    soll: $("[name='car["+i+"][sollinput]']").attr("code"),
    haben: $("[name='car["+i+"][habeninput]']").attr("code"),
  }
  invoicebodyarray.push(invoicebodystr);
}


var invoicetotal = invoiceamount + invoicevat;
if ($("#prepayment").val() != "") {
  if ($("#prepayment").val() == invoicetotal){
    invoicetotal = 0
  } else {
if (vats.length == 0) {
// if VAT == 0

    invoicetotal = invoicetotal - $("#prepayment").val();

}
if (vats.length == 1) {
  //we have one vat
  //Sepatate prepayment and vat
  vatper = vats[0]
  prepam = $("#prepayment").val() / (100 + vatper) * 100
  prepvat = $("#prepayment").val() / (100 + vatper) * vatper

  invoicevat = invoicevat - prepvat;
  invoicetotal = invoiceamount - prepam + invoicevat;
}
}
}

var invoiceid = ""
if (GetUrlParameter("id") != "") {
    invoiceid = GetUrlParameter("id");
  }

  var lang = getlang();
  console.log("invoice company id: ", companyid);
  var args =
   { type: $("#invoicetype").val(),
     invoiceid: invoiceid,
     action: "create",
     invoicenumber: $("#invoicenum").val(),
     amount : invoiceamount.toString(),
     vat: invoicevat.toString(),
     prepayment: $("#prepayment").val(),
     totalamount: invoicetotal.toString(),
     currency: $("#cur").val(),
     companyid: companyid,
     description: $("#description").val(),
     counterparty: $("#counerpartyincoming").val(),
     counterpartytype: $("#counerpartytypeinoming").val(),
     receiveddate: $("#bildate").val(),
     basistype: $("#basis").attr("name"),
     basisid: $("#basis").val(),
     invoicebody: invoicebodyarray,
   };

   var argsjson = JSON.stringify(args);
   console.log("invoiceargs", argsjson);

   addincomeinvoice(args, lang, token).done(function(resp){
     var invoiceid = resp.data.invoiceid;

document.location.href = '/incoming_invoice?id=' + invoiceid;

   }).fail(function(resp){failedanswer(resp)})


});

$("#genpdfinvoice").click(async function(event){
  event.preventDefault();
    var invoiceid = GetUrlParameter("id");
    var invoicenumber = "20210511001";
  //  invoicenumber = $("#invoicenumber").text();
    var token =  await gettoken();
    var filename = invoicenumber + ".pdf";
    showinvoicepdf(invoiceid, token).done(function(resp){
     //download(resp, filename, 'application/pdf');
      openfile(resp)
//  downloadFile(resp, filename, 'application/octet-stream');
//downloadPDF(resp, filename)
}).fail(function(resp){failedanswer(resp)});
});
});
})(jQuery);



$("#counerpartytype").on("change", async function () {
var type = $("#counerpartytype").val();
var token =  await gettoken();
if (type == "company") {
  showcompanies(token, 0, 25, 0, 0).done(function(resp){
    var comps = resp.data.companies;
    var select = document.getElementById("counerparty"),
        length = select.options.length;
    while(length--){
      select.remove(length);
    }
    $('#counerparty').append('<option value="">Choose Company</option> ');
    $('#counerpartyselect').attr("hidden", false);
    for (var i = 0; i < comps.length; i++) {
      var n = i + 1;

      $('#counerparty').append('<option value="'+comps[i].UID+'">'+comps[i].Name+'</option> ');


    }
  }).fail(function(resp){failedanswer(resp)});
};
if (type == "person") {

  showpersons(token, 25, 0).done(function(resp){
      var comps = resp.data.persons;
      var select = document.getElementById("counerparty"),
          length = select.options.length;
      while(length--){
        select.remove(length);
      }
      $('#counerparty').append('<option value="">Choose Person</option> ');
      $('#counerpartyselect').attr("hidden", false);
      for (var i = 0; i < comps.length; i++) {
        var n = i + 1;

        $('#counerparty').append('<option value="'+comps[i].UID+'">'+comps[i].Surname+' '+comps[i].Name+'</option> ');


        }

      }).fail(function(resp){failedanswer(resp)});

}

});

$("#counerparty").on("change", async function () {
  var type = $("#counerpartytype").val();
  var dataid = $("#counerparty").val();
  var token =  await gettoken();
  var doctype = $('#invoicetype').val();
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
  if (type == "company") {
    showcompanyaddress(dataid, token, 25, 0).done(function(resp) {
      var select = document.getElementById("counerpartyaddress"),
          length = select.options.length;
      while(length--){
        select.remove(length);
      }
      $('#counerpartyaddressselect').attr("hidden", false);

      if (resp.data.addresses.length != 0) {
                 var adresses = [];

                 var i;
                   $('#counerpartyaddress').append('<option value="">Choose Address</option> ');

    for (i = 0; i < resp.data.addresses.length; i++) {
    	var n = i + 1;
    	var addr = resp.data.addresses[i];
      var area = "";
      if (addr.Area != "") {
        area = addr.Area + ", ";
      }
      var addressinline = addr.Street +  " " + addr.House + ", " + area +  addr.Postecode + " " + addr.City + ", " + addr.Country;

      $('#counerpartyaddress').append('<option value="'+addr.AddressID+'">'+addressinline+'</option>');

    }
    } else {

      $('#counerpartyaddress').append('<option value="">You have no addresses</option>');
    }

    }).fail(function(resp){failedanswer(resp)});


  }
  if (type == "person") {
    showpersonaddress(dataid, token, 25, 0).done(function(resp) {
      var select = document.getElementById("counerpartyaddress"),
          length = select.options.length;
      while(length--){
        select.remove(length);
      }
      $('#counerpartyaddressselect').attr("hidden", false);

      if (resp.data.addresses.length != 0) {
                 var adresses = [];

                 var i;
                 $('#counerpartyaddress').append('<option value="">Choose Address</option> ');
    for (i = 0; i < resp.data.addresses.length; i++) {
    	var n = i + 1;
    	var addr = resp.data.addresses[i];
      var area = "";
      if (addr.Area != "") {
        area = addr.Area + ", ";
      }
      var addressinline = addr.Street +  " " + addr.House + ", " + area +  addr.Postecode + " " + addr.City + ", " + addr.Country;

$('#counerpartyaddress').append('<option value="'+addr.UID+'">'+addressinline+'</option>');

    }
    } else {
      $('#counerpartyaddress').append('<option value="">You have no addresses</option>');
    }

    }).fail(function(resp){failedanswer(resp)});

  }

  if (doctype == "invoice") {
  $('#basisselect').attr("hidden", false);
  $('#basisselect').attr("name", "agreement");
  var path = getpagepath();
  var isactivep = "true";
  if (path == "/import_invoice/") {
    isactivep = "";
  }
  //If type is invoice - find agreement
  var params = new URLSearchParams({
    counterparty: dataid,
    complited: "true",
    isactive: isactivep,
  });
  var sparams = params.toString()
showagreements(companyid, token, 25, 0, sparams).done(function(resp){
  var select = document.getElementById("basis"),
      length = select.options.length;
  while(length--){
    select.remove(length);
  }
  if (resp.data.agreements.length != 0) {
             var adresses = [];

             var i;
               $('#basis').append('<option value="">Select Basis of Document</option> ');

for (i = 0; i < resp.data.agreements.length; i++) {
  var n = i + 1;
  var dat = resp.data.agreements[i];




  $('#basis').append('<option value="'+dat.AgreementID+'">'+ dat.Name + ' #' + dat.Num + ' ' + dat.SignDate+'</option>');

}
} else {

  $('#basis').append('<option value="">No basis documents</option>');
}
}).fail(function(resp){failedanswer(resp)});

  }
  if (doctype == "creditnote") {
  $('#basisselect').attr("hidden", false);
  $('#basisselect').attr("name", "invoice");
  //if type is credit note - find invoice
var params = new URLSearchParams({
  counterparty: dataid,
  complited: "true",
});
var sparams = params.toString()
showinvoices(companyid, token, 25, 0, sparams).done(function(resp){
  var select = document.getElementById("basis"),
      length = select.options.length;
  while(length--){
    select.remove(length);
  }
  if (resp.data.invoices.length != 0) {
             var adresses = [];

             var i;
               $('#basis').append('<option value="">Select Basis of Document</option> ');

for (i = 0; i < resp.data.invoices.length; i++) {
  var n = i + 1;
  var dat = resp.data.invoices[i];



  $('#basis').append('<option value="'+dat.UID+'">'+ dat.Num+'</option>');

}
} else {

  $('#basis').append('<option value="">No basis documents</option>');
}
}).fail(function(resp){failedanswer(resp)});

  }
});

$("#counerpartytypeinoming").on("change", async function () {
var type = $("#counerpartytypeinoming").val();
var token =  await gettoken();
if (type == "company") {
  showcompanies(token, 0, 25, 0, 0).done(function(resp){
    var comps = resp.data.companies;
    var select = document.getElementById("counerpartyincoming"),
        length = select.options.length;
    while(length--){
      select.remove(length);
    }
    $('#counerpartyincoming').append('<option value="">Choose Company</option> ');
    $('#counerpartyselect').attr("hidden", false);
    for (var i = 0; i < comps.length; i++) {
      var n = i + 1;

      $('#counerpartyincoming').append('<option value="'+comps[i].UID+'">'+comps[i].Name+'</option> ');


    }
  }).fail(function(resp){failedanswer(resp)});
};
if (type == "person") {

  showpersons(token, 25, 0).done(function(resp){
      var comps = resp.data.persons;
      var select = document.getElementById("counerpartyincoming"),
          length = select.options.length;
      while(length--){
        select.remove(length);
      }
      $('#counerpartyincoming').append('<option value="">Choose Person</option> ');
      $('#counerpartyselect').attr("hidden", false);
      for (var i = 0; i < comps.length; i++) {
        var n = i + 1;

        $('#counerpartyincoming').append('<option value="'+comps[i].UID+'">'+comps[i].Surname+' '+comps[i].Name+'</option> ');


        }

      }).fail(function(resp){failedanswer(resp)});

}

});

$("#basis").on("change", async function () {
    var agreementid = $("#basis").val();
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

        showagreement(agreementid, companyid, token).done(function(resp){
          var data = resp.data.agreementdata;
          var soll = data.Soll;
          var haben = data.Haben;
          var sollname = data.SollName;
          var habenname = data.HabenName;
          $("[name='car[0][sollinput]']").val(sollname);
          $("[name='car[0][sollinput]']").attr("code", soll);
          $("[name='car[0][habeninput]']").val(habenname);
          $("[name='car[0][habeninput]']").attr("code", haben);
          $('#mycompdet').attr("soll", soll);
          $('#mycompdet').attr("sollname", sollname);
          $('#mycompdet').attr("haben", haben);
          $('#mycompdet').attr("habenname", habenname);
        }).fail(function(resp){failedanswer(resp)});

});

$("#counerpartyincoming").on("change", async function () {
  var type = $("#counerpartytypeinoming").val();
  var dataid = $("#counerpartyincoming").val();
  var token =  await gettoken();
  var doctype = $('#invoicetype').val();
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


  if (doctype == "invoice") {
  $('#basisselect').attr("hidden", false);
  $('#basisselect').attr("name", "agreement");
  var path = getpagepath();
  var isactivep = "true";
  if (path == "/import_outgoing_invoice/") {
    isactivep = "";
  }
  //If type is invoice - find agreement
  var params = new URLSearchParams({
    counterparty: dataid,
    complited: "true",
    isactive: isactivep,
  });
  var sparams = params.toString()
showagreements(companyid, token, 25, 0, sparams).done(function(resp){
  var select = document.getElementById("basis"),
      length = select.options.length;
  while(length--){
    select.remove(length);
  }
  if (resp.data.agreements.length != 0) {
             var adresses = [];

             var i;
               $('#basis').append('<option value="">Select Basis of Document</option> ');

for (i = 0; i < resp.data.agreements.length; i++) {
  var n = i + 1;
  var dat = resp.data.agreements[i];




  $('#basis').append('<option value="'+dat.AgreementID+'">'+ dat.Name + ' #' + dat.Num + ' ' + dat.SignDate+'</option>');

}
} else {

  $('#basis').append('<option value="">No basis documents</option>');
}
}).fail(function(resp){failedanswer(resp)});

  }
  if (doctype == "creditnote") {
  $('#basisselect').attr("hidden", false);
  $('#basisselect').attr("name", "invoice");
  //if type is credit note - find invoice
var params = new URLSearchParams({
  counterparty: dataid,
  complited: "true",
});
var sparams = params.toString()
showincomeinvoices(companyid, token, 25, 0, sparams).done(function(resp){
  var select = document.getElementById("basis"),
      length = select.options.length;
  while(length--){
    select.remove(length);
  }
  if (resp.data.invoices.length != 0) {
             var adresses = [];

             var i;
               $('#basis').append('<option value="">Select Basis of Document</option> ');

for (i = 0; i < resp.data.invoices.length; i++) {
  var n = i + 1;
  var dat = resp.data.invoices[i];



  $('#basis').append('<option value="'+dat.InvoiceID+'">'+ dat.Num+'</option>');

}
} else {

  $('#basis').append('<option value="">No basis documents</option>');
}
}).fail(function(resp){failedanswer(resp)});

  }
});
