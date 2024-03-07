// General module
// Use for all pages
//const SessonKey = 'sessionid';

document.addEventListener("DOMContentLoaded", function(event) {

function OTPInput() {
const inputs = document.querySelectorAll('#otp > *[id]');
for (let i = 0; i < inputs.length; i++) { inputs[i].addEventListener('keydown', function(event) { if (event.key==="Backspace" ) { inputs[i].value='' ; if (i !==0) inputs[i - 1].focus(); } else { if (i===inputs.length - 1 && inputs[i].value !=='' ) { return true; } else if (event.keyCode> 47 && event.keyCode < 58) { inputs[i].value=event.key; if (i !==inputs.length - 1) inputs[i + 1].focus(); event.preventDefault(); } else if (event.keyCode> 64 && event.keyCode < 91) { inputs[i].value=String.fromCharCode(event.keyCode); if (i !==inputs.length - 1) inputs[i + 1].focus(); event.preventDefault(); } } }); } } OTPInput(); });

export function mungeEmailAddress(s) {
  var i = s.indexOf('@');
  var startIndex = i * .2 | 0;
  var endIndex   = i * .9 | 0;
  return s.slice(0, startIndex) +
         s.slice(startIndex, endIndex).replace(/./g, '*') +
         s.slice(endIndex);
}

export function toBinary(string) {
  const codeUnits = Uint16Array.from(
    { length: string.length },
    (element, index) => string.charCodeAt(index)
  );
  const charCodes = new Uint8Array(codeUnits.buffer);

  let result = "";
  charCodes.forEach((char) => {
    result += String.fromCharCode(char);
  });
  return result;
}

export function statusFormatter(value, row, index, field) {

    var status = "<div class='badge badge-secondary'>Draft</div>";
      if (row.Complited == 1) {
        var status = "<div class='badge badge-success'>Complited</div>";
      }
      if (row.InDispute == 1) {
        var status = "<div class='badge badge-warning'>In Dispute</div>";
      }
      return status;
  }

export function currencyFormatter(value, row, index, field) {

  return value + " " + row.Currency.toUpperCase();


    }



    export function CPFormatter(value, row, index, field) {
    var counterparty = row.Counterparty;
      if (counterparty == "") {
        counterparty = row.CounterpartyID;
      }
      return counterparty
    }

export function addressFormatter(value, row, index, field) {

             var area = "";
             if (row.Area != "") {
               area = row.Area + ", ";
             }
             var addressinline = row.Street +  " " + row.House + ", " + area + row.Postecode + " " + row.City + ", " + row.Country;
               ;


  return addressinline;


    }

export function paidFormatter(value, row, index, field) {
var paid = "";
  if (row.Paid != 0) {
    paid = "<i class='la la-check-circle' style='color:green;'></i>";
  }
  return paid
}

export function sentFormatter(value, row, index, field) {
var sent = "";
  if (row.Sent != 0) {
    sent = "<i class='la la-check-circle' style='color:green;'></i>";
  }
return sent
}

export function ininvoicesAttributes(row, index) {
  return {
      'data-name': row.UID,
      'style': 'cursor:pointer;',
      'class': 'incominginvoicetr'
    }
}

export function paymentsAttributes(row, index) {
  return {
      'data-name': row.PaymentID,
      'style': 'cursor:pointer;',
      'class': 'paymenttr'
    }
}

export function transfersAttributes(row, index) {
  return {
      'data-name': row.TransferID,
      'style': 'cursor:pointer;',
      'class': 'transfertr'
    }
}

export function outinvoicesAttributes(row, index) {
  return {
      'data-name': row.UID,
      'style': 'cursor:pointer;',
      'class': 'invoicetr'
    }
}

export function faAttributes(row, index) {
  return {
      'data-name': row.UID,
      'style': 'cursor:pointer;',
      'class': 'fatr'
    }
}

export function incomesAttributes(row, index) {
  return {
      'data-name': row.IncomeID,
      'style': 'cursor:pointer;',
      'class': 'incometr'
    }
}

export function mycompaieslistAttributes(row, index) {
  return {
      'data-name': row.UID,
      'style': 'cursor:pointer;',
      'class': 'companytr'

    }
}

export function accountslistAttributes(row, index) {
  return {
      'data-name': row.AccountID,
      'style': 'cursor:pointer;',
      'class': 'accounttr'

    }
}
export function companylogoFormatter(value, row, index, field) {


  return '<img src="" class="rounded mr-75 companyesavatar" alt="profile image" height="36" width="36" cid="'+row.UID+'">'
}

export function glAttributes(row, index) {
  return {
      'data-name': row.UID,
      'style': 'cursor:pointer;',
      'class': 'gltr'

    }
}

export function flagFormatter(value, row, index, field) {
  var chbx = "";
  if (row.Flag == "1"){
    chbx = "checked";
  }
var dt = '<input type="checkbox" data-name="'+row.UID+'" class="glflag" '+ chbx +' >'
  return dt
}

export async function setcompanyavatar(cid) {
  var token =  await gettoken();
  companyavatar(cid, token).done(function(res){
     var url = window.URL || window.webkitURL;
    $('.companyesavatar[cid='+cid+']').attr('src', url.createObjectURL(res));

    }).fail(function(resp){failedanswer(resp)});
}

export async function setpersonavatar(cid) {
  var token =  await gettoken();
  personavatar(cid, token).done(function(res){
     var url = window.URL || window.webkitURL;
    $('.personsavatar[cid='+cid+']').attr('src', url.createObjectURL(res));

    }).fail(function(resp){failedanswer(resp)});
}

export function nosession(){
  var queryString = window.location.href;
  console.log("location: ", queryString);
  set("location", queryString, SessionStore)
      .then(() => console.log('Location saved'))
      .catch(err => console.log('Location  failed!', err));
  document.location.href = '/';
}

export function failedanswer(resp) {
  $('#failedloadwindow').attr("hidden", false);
  var response = resp.responseJSON
  const d = new Date( response.timestamp * 1000 );
  var date = d.toDateString() + ", " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  var errormsg = response.error;
  $('<div>' + date + ':</div>').appendTo("#failedload");
  for (var i = 0; i < errormsg.length; i++) {
  $('<div>' + errormsg[i].code + ' '+errormsg[i].message + '</div>').appendTo("#failedload");
  }
   $(window).scrollTop(0);
}

export function shortcounrty(country) {
  var t = ""
  switch (country) {
    case "Germany":
      t = "DE";
      break;
      case "Italy":
        t = "IT";
        break;
        case "Hong Kong":
          t = "HK";
          break;
    default:
      t = "";
  }
  return t
}

export function darktheme() {
  $(' .dropdown-menu').css("background-color","#959595");
  $(".main-menu, .dropdown-menu").removeClass("menu-light").addClass("menu-dark");
  $('.card, .card-header').css("background-color","#393737");
  $('body').css("background-color","#2d2d2d");
}

export function lighttheme(){
  $('.bg-info, .navbar-header,  .navbar-wrapper, .navbar-brand, .content, .main-menu-content, .menu-content, .main-menu, .navigation, .navigation-main, .dropdown-menu, .header-navbar').css("background-color","1e9ff2");
  $('.card, .card-header').css("background-color","#fff");
  $('body').css("background-color","");
}

export function openfile(file) {
  /*
const linkSource = `data:application/pdf;base64,${pdf}`;
const downloadLink = document.createElement("a");
//const fileName = "abc.pdf";
downloadLink.target = "_blank";
downloadLink.href = linkSource;
//downloadLink.download = filename;
downloadLink.click();
*/
var URL = window.URL || window.webkitURL;
var createObjectURL = URL.createObjectURL || webkitURL.createObjectURL;
var newBlob = new Blob([file])
const data = createObjectURL(newBlob);
var link = document.createElement('a');
link.target = "_blank";
link.href = data;


link.click();
setTimeout(function(){
  // For Firefox it is necessary to delay revoking the ObjectURL
  window.URL.revokeObjectURL(data);
}, 100);
}

export function alertwindow(title, body, footer) {
  $('#generalmodal').modal('dispose');
  if (title == "") {
    $('#genwinhead').html('');
  } else {
    $('#genwinheadtitle').html(title);
  };
  $('#genwinbody').html(body);
  $('#genwinfooter').html(footer);
  $('#generalmodal').modal('show');
}


export function GetUrlParameter(sParam) {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
    var param = urlParams.get(sParam);
    return param;
  /*
    var sPageURL = window.location.search.substring(1);

    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] == sParam)

        {
            return sParameterName[1];
        } else {
          return ""
        }
    }
    */
}

export function getpagepath() {
	var path = window.location.pathname;
 var pathar = [];
 pathar = path.split('/');
 var a = pathar[1]; // lang
 var b = pathar[2]; // path
 var c = "";
 if (a == "de" || a == "en" || a == "ru") {
	 if (b.length === 0) {
		 b = "/";
	 }
   var str = path.slice(1); //remove first /
   str = str.replace(a,'');
	 c = str;
 } else {
	 if (a.length === 0) {
		 a = "/";
	 }

	 c = path;
 }
 return c;
}


export function getlang() {
  var path = window.location.pathname;
 var pathar = [];
 pathar = path.split('/');
 var a = pathar[1]; // lang
 if (a.length === 0) {
   return "english"
 } else {
   switch(a) {
  case 'en':
    return "deutsche"
    break;
  default:
    return "english"
}
 }
}

export function responsecode(code, lang) {
  var r = ""
  switch (lang) {
    case "english":
    r =  engresponsecode(code)
      break;
      case "deutsche":
      r =  deresponsecode(code)
        break;
    default:
    r =engresponsecode(code)

  }
  return r

}

export function engresponsecode(code) {
  var r = ""
switch (code) {
  //Error Codes
  case "000001":  r = "Missing important data";    break;
  case "000002":  r = "Email addres is not correct" ;   break;
  case "000003":  r = "Wrong data" ;   break;
  case "000004":  r = "Please choose another email";    break;
  case "000005":  r = "Eror with DB request";    break;
  case "000006":  r = "DB version missmuched with plugin requirements";    break;
  case "000007":  r = "Registration is not allowed";    break;
  case "000008":  r = "Password not matched" ;   break;
  case "000010":  r = "Session is exist";    break;
  case "000011":  r = "You are not authorised";    break;
  case "000012":  r = "Confiramtion email was already sent. Please try later";    break;
  case "000013":  r = "User blocked";    break;
  case "000014":  r = "Please provide Company name and Type";    break;
  case "000015":  r = "Can not load document";    break;
  case "000016":  r = "Hash in DB is different";    break;
  case "000017":  r = "Can not uppdate document";    break;
  case "000018":  r = "Please provide important data";    break;
  //Success codes
    case "100002":  r = "Confirmation email was sent";    break;
    case "100001":  r = "User created";    break;
    case "100201":  r = "Confirmation email was sent";    break;
    case "100202":  r = "Password was changed";    break;
    case "200100":  r = "Company was deleted";    break;
    case "200200":  r = "Project was deleted";    break;
  default:
    r = code;
}

return r
}

export function deresponsecode(code) {
  var r = ""
switch (code) {
  //Error Codes
  case "000001":  r = "Missing important data";    break;
  case "000002":  r = "Email addres is not correct" ;   break;
  case "000003":  r = "Wrong data" ;   break;
  case "000004":  r = "Please choose another email";    break;
  case "000005":  r = "Eror with DB request";    break;
  case "000006":  r = "DB version missmuched with plugin requirements";    break;
  case "000007":  r = "Registration is not allowed";    break;
  case "000008":  r = "Password not matched" ;   break;
  case "000010":  r = "Session is exist";    break;
  case "000011":  r = "You are not authorised";    break;
  case "000012":  r = "Confiramtion email was already sent. Please try later";    break;
  case "000013":  r = "User blocked";    break;
  case "000014":  r = "Please provide Company name and Type";    break;
  case "000015":  r = "Can not load document";    break;
  case "000016":  r = "Hash in DB is different";    break;
  case "000017":  r = "Can not uppdate document";    break;
  case "000018":  r = "Please provide important data";    break;
  //Success codes
    case "100002":  r = "Confirmation email was sent";    break;
    case "100001":  r = "User created";    break;
    case "100201":  r = "Confirmation email was sent";    break;
    case "100202":  r = "Password was changed";    break;
    case "200100":  r = "Company was deleted";    break;
    case "200200":  r = "Project was deleted";    break;
  default:
    r = code;
}

return r
}

export function getlangpath(){
var path = window.location.pathname;
 var pathar = [];
 pathar = path.split('/');
 var a = pathar[1]; // lang
 var b = pathar[2]; // parh
 if (a.length === 0) {
   return ""
 } else {
   switch (a) {
     case "de":
       return "/de"
       break;
     default:
     return ""
   }
 }
}

async function gettoken() {
  // var SessionStore = new Store('erp-db', 'session')
var token = await get('sessionid', SessionStore).then( result => {

    if (result !== undefined) {
      var session = JSON.parse(result);

     return session.token;

    } else {

    return  "";

    }

  });
 return token;
}



function updatesessiontime(newsessiontime) {
  // var SessionStore = new Store('erp-db', 'session')
  get('sessionid', SessionStore).then( result => {

    if (result !== undefined) {
      var session = JSON.parse(result);

    storeSession(session.token, newsessiontime, session.uid, session.isAdmin, session.email, session.email_confirmed, session.uname, session.companyid)

    }
  });

}


export { gettoken }
