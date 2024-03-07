$("#savetransfer").click(async function(event){
    event.preventDefault();
    var token =  await gettoken();
    var lang = getlang();

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



    var args =
     {

       date: $('#date').val(),
       fromtype: $('#acctype').val(),
       fromid: $('#acctypes').val(),
       companyid: companyid,
       totype: $('#acctypeb').val(),
       toid: $('#acctypesb').val(),
       amount: $('#amount').val(),
       currency: $('#cur').val(),
       comment: $('#comment').val(),
       description: $('#description').val(),
     }

     addtransfer(args, lang, token).done(function(resp){

     }).fail(function(resp){failedanswer(resp)});





});

$("#savepayment").click(async function(event){
    event.preventDefault();
    var token =  await gettoken();
    var lang = getlang();

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


    var invoicevat = 0;
    var invoicetotal = 0;
    var invoiceamount = 0;
    var lindex = $("#invoicecontent").attr("index");
    var index = parseInt(lindex) - 1;
    var invoicebodyarray = [];

    for (var i = 0; i < lindex; i++) {
      var amount = parseFloat($("[name='car["+i+"][amountinput]']").val());
      var vatpercent = parseFloat($("[name='car["+i+"][vatpercentinput]']").val());
      var vat = parseFloat($("[name='car["+i+"][vatinput]']").val());
      var total = amount + vat;
      invoiceamount = invoiceamount + amount;
      invoicevat = invoicevat + vat;
      var vatineu = "0";
      if ($("[name='car["+i+"][vatineu][]'").prop('checked')) {
        vatineu = "1";
      }
      var trans = "0";
      if ($("[name='car["+i+"][transit][]'").prop('checked')) {
        trans = "1";
      }

    var invoicebodystr = {
      accaccount: $("[name='car["+i+"][categoryinput]']").attr("code"),
      amount: amount.toString(),
      vatpercent: vatpercent.toString(),
      vat: $("[name='car["+i+"][vatinput]']").val(),
      totalamount: total.toString(),
      basetype: $("[name='car["+i+"][basis]']").val(),
      baseid: $("[name='car["+i+"][basisid]']").attr("code"),
      description: $("[name='car["+i+"][descdet]']").val(),
      comment: $("[name='car["+i+"][comdet]']").val(),
      iscomunityvat: vatineu,
      istransit: trans,
      periodfrom: $("[name='car["+i+"][periodfrominput]']").val(),
      periodto: $("[name='car["+i+"][periodtoinput]']").val(),
    }
    invoicebodyarray.push(invoicebodystr);
  }


  var invoicetotal = invoiceamount + invoicevat;
  var cp = $('#counerpartyincoming').val()
if ($('#counerpartytypepayment').val() == "custom") {
  cp = $('#counterpartycustominput').val()
}

    var args =
     {

       amount: invoiceamount.toString(),
       vat: invoicevat.toString(),
       totalamount: invoicetotal.toString(),
       companyid: companyid.toString(),
       currency: $('#cur').val(),
       date: $('#bildate').val(),
       counterparty: cp,
       receiptnum: $('#invoicenum').val(),
       counterpartytype: $('#counerpartytypepayment').val(),
       accounttype: $('#acctype').val(),
       accountid: $('#acctypes').val(),
       comment: $('#comment').val(),
       description:  $('#description').val(),
       paymentdetails: invoicebodyarray,
     }

     addpayment(args, lang, token).done(function(resp){
       var paymentid = resp.data.paymentid;

         var title = "File upload";
         var body = '<div class="row"> \
        <div>Would you like to upload file?</div> \
        <div class="col-md-12"> \
          <button type="submit" class="btn btn-success" name="'+paymentid+'" id="payans"><i class="la la-check-square-o"></i> Yes</button> \
          <button type="submit" class="btn btn-success" name="'+paymentid+'" id="payanscansel"><i class="la la-check-square-o"></i> No</button> \
        </div> \
         </div> \
         ';
         alertwindow(title, body, "")


     }).fail(function(resp){failedanswer(resp)})


});

$(document).on( "click", "#payans", async function () {
  var paymentid = $(this).attr("name");
  $('#importpayment').attr("paymentid", paymentid);
  $('#importpayment').attr("hidden", false);
  $('#generalmodal').modal('hide');
});

$(document).on( "click", "#payanscansel", async function () {
  var paymentid = $(this).attr("name");
  $('#generalmodal').modal('hide');
  document.location.href = '/payment?id=' + paymentid;
});

$("#counerpartytypepayment").on("change", async function () {
var type = $("#counerpartytypepayment").val();
var token =  await gettoken();
if (type == "company") {
  showcompanies(token, 0, 25, 0, 0).done(function(resp){
    var comps = resp.data.companies;
    var select = document.getElementById("counerpartyincoming"),
        length = select.options.length;
    while(length--){
      select.remove(length);
    }
    $('#counerpartypayment').append('<option value="">Choose Company</option> ');
    $('#counerpartyselect').attr("hidden", false);
    $('#counerpartyselectcustom').attr("hidden", true);
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
      $('#counerpartyselectcustom').attr("hidden", true);
      for (var i = 0; i < comps.length; i++) {
        var n = i + 1;

        $('#counerpartyincoming').append('<option value="'+comps[i].UID+'">'+comps[i].Surname+' '+comps[i].Name+'</option> ');


        }

      }).fail(function(resp){failedanswer(resp)});

}
if (type == "custom") {
  $('#counerpartyselectcustom').attr("hidden", false);
  $('#counerpartyselect').attr("hidden", true)
}

});

$(document).on( "click", ".paymenttr", function () {
  paymentid = $(this).attr("data-name");
  	document.location.href = '/payment?id=' + paymentid;
});

$("#complitepayment").click(async function(event){
  event.preventDefault();
  var token =  await gettoken();
  var paymentid = GetUrlParameter("id");
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
    complitepayment(paymentid, companyid, token).done(function(resp){
document.location.href = '/payment?id=' + paymentid;
      }).fail(function(resp){failedanswer(resp)});
});



$("#showreceipt").click(async function(event){
  event.preventDefault();
  var token =  await gettoken();
  var fileid = $('#showreceipt').attr("fileid");
  var paymentid = GetUrlParameter("id");
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
  showpaymentreceipt(paymentid, fileid, companyid, token) .done(function(resp){
      openfile(resp);
  }).fail(function(resp){failedanswer(resp)});

});

$(document).on( "change", ".vatsel", async function () {
  var ia = $(this).attr("name");
  var resa = ia.split("]");
  var resb = resa[0];
  var ib = resb.split("[");
  var iname = ib[1];
  var val = $(this).val();
  var vatf = parseFloat(val);
  if (val != "0") {
    var amount = parseFloat($("[name='car["+iname+"][amountinput]']").val());
    var vatam  = amount / 100 * vatf;
    var totam = amount + vatam;
    $("[name='car["+iname+"][totamountinput]']").val(totam);
  } else {
      var amount = $("[name='car["+iname+"][amountinput]']").val();
      $("[name='car["+iname+"][totamountinput]']").val(amount);
  }
});

$(document).on( "click hover mouseover", ".vatsel", async function () {
var token =  await gettoken();
  var val = $(this).val();
  var curname = $(this).attr("name");
  var load = $(this).attr("load");
  console.log(curname);

  if (load != "1") {
    showvats(token).done(function(resp){
      var data = resp.data.typedata;
     $("[name='"+curname+"']").empty();
    $("[name='"+curname+"']").append('<option value="">Select VAT %</option> ');
      for (var i = 0; i < data.length; i++) {

      $("[name='"+curname+"']").append('<option value="'+ data[i].VAT+'">'+data[i].VAT+' %</option> ');


        }
         $("[name='"+curname+"']").attr("load", "1");
       }).fail(function(resp){failedanswer(resp)})
 }
});

$(document).on( "click", ".acccode", async function () {

  //Get information about company to get chartid kontenrahmen
  // var SessionStore = new Store('erp-db', 'session')
var companyid = await  get('sessionid', SessionStore).then( result => {

    if (result !== undefined) {
      var session = JSON.parse(result);
      console.log(session.companyid);
      return session.companyid

    }
  });
  var token =  await gettoken();
  var curname = $(this).attr("name");
  showcompany(companyid, token).done(function(resp){


    var comp = resp.data.company;

    var chartid = comp.Kontenrahmen;

  //get categories by chartid

  var title = "Select Accounting Category";
  var body = '<div class="row" id="callbk" name="'+curname+'"> \
    <div class="col-md-12"> \
    Filters \
    </div>\
  <div class="col-md-6"> \
  <div class="form-group"> \
      <label for="bildate">Select Category</label> \
      <select class="custom-select form-control" id="getcatforpay" code="'+chartid+'"> \
          <option value="">Select Category</option> \
      </select> \
  </div> \
  <div class="form-group"> \
      <label for="bildate">Select Sub Category</label> \
      <select class="custom-select form-control" id="getsubcatforpay"> \
          <option value="">Select Sub Category</option> \
      </select> \
  </div> \
  </div> \
  <div class="col-md-6"> \
  <div class="form-group"> \
      <label for="bildate">Filtered by Code</label> \
      <input type="text" class="form-control" id="accode" > \
  </div> \
  <div class="form-group"> \
      <label for="bildate">Filtered by Account Name</label> \
      <input type="text" class="form-control" id="accname" > \
  </div> \
  <div class="form-group"> \
      <button class="btn btn-sm btn-secondary ml-50 mb-2 mr-2" id="showaccbtn" >Show</button> \
  </div> \
  </div> \
  </div>\
  <div class="row"> \
  <div class="col-md-12"> \
  <div class="tab-content"> \
    <div class="table-responsive"> \
        <table class="table mb-0" width="100%"> \
          <thead> \
              <tr> \
                  <th>Account</th> \
                  <th>Name</th> \
              </tr> \
          </thead> \
          <tbody id="acctbody"> \
          </tbody> \
      </table> \
  </div> \
    </div> \
    </div>\
    </div>\
  ';

  alertwindow(title, body, "")
}).fail(function(resp){failedanswer(resp)});

});

$(document).on( "click hover mouseover", "#getcatforpay", async  function () {

//   $('#generalmodal').modal('hide');
if ($(this).val() == "") {
var token =  await gettoken();
var chartid = $(this).attr("code");
showchartcategories(chartid, "", token).done(function(resp){
    var data = resp.data.categories;
    $('#getcatforpay').empty();
    $('#getcatforpay').append('<option value="">Select Category</option> ');
    for (var i = 0; i < data.length; i++) {
      $('#getcatforpay').append('<option value="'+ data[i].UID+'">'+data[i].CategoryEng+'</option> ');
    }
}).fail(function(resp){failedanswer(resp)});
}
})

$(document).on( "click hover mouseover", "#getsubcatforpay", async  function () {

//   $('#generalmodal').modal('hide');
if ($('#getcatforpay').val() != "" && $(this).val() == "") {
var token =  await gettoken();
var chartid = $('#getcatforpay').val();
showchartsubcategories(chartid, "", token).done(function(resp){
    var data = resp.data.subcategories;
    $('#getsubcatforpay').empty();
    $('#getsubcatforpay').append('<option value="">Select Sub Category</option> ');
    for (var i = 0; i < data.length; i++) {
      $('#getsubcatforpay').append('<option value="'+ data[i].UID+'">'+data[i].SubCategoryEng+'</option> ');
    }
}).fail(function(resp){failedanswer(resp)});
}
})

$(document).on( "click", "#showaccbtn", async  function () {
  var chartid = $("#getcatforpay").attr("code");
  var categoryid = $("#getcatforpay").val();
  var subcategoryid = $("#getsubcatforpay").val();
  var token =  await gettoken();
  showchart(chartid, categoryid, subcategoryid, "", "", "", token).done(function(resp){

    var data = resp.data.charts;
  $('#acctbody').empty();
    for (var i = 0; i < data.length; i++) {
      $('#acctbody').append('<tr class="selacccodetr" style="cursor:pointer;" code="'+data[i].Account+'" nm="'+data[i].NameEng+'"> \
      <td>'+data[i].Account+'</td> \
      <td>'+data[i].NameEng+'</td> \
      </tr> ');
    }
  }).fail(function(resp){failedanswer(resp)})
});

$(document).on( "click", ".selacccodetr", async  function () {
  var code = $(this).attr("code");
  var name = $(this).attr("nm");
  var callbackinput = $("#callbk").attr("name");
  $("[name='"+callbackinput+"']").val(name);
  $("[name='"+callbackinput+"']").attr("code", code);
  $('#generalmodal').modal('hide');
});

$(document).on( "keypress", "#accode", async  function () {
  var code = $("#accode").val();
  if ( code.length > 1) {

  var chartid = $("#getcatforpay").attr("code");
  var categoryid = $("#getcatforpay").val();
  var subcategoryid = $("#getsubcatforpay").val();
  var token =  await gettoken();

  showchart(chartid, categoryid, subcategoryid, "", code, "", token).done(function(resp){

    var data = resp.data.charts;
  $('#acctbody').empty();
    for (var i = 0; i < data.length; i++) {
      $('#acctbody').append('<tr class="selacccodetr" style="cursor:pointer;" code="'+data[i].Account+'" nm="'+data[i].NameEng+'"> \
      <td>'+data[i].Account+'</td> \
      <td>'+data[i].NameEng+'</td> \
      </tr> ');
    }
  }).fail(function(resp){failedanswer(resp)})
}
});

$(document).on( "keypress", "#accname", async  function () {
  var name = $("#accname").val();
  if (name.length > 1) {

  var chartid = $("#getcatforpay").attr("code");
  var categoryid = $("#getcatforpay").val();
  var subcategoryid = $("#getsubcatforpay").val();
  var token =  await gettoken();

  showchart(chartid, categoryid, subcategoryid, "", "", name, token).done(function(resp){

    var data = resp.data.charts;
  $('#acctbody').empty();
    for (var i = 0; i < data.length; i++) {
      $('#acctbody').append('<tr class="selacccodetr" style="cursor:pointer;" code="'+data[i].Account+'" nm="'+data[i].NameEng+'"> \
      <td>'+data[i].Account+'</td> \
      <td>'+data[i].NameEng+'</td> \
      </tr> ');
    }
  }).fail(function(resp){failedanswer(resp)})
}
});

$(document).on( "click", ".invoices", async function () {


  //Get information about company to get chartid kontenrahmen
  var curname = $(this).attr("name");
  numa = curname.split("[");
  numb = numa[1].split("]");
  var param = $("[name='car["+numb[0]+"][basis]']").val();


  if (param == "invoice") {


    var token =  await gettoken();
    var counertparty = $('#counerpartyincoming').val();

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
      filters = "counterparty="+counertparty+"&paid=false&type=invoice";
        showincomeinvoices(companyid, token, 25, 0, filters).done(function(resp){

          var data = resp.data.invoices;

          var title = "Select Invoice";
          var bda ='<div class="row" > \
            <div class="col-md-12"> \
            Filters \
            </div>\
          <div class="col-md-6"> \
          <div class="form-group"> \
              <label for="bildate">From</label> \
              <input type="date" class="form-control" id="fromdate" > \
          </div> \
          </div> \
          <div class="col-md-6"> \
          <div class="form-group"> \
              <label for="bildate">To</label> \
              <input type="date" class="form-control" id="todate" > \
          </div> \
          </div> \
          <div class="col-md-12"> \
          <div class="form-group"> \
              <button class="btn btn-sm btn-secondary ml-50 mb-2 mr-2" id="showinvbtn" >Show</button> \
          </div> \
            </div> \
          </div> \
          <div class="row" id="callbk" name="'+curname+'"> \
          <div class="col-md-12"> \
          <div class="tab-content"> \
            <div class="table-responsive"> \
                <table class="table mb-0" width="100%"> \
                  <thead> \
                      <tr> \
                          <th>#</th> \
                          <th>Received Date</th> \
                          <th>Received Date</th> \
                          <th>Total Amount</th> \
                      </tr> \
                  </thead> \
                  <tbody id="invbody"> ';
          var bodar = [];


          for (var i = 0; i < data.length; i++) {

bodar.push('<tr name="'+data[i].UID+'" dt="'+data[i].Num+' ('+data[i].ReceivedDate+')"  class="ininvtr" type="'+param+'" style="cursor:pointer;"> \
            <td>'+ data[i].Num +'</td> \
            <td>'+data[i].ReceivedDate+'</td>\
            <td>'+data[i].TotalAmount+' '+data[i].Currency.toUpperCase()+'</td>\
            </tr>');




}
var bodarstr = bodar.join();

var bodyb = '</tbody> \
</table> \
</div> \
</div> \
</div>\
</div>';
var body = bda + bodarstr + bodyb;
alertwindow(title, body, "")

}).fail(function(resp){failedanswer(resp)});
}
  if (param == "creditnote") {


  var token =  await gettoken();
  var counertparty = $('#counerpartyincoming').val();

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
    filters = "counterparty="+counertparty+"&paid=false&type=creditnote";
      showinvoices(companyid, token, 25, 0, filters).done(function(resp){

        var data = resp.data.invoices;

        var title = "Select Invoice";
        var bda ='<div class="row" > \
          <div class="col-md-12"> \
          Filters \
          </div>\
        <div class="col-md-6"> \
        <div class="form-group"> \
            <label for="bildate">From</label> \
            <input type="date" class="form-control" id="fromdate" > \
        </div> \
        </div> \
        <div class="col-md-6"> \
        <div class="form-group"> \
            <label for="bildate">To</label> \
            <input type="date" class="form-control" id="todate" > \
        </div> \
        </div> \
        <div class="col-md-12"> \
        <div class="form-group"> \
            <button class="btn btn-sm btn-secondary ml-50 mb-2 mr-2" id="showinvbtn" >Show</button> \
        </div> \
          </div> \
        </div> \
        <div class="row" id="callbk" name="'+curname+'"> \
        <div class="col-md-12"> \
        <div class="tab-content"> \
          <div class="table-responsive"> \
              <table class="table mb-0" width="100%"> \
                <thead> \
                    <tr> \
                        <th>#</th> \
                        <th>Received Date</th> \
                        <th>Received Date</th> \
                        <th>Total Amount</th> \
                    </tr> \
                </thead> \
                <tbody id="invbody"> ';
        var bodar = [];


        for (var i = 0; i < data.length; i++) {

bodar.push('<tr name="'+data[i].UID+'" dt="'+data[i].Num+' ('+data[i].ReceivedDate+')"  class="ininvtr" type="'+param+'" style="cursor:pointer;"> \
          <td>'+ data[i].Num +'</td> \
          <td>'+data[i].ReceivedDate+'</td>\
          <td>'+data[i].TotalAmount+' '+data[i].Currency.toUpperCase()+'</td>\
          </tr>');




}
var bodarstr = bodar.join();

var bodyb = '</tbody> \
</table> \
</div> \
</div> \
</div>\
</div>';
var body = bda + bodarstr + bodyb;
alertwindow(title, body, "")

}).fail(function(resp){failedanswer(resp)});
}
if (param == "tranche" || param == "settelment") {
  var token =  await gettoken();
  var counertparty = $('#counerpartyincoming').val();

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
    filter = "counterparty="+counertparty;

    showloans(companyid, token, 25, 0, filter).done(function(resp){
      var data = resp.data.loans;

      var title = "Select Invoice";
      var bda ='<div class="row" > \
        <div class="col-md-12"> \
        Filters \
        </div>\
      <div class="col-md-6"> \
      <div class="form-group"> \
          <label for="bildate">From</label> \
          <input type="date" class="form-control" id="fromdate" > \
      </div> \
      </div> \
      <div class="col-md-6"> \
      <div class="form-group"> \
          <label for="bildate">To</label> \
          <input type="date" class="form-control" id="todate" > \
      </div> \
      </div> \
      <div class="col-md-12"> \
      <div class="form-group"> \
          <button class="btn btn-sm btn-secondary ml-50 mb-2 mr-2" id="showinvbtn" >Show</button> \
      </div> \
        </div> \
      </div> \
      <div class="row" id="callbk" name="'+curname+'"> \
      <div class="col-md-12"> \
      <div class="tab-content"> \
        <div class="table-responsive"> \
            <table class="table mb-0" width="100%"> \
              <thead> \
                  <tr> \
                      <th>#</th> \
                      <th>Received Date</th> \
                      <th>Received Date</th> \
                      <th>Total Amount</th> \
                  </tr> \
              </thead> \
              <tbody id="invbody"> ';
      var bodar = [];


      for (var i = 0; i < data.length; i++) {

bodar.push('<tr name="'+data[i].UID+'" dt="'+data[i].UID+'"  class="ininvtr" type="'+param+'" style="cursor:pointer;"> \
        <td>'+data[i].UID+'</td> \
        <td>'+data[i].CompanyPosition+'</td>\
        <td></td>\
        </tr>');




}
var bodarstr = bodar.join();

var bodyb = '</tbody> \
</table> \
</div> \
</div> \
</div>\
</div>';
var body = bda + bodarstr + bodyb;
alertwindow(title, body, "")
    }).fail(function(resp){failedanswer(resp)});
}
});

$(document).on( "click", ".outinvoices", async function () {


  //Get information about company to get chartid kontenrahmen
  var curname = $(this).attr("name");
  numa = curname.split("[");
  numb = numa[1].split("]");

    param = $("[name='car["+numb[0]+"][basistype]']").val();

  if (param == "invoice") {
  var token =  await gettoken();

  var counertparty = $('#counerparty').val();

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
      filters = "counterparty="+counertparty+"&type=invoice";
        showinvoices(companyid, token, 25, 0, filters).done(function(resp){

          var data = resp.data.invoices;

          var title = "Select Invoice";
          var bda ='<div class="row" > \
            <div class="col-md-12"> \
            Filters \
            </div>\
          <div class="col-md-6"> \
          <div class="form-group"> \
              <label for="bildate">From</label> \
              <input type="date" class="form-control" id="fromdate" > \
          </div> \
          </div> \
          <div class="col-md-6"> \
          <div class="form-group"> \
              <label for="bildate">To</label> \
              <input type="date" class="form-control" id="todate" > \
          </div> \
          </div> \
          <div class="col-md-12"> \
          <div class="form-group"> \
              <button class="btn btn-sm btn-secondary ml-50 mb-2 mr-2" id="showinvbtn" >Show</button> \
          </div> \
            </div> \
          </div> \
          <div class="row" id="callbk" name="'+curname+'"> \
          <div class="col-md-12"> \
          <div class="tab-content"> \
            <div class="table-responsive"> \
                <table class="table mb-0" width="100%"> \
                  <thead> \
                      <tr> \
                          <th>#</th> \
                          <th>Received Date</th> \
                          <th>Received Date</th> \
                          <th>Total Amount</th> \
                      </tr> \
                  </thead> \
                  <tbody id="invbody"> ';
          var bodar = [];


          for (var i = 0; i < data.length; i++) {

bodar.push('<tr name="'+data[i].UID+'" dt="'+data[i].Num+' ('+data[i].ReceivedDate+')"  class="ininvtr" type="'+param+'" style="cursor:pointer;"> \
            <td>'+ data[i].Num +'</td> \
            <td>'+data[i].ReceivedDate+'</td>\
            <td>'+data[i].TotalAmount+' '+data[i].Currency.toUpperCase()+'</td>\
            </tr>');




}
var bodarstr = bodar.join();

var bodyb = '</tbody> \
</table> \
</div> \
</div> \
</div>\
</div>';
var body = bda + bodarstr + bodyb;
alertwindow(title, body, "")

}).fail(function(resp){failedanswer(resp)});
}

if (param == "creditnote") {
var token =  await gettoken();

var counertparty = $('#counerparty').val();

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
    filters = "counterparty="+counertparty+"&type=creditnote";
      showincomeinvoices(companyid, token, 25, 0, filters).done(function(resp){

        var data = resp.data.invoices;

        var title = "Select Invoice";
        var bda ='<div class="row" > \
          <div class="col-md-12"> \
          Filters \
          </div>\
        <div class="col-md-6"> \
        <div class="form-group"> \
            <label for="bildate">From</label> \
            <input type="date" class="form-control" id="fromdate" > \
        </div> \
        </div> \
        <div class="col-md-6"> \
        <div class="form-group"> \
            <label for="bildate">To</label> \
            <input type="date" class="form-control" id="todate" > \
        </div> \
        </div> \
        <div class="col-md-12"> \
        <div class="form-group"> \
            <button class="btn btn-sm btn-secondary ml-50 mb-2 mr-2" id="showinvbtn" >Show</button> \
        </div> \
          </div> \
        </div> \
        <div class="row" id="callbk" name="'+curname+'"> \
        <div class="col-md-12"> \
        <div class="tab-content"> \
          <div class="table-responsive"> \
              <table class="table mb-0" width="100%"> \
                <thead> \
                    <tr> \
                        <th>#</th> \
                        <th>Received Date</th> \
                        <th>Received Date</th> \
                        <th>Total Amount</th> \
                    </tr> \
                </thead> \
                <tbody id="invbody"> ';
        var bodar = [];


        for (var i = 0; i < data.length; i++) {

bodar.push('<tr name="'+data[i].UID+'" dt="'+data[i].Num+' ('+data[i].ReceivedDate+')"  class="ininvtr" type="'+param+'" style="cursor:pointer;"> \
          <td>'+ data[i].Num +'</td> \
          <td>'+data[i].ReceivedDate+'</td>\
          <td>'+data[i].TotalAmount+' '+data[i].Currency.toUpperCase()+'</td>\
          </tr>');




}
var bodarstr = bodar.join();

var bodyb = '</tbody> \
</table> \
</div> \
</div> \
</div>\
</div>';
var body = bda + bodarstr + bodyb;
alertwindow(title, body, "")

}).fail(function(resp){failedanswer(resp)});
}

if (param == "tranche" || param == "settelment" ) {
  var token =  await gettoken();
  var counertparty = $('#counerparty').val();
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
      var filter = "counertparty=" + counertparty;

      showloans(companyid, token, 25, 0, filter).done(function(resp){
        var data = resp.data.loans;

        var title = "Select Invoice";
        var bda ='<div class="row" > \
          <div class="col-md-12"> \
          Filters \
          </div>\
        <div class="col-md-6"> \
        <div class="form-group"> \
            <label for="bildate">From</label> \
            <input type="date" class="form-control" id="fromdate" > \
        </div> \
        </div> \
        <div class="col-md-6"> \
        <div class="form-group"> \
            <label for="bildate">To</label> \
            <input type="date" class="form-control" id="todate" > \
        </div> \
        </div> \
        <div class="col-md-12"> \
        <div class="form-group"> \
            <button class="btn btn-sm btn-secondary ml-50 mb-2 mr-2" id="showinvbtn" >Show</button> \
        </div> \
          </div> \
        </div> \
        <div class="row" id="callbk" name="'+curname+'"> \
        <div class="col-md-12"> \
        <div class="tab-content"> \
          <div class="table-responsive"> \
              <table class="table mb-0" width="100%"> \
                <thead> \
                    <tr> \
                        <th>#</th> \
                        <th>Received Date</th> \
                        <th>Received Date</th> \
                        <th>Total Amount</th> \
                    </tr> \
                </thead> \
                <tbody id="invbody"> ';
        var bodar = [];


        for (var i = 0; i < data.length; i++) {

  bodar.push('<tr name="'+data[i].UID+'" dt="'+data[i].UID+'"  class="ininvtr" type="'+param+'" style="cursor:pointer;"> \
          <td>'+data[i].UID+'</td> \
          <td>'+data[i].CompanyPosition+'</td>\
          <td></td>\
          </tr>');




  }
  var bodarstr = bodar.join();

  var bodyb = '</tbody> \
  </table> \
  </div> \
  </div> \
  </div>\
  </div>';
  var body = bda + bodarstr + bodyb;
  alertwindow(title, body, "")
      }).fail(function(resp){failedanswer(resp)});
    }
});

$(document).on( "click", "#showinvbtn", async function () {
  var token =  await gettoken();
  var counertparty = $('#counerpartyincoming').val();
  var fr = $('#fromdate').val();
  var to = $('#todate').val();
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
    filters = "from="+fr+"&to="+to+"&counterparty="+counertparty+"&paid=false&type=invoice";
      showincomeinvoices(companyid, token, 25, 0, filters).done(function(resp){
          var data = resp.data.invoices;
          $('#invbody').empty();
          for (var i = 0; i < data.length; i++) {

$('#invbody').append('<tr name="'+data[i].UID+'" dt="'+data[i].Num+' ('+data[i].ReceivedDate+')"  class="ininvtr" type="'+param+'" style="cursor:pointer;"> \
            <td>'+ data[i].Num +'</td> \
            <td>'+data[i].ReceivedDate+'</td>\
            <td>'+data[i].TotalAmount+' '+data[i].Currency.toUpperCase()+'</td>\
            </tr>');




}
      }).fail(function(resp){failedanswer(resp)});
});

$(document).on( "click", ".ininvtr", async  function () {
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
  var invoiceid = $(this).attr("name");
  var name = $(this).attr("dt");
  var type = $(this).attr("type");
  var callbackinput = $("#callbk").attr("name");
  var resa = callbackinput.split("]");
  var resb = resa[0];
  var ib = resb.split("[");
  var iname = ib[1];
  if (type == "invoice") {
    $("[name='car["+iname+"][vatpercentinput]']").trigger("mouseenter");
    showincomeinvoice(invoiceid, companyid, token).done(function(resp){
      var invoice = resp.data.invoicedata;
      $("[name='car["+iname+"][amountinput]']").val(invoice.Amount);
      $("[name='car["+iname+"][vatinput]']").val(invoice.VAT);
      $("[name='car["+iname+"][descdet]']").val(invoice.InvoiceBody[0].Subscription);
      $("[name='car["+iname+"][totalamountinput]']").val(invoice.TotalAmount);
      $("[name='car["+iname+"][vatpercentinput]']").val(invoice.InvoiceBody[0].VATPercent);
      $("[name='car["+iname+"][categoryinput]']").val(invoice.InvoiceBody[0].HabenName);
      $("[name='car["+iname+"][categoryinput]']").attr("code", invoice.InvoiceBody[0].Haben);

    }).fail(function(resp){failedanswer(resp)});

  }
  $("[name='"+callbackinput+"']").val(name);
  $("[name='"+callbackinput+"']").attr("code", invoiceid);
  $('#generalmodal').modal('hide');
});

$(document).on( "click", ".transfertr", function () {
  transferid = $(this).attr("data-name");
  	document.location.href = '/transfer?id=' + transferid;
});

$("#comptransfer").click(async function(event){
  event.preventDefault();
  var token =  await gettoken();
  var transferid = GetUrlParameter("id");
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
     complitetransfer(transferid, companyid, token).done(function(resp){
document.location.href = '/transfers';
      }).fail(function(resp){failedanswer(resp)});
});
