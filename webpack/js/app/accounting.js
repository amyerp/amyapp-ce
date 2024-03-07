$("#showtransactionsbtn").click(async function(event){
    event.preventDefault();

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



filter = "";
if ($("#filteryear").val() != "" && $("#monthfilter").val() == "") {
  filter = 'year=' + $("#filteryear").val();
}

if ($("#filteryear").val() != "" && $("#monthfilter").val() != "") {
  filter = 'year=' + $("#filteryear").val() + '&month=' + $("#monthfilter").val();;
}
if ($("#from").val() != "") {
  filter = 'from=' + $("#from").val() + '&to=' + $("#to").val();
}

var type = $('#sttypeshow').val();

var typeid = $('#sttypeelementshow').val();
console.log(typeid);

          showactransactions(token, companyid, type, typeid, filter).done(function(resp){
          $('#transactionstable').empty();
            var data = resp.data.transactions;

            $('#findrecords').text(resp.data.transactionscount);
            $('#openbalance').text(resp.data.openbalance);
            $('#closebalance').text(resp.data.closebalance);
            $('#totaltrans').text(resp.data.transactionsamount);
            $('#transactionstable').bootstrapTable('load', data);


          }).fail(function(resp){failedanswer(resp)});



});

$("#showsaldobtn").click(async function(event){
    event.preventDefault();

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



filter = "";
if ($("#filteryear").val() != "" && $("#monthfilter").val() == "") {
  filter = 'year=' + $("#filteryear").val();
}

if ($("#filteryear").val() != "" && $("#monthfilter").val() != "") {
  filter = 'year=' + $("#filteryear").val() + '&month=' + $("#monthfilter").val();;
}
if ($("#from").val() != "") {
  filter = 'from=' + $("#from").val() + '&to=' + $("#to").val();
}

if ($("#acc").val() != ""){
  filter = filter + "&acc=" + $("#acc").val();
}



          showsaldo(token, companyid, filter).done(function(resp){
          $('#saldotable').empty();
            var data = resp.data.saldo;


            $('#saldotable').bootstrapTable('load', data);


          }).fail(function(resp){failedanswer(resp)});



});

$("#showgl").click(async function(event){
    event.preventDefault();

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



filter = "";
if ($("#filteryear").val() != "") {
  filter = 'year=' + $("#filteryear").val();
}
if ($("#from").val() != "") {
  filter = 'from=' + $("#from").val() + '&to=' + $("#to").val();
}
if ($("#flag").prop('checked')) {
  if (filter != "") {
    filter = filter + '&flag=true';
  } else {
    filter = 'flag=true';
  }

}
if ($("#sortby").val() != "") {
    if (filter != "") {
        filter = filter + '&sort=' + $("#sortby").val();
    } else
    {
      filter = 'sort=' + $("#sortby").val();
    }

}

          showgl(token, companyid, 25, 0, filter).done(function(resp){
          $('#gltbody').empty();
            var data = resp.data.gl;
            $('#gltable').attr("loaded", data.length);
            $('#gltable').attr("total", resp.data.glcount);
            $('#findrecords').text(resp.data.glcount);
            $('#gltable').attr("action", "0");
            $('#gltable').attr("filter", filter);


            $('#gltableb').bootstrapTable('load', data);


          }).fail(function(resp){failedanswer(resp)});



});


$('#gltable').on('scroll-body.bs.table', async function () {
console.log("i scrol");
  var scrollPosition = $('.fixed-table-body').scrollTop() + $('.fixed-table-body').outerHeight();
  var divTotalHeight = $('.fixed-table-body')[0].scrollHeight
                        + parseInt($('.fixed-table-body').css('padding-top'), 10)
                        + parseInt($('.fixed-table-body').css('padding-bottom'), 10)
                        + parseInt($('.fixed-table-body').css('border-top-width'), 10)
                        + parseInt($('.fixed-table-body').css('border-bottom-width'), 10);

  if( scrollPosition >= divTotalHeight )
  {
    var loaded = $('#gltable').attr("loaded"); //25
    var total = $('#gltable').attr("total"); //31
    var action = $('#gltable').attr("action");
if (action == "0"){
if (parseInt(loaded) < parseInt(total)) {
$('#gltable').attr("action", "1");

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
    var filter = $('#gltable').attr("filter");
    showgl(token, companyid, 25, loaded, filter).done(function(resp){

      var data = resp.data.gl;

      var newloaded = parseInt(loaded) + parseInt(data.length)
     $('#gltable').attr("loaded", newloaded);
     $('#gltable').attr("total", resp.data.glcount);
     $('#findrecords').text(resp.data.glcount);
     $('#gltable').attr("action", "0");

     $('#gltableb').bootstrapTable('append', data);



    }).fail(function(resp){failedanswer(resp)});
  }
}
  }
});

$(document).on( "click", ".glflag", async function () {
  var token =  await gettoken();
  var lineid = $(this).attr("data-name");
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

  switchglflag(companyid, lineid, lang, token).done(function(resp){
  }).fail(function(resp){failedanswer(resp)});
});


$(document).on( "click", ".gltr", async function () {
    var lineid = $(this).attr("data-name");
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


    showglline(companyid, lineid, token).done(function(resp){
      var data = resp.data.gl;

      var title = "Edit General Ledger";
      var body = '<div class="row" > \
      <div class="col-md-6"> \
      <div class="form-group"> \
      <label for="adrcountry">Soll </label> \
      <input type="text" class="form-control" id="soll" value="'+data.Soll+'"> \
      </div> \
      </div> \
      <div class="col-md-6"> \
      <div class="form-group"> \
      <label for="adrcountry">Haben </label> \
      <input type="text" class="form-control" id="haben" value="'+data.Haben+'"> \
      </div> \
      </div>\
      </div>\
      <div class="row" > \
      <div class="col-md-6"> \
      <div class="form-group"> \
      <label for="adrcountry">Soll Name </label> \
      <fieldset class="position-relative has-icon-left"> \
       <input type="text" class="form-control" id="sollname"  readonly style="cursor:pointer;"> \
      <div class="form-control-position"> \
         <i class="la la-plus-circle font-medium-4 acccode" style="cursor:pointer;"></i> \
       </div> \
     </fieldset> \
      </div> \
      </div> \
      <div class="col-md-6"> \
      <div class="form-group"> \
      <label for="adrcountry">Haben Name </label> \
      <fieldset class="position-relative has-icon-left"> \
       <input type="text" class="form-control" id="habenname"  readonly style="cursor:pointer;"> \
      <div class="form-control-position"> \
      <i class="la la-plus-circle font-medium-4 acccode" style="cursor:pointer;"></i> \
      </div> \
      </fieldset> \
      </div> \
      <div class="row" > \
      <div class="col-md-12"> \
        <button type="submit" class="btn btn-success" name="'+lineid+'" id="updategl"><i class="la la-check-square-o"></i> Update</button> \
      </div> \
      </div> \
      </div> \
      </div>';

    alertwindow(title, body, "")

    }).fail(function(resp){failedanswer(resp)});

});

$(document).on( "click", ".glcomment", async function () {
  var curcomment = $(this).text();
  var lineid = $(this).attr("data-name");
    var title = "Add Comment";
    var body = '<div class="row" > \
    <div class="col-md-12"> \
    <div class="form-group"> \
    <label for="adrcountry">Comment </label> \
    <textarea class="form-control" name="'+lineid+'" id="glcomment" rows="3">'+curcomment+'</textarea>\
    </div> \
    </div> ';

  alertwindow(title, body, "")
});

$(document).on( "change keyup paste", "#glcomment", async function () {
  var token =  await gettoken();
  var lineid = $(this).attr("data-name");
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
      var comment = $(this).val();
    addglcomment(companyid, lineid,  comment, lang, token).done(function(resp){
    }).fail(function(resp){failedanswer(resp)});

});

$(document).on( "click", "#updategl", async function () {
  var lineid = $(this).attr("name");
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
  var lang = getlang();
  var soll = $('#soll').val();
  var haben = $('#haben').val();

  modifygl(companyid, lineid, soll, haben, lang, token).done(function(resp){
$('#generalmodal').modal('hide');
  }).fail(function(resp){failedanswer(resp)});
  });

$(document).on( "click", "#saveobjbtn", async function () {
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
  var lang = getlang();

  var args = {
    companyid: companyid,
    objecttype: $('#objecttype').val(),
    objectid: $('#objectdet').val(),
    typeaccount: $('#typeaccountid').attr("code"),
    account: $('#objacc').val()
  }


addobjconnect(args, lang, token).done(function(resp) {

}).fail(function(resp){failedanswer(resp)});
});


$(document).on( "click", "#objecttype", async function () {
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
 var type = $(this).val();

 if (type == "cassa") {
   $('#objectdet').empty();
 }

 if (type == "bank") {
   showcompanybanks(companyid, token, 25, 0).done(function(resp) {
     $('#objectdet').empty();
     $('#objectdet').append('<option value="">Select Bank</option> ');


     if (resp.data.banks.length != 0) {
                var banks = [];

                var i;
   for (i = 0; i < resp.data.banks.length; i++) {
   	var n = i + 1;
   	var bank = resp.data.banks[i];
    $('#objectdet').append('<option value="'+ bank.BankID+'">'+bank.Name+' '+bank.IBAN+'</option> ');
   }
   } else {
     $('#objectdet').append('<option value="">You have no Banks yet</option>');
   }

   }).fail(function(resp){failedanswer(resp)});

 }
 if (type == "pg") {

   showcompanypaymentsystems(companyid, token, 25, 0).done(function(resp) {
     $('#objectdet').empty();
     $('#objectdet').append('<option value="">Select Payment Gateway</option> ');

     if (resp.data.paymentsystems.length != 0) {


                var i;

   for (i = 0; i < resp.data.paymentsystems.length; i++) {
   	var n = i + 1;
   	var addr = resp.data.paymentsystems[i];

$('#objectdet').append('<option value="'+addr.UID+'">'+addr.Type+' '+addr.AccountID+'</option> ');

   }
   } else {

     $('#objectdet').text("You have no accounts in Payment Systems yet");
   }

   }).fail(function(resp){failedanswer(resp)});

 }
 if (type == "crypto") {
   showcompanycryptos(companyid, token, 25, 0).done(function(resp) {
     $('#objectdet').empty();
     $('#objectdet').append('<option value="">Select Cryptocurrency</option> ');
     if (resp.data.cryptos.length != 0) {
                var adresses = [];

                var i;
                console.log(resp.data.cryptos.length);
   for (i = 0; i < resp.data.cryptos.length; i++) {
   	var n = i + 1;
   	var addr = resp.data.cryptos[i];
$('#objectdet').append('<option value="'+addr.CryptoID+'">'+addr.Type+' '+addr.Account+'</option> ');



   }
   } else {

     $('#objectdet').text("You have no Cryptocurrencies account yet");
   }

   }).fail(function(resp){failedanswer(resp)});

 }
 if (type == "broker") {
   showcompanybrokers(companyid, token, 25, 0).done(function(resp) {
     $('#objectdet').empty();
     $('#objectdet').append('<option value="">Select Broker Account</option> ');

     if (resp.data.brokers.length != 0) {


                var i;

   for (i = 0; i < resp.data.brokers.length; i++) {
   	var n = i + 1;
   	var addr = resp.data.brokers[i];

$('#objectdet').append('<option value="'+addr.UID+'">'+addr.Broker +' '+addr.Account+'</option> ');
   }
   } else {

     $('#objectdet').text("You have no Broker accounts yet");
   }

   }).fail(function(resp){failedanswer(resp)});

 }


    });

    $(document).on( "click", "#sumbalance", async function () {

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


      summaraizebalance(companyid, token).done(function(resp){
  alert (resp.data.response);
      }).fail(function(resp){failedanswer(resp)});
      });
