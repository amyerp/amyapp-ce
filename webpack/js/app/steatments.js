$("#upnewstaetment").click(async function(event){

event.preventDefault();
$('#steatmentbody').attr("hidden", true);
$('#uploadsteatmentbody').attr("hidden", false);

  });

$("#sttype").on('change', async function () {
  var selectVal = $("#sttype").val();
  $('#sttypeelement').empty();
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

  switch (selectVal) {

    case "bank":
    showcompanybanks(companyid, token, 25, 0).done(function(resp) {

      if (resp.data.banks.length != 0) {
                 var banks = [];

                 var i;
    for (i = 0; i < resp.data.banks.length; i++) {
    	var n = i + 1;
    	var bank = resp.data.banks[i];

      $('#sttypeelement').append('<option value="'+bank.BankID+'">'+bank.Name+' '+bank.IBAN+'</option>');

    }
    } else {

      $('#sttypeelement').append('<option value="">You have no Banks yet</option>');
    }

    }).fail(function(resp){failedanswer(resp)});

      break;
      case "crypto":
      showcompanycryptos(companyid, token, 25, 0).done(function(resp) {
        if (resp.data.cryptos.length != 0) {
                   var adresses = [];

                   var i;
                   console.log(resp.data.cryptos.length);
      for (i = 0; i < resp.data.cryptos.length; i++) {
      	var n = i + 1;
      	var addr = resp.data.cryptos[i];


  $('#sttypeelement').append('<option value="'+addr.CryptoID+'">'+addr.Type+' '+addr.Account+'</option>');
      }
      } else {

        $('#sttypeelement').text("You have no Cryptocurrencies account yet");
      }

      }).fail(function(resp){failedanswer(resp)});
        break;
        case "bg":
        showcompanypaymentsystems(companyid, token, 25, 0).done(function(resp) {

          if (resp.data.paymentsystems.length != 0) {


                     var i;

        for (i = 0; i < resp.data.paymentsystems.length; i++) {
        	var n = i + 1;
        	var addr = resp.data.paymentsystems[i];
     $('#sttypeelement').append('<option value="'+addr.UID+'">'+addr.Type+' '+addr.AccountID+'</option>');

        }
        } else {
          $('#sttypeelement').text("You have no accounts in Payment Systems yet");
        }

        }).fail(function(resp){failedanswer(resp)});
          break;
          case "broker":
          showcompanybrokers(companyid, token, 25, 0).done(function(resp) {

            if (resp.data.brokers.length != 0) {


                       var i;

          for (i = 0; i < resp.data.brokers.length; i++) {
          	var n = i + 1;
          	var addr = resp.data.brokers[i];

       $('#sttypeelement').append('<option value="'+addr.UID+'">'+addr.Broker+' '+addr.Account+'</option>');
          }
          } else {

            $('#sttypeelement').text("You have no Broker accounts yet");
          }

          }).fail(function(resp){failedanswer(resp)});
            break;
    default:

  }
});


$("#sttypeshow").on('change', async function () {
  var selectVal = $("#sttypeshow").val();
  $('#sttypeelementshow').empty();
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

  switch (selectVal) {

    case "bank":
    showcompanybanks(companyid, token, 25, 0).done(function(resp) {

      if (resp.data.banks.length != 0) {
                 var banks = [];

                 var i;
    for (i = 0; i < resp.data.banks.length; i++) {
    	var n = i + 1;
    	var bank = resp.data.banks[i];

      $('#sttypeelementshow').append('<option value="'+bank.BankID+'">'+bank.Name+' '+bank.IBAN+'</option>');

    }
    } else {

      $('#sttypeelementshow').append('<option value="">You have no Banks yet</option>');
    }

    }).fail(function(resp){failedanswer(resp)});

      break;
      case "crypto":
      showcompanycryptos(companyid, token, 25, 0).done(function(resp) {
        if (resp.data.cryptos.length != 0) {
                   var adresses = [];

                   var i;
                   console.log(resp.data.cryptos.length);
      for (i = 0; i < resp.data.cryptos.length; i++) {
      	var n = i + 1;
      	var addr = resp.data.cryptos[i];


  $('#sttypeelementshow').append('<option value="'+addr.CryptoID+'">'+addr.Type+' '+addr.Account+'</option>');
      }
      } else {

        $('#sttypeelementshow').text("You have no Cryptocurrencies account yet");
      }

      }).fail(function(resp){failedanswer(resp)});
        break;
        case "bg":
        showcompanypaymentsystems(companyid, token, 25, 0).done(function(resp) {

          if (resp.data.paymentsystems.length != 0) {


                     var i;

        for (i = 0; i < resp.data.paymentsystems.length; i++) {
        	var n = i + 1;
        	var addr = resp.data.paymentsystems[i];
     $('#sttypeelementshow').append('<option value="'+addr.UID+'">'+addr.Type+' '+addr.AccountID+'</option>');

        }
        } else {
          $('#sttypeelementshow').text("You have no accounts in Payment Systems yet");
        }

        }).fail(function(resp){failedanswer(resp)});
          break;
          case "broker":
          showcompanybrokers(companyid, token, 25, 0).done(function(resp) {

            if (resp.data.brokers.length != 0) {


                       var i;

          for (i = 0; i < resp.data.brokers.length; i++) {
          	var n = i + 1;
          	var addr = resp.data.brokers[i];



       $('#sttypeelementshow').append('<option value="'+addr.UID+'">'+addr.Broker+' '+addr.Account+'</option>');
          }
          } else {

            $('#sttypeelementshow').text("You have no Broker accounts yet");
          }

          }).fail(function(resp){failedanswer(resp)});
            break;
    default:

  }
});

$("#steatmentclose").click(async function(event){

event.preventDefault();
$('#uploadsteatmentbody').attr("hidden", true);
$('#steatmentbody').attr("hidden", false);

  });

$("#showsteatmentyears").click(async function(event){

event.preventDefault();
var type = $("#sttypeshow").val();
var typeid = $("#sttypeelementshow").val();
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
    $('#filestbody').empty();
getsteatmentfiles(companyid, type, typeid, "", token).done(function(resp) {
if (resp.data.years.length != 0) {
  for (i = 0; i < resp.data.years.length; i++) {
    	var dat = resp.data.years[i];
    $('#filestbody').append('<tr name="'+typeid+'['+dat.Year+']" typeid="'+typeid+'" type="'+type+'"  year="'+dat.Year+'"  class="steatmentyear" style="cursor:pointer;"> \
    <td width="10%" class="micon" type="close"><i class="la la-chevron-circle-right"></i></td> \
    <td class="text-left"><b>'+dat.Year +'</b></td>\
    </tr>');
  }

} else {
  $('#filestbody').append('<tr name="folderpath"> \
  <td colspan="5">There is no Steatments</td> \
  </tr>');
}


}).fail(function(resp){failedanswer(resp)})

});

$(document).on('click', '.steatmentyear', async function (event) {

  var type = $(this).attr("type");
  if ($(this).children('.micon').attr("type") == "close"){
  $(this).children('.micon').html("<i class='la la-chevron-circle-down'></i>");
  $(this).children('.micon').attr("type", "open");
  var typeid = $(this).attr("typeid");
  var year =  "/" + $(this).attr("year");
  var yyyy = $(this).attr("year");
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

      getsteatmentfiles(companyid, type, typeid, year, token).done(function(resp) {
        console.log("steatment lenth: ", resp.data.month.length);
        for (i = 0; i < resp.data.month.length; i++) {

            var dat = resp.data.month[i];
            var mnt = dat.Month
            switch (dat.Month) {
              case "01": mnt = "01. January"; break;
              case "02": mnt = "02. February"; break;
              case "03": mnt = "03. March"; break;
              case "04": mnt = "04. April"; break;
              case "05": mnt = "05. May"; break;
              case "06": mnt = "06. June"; break;
              case "07": mnt = "07. July"; break;
              case "08": mnt = "08. August"; break;
              case "09": mnt = "09. September"; break;
              case "10": mnt = "10. October"; break;
              case "11": mnt = "11. November"; break;
              case "12": mnt = "12. December"; break;
              default:
                mnt = dat.Month
            }
          console.log("steatment append");
          if (i == 0) {
              console.log('[name="'+typeid+'['+yyyy+']"]');
            $('[name="'+typeid+'['+yyyy+']"]').after('<tr yearb="'+yyyy+'['+dat.Month+']" year="'+yyyy+'"  month="'+dat.Month+'" typeid="'+typeid+'" type="'+type+'" name="'+typeid+'['+yyyy+'][0]" st="close"  class="steatmentmonth inner" style="cursor:pointer;"> \
            <td width="10%" ></td> \
            <td class="text-left"><b>'+mnt +'</b></td>\
            </tr>');
          } else {
            var n = i - 1;
            $('[name="'+typeid+'['+yyyy+']['+n+']"]').after('<tr yearb="'+yyyy+'['+dat.Month+']" year="'+yyyy+'"  month="'+dat.Month+'" typeid="'+typeid+'" type="'+type+'" name="'+typeid+'['+yyyy+']['+i+']" st="close"  class="steatmentmonth inner" style="cursor:pointer;"> \
            <td width="10%" ></td> \
            <td class="text-left"><b>'+mnt +'</b></td>\
            </tr>');
          }

        }
      }).fail(function(resp){failedanswer(resp)});
} else {
//  $(this).children('.micon').html("<i class='la la-chevron-circle-right'></i>");
//  $(this).children('.micon').attr("type", "close");
}
});

$(document).on('click', '.steatmentmonth', async function (event) {
  var type = $(this).attr("type");
  var typeid = $(this).attr("typeid");
    if ($(this).attr("st") == "close"){
  $(this).attr("st", "open");
  var path =  "/" + $(this).attr("year") + '/' + $(this).attr("month");
  var yyyy = $(this).attr("year");
  var mm = $(this).attr("month");
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
      getsteatmentfiles(companyid, type, typeid, path, token).done(function(resp) {

        for (i = 0; i < resp.data.files.length; i++) {
            var dat = resp.data.files[i];
          $('#filestbody').children("[yearb='"+yyyy+"["+mm+"]']").after('<tr   fileid="'+dat.FileID+'"  class="steatmentfile inner" style="cursor:pointer;"> \
          <td width="10%" ></td> \
          <td class="text-left">'+dat.FileName +'</td>\
          </tr>');
        }

      }).fail(function(resp){failedanswer(resp)});
}
});

$(document).on('click', '.steatmentfile', async function (event) {
  var fileid = $(this).attr("fileid");
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
    getsteatment(companyid, fileid, token).done(function(resp) {
      openfile(resp)
    }).fail(function(resp){failedanswer(resp)});
});
