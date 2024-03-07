export async function incomesloader(auth) {

if (auth == 1) {
  $('#journalmenu').addClass("active");
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

  showincomes(companyid, token, 25, 0, "").done(function(resp){

    var data = resp.data.incomes;

    $('#incomestable').attr("loaded", data.length);
    $('#incomestable').attr("total", resp.data.incomescount);
    $('#findrecords').text(resp.data.incomescount);
    $('#incomestable').attr("action", "0");
    $('#incomestable').attr("filter", "");
    $('#incomestable').bootstrapTable('load', data);

  }).fail(function(resp){failedanswer(resp)});
} else {
    nosession()
}
}

export async function incomeloader(auth) {

if (auth == 1) {
  $('#journalmenu').addClass("active");

    if (GetUrlParameter("id") != "") {
  var incomeid = GetUrlParameter("id");
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



  showincome(incomeid, companyid, token).done(function(resp){

    var data = resp.data.income;

    $('#incomeid').text(data.IncomeID);
    $('#totalamount').text(data.Amount + ' ' + data.Currency);
    $('#counterparty').text(data.Counterparty);
    $('#paydate').text(data.Date);
    $('#acctype').text(data.AccountType);
    $('#tcomment').text(data.Comment);
    $('#created').text(data.CreatedAt);
    $('#edited').text(data.EditedAt);

    var details = resp.data.income.IncomeDetails;


    for (var i = 0; i < details.length; i++) {
      var n = i + 1;
      var ah = "";
      //var basedata = "";

      if (details[i].BaseType == "invoice") {
        var invoiceid = details[i].BaseID
        ah = "/invoice/?id=" + invoiceid
        /*
      showinvoice(invoiceid, companyid, token).done(function(resps){
          var invoice = resps.data.invoicedata;
          return invoice.Num + " " +  invoice.BillingDate;
        });
        */

      }


      $('#incometbody').append('<tr> \
      <td> '+n +'</td>\
      <td>'+details[i].Amount+' '+ data.Currency +'</td>\
      <td><a href="'+ah+'" target=”_blank”>'+details[i].BaseID+'</a></td>\
      <td>'+details[i].Comment+'</td>\
      </tr>');

      }


  }).fail(function(resp){failedanswer(resp)});
} else {
  document.location.href = '/';
}
} else {
    nosession()
}
}

export async function addincomeloader(auth) {

if (auth == 1) {
  $('#journalmenu').addClass("active");
  var token =  await gettoken();
  getcurrencies(token).done(function(resp){

    var data = resp.data.currencies;

    for (var i = 0; i < data.length; i++) {
      var n = i + 1;
  $('#currencies').append('<option value="'+ data[i].CurrencyCode+'">'+data[i].Name+'</option> ');
      }
  }).fail(function(resp){failedanswer(resp)});

} else {
  nosession()
}
}

export async function addincominginvoiceloader(auth) {

if (auth == 1) {
  $('#journalmenu').addClass("active");
  var token =  await gettoken();
  getcurrencies(token).done(function(resp){

    var data = resp.data.currencies;

    for (var i = 0; i < data.length; i++) {
      var n = i + 1;
  $('#cur').append('<option value="'+ data[i].CurrencyCode+'">'+data[i].Name+'</option> ');
      }
  }).fail(function(resp){failedanswer(resp)});

} else {
    nosession()
}
}

export async function addpaymentloader(auth) {

if (auth == 1) {
  $('#journalmenu').addClass("active");
  var token =  await gettoken();
  getcurrencies(token).done(function(resp){

    var data = resp.data.currencies;

    for (var i = 0; i < data.length; i++) {
      var n = i + 1;
  $('#cur').append('<option value="'+ data[i].CurrencyCode+'">'+data[i].Name+'</option> ');
      }
  }).fail(function(resp){failedanswer(resp)});


} else {
    nosession()
}
}

export async function incomesmailloader(auth) {

if (auth == 1) {
  $('#journalmenu').addClass("active");
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

  showincommails(companyid, token, 25, 0, "").done(function(resp){

    var data = resp.data.mails;

    for (var i = 0; i < data.length; i++) {
      var n = i + 1;


      $('#mailtbody').append('<tr data-name="'+data[i].MailID+'"  class="incomemailtr" style="cursor:pointer;"> \
      <td> '+n +'</td>\
      <td>'+data[i].OutgoingNumber+'</td>\
      <td>'+data[i].IncomeNumber+'</td>\
      <td>'+data[i].Sender+'</td>\
      <td>'+data[i].Date+'</td>\
      <td>'+data[i].Title+'</td>\
      <td>'+data[i].Description+'</td>\
      <td>'+data[i].Comment+'</td>\
      </tr>');



      }

  }).fail(function(resp){failedanswer(resp)});
} else {
  nosession()
}
}

export function addincommailloader(auth) {

if (auth == 1) {
  $('#journalmenu').addClass("active");

} else {
    nosession()
}
}

export async function incomemailloader(auth) {

if (auth == 1) {
  $('#journalmenu').addClass("active");
  var mailid = ""
  if (GetUrlParameter("id") != null) {
    mailid = GetUrlParameter("id");
  } else {
    document.location.href = '/';
  }
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

  showincomemail(mailid, companyid, token).done(function(resp){
    var data = resp.data.maildata;

    var cplink = data.Sender
    if (data.SenderType == "person"){
      cplink = "<a href='/person_profile/?id="+data.SenderID+"'>"+data.Sender+"</a>"
    } else {
      cplink = "<a href='/company_profile/?id="+data.SenderID+"'>"+data.Sender+"</a>"
    }

    $('#mailid').text(data.MailID);
    $('#outnumber').text(data.OutgoingNumber);
    $('#innumber').text(data.IncomeNumber);
    $('#sender').html(cplink);
    $('#desc').text(data.Description);
    $('#comment').text(data.Comment);
    $('#ticketid').text(data.TicketID);
    $('#acreatedby').text(data.Creator);
    $('#createdat').text(data.CreatedAt);
    $('#deadline').text(data.Deadline);
    $('#title').text(data.Title);


  }).fail(function(resp){failedanswer(resp)});
  showmailfiles(companyid, mailid, "incoming", token, "25", "0").done(function(resp){
    if (resp.data.files.length != 0) {


               var i;

  for (i = 0; i < resp.data.files.length; i++) {
    var n = i + 1;
    var dat = resp.data.files[i];


    $('#filestbody').append('<tr data-name="'+dat.FileID+'"  class="mailfile" data-type="incoming" style="cursor:pointer;"> \
    <td><i class="la la-file-pdf-o"></i></td> \
    <td>'+dat.Name +'</td>\
    <td>'+dat.Description+'</td>\
    <td>'+dat.Comment+'</td>\
    <td><i class="la la-trash"></i></td>\
    </tr>');

  }
  } else {
    //$('#cryptotable').hide();
    $('#filesmsg').text("You have no Files yet");
  }
  }).fail(function(resp){failedanswer(resp)});

} else {
    nosession()
}
}

export async function ioutgoingmailsloader(auth) {

if (auth == 1) {
  $('#journalmenu').addClass("active");
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

  showoutgoingmails(companyid, token, 25, 0, "").done(function(resp){

    var data = resp.data.mails;

    for (var i = 0; i < data.length; i++) {
      var n = i + 1;


      $('#mailtbody').append('<tr data-name="'+data[i].MailID+'"  class="outgoingmailtr" style="cursor:pointer;"> \
      <td> '+n +'</td>\
      <td>'+data[i].OutgoingNumber+'</td>\
      <td>'+data[i].IncomeNumber+'</td>\
      <td>'+data[i].Receiver+'</td>\
      <td>'+data[i].Date+'</td>\
      <td>'+data[i].Description+'</td>\
      <td>'+data[i].Comment+'</td>\
      </tr>');



      }

  }).fail(function(resp){failedanswer(resp)});
} else {
    nosession()
}
}

export function addoutgoingmailloader(auth) {

if (auth == 1) {
  $('#journalmenu').addClass("active");

} else {
    nosession()
}
}

export async function outgoingmailloader(auth) {

if (auth == 1) {
  $('#journalmenu').addClass("active");
  var mailid = ""
  if (GetUrlParameter("id") != null) {
    mailid = GetUrlParameter("id");
  } else {
    document.location.href = '/';
  }
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

  showoutgoingmail(mailid, companyid, token).done(function(resp){
    var data = resp.data.maildata;

    var cplink = data.Receiver
    if (data.ReceiverType == "person"){
      cplink = "<a href='/person_profile/?id="+data.ReceiverID+"'>"+data.Receiver+"</a>"
    } else {
      cplink = "<a href='/company_profile/?id="+data.ReceiverID+"'>"+data.Receiver+"</a>"
    }

    $('#mailid').text(data.MailID);
    $('#outnumber').text(data.OutgoingNumber);
    $('#innumber').text(data.IncomeNumber);
    $('#sender').html(cplink);
    $('#desc').text(data.Description);
    $('#comment').text(data.Comment);
    $('#ticketid').text(data.TicketID);
    $('#acreatedby').text(data.Creator);
    $('#createdat').text(data.CreatedAt);
    $('#deadline').text(data.Deadline);
    $('#title').text(data.Title);


  }).fail(function(resp){failedanswer(resp)});
  showmailfiles(companyid, mailid, "outgoing", token, "25", "0").done(function(resp){
    if (resp.data.files.length != 0) {


               var i;

  for (i = 0; i < resp.data.files.length; i++) {
    var n = i + 1;
    var dat = resp.data.files[i];


    $('#filestbody').append('<tr data-name="'+dat.FileID+'"   class="mailfile" data-type="incoming" style="cursor:pointer;"> \
    <td><i class="la la-file-pdf-o"></i></td> \
    <td>'+dat.Name +'</td>\
    <td>'+dat.Description+'</td>\
    <td>'+dat.Comment+'</td>\
    <td><i class="la la-trash"></i></td>\
    </tr>');

  }
  } else {
    //$('#cryptotable').hide();
    $('#filesmsg').text("You have no Files yet");
  }
  }).fail(function(resp){failedanswer(resp)});

} else {
    nosession()
}
}

export async function incominginvoiceloader(auth) {

if (auth == 1) {
  $('#journalmenu').addClass("active");
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
  showincomeinvoices(companyid, token, 25, 0, "").done(function(resp){
    var data = resp.data.invoices;

    $('#invoicestable').attr("loaded", data.length);
    $('#invoicestable').attr("total", resp.data.invoicecount);
    $('#findrecords').text(resp.data.invoicecount);
    $('#invoicestable').attr("action", "0");
    $('#invoicestable').attr("filter", "");
    $('#invoicestable').bootstrapTable('load', data);
  }).fail(function(resp){failedanswer(resp)});
} else {
    nosession()
}
}

export async function showincominginvoiceloader(auth) {
  if (auth == 1) {
  $('#journalmenu').addClass("active");


  //1. Determinate companyID
  var companyid = "";
  var currentcompany = "";

  if (GetUrlParameter("id") != "") {
  var  invoiceid = GetUrlParameter("id");
    var token =  await gettoken();

    // var SessionStore = new Store('erp-db', 'session')
    companyid = await  get('sessionid', SessionStore).then( result => {
          if (result !== undefined) {
            var session = JSON.parse(result);
            console.log(session.companyid);
            return session.companyid
          } else {
            console.log("no");
            return ""
          }
        });
      //  $('#editinvoice').attr('href', '/edit_invoice?id=' + invoiceid);


  showincomeinvoice(invoiceid, companyid, token).done(function(resp){
  var invoice = resp.data.invoicedata;
  if(invoice.Type == "invoice") {
    $('#invoicetype').text("Incoming Invoice");
  }
  if(invoice.Type == "proforma") {
    $('#invoicetype').text("Incoming Proforma Invoice");
  }
  if(invoice.Type == "creditnote") {
    $('#invoicetype').text("Incoming Credit Note");
  }
  var cplink = invoice.Counterparty
  if (invoice.CounterpartyType == "person"){
    cplink = "<a href='/person_profile/?id="+invoice.CounterpartyID+"'>"+invoice.Counterparty+"</a>"
  } else {
    cplink = "<a href='/company_profile/?id="+invoice.CounterpartyID+"'>"+invoice.Counterparty+"</a>"
  }
  $('#showfile').attr("fileid", invoice.FileID);
    $('#invoiceid').text(invoice.UID);
    $('#invoicenumber').text(invoice.Num);
    $('#counterparty').html(cplink);
    $('#billdate').text(invoice.ReceivedDate);
    $('#description').text(invoice.Description);
    $('#created').text(invoice.CreatedAt);
    $('#edited').text(invoice.EditedAt);
    $('#netam').text(invoice.Amount +  " " + invoice.Currency.toUpperCase());
    if (invoice.Prepayment != ""){
      $('#preptr').attr("hidden", false);
      $('#prepayment').text(invoice.Prepayment+  " " + invoice.Currency.toUpperCase());
    }
    $('#totam').text(invoice.TotalAmount+  " " + invoice.Currency.toUpperCase());


      if(invoice.Paid != 1) {
        $('#markaspaid').attr("hidden", false);
      }
      if(invoice.Complited != 1) {
        $('#compliteincinv').attr("hidden", false);
        $('#editinvoice').attr("hidden", false);

      }





    if(invoice.Paid == 1){
$( "<div class='badge badge-info mr-1'><small>Paid</small></div>" ).appendTo( "#invoicebade" );
    }

  var invoicebody = invoice.InvoiceBody;
  if (invoicebody.length != 0) {
    var invbody = [];
    var vatbody = [];

             var i;
for (i = 0; i < invoicebody.length; i++) {
	var n = i + 1;
	var data = invoicebody[i];
  var sub = ""
  if (data.PeriodFrom != "") {
    sub = ", " + data.PeriodFrom + " bis " + data.PeriodTo;
  };

  $('#invoicetbody').append('<tr> \
  <td>'+ n + '</td> \
  <td>'+data.Subscription + sub +'</td>\
  <td>'+data.Price+'</td>\
  <td>'+data.Amount+'</td>\
  </tr>');

  var vatstr = data.VATPercent;
  var vatam = parseFloat(data.VAT);
  var n = invbody.includes(vatstr);
  if (n) {
    //get value and add
    var a = invbody.indexOf(vatstr);
    var b = vatbody[a] + vatam;
    vatbody[a] = b;
  } else {
    //push new value
    invbody.push(vatstr);
    vatbody.push(vatam);
  }


}
};

for (var m = 0; m < invbody.length; m++) {
$('#vatinfo').append("<div> VAT "+invbody[m]+"%: "+ vatbody[m]+" "+ invoice.Currency.toUpperCase() +" </div>");
};
  }).fail(function(resp){failedanswer(resp)});

  } else {
    document.location.href = '/';
  }

  } else {
      nosession()
  }
}

export async function paymentsloader(auth) {

if (auth == 1) {
  $('#journalmenu').addClass("active");
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

  showpayments(companyid, token, 25, 0, "").done(function(resp){

    var data = resp.data.payments;
    $('#paymantstable').attr("loaded", data.length);
    $('#paymantstable').attr("total", resp.data.paymentscount);
    $('#findrecords').text(resp.data.paymentscount);
    $('#paymantstable').attr("action", "0");
    $('#paymantstable').attr("filter", "");
    $('#paymantstable').bootstrapTable('load', data);

  }).fail(function(resp){failedanswer(resp)});

} else {
    nosession()
}
}

export async function showpaymentloader(auth) {
  if (auth == 1) {
  $('#journalmenu').addClass("active");


  //1. Determinate companyID
  var companyid = "";
  var currentcompany = "";

  if (GetUrlParameter("id") != "") {
    var paymentid = GetUrlParameter("id");
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
      //  $('#editinvoice').attr('href', '/edit_invoice?id=' + invoiceid);
showpayment(paymentid, companyid, token).done(function(resp){

  var payment = resp.data.payment;
  if (payment.ReceiptID != "") {
  $('#showreceipt').attr("fileid", payment.ReceiptID);
} else {
  $('#showreceipt').attr("hidden", true);
}

var status = "<div class='badge badge-secondary'>Draft</div>";
 if (payment.Complited != 0) {
   $('#importpayment').attr("hidden", true);
   $('#complitepayment').attr("hidden", true);
   var status = "<div class='badge badge-success'>Complited</div>";
 }
 $('#invoicebade').append(status);
 var cp = payment.Counterparty;
 if (cp == "") {
   cp = payment.CounterpartyID;
 }

 if (payment.Type == "invoice") {
   $('#importpayment').attr("hidden", true);
 }

    $('#paymentid').text(payment.PaymentID);
    $('#receiptnumber').text(payment.ReceiptNum);
    $('#counterparty').text(cp);
    $('#amount').text(payment.Amount +  " " + payment.Currency.toUpperCase());
    $('#vat').text(payment.VAT +  " " + payment.Currency.toUpperCase());
    $('#totalamount').text(payment.TotalAmount +  " " + payment.Currency.toUpperCase());
    $('#paydate').text(payment.Date);
    $('#acctype').text(payment.AccountType);
    $('#acountid').text(payment.AccountID);
    $('#invoiceid').text(payment.InvoiceID);
    $('#created').text(payment.CreatedAt);
    $('#createdby').text(payment.Creator);
    $('#edited').text(payment.EditedAt);
    $('#editedby').text(payment.Editor);
    $('#complitedby').text(payment.Complitor);
    $('#comment').text(payment.Comment);
    $('#description').text(payment.Description);


  var paymentbody = payment.PaymentDetails;
  if (paymentbody.length != 0) {
    var invbody = [];
    var vatbody = [];

             var i;
for (i = 0; i < paymentbody.length; i++) {
	var n = i + 1;
	var data = paymentbody[i];
var cvt = data.IsComunityVAT;
var cvts = "";
if (cvt == 1) {
  cvts = "<i class='la la-check'></i>";
}

  $('#paymenttbody').append('<tr> \
  <td>'+ n + '</td> \
  <td>'+data.Description+'</td>\
  <td>'+data.AccAccount +' ('+data.AccAccountID+')</td>\
  <td>'+data.Amount+' '+payment.Currency.toUpperCase()+'</td>\
  <td>'+data.VATPercent+' %</td>\
  <td>'+data.VAT+' '+payment.Currency.toUpperCase()+'</td>\
    <td>'+data.TotalAmount+' '+payment.Currency.toUpperCase()+'</td>\
    <td>'+cvts+'</td>\
      <td>'+data.PeriodFrom+' - '+data.PeriodTo +'</td>\
    <td>'+data.BaseType+'</td>\
      <td>'+data.Comment+'</td>\
  </tr>');



}
};


  }).fail(function(resp){failedanswer(resp)});

  } else {
    document.location.href = '/';
  }

  } else {
    nosession()
  }
}

export async function steatmentsloader(auth) {

if (auth == 1) {
  $('#journalmenu').addClass("active");


} else {
    nosession()
}
}

export async function loansloader(auth) {
  if (auth == 1) {
    $('#journalmenu').addClass("active");

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

showloans(companyid, token, 25, 0, "").done(function(resp){
  var data = resp.data.loans;

  for (var i = 0; i < data.length; i++) {
    var n = i + 1;
var cp = data[i].CounterpartyID
if (cp == "") {
cp = data[i].CounterpartyID
}



    $('#loanstbody').append('<tr data-name="'+data[i].UID+'"  class="loantr" style="cursor:pointer;"> \
    <td> '+n +'</td>\
    <td>'+data[i].CompanyPosition+'</td>\
    <td>'+data[i].StartDate+'</td>\
    <td>'+ data[i].Amount +' '+data[i].Currency.toUpperCase()+'</td> \
    <td>'+ data[i].Interest +' %</td> \
    <td>'+ cp+'</td> \
    </tr>');
    }

}).fail(function(resp){failedanswer(resp)});

  } else {
      nosession()
  }
}

export async function addloanloader(auth) {

if (auth == 1) {
  $('#journalmenu').addClass("active");
  var token =  await gettoken();
  getcurrencies(token).done(function(resp){

    var data = resp.data.currencies;

    for (var i = 0; i < data.length; i++) {
      var n = i + 1;
 $('#cur').append('<option value="'+ data[i].CurrencyCode+'">'+data[i].Name+'</option> ');
      }
  }).fail(function(resp){failedanswer(resp)});


} else {
    nosession()
}
}

export async function showloanloader(auth) {

if (auth == 1) {
  $('#journalmenu').addClass("active");
  if (GetUrlParameter("id") != "") {
  var loanid = GetUrlParameter("id");
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
    showloan(loanid, companyid, token).done(function(resp){
var data = resp.data.loandata;
$('#loanid').text(data.UID);
$('#compposition').text(data.CompanyPosition);
$('#inttype').text(data.InterestType);
$('#interest').text(data.Interest + "%");
$('#intperiod').text(data.InterestPeriod);
$('#counterpartytype').text(data.CounterpartyType);
$('#counterparty').text(data.CounterpartyID);
$('#agreement').html("<a href='/agreement?id="+data.BasisID+"'>"+data.BasisID+"</a>");
$('#startdate').text(data.StartDate);
$('#loantermtype').text(data.LoanType);
$('#currency').text(data.Currency.toUpperCase());
$('#amount').text(data.Amount);
$('#payperiod').text(data.PaymentPeriod);
$('#description').text(data.Description);
$('#comment').text(data.Comment);
$('#createdby').text(data.Creator);
$('#created').text(data.CreatedAt);
$('#edited').text(data.UpdatedAt);
$('#editedby').text(data.Editor);
$('#lastperiod').text(data.LastIntDate);
$('#nextperiod').text(data.NextIntDate);
$('#fullamount').text(data.FullAmount);

showloantransactions(loanid, companyid, 25, 0, token).done(function(resps){
  var datar = resps.data.loantransactions;

  for (var n = 0; n < datar.length; n++) {

    $('#loantransactionstbody').append('<tr> \
    <td>'+datar[n].Date+'</td>\
    <td>'+datar[n].Type+'</td>\
    <td>'+ datar[n].Amount +' '+$('#currency').text()+'</td> \
    <td>'+ datar[n].Description +'</td> \
    </tr>');

    }

  }).fail(function(resps){failedanswer(resps)});

    }).fail(function(resp){failedanswer(resp)});



} else {
  document.location.href = '/';
}
} else {
    nosession()
}
}

export async function showtransfersloader(auth) {

if (auth == 1) {
  $('#journalmenu').addClass("active");
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
  showtransfers(companyid, token, 25, 0, "").done(function(resp){

    var data = resp.data.transfers;
    $('#transferstable').attr("loaded", data.length);
    $('#transferstable').attr("total", resp.data.transferscount);
    $('#findrecords').text(resp.data.transferscount);
    $('#transferstable').attr("action", "0");
    $('#transferstable').attr("filter", "");
    $('#transferstable').bootstrapTable('load', data);
  }).fail(function(resp){failedanswer(resp)});

} else {
    nosession()
}
}

export async function addransferloader(auth) {

if (auth == 1) {
  $('#journalmenu').addClass("active");
  var token =  await gettoken();
  getcurrencies(token).done(function(resp){

    var data = resp.data.currencies;

    for (var i = 0; i < data.length; i++) {
      var n = i + 1;
  $('#cur').append('<option value="'+ data[i].CurrencyCode+'">'+data[i].Name+'</option> ');
      }
  }).fail(function(resp){failedanswer(resp)});

} else {
    nosession()
}
}

export async function transferloader(auth) {

if (auth == 1) {
  $('#journalmenu').addClass("active");
  if (GetUrlParameter("id") != "") {
  var transferid = GetUrlParameter("id");
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
  showtransfer(transferid, companyid, token).done(function(resp){
    var data = resp.data.transfer;
    if (data.Complited == 0) {
      $('#edbtn').attr("hidden", false);
      $('#compliteagr').attr("hidden", false);
    }
    $('#transferid').text(data.TransferID);
    $('#transferfrom').text(data.FromType);
    $('#transferto').text(data.ToType);
    $('#amount').text(data.Amount + " " + data.Currency.toUpperCase());
    $('#date').text(data.Date);
    $('#created').text(data.CreatedAt);
    $('#createdby').text(data.Creator);
    $('#edited').text(data.EditedAt);
    $('#editedby').text(data.Editor);
    $('#complitedby').text(data.Complitor);
    $('#description').text(data.Description);
    $('#comment').text(data.Comment);
  }).fail(function(resp){failedanswer(resp)});
} else {

    document.location.href = '/';
  }

} else {
    nosession()
}
}
