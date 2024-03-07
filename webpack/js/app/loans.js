$("#loancounterpartytype").on("change", async function () {

  var type = $(this).val();
  var token =  await gettoken();

  var select = document.getElementById("counterparty"),
      length = select.options.length;
  while(length--){
    select.remove(length);
  }


  $('#counterpartyselect').attr("hidden", false);


  if (type == "company") {
    showcompanies(token, 0, 25, 0, 0).done(function(resp){
      var comps = resp.data.companies;
      $('#counterparty').append('<option value="">Choose Company</option> ');

      for (var i = 0; i < comps.length; i++) {
        var n = i + 1;

        $('#counterparty').append('<option value="'+comps[i].UID+'">'+comps[i].Name+'</option> ');


      }


    }).fail(function(resp){failedanswer(resp)});

  };
  if (type == "person") {

    showpersons(token, 25, 0).done(function(resp){
        var comps = resp.data.persons;
        $('#counterparty').append('<option value="">Choose Person</option> ');

        for (var i = 0; i < comps.length; i++) {
          var n = i + 1;

          $('#counterparty').append('<option value="'+comps[i].UID+'">'+comps[i].Surname+' '+comps[i].Name+'</option> ');


          }

        }).fail(function(resp){failedanswer(resp)});

  }
  if (type == "shareholder") {
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


    showcompanyshareholders(companyid, token, 25, 0).done(function(resp) {

$('#counterparty').append('<option value="">Choose Shareholder</option> ');
                 var i;

    for (i = 0; i < resp.data.shareholders.length; i++) {
    	var n = i + 1;
    	var addr = resp.data.shareholders[i];

        $('#counterparty').append('<option value="'+addr.SID+'">'+addr.Shareholder+'</option> ');

    }

    }).fail(function(resp){failedanswer(resp)});

  }


  });


$("#counterparty").on("change", async function () {
  var typeid = $(this).val();
  var token =  await gettoken();

  var select = document.getElementById("loanagreement"),
      length = select.options.length;
  while(length--){
    select.remove(length);
  }

  $('#agreementselect').attr("hidden", false);

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
      var filter = "counterparty="+typeid+"&category=loan";

      showagreements(companyid, token, 25, 0, filter).done(function(resp){

        var data = resp.data.agreements;

        for (var i = 0; i < data.length; i++) {
          var n = i + 1;

          $('#loanagreement').append('<option value="'+data[i].AgreementID+'">'+data[i].Num+' ('+data[i].SignDate+')</option> ');

          }

      }).fail(function(resp){failedanswer(resp)});

});

$("#saveloan").click(async function(event){
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

      var args = {
        companyid: companyid,
        companyposition: $("#compposition").val(),
        loantype: $("#loantermtype").val(),
        interesttype: $("#inttype").val(),
        counterpartytype: $("#loancounterpartytype").val(),
        counterpartyid: $("#counterparty").val(),
        currency: $("#cur").val(),
        interest: $("#interest").val(),
        peymentperiod: $("#payperiod").val(),
        interestperiod: $("#intperiod").val(),
        agreementid: $("#loanagreement").val(),
        description: $("#description").val(),
        comment: $("#commentc").val(),
        action: "create"
      }

  addloan(args, lang, token).done(function(resp){}).fail(function(resp){failedanswer(resp)});

});

$(document).on( "click", ".loantr", function () {
  loanid = $(this).attr("data-name");
    document.location.href = '/loan?id=' + loanid;
});

$(document).on( "click", "#addloantransaction", async function () {
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

          var args = {
            companyid: companyid,
            action: "addtransaction",
            loanid: $('#loanid').text(),
          }

    addloan(args, lang, token).done(function(resp){
    var loanid = GetUrlParameter("id");
    document.location.href = '/loan?id=' + loanid;
    }).fail(function(resp){failedanswer(resp)});
});

$(document).on( "click", "#updateamount", async function () {
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

          var args = {
            companyid: companyid,
            action: "updateamount",
            loanid: $('#loanid').text(),
          }

    addloan(args, lang, token).done(function(resp){
    var loanid = GetUrlParameter("id");
    document.location.href = '/loan?id=' + loanid;
    }).fail(function(resp){failedanswer(resp)});
});


$(document).on( "click", "#getcurrentamount", async function () {
      event.preventDefault();
      var token =  await gettoken();
      var loanid = GetUrlParameter("id");

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



    getcurrentloanamount(loanid, companyid, token).done(function(resp){
      var data = resp.data.loandata;


     title = "Current Loan Amount on " + data.Date;
     body = "<div>Amount: " + data.Amount + " " + data.Currency.toUpperCase() + "</div>";
      alertwindow(title, body, "")


    }).fail(function(resp){failedanswer(resp)});
});
