//General JQuery functions
export async function pagebuilder(auth) {
  	if (auth == 1) {
$('#navsection').show();

      //Show user's name
      // var SessionStore = new Store('erp-db', 'session')
      get('sessionid', SessionStore).then( result => {
      if (result !== undefined) {
        var session = JSON.parse(result);
         $('#usernamebage').text(session.uname);
           //1. Show users avatar
         showavatar(session.token).done(function(resp){
           var img = document.getElementById('useravatar');
            var url = window.URL || window.webkitURL;
           $('#useravatar').attr('src', url.createObjectURL(resp));
         }).fail(function(resp){
           console.log(resp);

           if (resp.status == 401) {
             clear(SessionStore);
             document.location.href = '/';
           }

         });

         //2. Check for companyid
         if (session.companyid != "") {
           //Get company information
           var dataarr = [];

           showcompany(session.companyid, session.token).done(function(resp){

             //Place data to Dashboard
             var data = resp.data.company;

             dataarr.push(data);

             var newtitle = data.Name + " (" + data.RegCountryCode + ")";
            $("#brandnav").text(newtitle);
            $('#customertype').append('<option value="'+session.companyid+'">'+newtitle+'</option> ');
            $("#mycompanycardtitle").text(data.Name);

            $("#mycompanycard").removeClass("invisible");

             showcompanyaddress(session.companyid, session.token, 1, 0).done(function(resps){
             var addr = resps.data.addresses[0];
             dataarr.push(addr);
             var settings = $.extend({}, dataarr[0], dataarr[1]);
             var alldataerr = [];
             alldataerr.push(settings);
            $('#gencomptable').bootstrapTable('load', alldataerr);

           }).fail(function(resps){
failedanswer(resps)
});
           }).fail(function(resp){
failedanswer(resp)
});





           //Get company avatart
           companyavatar(session.companyid, session.token).done(function(resp){
              var url = window.URL || window.webkitURL;
             $('#navlogo').attr('src', url.createObjectURL(resp));
           }).fail(function(resp){
failedanswer(resp)
});

         } else {
           //1. Get company list
           showcompanies(session.token, 1, 25, 0, 1).done(function(resp){
        if (resp.data.companies.length != 0) {
             var mycompanies = [];

             var i;
for (i = 0; i < resp.data.companies.length; i++) {
  var shortcountry = shortcounrty(resp.data.companies[i].RegCountry)
  var str = '<button class="dropdown-item mycompanychoose" type="button"  name="'+ resp.data.companies[i].UID +'" >' + resp.data.companies[i].Name +' ('+ shortcountry +')</button>';
   mycompanies.push(str);
}
var lines = mycompanies.join(" ");

             $("#srm").removeClass();
             $("#srm").html("");
            $("#srm").addClass("col-sm-3 col-6");
             $("#srm").html('<div class="btn-group mr-1 mb-1 "><button type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Please choose a company from the list to start work</button> \
             <div class="dropdown-menu arrow" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 40.5px, 0px);"> \
'+ lines +'</div></div> \
             ');
           } else {
             $("#srm").removeClass();
             $("#srm").html("");
             $("#srm").addClass("alert alert-icon-right alert-info alert-dismissible mb-2");
             $("#srm").html('<span class="alert-icon"><i class="la la-info-circle"></i></span> \
                                                     There are no any companyes yet. Would you like to <a href="/create_my_company/" class="alert-link">create one?</a> \
             ');
           }

           }).fail(function(resp){
failedanswer(resp)
});


         }
      }


      });




  	} else {
      document.getElementById("inputEmail").focus();
      $('body').removeClass("menu-show");
        $('body').removeClass("menu-open");
      $('body').addClass("menu-hide");
    }
  }

export async function dashboardbuilder(auth) {
  switch (auth) {
    case 1:
        $('#dasboardmenu').addClass("active");
      break;
      case 2:
      //Show caseonfirmation email menu
      $('#confemailsection').removeAttr("hidden");
        break;
    default:
      $('#signinsection').show();
      $('#dasboard').attr("hidden", true);
  }

    }

    export function tokensign (auth){
      console.log("tokensign ", auth)
      if (auth == 0) {
      var data =  location.search;


      if (data != "") {



      signinwithottoken(data).done(function(resp){


        if (resp.success != 1) {
          $("#serveranswer").css("color", "red");
          var errormsg = responsecode(resp.error, getlang())
          $("#serveranswer").text(errormsg);

        } else {

        //Create sesion
        storeSession(resp.data.token, resp.session.Sesionexp, resp.session.uid, resp.session.isAdmin, resp.data.email, resp.data.email_confirmed, resp.data.username, resp.data.companyid)
        // var SessionStore = new Store('erp-db', 'session')

     get('location', SessionStore).then( result => {
              if (result !== undefined) {
              document.location.href = result;
              } else {
                var lg = getlangpath();
                var path = lg + '/';
                 document.location.href = path;
              }
            });

      }

    }).fail(function(resp){failedanswer(resp)});

  }
}
    }

export function forgotbuilder(auth) {
    	if (auth == 1) {
    		document.location.href = '/';
    	} else {
        $('body').removeClass("menu-show");
        $('body').addClass("menu-hide");
    	$('#forgotpage').removeClass('invisible');
    	}
    }

export async function createmycompanyloader(auth) {
        if (auth == 1) {
          $('#mycompanymenu').addClass("active");
          $('.addressheader').hide();
          $('.bankaccountheader').hide();
          $('.cryptoheader').hide();

          var token =  await gettoken();

          getcurrencies(token).done(function(resp){

            var data = resp.data.currencies;

            for (var i = 0; i < data.length; i++) {
              var n = i + 1;
          $('#currencyde').append('<option value="'+ data[i].CurrencyCode+'">'+data[i].Name+'</option> ');
          $('#currencyit').append('<option value="'+ data[i].CurrencyCode+'">'+data[i].Name+'</option> ');
          $('#currencyhk').append('<option value="'+ data[i].CurrencyCode+'">'+data[i].Name+'</option> ');
              }
          }).fail(function(resp){failedanswer(resp)});
          getcountries(token).done(function(resp){
            var data = resp.data.countries;

            for (var i = 0; i < data.length; i++) {
                $('#mcloc').append('<option value="'+ data[i].UID+'">'+data[i].Country+'</option> ');
                $('#adrcountry').append('<option value="'+ data[i].UID+'">'+data[i].Country+'</option> ');
              }
             }).fail(function(resp){failedanswer(resp)});

        } else {
            nosession()
        }
      }

export async function createcompanyloader(auth) {
              if (auth == 1) {
                $('#catalogmenu').addClass("active");
                $('.addressheader').hide();
                $('.bankaccountheader').hide();
                $('.cryptoheader').hide();
                $('#pavatarfiles').attr("name", "company");

                var token =  await gettoken();

                getcurrencies(token).done(function(resp){

                  var data = resp.data.currencies;

                  for (var i = 0; i < data.length; i++) {
                    var n = i + 1;
                $('#currency').append('<option value="'+ data[i].CurrencyCode+'">'+data[i].Name+'</option> ');
                    }
                }).fail(function(resp){failedanswer(resp)});

                getcountries(token).done(function(resp){
                  var data = resp.data.countries;

                  for (var i = 0; i < data.length; i++) {
                      $('#adrcountrytxt').append('<option value="'+ data[i].UID+'">'+data[i].Country+'</option> ');
                        $('#regc').append('<option value="'+ data[i].UID+'">'+data[i].Country+'</option> ');
                    }
                   }).fail(function(resp){failedanswer(resp)});

              } else {
                  nosession()
              }
            }

export async function addpersonloader(auth) {
      if (auth == 1) {
        $('#catalogmenu').addClass("active");
        $('.addressheader').hide();
        $('.bankaccountheader').hide();
        $('.cryptoheader').hide();
        $('#addressaveperson').removeAttr("hidden");
        $('#addressave').hide();
        $('#banksaveperson').removeAttr("hidden");
        $('#banksave').hide();
        $('#pavatarfiles').attr("name", "person");

var token =  await gettoken();

getcountries(token).done(function(resp){
  var data = resp.data.countries;

  for (var i = 0; i < data.length; i++) {
      $('#cb').append('<option value="'+ data[i].UID+'">'+data[i].Country+'</option> ');
      $('#cit').append('<option value="'+ data[i].UID+'">'+data[i].Country+'</option> ');
      $('#tred').append('<option value="'+ data[i].UID+'">'+data[i].Country+'</option> ');
      $('#adrcountry').append('<option value="'+ data[i].UID+'">'+data[i].Country+'</option> ');
    }
   }).fail(function(resp){failedanswer(resp)});

      } else {
            nosession()
                }
                        }

export async function companyprofilebuilder(auth) {
  if (auth == 1) {

  //1. Determinate companyID
  var companyid = "";
  var currentcompany = "";

  if (GetUrlParameter("id") != null) {

    companyid = GetUrlParameter("id");
    // var SessionStore = new Store('erp-db', 'session')
    currentcompany = await  get('sessionid', SessionStore).then( result => {
          if (result !== undefined) {
            var session = JSON.parse(result);
            console.log(session.companyid);
            return session.companyid
          } else {
            console.log("no");
            return ""
          }
        });


  } else {

    //get companyid from indexedDB
      // var SessionStore = new Store('erp-db', 'session')
  var companyid = await  get('sessionid', SessionStore).then( result => {

        if (result !== undefined) {
          var session = JSON.parse(result);
          console.log(session.companyid);
          return session.companyid

        }
      });
    currentcompany = companyid;
    console.log("My Company is: ",currentcompany);
    const search = new URLSearchParams(location.search);
    search.set('id', currentcompany);
    location.search = search.toString();


  }
  if (companyid != "") {
//request company data
var token =  await gettoken();

if (currentcompany == companyid) {
  $('.mycompanychoose').hide();
}
$('body').attr("page","company");
companyavatar(companyid, token).done(function(resp){
  var img = document.getElementById('companyavatar');
   var url = window.URL || window.webkitURL;
  $('#companyavatar').attr('src', url.createObjectURL(resp));

}).fail(function(resp){
  console.log(resp);

  if (resp.status == 401) {
    clear(SessionStore);
    document.location.href = '/';
  }

});

//Get general ifo
var mycompany = 0;
showcompany(companyid, token).done(function(resp){
//Plase data to fields

var comp = resp.data.company;

$('.mycompanychoose').attr("name", comp.UID);
$('#cnameh').text(comp.Name);
$('#compid').text("CompanyID: " + comp.UID);

var dataarr = [];
dataarr.push(comp);


//Get addresses
showcompanyaddress(companyid, token, 1, 0).done(function(resp) {
  var addr = resp.data.addresses[0];
   dataarr.push(addr);
             var settings = $.extend({}, dataarr[0], dataarr[1]);
             var alldataerr = [];
             alldataerr.push(settings);
            $('#cprof').bootstrapTable('load', alldataerr);
}).fail(function(resp){failedanswer(resp)});




if (comp.hasOwnProperty('AcMethod')) {
//My Company
mycompany = 1;




companylogo(companyid, token).done(function(resp){
  var img = document.getElementById('clogogimg');
   var url = window.URL || window.webkitURL;
  $('#clogogimg').attr('src', url.createObjectURL(resp));
}).fail(function(resp){
  if (resp.status == 400) {
  $('#ladd').text('Add');
  }
});

companyshortlogo(companyid, token).done(function(resp){
  var img = document.getElementById('shortclogogimg');
   var url = window.URL || window.webkitURL;
  $('#shortclogogimg').attr('src', url.createObjectURL(resp));
}).fail(function(resp){
  if (resp.status == 400) {
  $('#sladd').text('Add');
  }
});


companyinvoicelogo(companyid, token).done(function(resp){
  var img = document.getElementById('invoicelogogimg');
   var url = window.URL || window.webkitURL;
  $('#invoicelogogimg').attr('src', url.createObjectURL(resp));
}).fail(function(resp){
  if (resp.status == 400) {
  $('#inladd').text('Add');
  }
});
//$('#cprof').bootstrapTable();
} else {
  $('#avasshcl').attr('checked', false);
  $('#chbav').attr('hidden', true);
}



//Get invoice settings
showinvoicesettings(companyid, token).done(function(resp){
    var data = resp.data.data;
    $('#insettable').attr('dataid', data.UID);
    $('#isaddr').text(data.Address);
    $('#isbank').text(data.Bank);
    $('#isphone').text(data.Phone);
    $('#isfax').text(data.Fax);
    $('#ismob').text(data.Mobile);
    $('#isemail').text(data.Email);
    $('#isurl').text(data.URL);

}).fail(function(resp){failedanswer(resp)});
//Get email invoice settings
showinvoiceemailsettings(companyid, token).done(function(resp){
    var data = resp.data.data;
    $('#emailinsettable').attr('dataid', data.UID);
    $('#host').text(data.Host);
    $('#isport').text(data.Port);
    $('#isuser').text(data.User);
    $('#isemailset').text(data.Address);
    $('#isreply').text(data.Reply);
    $('#istitle').text(data.Title);

}).fail(function(resp){failedanswer(resp)});


}).fail(function(resp){failedanswer(resp)});

//Get Addresses
showcompanyaddress(companyid, token, 25, 0).done(function(resp) {
  if (resp.data.addresses.length != 0) {
             var adresses = [];

             var i;
for (i = 0; i < resp.data.addresses.length; i++) {
	var n = i + 1;
	var addr = resp.data.addresses[i];
  var area = "";
  if (addr.Area != "") {
    area = addr.Area + ", ";
  }
  var addressinline = addr.Street +  " " + addr.House + ", " + area +  addr.Postecode + " " + addr.City + ", " + addr.Country;


  $('#addresstbody').append('<tr name="'+addr.AddressID+'"  loaded="'+resp.data.addresses.length+'" count="'+resp.data.addressescount+'"> \
  <td>'+ n + '</td> \
  <td>'+addr.Description +'</td>\
  <td>'+addressinline+'</td>\
  <td>'+addr.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');

  $('#insetnewaddr').append('<option value="'+addr.AddressID+'">'+addressinline+'</option>');

}
} else {
  $('#adrtable').hide();
  $('#addrmsg').text("You have no addresses yet");
  $('#insetnewaddr').append('<option value="">You have no addresses</option>');
}

}).fail(function(resp){failedanswer(resp)});

//Get Banks
showcompanybanks(companyid, token, 25, 0).done(function(resp) {

  if (resp.data.banks.length != 0) {
             var banks = [];

             var i;
for (i = 0; i < resp.data.banks.length; i++) {
	var n = i + 1;
	var bank = resp.data.banks[i];

  $('#banksinfo').append('<div class="mb-2 mt-4"> \
<div> #'+n+' '+bank.Description +'</div> \
<table class="table mb-0"> \
<tbody> \
<tr> \
<th scope="row" class="border-top-0">Bank Name</th> \
<td class="border-top-0 text-right">'+bank.Name +'</td> \
</tr> \
<tr> \
<th scope="row">Currency</th> \
<td class="text-right" >'+bank.Currency +'</td> \
</tr> \
<tr> \
<th scope="row">IBAN</th> \
<td class="text-right" >'+bank.IBAN +'</td> \
</tr> \
<tr> \
<th scope="row">Account</th> \
<td class="text-right" >'+bank.Account +'</td> \
</tr> \
<tr> \
<th scope="row">BIC/ SWIFT</th> \
<td class="text-right" >'+bank.BIC +'</td> \
</tr> \
<tr> \
<th scope="row">Branch</th> \
<td class="text-right" >'+bank.Branch +'</td> \
</tr> \
<tr> \
<th scope="row">Bank Code</th> \
<td class="text-right" >'+bank.BankCode +'</td> \
</tr> \
<tr> \
<th scope="row">Comment</th> \
<td class="text-right" >'+bank.Comment +'</td> \
</tr> \
</tbody> \
</table> \
</div> \
  ');

  $('#insetnewbank').append('<option value="'+bank.BankID+'">'+bank.Name+'</option>');

}
} else {
  $('#bankmsg').text("You have no Banks yet");
  $('#insetnewbank').append('<option value="">You have no Banks yet</option>');
}

}).fail(function(resp){failedanswer(resp)});

//Get Cryptos
showcompanycryptos(companyid, token, 25, 0).done(function(resp) {
  if (resp.data.cryptos.length != 0) {
             var adresses = [];

             var i;
             console.log(resp.data.cryptos.length);
for (i = 0; i < resp.data.cryptos.length; i++) {
	var n = i + 1;
	var addr = resp.data.cryptos[i];


  $('#cryptotbody').append('<tr name="'+addr.CryptoID+'"  loaded="'+resp.data.cryptos.length+'" count="'+resp.data.cryptoscount+'"> \
  <td>'+ n + '</td> \
  <td>'+addr.Description +'</td>\
  <td>'+addr.Type+'</td>\
  <td>'+addr.Account+'</td>\
  <td>'+addr.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');


}
} else {
  $('#cryptotable').hide();
  $('#cryptomsg').text("You have no Cryptocurrencies account yet");
}

}).fail(function(resp){failedanswer(resp)});

//Get Payment Systems
showcompanypaymentsystems(companyid, token, 25, 0).done(function(resp) {

  if (resp.data.paymentsystems.length != 0) {


             var i;

for (i = 0; i < resp.data.paymentsystems.length; i++) {
	var n = i + 1;
	var addr = resp.data.paymentsystems[i];


  $('#paymentbody').append('<tr name="'+addr.UID+'"  loaded="'+resp.data.paymentsystems.length+'" count="'+resp.data.paymentsystems+'"> \
  <td>'+ n + '</td> \
  <td>'+addr.Description +'</td>\
  <td>'+addr.Type+'</td>\
  <td>'+addr.AccountID+'</td>\
  <td>'+addr.Currency+'</td>\
  <td>'+addr.Link+'</td>\
  <td>'+addr.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');


}
} else {
  $('#paymenttable').hide();
  $('#paymentmsg').text("You have no accounts in Payment Systems yet");
}

}).fail(function(resp){failedanswer(resp)});

//Get Brokers
showcompanybrokers(companyid, token, 25, 0).done(function(resp) {

  if (resp.data.brokers.length != 0) {


             var i;

for (i = 0; i < resp.data.brokers.length; i++) {
	var n = i + 1;
	var addr = resp.data.brokers[i];


  $('#brokertbody').append('<tr name="'+addr.UID+'"  loaded="'+resp.data.brokers.length+'" count="'+resp.data.brokers+'"> \
  <td>'+ n + '</td> \
  <td>'+addr.Broker +'</td>\
  <td>'+addr.Account+'</td>\
  <td>'+addr.Description+'</td>\
  <td>'+addr.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');


}
} else {
  $('#brokertable').hide();
  $('#brokermsg').text("You have no Broker accounts yet");
}

}).fail(function(resp){failedanswer(resp)});

//Get Shareholders
showcompanyshareholders(companyid, token, 25, 0).done(function(resp) {

  if (resp.data.shareholders.length != 0) {


             var i;

for (i = 0; i < resp.data.shareholders.length; i++) {
	var n = i + 1;
	var addr = resp.data.shareholders[i];


  $('#shareholderstbody').append('<tr name="'+addr.UID+'"  loaded="'+resp.data.shareholders.length+'" count="'+resp.data.shareholders+'"> \
  <td>'+ n + '</td> \
  <td>'+addr.Shareholder +'</td>\
  <td>'+addr.Shares+'</td>\
  <td>'+addr.SharesAmount+'</td>\
  <td>'+addr.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');


}
} else {
  $('#hareholderstable').hide();
  $('#shareholdermsg').text("You have no records about Shareholders yet");
}

}).fail(function(resp){failedanswer(resp)});

//Get Directors
showcompanydirectors(companyid, token, 25, 0).done(function(resp) {

  if (resp.data.directors.length != 0) {


             var i;

for (i = 0; i < resp.data.directors.length; i++) {
	var n = i + 1;
	var addr = resp.data.directors[i];


  $('#directorstbody').append('<tr name="'+addr.UID+'"  loaded="'+resp.data.directors.length+'" count="'+resp.data.directors+'"> \
  <td>'+ n + '</td> \
  <td>'+addr.DirectorName +'</td>\
  <td>'+addr.Position+'</td>\
  </tr>');


}
} else {
  $('#hareholderstable').hide();
  $('#shareholdermsg').text("You have no records about Shareholders yet");
}

}).fail(function(resp){failedanswer(resp)});

//Get Phones
showcompanyphones(companyid, token, 25, 0).done(function(resp) {
  if (resp.data.phones.length != 0) {
             var adresses = [];

             var i;
             console.log(resp.data.phones.length);
for (i = 0; i < resp.data.phones.length; i++) {
	var n = i + 1;
	var dat = resp.data.phones[i];
var phone = "+" + dat.PhoneCountryCode + dat.PhoneAreaCode + dat.PhoneNumber;

  $('#phonetbody').append('<tr name="'+dat.PhoneID+'"  loaded="'+resp.data.phones.length+'" count="'+resp.data.phonescount+'"> \
  <td>'+ n + '</td> \
  <td>'+dat.Description +'</td>\
  <td>'+dat.Type+'</td>\
  <td>'+phone+'</td>\
  <td>'+dat.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');

  $('#insetnewphone').append('<option value="'+dat.PhoneID+'">'+phone+'</option>');
  $('#insetnewfax').append('<option value="'+dat.PhoneID+'">'+phone+'</option>');
  $('#insetnewmobile').append('<option value="'+dat.PhoneID+'">'+phone+'</option>');


}
} else {
  $('#phonetable').hide();
  $('#phonemsg').text("You have no Phones yet");
  $('#insetnewphone').append('<option value="">You have no Phones yet</option>');
  $('#insetnewfax').append('<option value="">You have no Phones yet</option>');
  $('#insetnewmobile').append('<option value="">You have no Phones yet</option>');

}

}).fail(function(resp){failedanswer(resp)});
//Get Emails
showcompanyemails(companyid, token, 25, 0).done(function(resp) {
  if (resp.data.emails.length != 0) {


             var i;
             console.log(resp.data.emails.length);
for (i = 0; i < resp.data.emails.length; i++) {
	var n = i + 1;
	var dat = resp.data.emails[i];


  $('#emailtbody').append('<tr name="'+dat.EmailID+'"  loaded="'+resp.data.emails.length+'" count="'+resp.data.emailscount+'"> \
  <td>'+ n + '</td> \
  <td>'+dat.Description +'</td>\
  <td>'+dat.Email+'</td>\
  <td>'+dat.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');
  $('#insetnewemail').append('<option value="'+dat.EmailID+'">'+dat.Email+'</option>');

}
} else {
  $('#emailtable').hide();
  $('#emailmsg').text("You have no Emails yet");
  $('#insetnewemail').append('<option value="">You have no Emails yet</option>');
}

}).fail(function(resp){failedanswer(resp)});

//Get URL
showcompanyurls(companyid, token, 25, 0).done(function(resp) {
  if (resp.data.urls.length != 0) {


             var i;

for (i = 0; i < resp.data.urls.length; i++) {
	var n = i + 1;
	var dat = resp.data.urls[i];


  $('#urltbody').append('<tr name="'+dat.URLID+'"  loaded="'+resp.data.urls.length+'" count="'+resp.data.urlscount+'"> \
  <td>'+ n + '</td> \
  <td>'+dat.Description +'</td>\
  <td>'+dat.URL+'</td>\
  <td>'+dat.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');

  $('#insetnewurl').append('<option value="'+dat.URLID+'">'+dat.URL+'</option>');

}
} else {
  $('#urltable').hide();
  $('#urlmsg').text("You have no URLs yet");
  $('#insetnewurl').append('<option value="">You have no URLs yet</option>');
}

}).fail(function(resp){failedanswer(resp)});

//Get Custom Data
showcompanycustom(companyid, token, 25, 0).done(function(resp) {
  if (resp.data.customs.length != 0) {


             var i;

for (i = 0; i < resp.data.customs.length; i++) {
	var n = i + 1;
	var dat = resp.data.customs[i];


  $('#customtbody').append('<tr name="'+dat.DataID+'"  loaded="'+resp.data.customs.length+'" count="'+resp.data.customscount+'"> \
  <td>'+ n + '</td> \
  <td>'+dat.Description +'</td>\
  <td>'+dat.Type+'</td>\
  <td>'+dat.Data+'</td>\
  <td>'+dat.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');

}
} else {
  $('#customtable').hide();
  $('#custommsg').text("You have no any data yet");
}

}).fail(function(resp){failedanswer(resp)});


//Get Files
showcompanyfiles(companyid, token, "", 25, 0).done(function(resp) {
  if (resp.data.files.length != 0) {


             var i;

  var fl = resp.data.files[0].Folder;
if (fl == "") {
  fl = "/";
}
$("#addnewfile").attr("path", fl);
$('#filestbody').append('<tr data-name="folderpath"  loaded="'+resp.data.files.length+'" count="'+resp.data.filescount+'"  > \
<td >'+fl +'</i></td> \
<td id="createfolder" data-name="'+fl +'" style="cursor:pointer;"><i class="la la-plus-circle"></i></td>\
<td></td>\
<td></td>\
<td></td>\
</tr>');

for (i = 0; i < resp.data.files.length; i++) {
	var n = i + 1;
	var dat = resp.data.files[i];

if (dat.Type == "file") {
  $('#filestbody').append('<tr name="'+dat.FileID+'"   class="companyfile" style="cursor:pointer;"> \
  <td><i class="la la-file-pdf-o"></i></td> \
  <td>'+dat.Name +'</td>\
  <td>'+dat.Description+'</td>\
  <td>'+dat.Comment+'</td>\
  <td><i class="la la-trash"></i></td>\
  </tr>');
}

if (dat.Type == "folder") {
  $('#filestbody').append('<tr name="'+ dat.Folder + dat.Name +'"    class="companyfolder" style="cursor:pointer;"> \
  <td><i class="la la-folder-open"></i></td> \
  <td>'+dat.Name +'</td>\
  <td></td>\
  <td></td>\
  <td><i class="la la-trash"></i></td>\
  </tr>');
}

}
} else {
  //$('#cryptotable').hide();
    fl = "/";
    $("#addnewfile").attr("path", fl);
    $('#filestbody').append('<tr name="folderpath"> \
    <td >'+fl +'</i></td> \
    <td id="createfolder" data-name="'+fl +'" style="cursor:pointer;"><i class="la la-plus-circle"></i></td>\
    <td></td>\
    <td></td>\
    <td></td>\
    </tr>');
    $('#filestbody').append('<tr name="folderpath"> \
		<td colspan="5">There is no files in the folder</td> \
		</tr>');
}

}).fail(function(resp){
  fl = "/";
  $("#addnewfile").attr("path", fl);
  $('#filestbody').append('<tr name="folderpath"> \
  <td >'+fl +'</i></td> \
  <td id="createfolder" data-name="'+fl +'" style="cursor:pointer;"><i class="la la-plus-circle"></i></td>\
  <td></td>\
  <td></td>\
  <td></td>\
  </tr>');
  $('#filestbody').append('<tr name="folderpath"> \
  <td colspan="5">There is no files in the folder</td> \
  </tr>');
});




  } else {
    document.location.href = '/';
  }
  } else {
      nosession()
  }
}

export async function accountprofilebuilder(auth) {
  if (auth == 1) {

  //1. Determinate companyID
  var companyid = "";
  var currentcompany = "";

  if (GetUrlParameter("id") != null) {

    companyid = GetUrlParameter("id");
    // var SessionStore = new Store('erp-db', 'session')
    currentcompany = await  get('sessionid', SessionStore).then( result => {
          if (result !== undefined) {
            var session = JSON.parse(result);
            console.log(session.companyid);
            return session.companyid
          } else {
            console.log("no");
            return ""
          }
        });


  } else {

    //get companyid from indexedDB
      // var SessionStore = new Store('erp-db', 'session')
  var companyid = await  get('sessionid', SessionStore).then( result => {

        if (result !== undefined) {
          var session = JSON.parse(result);
          console.log(session.companyid);
          return session.companyid

        }
      });
    currentcompany = companyid;
    console.log("My Company is: ",currentcompany);
    const search = new URLSearchParams(location.search);
    search.set('id', currentcompany);
    location.search = search.toString();


  }
  if (companyid != "") {
//request company data
var token =  await gettoken();

if (currentcompany == companyid) {
  $('.mycompanychoose').hide();
}
$('body').attr("page","company");
companyavatar(companyid, token).done(function(resp){
  var img = document.getElementById('companyavatar');
   var url = window.URL || window.webkitURL;
  $('#companyavatar').attr('src', url.createObjectURL(resp));

}).fail(function(resp){
  console.log(resp);

  if (resp.status == 401) {
    clear(SessionStore);
    document.location.href = '/';
  }

});

//Get general ifo
var mycompany = 0;
showcompany(companyid, token).done(function(resp){
//Plase data to fields

var comp = resp.data.company;

$('.mycompanychoose').attr("name", comp.UID);
$('#cnameh').text(comp.Name);
$('#compid').text("CompanyID: " + comp.UID);

var dataarr = [];
dataarr.push(comp);


//Get addresses
showcompanyaddress(companyid, token, 1, 0).done(function(resp) {
  var addr = resp.data.addresses[0];
   dataarr.push(addr);
             var settings = $.extend({}, dataarr[0], dataarr[1]);
             var alldataerr = [];
             alldataerr.push(settings);
            $('#cprof').bootstrapTable('load', alldataerr);
}).fail(function(resp){failedanswer(resp)});




if (comp.hasOwnProperty('AcMethod')) {
//My Company
mycompany = 1;




companylogo(companyid, token).done(function(resp){
  var img = document.getElementById('clogogimg');
   var url = window.URL || window.webkitURL;
  $('#clogogimg').attr('src', url.createObjectURL(resp));
}).fail(function(resp){
  if (resp.status == 400) {
  $('#ladd').text('Add');
  }
});

companyshortlogo(companyid, token).done(function(resp){
  var img = document.getElementById('shortclogogimg');
   var url = window.URL || window.webkitURL;
  $('#shortclogogimg').attr('src', url.createObjectURL(resp));
}).fail(function(resp){
  if (resp.status == 400) {
  $('#sladd').text('Add');
  }
});


companyinvoicelogo(companyid, token).done(function(resp){
  var img = document.getElementById('invoicelogogimg');
   var url = window.URL || window.webkitURL;
  $('#invoicelogogimg').attr('src', url.createObjectURL(resp));
}).fail(function(resp){
  if (resp.status == 400) {
  $('#inladd').text('Add');
  }
});
//$('#cprof').bootstrapTable();
} else {
  $('#avasshcl').attr('checked', false);
  $('#chbav').attr('hidden', true);
}



//Get invoice settings
showinvoicesettings(companyid, token).done(function(resp){
    var data = resp.data.data;
    $('#insettable').attr('dataid', data.UID);
    $('#isaddr').text(data.Address);
    $('#isbank').text(data.Bank);
    $('#isphone').text(data.Phone);
    $('#isfax').text(data.Fax);
    $('#ismob').text(data.Mobile);
    $('#isemail').text(data.Email);
    $('#isurl').text(data.URL);

}).fail(function(resp){failedanswer(resp)});
//Get email invoice settings
showinvoiceemailsettings(companyid, token).done(function(resp){
    var data = resp.data.data;
    $('#emailinsettable').attr('dataid', data.UID);
    $('#host').text(data.Host);
    $('#isport').text(data.Port);
    $('#isuser').text(data.User);
    $('#isemailset').text(data.Address);
    $('#isreply').text(data.Reply);
    $('#istitle').text(data.Title);

}).fail(function(resp){failedanswer(resp)});


}).fail(function(resp){failedanswer(resp)});

//Get Addresses
showcompanyaddress(companyid, token, 25, 0).done(function(resp) {
  if (resp.data.addresses.length != 0) {
             var adresses = [];

             var i;
for (i = 0; i < resp.data.addresses.length; i++) {
	var n = i + 1;
	var addr = resp.data.addresses[i];
  var area = "";
  if (addr.Area != "") {
    area = addr.Area + ", ";
  }
  var addressinline = addr.Street +  " " + addr.House + ", " + area +  addr.Postecode + " " + addr.City + ", " + addr.Country;


  $('#addresstbody').append('<tr name="'+addr.AddressID+'"  loaded="'+resp.data.addresses.length+'" count="'+resp.data.addressescount+'"> \
  <td>'+ n + '</td> \
  <td>'+addr.Description +'</td>\
  <td>'+addressinline+'</td>\
  <td>'+addr.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');

  $('#insetnewaddr').append('<option value="'+addr.AddressID+'">'+addressinline+'</option>');

}
} else {
  $('#adrtable').hide();
  $('#addrmsg').text("You have no addresses yet");
  $('#insetnewaddr').append('<option value="">You have no addresses</option>');
}

}).fail(function(resp){failedanswer(resp)});

//Get Banks
showcompanybanks(companyid, token, 25, 0).done(function(resp) {

  if (resp.data.banks.length != 0) {
             var banks = [];

             var i;
for (i = 0; i < resp.data.banks.length; i++) {
	var n = i + 1;
	var bank = resp.data.banks[i];

  $('#banksinfo').append('<div class="mb-2 mt-4"> \
<div> #'+n+' '+bank.Description +'</div> \
<table class="table mb-0"> \
<tbody> \
<tr> \
<th scope="row" class="border-top-0">Bank Name</th> \
<td class="border-top-0 text-right">'+bank.Name +'</td> \
</tr> \
<tr> \
<th scope="row">Currency</th> \
<td class="text-right" >'+bank.Currency +'</td> \
</tr> \
<tr> \
<th scope="row">IBAN</th> \
<td class="text-right" >'+bank.IBAN +'</td> \
</tr> \
<tr> \
<th scope="row">Account</th> \
<td class="text-right" >'+bank.Account +'</td> \
</tr> \
<tr> \
<th scope="row">BIC/ SWIFT</th> \
<td class="text-right" >'+bank.BIC +'</td> \
</tr> \
<tr> \
<th scope="row">Branch</th> \
<td class="text-right" >'+bank.Branch +'</td> \
</tr> \
<tr> \
<th scope="row">Bank Code</th> \
<td class="text-right" >'+bank.BankCode +'</td> \
</tr> \
<tr> \
<th scope="row">Comment</th> \
<td class="text-right" >'+bank.Comment +'</td> \
</tr> \
</tbody> \
</table> \
</div> \
  ');

  $('#insetnewbank').append('<option value="'+bank.BankID+'">'+bank.Name+'</option>');

}
} else {
  $('#bankmsg').text("You have no Banks yet");
  $('#insetnewbank').append('<option value="">You have no Banks yet</option>');
}

}).fail(function(resp){failedanswer(resp)});

//Get Cryptos
showcompanycryptos(companyid, token, 25, 0).done(function(resp) {
  if (resp.data.cryptos.length != 0) {
             var adresses = [];

             var i;
             console.log(resp.data.cryptos.length);
for (i = 0; i < resp.data.cryptos.length; i++) {
	var n = i + 1;
	var addr = resp.data.cryptos[i];


  $('#cryptotbody').append('<tr name="'+addr.CryptoID+'"  loaded="'+resp.data.cryptos.length+'" count="'+resp.data.cryptoscount+'"> \
  <td>'+ n + '</td> \
  <td>'+addr.Description +'</td>\
  <td>'+addr.Type+'</td>\
  <td>'+addr.Account+'</td>\
  <td>'+addr.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');


}
} else {
  $('#cryptotable').hide();
  $('#cryptomsg').text("You have no Cryptocurrencies account yet");
}

}).fail(function(resp){failedanswer(resp)});

//Get Payment Systems
showcompanypaymentsystems(companyid, token, 25, 0).done(function(resp) {

  if (resp.data.paymentsystems.length != 0) {


             var i;

for (i = 0; i < resp.data.paymentsystems.length; i++) {
	var n = i + 1;
	var addr = resp.data.paymentsystems[i];


  $('#paymentbody').append('<tr name="'+addr.UID+'"  loaded="'+resp.data.paymentsystems.length+'" count="'+resp.data.paymentsystems+'"> \
  <td>'+ n + '</td> \
  <td>'+addr.Description +'</td>\
  <td>'+addr.Type+'</td>\
  <td>'+addr.AccountID+'</td>\
  <td>'+addr.Currency+'</td>\
  <td>'+addr.Link+'</td>\
  <td>'+addr.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');


}
} else {
  $('#paymenttable').hide();
  $('#paymentmsg').text("You have no accounts in Payment Systems yet");
}

}).fail(function(resp){failedanswer(resp)});

//Get Brokers
showcompanybrokers(companyid, token, 25, 0).done(function(resp) {

  if (resp.data.brokers.length != 0) {


             var i;

for (i = 0; i < resp.data.brokers.length; i++) {
	var n = i + 1;
	var addr = resp.data.brokers[i];


  $('#brokertbody').append('<tr name="'+addr.UID+'"  loaded="'+resp.data.brokers.length+'" count="'+resp.data.brokers+'"> \
  <td>'+ n + '</td> \
  <td>'+addr.Broker +'</td>\
  <td>'+addr.Account+'</td>\
  <td>'+addr.Description+'</td>\
  <td>'+addr.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');


}
} else {
  $('#brokertable').hide();
  $('#brokermsg').text("You have no Broker accounts yet");
}

}).fail(function(resp){failedanswer(resp)});

//Get Shareholders
showcompanyshareholders(companyid, token, 25, 0).done(function(resp) {

  if (resp.data.shareholders.length != 0) {


             var i;

for (i = 0; i < resp.data.shareholders.length; i++) {
	var n = i + 1;
	var addr = resp.data.shareholders[i];


  $('#shareholderstbody').append('<tr name="'+addr.UID+'"  loaded="'+resp.data.shareholders.length+'" count="'+resp.data.shareholders+'"> \
  <td>'+ n + '</td> \
  <td>'+addr.Shareholder +'</td>\
  <td>'+addr.Shares+'</td>\
  <td>'+addr.SharesAmount+'</td>\
  <td>'+addr.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');


}
} else {
  $('#hareholderstable').hide();
  $('#shareholdermsg').text("You have no records about Shareholders yet");
}

}).fail(function(resp){failedanswer(resp)});

//Get Directors
showcompanydirectors(companyid, token, 25, 0).done(function(resp) {

  if (resp.data.directors.length != 0) {


             var i;

for (i = 0; i < resp.data.directors.length; i++) {
	var n = i + 1;
	var addr = resp.data.directors[i];


  $('#directorstbody').append('<tr name="'+addr.UID+'"  loaded="'+resp.data.directors.length+'" count="'+resp.data.directors+'"> \
  <td>'+ n + '</td> \
  <td>'+addr.DirectorName +'</td>\
  <td>'+addr.Position+'</td>\
  </tr>');


}
} else {
  $('#hareholderstable').hide();
  $('#shareholdermsg').text("You have no records about Shareholders yet");
}

}).fail(function(resp){failedanswer(resp)});

//Get Phones
showcompanyphones(companyid, token, 25, 0).done(function(resp) {
  if (resp.data.phones.length != 0) {
             var adresses = [];

             var i;
             console.log(resp.data.phones.length);
for (i = 0; i < resp.data.phones.length; i++) {
	var n = i + 1;
	var dat = resp.data.phones[i];
var phone = "+" + dat.PhoneCountryCode + dat.PhoneAreaCode + dat.PhoneNumber;

  $('#phonetbody').append('<tr name="'+dat.PhoneID+'"  loaded="'+resp.data.phones.length+'" count="'+resp.data.phonescount+'"> \
  <td>'+ n + '</td> \
  <td>'+dat.Description +'</td>\
  <td>'+dat.Type+'</td>\
  <td>'+phone+'</td>\
  <td>'+dat.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');

  $('#insetnewphone').append('<option value="'+dat.PhoneID+'">'+phone+'</option>');
  $('#insetnewfax').append('<option value="'+dat.PhoneID+'">'+phone+'</option>');
  $('#insetnewmobile').append('<option value="'+dat.PhoneID+'">'+phone+'</option>');


}
} else {
  $('#phonetable').hide();
  $('#phonemsg').text("You have no Phones yet");
  $('#insetnewphone').append('<option value="">You have no Phones yet</option>');
  $('#insetnewfax').append('<option value="">You have no Phones yet</option>');
  $('#insetnewmobile').append('<option value="">You have no Phones yet</option>');

}

}).fail(function(resp){failedanswer(resp)});
//Get Emails
showcompanyemails(companyid, token, 25, 0).done(function(resp) {
  if (resp.data.emails.length != 0) {


             var i;
             console.log(resp.data.emails.length);
for (i = 0; i < resp.data.emails.length; i++) {
	var n = i + 1;
	var dat = resp.data.emails[i];


  $('#emailtbody').append('<tr name="'+dat.EmailID+'"  loaded="'+resp.data.emails.length+'" count="'+resp.data.emailscount+'"> \
  <td>'+ n + '</td> \
  <td>'+dat.Description +'</td>\
  <td>'+dat.Email+'</td>\
  <td>'+dat.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');
  $('#insetnewemail').append('<option value="'+dat.EmailID+'">'+dat.Email+'</option>');

}
} else {
  $('#emailtable').hide();
  $('#emailmsg').text("You have no Emails yet");
  $('#insetnewemail').append('<option value="">You have no Emails yet</option>');
}

}).fail(function(resp){failedanswer(resp)});

//Get URL
showcompanyurls(companyid, token, 25, 0).done(function(resp) {
  if (resp.data.urls.length != 0) {


             var i;

for (i = 0; i < resp.data.urls.length; i++) {
	var n = i + 1;
	var dat = resp.data.urls[i];


  $('#urltbody').append('<tr name="'+dat.URLID+'"  loaded="'+resp.data.urls.length+'" count="'+resp.data.urlscount+'"> \
  <td>'+ n + '</td> \
  <td>'+dat.Description +'</td>\
  <td>'+dat.URL+'</td>\
  <td>'+dat.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');

  $('#insetnewurl').append('<option value="'+dat.URLID+'">'+dat.URL+'</option>');

}
} else {
  $('#urltable').hide();
  $('#urlmsg').text("You have no URLs yet");
  $('#insetnewurl').append('<option value="">You have no URLs yet</option>');
}

}).fail(function(resp){failedanswer(resp)});

//Get Custom Data
showcompanycustom(companyid, token, 25, 0).done(function(resp) {
  if (resp.data.customs.length != 0) {


             var i;

for (i = 0; i < resp.data.customs.length; i++) {
	var n = i + 1;
	var dat = resp.data.customs[i];


  $('#customtbody').append('<tr name="'+dat.DataID+'"  loaded="'+resp.data.customs.length+'" count="'+resp.data.customscount+'"> \
  <td>'+ n + '</td> \
  <td>'+dat.Description +'</td>\
  <td>'+dat.Type+'</td>\
  <td>'+dat.Data+'</td>\
  <td>'+dat.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');

}
} else {
  $('#customtable').hide();
  $('#custommsg').text("You have no any data yet");
}

}).fail(function(resp){failedanswer(resp)});


//Get Files
showcompanyfiles(companyid, token, "", 25, 0).done(function(resp) {
  if (resp.data.files.length != 0) {


             var i;

  var fl = resp.data.files[0].Folder;
if (fl == "") {
  fl = "/";
}
$("#addnewfile").attr("path", fl);
$('#filestbody').append('<tr data-name="folderpath"  loaded="'+resp.data.files.length+'" count="'+resp.data.filescount+'"  > \
<td >'+fl +'</i></td> \
<td id="createfolder" data-name="'+fl +'" style="cursor:pointer;"><i class="la la-plus-circle"></i></td>\
<td></td>\
<td></td>\
<td></td>\
</tr>');

for (i = 0; i < resp.data.files.length; i++) {
	var n = i + 1;
	var dat = resp.data.files[i];

if (dat.Type == "file") {
  $('#filestbody').append('<tr name="'+dat.FileID+'"   class="companyfile" style="cursor:pointer;"> \
  <td><i class="la la-file-pdf-o"></i></td> \
  <td>'+dat.Name +'</td>\
  <td>'+dat.Description+'</td>\
  <td>'+dat.Comment+'</td>\
  <td><i class="la la-trash"></i></td>\
  </tr>');
}

if (dat.Type == "folder") {
  $('#filestbody').append('<tr name="'+ dat.Folder + dat.Name +'"    class="companyfolder" style="cursor:pointer;"> \
  <td><i class="la la-folder-open"></i></td> \
  <td>'+dat.Name +'</td>\
  <td></td>\
  <td></td>\
  <td><i class="la la-trash"></i></td>\
  </tr>');
}

}
} else {
  //$('#cryptotable').hide();
    fl = "/";
    $("#addnewfile").attr("path", fl);
    $('#filestbody').append('<tr name="folderpath"> \
    <td >'+fl +'</i></td> \
    <td id="createfolder" data-name="'+fl +'" style="cursor:pointer;"><i class="la la-plus-circle"></i></td>\
    <td></td>\
    <td></td>\
    <td></td>\
    </tr>');
    $('#filestbody').append('<tr name="folderpath"> \
		<td colspan="5">There is no files in the folder</td> \
		</tr>');
}

}).fail(function(resp){
  fl = "/";
  $("#addnewfile").attr("path", fl);
  $('#filestbody').append('<tr name="folderpath"> \
  <td >'+fl +'</i></td> \
  <td id="createfolder" data-name="'+fl +'" style="cursor:pointer;"><i class="la la-plus-circle"></i></td>\
  <td></td>\
  <td></td>\
  <td></td>\
  </tr>');
  $('#filestbody').append('<tr name="folderpath"> \
  <td colspan="5">There is no files in the folder</td> \
  </tr>');
});




  } else {
    document.location.href = '/';
  }
  } else {
      nosession()
  }
}

export async function personprofilebuilder(auth) {
  if (auth == 1) {

  //1. Determinate companyID

    var personid = GetUrlParameter("id");
    // var SessionStore = new Store('erp-db', 'session')
    var currentcompany = await  get('sessionid', SessionStore).then( result => {
          if (result !== undefined) {
            var session = JSON.parse(result);
            console.log(session.companyid);
            return session.companyid
          } else {
            console.log("no");
            return ""
          }
        });


  if (personid != "") {
//request company data
var token =  await gettoken();

personavatar(personid, token).done(function(resp){
  var img = document.getElementById('personavatar');
   var url = window.URL || window.webkitURL;
  $('#personavatar').attr('src', url.createObjectURL(resp));

}).fail(function(resp){
  console.log(resp);

  if (resp.status == 401) {
    clear(SessionStore);
    document.location.href = '/';
  }

});

$('body').attr("page","person");

showperson(personid, token).done(function(resp){
//Plase data to fields

var comp = resp.data.person;
var fullname = comp.Name + " " + comp.MiddleName + " " + comp.Surname;
if (comp.Suffix != "") {
  fullname = fullname + ", " + comp.Suffix;
}
if (comp.Title == "dr") {
  fullname = "Dr. " + fullname;
}

$('#cnameh').text(fullname);
$('#persid').text("PersonID: " + comp.UID);
$('#bd').text(comp.BirthDate);
$('#cb').text(comp.BirthCountry);
$('#cib').text(comp.BirthCity);
$('#sex').text(comp.Sex);
$('#cit').text(comp.Citizenship);
$('#doct').text(comp.DocumentType);
$('#docn').text(comp.DocumentNumber);
$('#iss').text(comp.Issued);
$('#exp').text(comp.Expiration);
$('#tred').text(comp.Taxresidence);
$('#tid').text(comp.TaxID);
$('#occ').text(comp.Ocupation);
$('#comp').text(comp.Company);
$('#dep').text(comp.Department);
$('#created').text(comp.CreatedAt);
$('#commentc').text(comp.Comment);
$('#edited').text(comp.EditedAt);




}).fail(function(resp){failedanswer(resp)});

//Get Addresses
showpersonaddress(personid, token, 25, 0).done(function(resp) {
  if (resp.data.addresses.length != 0) {
             var adresses = [];

             var i;
for (i = 0; i < resp.data.addresses.length; i++) {
	var n = i + 1;
	var addr = resp.data.addresses[i];
  var area = "";
  if (addr.Area != "") {
    area = addr.Area + ", ";
  }
  var addressinline = addr.Street +  " " + addr.House + ", " + area +  addr.Postecode + " " + addr.City + ", " + addr.Country;


  $('#addresstbody').append('<tr name="'+addr.UID+'"  loaded="'+resp.data.addresses.length+'" count="'+resp.data.addressescount+'"> \
  <td>'+ n + '</td> \
  <td>'+addr.Description +'</td>\
  <td>'+addressinline+'</td>\
  <td>'+addr.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');

}
} else {
  $('#adrtable').hide();
  $('#addrmsg').text("You have no addresses yet");
}

}).fail(function(resp){failedanswer(resp)});

//Get Banks
showpersonbanks(personid, token, 25, 0).done(function(resp) {

  if (resp.data.banks.length != 0) {
             var banks = [];

             var i;
for (i = 0; i < resp.data.banks.length; i++) {
	var n = i + 1;
	var bank = resp.data.banks[i];

  $('#banksinfo').append('<div class="mb-2 mt-4"> \
<div> #'+n+' '+bank.Description +'</div> \
<table class="table mb-0"> \
<tbody> \
<tr> \
<th scope="row" class="border-top-0">Bank Name</th> \
<td class="border-top-0 text-right">'+bank.Name +'</td> \
</tr> \
<tr> \
<th scope="row">Currency</th> \
<td class="text-right" >'+bank.Currency +'</td> \
</tr> \
<tr> \
<th scope="row">IBAN</th> \
<td class="text-right" >'+bank.IBAN +'</td> \
</tr> \
<tr> \
<th scope="row">Account</th> \
<td class="text-right" >'+bank.Account +'</td> \
</tr> \
<tr> \
<th scope="row">BIC/ SWIFT</th> \
<td class="text-right" >'+bank.BIC +'</td> \
</tr> \
<tr> \
<th scope="row">Branch</th> \
<td class="text-right" >'+bank.Branch +'</td> \
</tr> \
<tr> \
<th scope="row">Bank Code</th> \
<td class="text-right" >'+bank.BankCode +'</td> \
</tr> \
<tr> \
<th scope="row">Comment</th> \
<td class="text-right" >'+bank.Comment +'</td> \
</tr> \
</tbody> \
</table> \
</div> \
  ');

}
} else {
  $('#bankmsg').text("You have no Banks yet");
}

}).fail(function(resp){failedanswer(resp)});

//Get Cryptos
showpersoncryptos(personid, token, 25, 0).done(function(resp) {
  if (resp.data.cryptos.length != 0) {
             var adresses = [];

             var i;
             console.log(resp.data.cryptos.length);
for (i = 0; i < resp.data.cryptos.length; i++) {
	var n = i + 1;
	var addr = resp.data.cryptos[i];


  $('#cryptotbody').append('<tr name="'+addr.UID+'"  loaded="'+resp.data.cryptos.length+'" count="'+resp.data.cryptoscount+'"> \
  <td>'+ n + '</td> \
  <td>'+addr.Description +'</td>\
  <td>'+addr.Type+'</td>\
  <td>'+addr.Account+'</td>\
  <td>'+addr.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');

}
} else {
  $('#cryptotable').hide();
  $('#cryptomsg').text("You have no Cryptocurrencies account yet");
}

}).fail(function(resp){failedanswer(resp)});
//Get Phones
showpersonphones(personid, token, 25, 0).done(function(resp) {
  if (resp.data.phones.length != 0) {
             var adresses = [];

             var i;
             console.log(resp.data.phones.length);
for (i = 0; i < resp.data.phones.length; i++) {
	var n = i + 1;
	var dat = resp.data.phones[i];
var phone = "+" + dat.PhoneCountryCode + dat.PhoneAreaCode + dat.PhoneNumber;

  $('#phonetbody').append('<tr name="'+dat.PhoneID+'"  loaded="'+resp.data.phones.length+'" count="'+resp.data.phonescount+'"> \
  <td>'+ n + '</td> \
  <td>'+dat.Description +'</td>\
  <td>'+dat.Type+'</td>\
  <td>'+phone+'</td>\
  <td>'+dat.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');

}
} else {
  $('#cryptotable').hide();
  $('#cryptomsg').text("You have no Cryptocurrencies account yet");
}

}).fail(function(resp){failedanswer(resp)});
//Get Emails
showpersonemails(personid, token, 25, 0).done(function(resp) {
  if (resp.data.emails.length != 0) {


             var i;
             console.log(resp.data.emails.length);
for (i = 0; i < resp.data.emails.length; i++) {
	var n = i + 1;
	var dat = resp.data.emails[i];


  $('#emailtbody').append('<tr name="'+dat.EmailID+'"  loaded="'+resp.data.emails.length+'" count="'+resp.data.emailscount+'"> \
  <td>'+ n + '</td> \
  <td>'+dat.Description +'</td>\
  <td>'+dat.Email+'</td>\
  <td>'+dat.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');

}
} else {
  $('#cryptotable').hide();
  $('#emailmsg').text("You have no Emails yet");
}

}).fail(function(resp){failedanswer(resp)});

//Get URL
showpersonurls(personid, token, 25, 0).done(function(resp) {
  if (resp.data.urls.length != 0) {


             var i;

for (i = 0; i < resp.data.urls.length; i++) {
	var n = i + 1;
	var dat = resp.data.urls[i];


  $('#urltbody').append('<tr name="'+dat.URLID+'"  loaded="'+resp.data.urls.length+'" count="'+resp.data.urlscount+'"> \
  <td>'+ n + '</td> \
  <td>'+dat.Description +'</td>\
  <td>'+dat.URL+'</td>\
  <td>'+dat.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');

}
} else {
  $('#cryptotable').hide();
  $('#urlmsg').text("You have no URLs yet");
}

}).fail(function(resp){failedanswer(resp)});

showpersoncustom(personid, token, 25, 0).done(function(resp) {
  if (resp.data.customs.length != 0) {


             var i;

for (i = 0; i < resp.data.customs.length; i++) {
	var n = i + 1;
	var dat = resp.data.customs[i];


  $('#customtbody').append('<tr name="'+dat.UID+'"  loaded="'+resp.data.customs.length+'" count="'+resp.data.customscount+'"> \
  <td>'+ n + '</td> \
  <td>'+dat.Description +'</td>\
  <td>'+dat.Type+'</td>\
  <td>'+dat.Data+'</td>\
  <td>'+dat.Comment+'</td>\
  <td><i class="la la-edit"></i> <i class="la la-trash"></i></td>\
  </tr>');

}
} else {
  $('#customtable').hide();
  $('#custommsg').text("You have no any data yet");
}

}).fail(function(resp){failedanswer(resp)});

//Get Files
showpersonfiles(personid, token, 25, 0).done(function(resp) {
  if (resp.data.files.length != 0) {


             var i;

for (i = 0; i < resp.data.files.length; i++) {
	var n = i + 1;
	var dat = resp.data.files[i];


  $('#filestbody').append('<tr data-name="'+dat.FileID+'"  loaded="'+resp.data.files.length+'" count="'+resp.data.filescount+'" class="personfile" style="cursor:pointer;"> \
  <td><i class="la la-file-pdf-o"></i></td> \
  <td>'+dat.Name +'</td>\
  <td>'+dat.Type+'</td>\
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
    document.location.href = '/';
  }
  } else {
    nosession()
  }
}

export async function accountsbuilder(auth) {
    if (auth == 1) {
        $('#mycompanymenu').addClass("active");
      var token =  await gettoken();
      showaccounts(token, 25, 0).done(function(resp){
        var comps = resp.data.accounts;

        $('#mycompaniestable').bootstrapTable('load', comps);


        for (var i = 0; i < comps.length; i++) {

          if (comps[i].AccountType == "Company") {
            setcompanyavatar(comps[i].AccountID);
          } else {
            setpersonavatar(comps[i].AccountID);
          }



          }

        }).fail(function(resp){failedanswer(resp)});


    } else {
        nosession()
    }

}

export async function createinvoiceloader(auth, companyid) {
    if (auth == 1 && companyid != "") {
      $('#createmenu').addClass("active");
      $('#invoiceform').attr("companyid", companyid);
      $("#counerpartytype").val("");
      var token =  await gettoken();
      getcurrencies(token).done(function(resp){

        var data = resp.data.currencies;

        for (var i = 0; i < data.length; i++) {
          var n = i + 1;
     $('#cur').append('<option value="'+ data[i].CurrencyCode+'">'+data[i].Name+'</option> ');
          }
      })
      //load counerparties
      /*
        var token =  await gettoken();
      showcompanies(token, 0, 25, 0, 0).done(function(resp){
        var comps = resp.data.companies;

        for (var i = 0; i < comps.length; i++) {
          var n = i + 1;

          $('#counerparty').append('<option value="'+comps[i].UID+'">'+comps[i].Name+'</option> ');


          }

        });
      showpersons(token, 25, 0).done(function(resp){
          var comps = resp.data.persons;

          for (var i = 0; i < comps.length; i++) {
            var n = i + 1;

            $('#counerparty').append('<option value="'+comps[i].UID+'">'+comps[i].Surname+' '+comps[i].Name+'</option> ');


            }

          });
*/
    } else {
      nosession()
    }

}

export async function importagreementloader(auth, companyid) {
    if (auth == 1 && companyid != "") {
      $('#journalmenu').addClass("active");
      $('#agreementform').attr("companyid", companyid);

      $("#counerpartytype").val("");

    } else {
        nosession()
    }

}

export async function companiesbuilder(auth) {
    if (auth == 1) {
        $('#catalogmenu').addClass("active");
      var token =  await gettoken();
      showcompanies(token, 0, 25, 0, 0).done(function(resp){
        var comps = resp.data.companies;

        $('#companiestable').bootstrapTable('load', comps);

        for (var i = 0; i < comps.length; i++) {

          setcompanyavatar(comps[i].UID);


          }

        }).fail(function(resp){failedanswer(resp)});

    } else {
        nosession()
    }

}

export async function personsbuilder(auth) {
    if (auth == 1) {
        $('#catalogmenu').addClass("active");
      var token =  await gettoken();
      showpersons(token, 25, 0).done(function(resp){

        var comps = resp.data.persons;

        for (var i = 0; i < comps.length; i++) {
          var n = i + 1;

          $('#personstbody').append('<tr data-name="'+comps[i].UID+'"  class="persontr" style="cursor:pointer;"> \
          <td>'+ n +'</td> \
          <td><img src="" class="rounded mr-75 personsavatar" alt="profile image" height="36" width="36" cid="'+comps[i].UID+'"></td> \
          <td>'+comps[i].Surname+'</td>\
          <td>'+comps[i].Name+'</td>\
          <td>'+comps[i].Citizenship+'</td>\
          <td>'+comps[i].BirthDate+'</td>\
          <td>'+comps[i].Sex+'</td>\
          <td>'+comps[i].DocumentType+'</td>\
          <td>'+comps[i].DocumentNumber+'</td>\
          <td>'+comps[i].TaxID+'</td>\
          <td>'+comps[i].CreatedAt+'</td>\
          <td>'+comps[i].EditedAt+'</td>\
          </tr>');

          setpersonavatar(comps[i].UID);


          }

        }).fail(function(resp){failedanswer(resp)});

    } else {
    nosession()
    }

}

export async function outgoinginvoiceloader(auth) {

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
  showinvoices(companyid, token, 25, 0, "").done(function(resp){

    var data = resp.data.invoices;

    $('#outinvoicestable').attr("loaded", data.length);
    $('#outinvoicestable').attr("total", resp.data.invoicecount);
    $('#findrecords').text(resp.data.invoicecount);
    $('#outinvoicestable').attr("action", "0");
    $('#outinvoicestable').attr("filter", "");
    $('#outinvoicestable').bootstrapTable('load', data);
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


      $('#invoicestbody').append('<tr   class="invoicetr" style="cursor:pointer;" data-name="'+data[i].UID+'"> \
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
} else {
    nosession()
}
}

export async function agreementsloader(auth) {

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

  showagreements(companyid, token, 25, 0, "").done(function(resp){

    var data = resp.data.agreements;

    for (var i = 0; i < data.length; i++) {
      var n = i + 1;

     var status = "<div class='badge badge-secondary'>Draft</div>";
      if (data[i].Complited != 0) {
        var status = "<div class='badge badge-success'>Complited</div>";
      }
      if (data[i].Expired != 0) {
        var status = "<div class='badge badge-danger'>Expired</div>";
      }

var active = "";
    if (data[i].IsActive != 0) {
      active = "<i class='la la-check-circle' style='color:green;'></i>";
    }


      $('#agreementstbody').append('<tr data-name="'+data[i].AgreementID+'"  class="agreementtr" style="cursor:pointer;"> \
      <td> '+n +'</td>\
      <td>'+data[i].Type+'</td>\
      <td>'+ data[i].Num +'</td> \
      <td>'+data[i].Name+'</td>\
      <td>'+data[i].SignDate+'</td>\
      <td>'+data[i].Counterparty+'</td>\
      <td>'+data[i].CustomerName+'</td>\
      <td>'+ status +'</td>\
      <td>'+ active +'</td>\
      </tr>');



      }

  }).fail(function(resp){failedanswer(resp)});
} else {
    nosession()
}
}

export async function showinvoiceloader(auth) {
  if (auth == 1) {
  $('#journalmenu').addClass("active");


  //1. Determinate companyID
  var companyid = "";
  var currentcompany = "";

  if (GetUrlParameter("id") != "") {
    var invoiceid = GetUrlParameter("id");
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
        $('#editinvoice').attr('href', '/edit_invoice?id=' + invoiceid);


  showinvoice(invoiceid, companyid, token).done(function(resp){
  var invoice = resp.data.invoicedata;
  if(invoice.Type == "invoice") {
    $('#invoicetype').text("Outgoing Invoice");
  } else {
    $('#invoicetype').text("Outgoing Proforma Invoice");
  }

  var cplink = invoice.Counterparty
  if (invoice.CounterpartyType == "person"){
    cplink = "<a href='/person_profile/?id="+invoice.CounterpartyID+"'>"+invoice.Counterparty+"</a>"
  } else {
    cplink = "<a href='/company_profile/?id="+invoice.CounterpartyID+"'>"+invoice.Counterparty+"</a>"
  }
    $('#invoiceid').text(invoice.UID);
    $('#importinvoice').attr("invoiceid", invoice.UID);
    $('#invoicenumber').text(invoice.Num);
    $('#counterparty').html(cplink);
    $('#counterpartyaddress').text(invoice.Address);
    $('#billdate').text(invoice.BillingDate);
    $('#description').text(invoice.Description);
    $('#created').text(invoice.CreatedAt);
    $('#edited').text(invoice.EditedAt);
    $('#invemail').text(invoice.Email);
    $('#netam').text(invoice.Amount +  " " + invoice.Currency.toUpperCase());
    $('#totam').text(invoice.TotalAmount+  " " + invoice.Currency.toUpperCase());
    if (invoice.Prepayment != ""){
      $('#preptr').attr("hidden", false);
      $('#prepayment').text(invoice.Prepayment+  " " + invoice.Currency.toUpperCase());
    }

    if(invoice.Complited == 1) {
      if(invoice.Sent != 1) {
        $('#markassent').attr("hidden", false);
      }
      $('#completeinvoice').attr("hidden", true);
      $('#editinvoice').attr("hidden", true);
      $('#uploadfile').attr("hidden", true);
      $( "<div class='badge badge-success mr-1'><small>Completed</small></div>" ).appendTo( "#invoicebade" );

    } else {
      $( "<div class='badge badge-secondary mr-1'><small>Draft</small></div>" ).appendTo( "#invoicebade" );
    }

    if(invoice.Sent == 1){
$( "<div class='badge badge-info mr-1'><small>Sent</small></div>" ).appendTo( "#invoicebade" );
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

export async function editinvoiceloader(auth) {
  if (auth == 1) {
  $('#journalmenu').addClass("active");


  //1. Determinate companyID
  var companyid = "";
  var currentcompany = "";

  if (GetUrlParameter("id") != "") {
    var invoiceid = GetUrlParameter("id");
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


  showinvoice(invoiceid, companyid, token).done(async function(resp){

  var invoice = resp.data.invoicedata;
  $('#invoicetype').val(invoice.Type);
  $('#bildate').val(invoice.BillingDate);
  $('#invoicenum').val(invoice.Num);
  $('#invoicenum').attr("readonly", true);
  $('#cur').val(invoice.Currency);
  $('#counerpartytype').val(invoice.CounterpartyType);
  $('#counerpartyselect').attr("hidden", false);
  $('#basisselect').attr("hidden", false);
  $('#counerpartyaddressselect').attr("hidden", false);
  $('#saveimportinvoice').attr("company", invoice.CompanyID);
  if (invoice.CounterpartyType == "company") {

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
      $('#counerparty').val(invoice.CounterpartyID);








    }).fail(function(resp){failedanswer(resp)});

    showcompanyaddress(invoice.CounterpartyID, token, 25, 0).done(function(resp) {
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
      $('#counerpartyaddress').val(invoice.AddressID);
    } else {

      $('#counerpartyaddress').append('<option value="">You have no addresses</option>');
    }

    }).fail(function(resp){failedanswer(resp)});

  }
  if (invoice.CounterpartyType == "person") {
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
          $('#counerparty').val(invoice.CounterpartyID);

        }).fail(function(resp){failedanswer(resp)});

        showpersonaddress(invoice.CounterpartyID, token, 25, 0).done(function(resp) {
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
          $('#counerpartyaddress').val(invoice.AddressID);
        } else {
          $('#counerpartyaddress').append('<option value="">You have no addresses</option>');
        }

        }).fail(function(resp){failedanswer(resp)});

  }


  if (invoice.Type == "invoice") {
    var params = new URLSearchParams({
      counterparty: invoice.CounterpartyID,
      complited: "true",
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
    $('#basis').val(invoice.BasisID);

    } else {

      $('#basis').append('<option value="">No basis documents</option>');
    }
    }).fail(function(resp){failedanswer(resp)});
  }

  if (invoice.Type == "creditnote") {
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



      $('#basis').append('<option value="'+dat.InvoiceID+'">'+ dat.Num+'</option>');

    }
      $('#basis').val(invoice.BasisID);
    } else {

      $('#basis').append('<option value="">No basis documents</option>');
    }
    }).fail(function(resp){failedanswer(resp)});
  }

  $('#description').val(invoice.Description);
  var invoicebody = invoice.InvoiceBody;


  if (invoicebody.length != 0) {
    var invbody = [];
    var vatbody = [];

             var i;
             console.log("Invoice body lenth is: ", invoicebody.length);
for (i = 0; i < invoicebody.length; i++) {

	var n = i + 1;
	var data = invoicebody[i];
  if (i > 0) {
$("#addbtn").click();
$("[name='car["+i+"][vatpercentinput]']").remove();
$("[name='car[0][vatpercentinput]']").clone().attr('name', "[car["+i+"][vatpercentinput]").val(data.VATPercent).appendTo($("[name='car["+i+"][vatpercenttd]']"));
  }
  if (i == 0){
  await  showvats(token).done(function(respus){
      var datas = respus.data.typedata;

      for (var s = 0; s < datas.length; s++) {

      $("[name='car[0][vatpercentinput]']").append('<option value="'+ datas[s].VAT+'">'+datas[s].VAT+' %</option> ');


        }
       }).fail(function(respus){failedanswer(respus)})
  }


    $("[name='car["+i+"][subscriptioninput]']").val(data.Subscription);
    $("[name='car["+i+"][priceinput]']").val(data.Price);
    $("[name='car["+i+"][quantityinput]']").val(data.Quantity);
    $("[name='car["+i+"][amountinput]']").val(data.Amount);
    $("[name='car["+i+"][vatpercentinput]']").val(data.VATPercent);
    $("[name='car["+i+"][periodfrominput]']").val(data.PeriodFrom);
    $("[name='car["+i+"][periodtoinput]']").val(data.PeriodTo);
    $("[name='car["+i+"][sollinput]']").val(data.SollName);
    $("[name='car["+i+"][sollinput]']").attr("code", data.Soll);
    $("[name='car["+i+"][habeninput]']").val(data.HabenName);
    $("[name='car["+i+"][habeninput]']").attr("code", data.HabenName);




}
}

  }).fail(function(resp){failedanswer(resp)});

  } else {
    document.location.href = '/';
  }

  } else {
      nosession()
  }
}

export async function showagreementloader(auth) {
  if (auth == 1) {
  $('#journalmenu').addClass("active");


  //1. Determinate companyID
  var agreementid = "";
  var companyid = "";


  if (GetUrlParameter("id") != "") {
    agreementid = GetUrlParameter("id");
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

showagreement(agreementid, companyid, token).done(function(resp){
  var data = resp.data.agreementdata;

$('#agrname').text(data.Name + " #" + data.Num + " " + data.SignDate);
$('#agrid').text("AgreementID: " + data.AgreementID);
$('#agrtype').text(data.Type);
$('#acustomer').text(data.CustomerName);
$('#acounterparty').text(data.Counterparty);
$('#astartdate').text(data.StartDate);
$('#aenddate').text(data.EndDate);
$('#adesc').text(data.Description);
$('#acoment').text(data.Comment);
$('#acreated').text("");
$('#acreatedby').text(data.Creator);
$('#aedited').text("");
$('#aeditedby').text(data.Editor);
$('#acompiledby').text(data.Complitor);

if (data.Expired == "1") {

  $( "<div class='badge badge-danger mr-1'><small>Expired</small></div>" ).appendTo( "#agreementbage" );
} else {

if (data.Complited == "1") {
  $('#acdcgr').attr("hidden", false);
  $('#expiregr').attr("hidden", false);
  $( "<div class='badge badge-success mr-1'><small>Completed</small></div>" ).appendTo( "#agreementbage" );

  if (data.IsActive == "1") {
    $('#acdc').text("Mark as Inactive");
    $( "<div class='badge badge-info mr-1'><small>Active</small></div>" ).appendTo( "#agreementbage" );
  } else {
    $( "<div class='badge badge-warning mr-1'><small>Inactive</small></div>" ).appendTo( "#agreementbage" );
  }

} else {
  $('#edbtn').attr("hidden", false);
  $('#compliteagr').attr("hidden", false);
  $('#addcontbtn').attr("hidden", false);
  $( "<div class='badge badge-secondary mr-1'><small>Draft</small></div>" ).appendTo( "#agreementbage" );
}


}

showagreementfiles(companyid, agreementid, token, 25, 0).done(function(resp){
  if (resp.data.files.length != 0) {


             var i;

for (i = 0; i < resp.data.files.length; i++) {
  var n = i + 1;
  var dat = resp.data.files[i];


  $('#filestbody').append('<tr data-name="'+dat.FileID+'"  loaded="'+resp.data.files.length+'" count="'+resp.data.filescount+'" class="agreementfile" style="cursor:pointer;"> \
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

if (data.Content == "") {
  $('#agrcontent').text("No content provided for this document");
} else {
$('#agrcontent').html(data.Content);
}


  }).fail(function(resp){failedanswer(resp)});

  } else {
    document.location.href = '/';
  }

  } else {
      nosession()
  }
}




export async function getversion (token) {
  info().done(function(response){
    $('#version').html(response.data.version);
});

  };

async function checkforperiods(auth) {
  if (auth == 1) {
    var token =  await gettoken();
    var req = {
       module: 'project',
       param: 'show',
       lang: getlang()
   };
   $.ajax({
     url: server,
     type: "POST",
    data: JSON.stringify(req),
     headers: {
            'Authorization': token
        },
     success: function (response) {
       if (response.success == 1) {
        console.log(response);

       var len = response.data.projects.length;

       if (len != 0) {
         //Show Periods table
         $('#myperiods').show();

         for(var i=0; i<len; i++){
           var b = i + 1;
           set(response.data.projects[i].UID, response.data.projects[i], PeriodsStore)
         $('#periodtbody').append( '<tr> \
         <th scope=\"row\"  class="trlink" name="'+ response.data.projects[i].UID +'">' + b + '</th> \
         <td  class="trlink" name="'+ response.data.projects[i].UID +'">' + response.data.projects[i].Name + '</td> \
         <td  class="trlink" name="'+ response.data.projects[i].UID +'">' + response.data.projects[i].CompanyName + '</td> \
          <td  class="trlink" name="'+ response.data.projects[i].UID +'">' + response.data.projects[i].StartDate + ' - ' +response.data.projects[i].EndDate + '</td> \
          <td  class="trlink" name="'+ response.data.projects[i].UID +'">' + response.data.projects[i].UpdatedAt + '</td> \
          <td  class="trlink" name="'+ response.data.projects[i].UID +'">' + response.data.projects[i].Status + '</td> \
          <td class="edittd" > \
          <ul class="list-inline"> \
          <li class="list-inline-item"> \
          <a class="text-color d-inline-block p-2 showperiod" id=\"' + response.data.projects[i].UID + '\"  href="#"> \
          <i class="ti-eye" ></i></a> \
          <a class="text-color d-inline-block p-2 editperiod" id=\"' + response.data.projects[i].UID + '\"  href="#"> \
          <i class="ti-pencil-alt"></i></a> \
          <a class="text-color d-inline-block p-2 delperiod" id=\"' + response.data.projects[i].UID + '\" href="#"> \
          <i class="ti-trash"></i></a> \
          </li></ul></td> \
         </tr>' );
       }

        }
       }
     },
     error: function (response) {
             console.log(response);
     }
   });
  }
  }

async function checkforcompany(auth){

    if (auth == 1) {
       var token =  await gettoken();
       var req = {
     			module: 'company',
     			param: 'show',
     			lang: getlang()
     	};
       $.ajax({
         url: server,
         type: "POST",
        data: JSON.stringify(req),
         headers: {
                'Authorization': token
            },
         success: function (response) {
           if (response.success == 1) {
           var len = response.data.companies.length;
           $('.companymain').show();
           if (len == 0) {

             $('#companydata').show();
             $( "#linktoproject" ).unwrap();
           } else {
             /* Show Companies or allow to create a project */
             $('#mycompanies').show();

             for(var i=0; i<response.data.companies.length; i++){
               var b = i + 1;
               set(response.data.companies[i].UID, response.data.companies[i], CompaniesStore)
             $('#companytbody').append( '<tr> \
             <th scope=\"row\">' + b + '</th> \
             <td>' + response.data.companies[i].Name + '</td> \
             <td>' + response.data.companies[i].TaxNumber + '</td> \
             <td class="edittd" > \
             <ul class="list-inline"> \
             <li class="list-inline-item"> \
             <a class="text-color d-inline-block p-2 showcompany" id=\"' + response.data.companies[i].UID + '\"  href="#"> \
             <i class="ti-eye" ></i></a> \
             <a class="text-color d-inline-block p-2 editcompany" id=\"' + response.data.companies[i].UID + '\"  href="#"> \
             <i class="ti-pencil-alt"></i></a> \
             <a class="text-color d-inline-block p-2 delcompany" id=\"' + response.data.companies[i].UID + '\" href="#"> \
             <i class="ti-trash"></i></a> \
             </li></ul></td></tr>' );
           }


           }
           }
         },
         error: function (response) {
                 console.log(response);
         }
       });
    }
  }

export function formpagebuilder(auth) {
  	 if (auth != 1) {
  		 $('#authnav').hide();
  		 $('#guestnav').show();
  		 $('#guestnav').css("display", "flex");
  		 $('.section').show();
  		 $('.navbar').show();
  	 } else {
       var lg = getlangpath();
       var path = lg + '/';
       document.location.href = path;
  	 }
   }

export function storeSession(token, sessionexp, uid, isadmin, email, emailconf, uname, companyid){
   	let data = {
   		sessionid: 1,
   		token: token,
   		sessionexp: sessionexp,
   		uid: uid,
   		isadmin: isadmin,
   		email: email,
   		emailconf: emailconf,
   		uname: uname,
      companyid: companyid,
   		created: new Date()
   	};
   	set(SessonKey, JSON.stringify(data), SessionStore)
   	    .then(() => console.log('Session Data Stored'))
   	    .catch(err => console.log('Session Data  failed!', err));
   }

async function logmeout() {

   var token =  await gettoken();
   logout(token).done(function(response){
     clear(SessionStore);
     document.location.href = '/';
 });


   }



export function signmein(uname, pass, lang) {
var args =
 { user: uname, pass : pass };
    signin(args, "en").done(function(resp){
   storeSession(resp.data.token, resp.session.Sesionexp, resp.session.uid, resp.session.isAdmin, resp.data.email, resp.data.email_confirmed, resp.data.username)
   var lg = getlangpath();
   var path = lg + '/';
   document.location.href = path;
});

/*
$.post(server,
JSON.stringify(req),
function (resp) {
const d = new Date( resp.timestamp * 1000 );
var date = d.toDateString() + ", " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

  if (resp.success != 1) {
  $("#signupserresp").css("color", "red");
  var errormsg = responsecode(resp.error, getlang())

  $("#signupserresp").text(date + " " + errormsg);
} else {
  $("#signupserresp").css("color", "green");
  $("#signupserresp").text("You are login successfuly");
$('.form-signin').hide();
storeSession(resp.data.token, resp.session.Sesionexp, resp.session.uid, resp.session.isAdmin, resp.data.email, resp.data.email_confirmed, resp.data.username)
var lg = getlangpath();
var path = lg + '/';
document.location.href = path;
};
}, "json");
*/
}

export function contactus(uname, email, subj, msg, lang) {
  var req = {
      module: 'support',
      param: 'sitemsg',
      args: {
        uname: uname,
        email: email,
        subject: subj,
        message: msg
      },
      lang: lang
  };
  $.post(server,
  JSON.stringify(req),
  function (resp) {

    if (resp.success != 1) {
    $("#contactserverans").css("color", "red");
    var errormsg = responsecode(resp.error, getlang())

    $("#contactserverans").text(date + " " + errormsg);
  } else {
    $("#contactserverans").css("color", "green");
    $("#contactserverans").text("We received your question and will answer you shortly");
  $('#contactform').hide();
  };
  }, "json");

}

export function confirmemailloader(){
  var data =  location.search;
    console.log("confirmemail ", data);


  if (data == "") {
    var lg = getlangpath();
    var path = lg + '/';
    document.location.href = path;
  }

  confirmemail(data).done(function(resp){
    if (resp.success != 1) {
      $("#serveranswer").css("color", "red");
      var errormsg = responsecode(resp.error, getlang())
      $("#serveranswer").text(errormsg);

    } else {

      $("#serveranswer").css("color", "green");
    $('#serveranswer').html(resp.data.response);
      clear(SessionStore);
  }
}).fail(function(resp){failedanswer(resp)});


}

export function restore(email, code, lang) {
	var req = {
			module: 'auth',
			param: 'forgot',
			args: {
				email: email,
				key: code
			},
			lang: lang
	};
	$.post(server,
  JSON.stringify(req),
  function (resp) {
  const d = new Date( resp.timestamp * 1000 );
  var date = d.toDateString() + ", " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

    if (resp.success != 1) {
    $("#serveranswer").css("color", "red");
    var errormsg = responsecode(resp.error, getlang())
    $("#serveranswer").text(date + " " + errormsg);
  } else {
		$("#serveranswer").css("color", "green");
		if (code != "") {
    $("#serveranswer").text("Thank you! Your new password was sent to your email");
  $('#forgotform').hide();
} else {
	$("#serveranswer").text("Thank you! We send one-time key to your email. Please insert it bellow and click on Restore button again");
  $('#forinputCode').removeClass('invisible');
	$('#inputCode').removeClass('invisible');
}

  };
  }, "json");


}

export function  confirmemailreq(lang) {

	var request = db.transaction(["session"]).objectStore('session').get(1);
  request.onsuccess = function(e) {
        var result = e.target.result;
      var obj = JSON.parse(JSON.stringify(result));
      var token = obj.token;

			var req = {
		      module: 'reg',
		      param: 'resesendconfemail',
		      lang: lang
		  };
			var data = JSON.stringify(req);
			console.log(data);

      $.ajax({
        url: server,
        type: "POST",
			  contentType: "application/json; charset=utf-8",
				data: data,
        headers: {
               'Authorization': token
           },
        success: function (response) {

if (response.success != 0 ) {

$('#emailconfirmationformanswer').text("");
	$('#emailconfirmationformanswerblock').attr('class', 'alert alert-success');
	$('#emailconfirmationformanswer').text("We sent a new email. Please check");
	$('#emailconfirmationformanswerblock').show();

} else {
  $('#emailconfirmationformanswer').text("");
  var errormsg = responsecode(response.error, getlang())
  $('#emailconfirmationformanswerblock').attr('class', 'alert alert-danger');
  $('#emailconfirmationformanswer').text(errormsg);
  $('#emailconfirmationformanswerblock').show();
}

        },
        error: function (response) {
              failedanswer("", response)
        }
});
};
}

export {logmeout}
