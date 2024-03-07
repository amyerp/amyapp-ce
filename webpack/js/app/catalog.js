$("#custtype").on('change', async function () {
  var selectVal = $("#custtype").val();
  var token =  await gettoken();
  if (selectVal == "person") {
    showpersons(token, 25, 0).done(function(resp){
        var comps = resp.data.persons;
        var select = document.getElementById("counerparty"),
            length = select.options.length;
        while(length--){
          select.remove(length);
        }
        $('#counerparty').append('<option value="">Choose Person</option> ');
        for (var i = 0; i < comps.length; i++) {
          var n = i + 1;

          $('#counerparty').append('<option value="'+comps[i].UID+'">'+comps[i].Surname+' '+comps[i].Name+'</option> ');


          }

        }).fail(function(resp){failedanswer(resp)});
  }
  if (selectVal == "company") {
    showcompanies(token, 0, 25, 0, 0).done(function(resp){
      var comps = resp.data.companies;
      var select = document.getElementById("counerparty"),
          length = select.options.length;
      while(length--){
        select.remove(length);
      }
      $('#counerparty').append('<option value="">Choose Company</option> ');

      for (var i = 0; i < comps.length; i++) {
        var n = i + 1;

        $('#counerparty').append('<option value="'+comps[i].UID+'">'+comps[i].Name+'</option> ');
      }
    }).fail(function(resp){failedanswer(resp)});
  }
});

$("#fatypesel").on('change', async function () {
  var selectVal = $("#fatypesel").val();
  if (selectVal == "car"){
    $("#typecar").attr("hidden", false);
    $("#typecustom").attr("hidden", true);
  } else
  {
    $("#typecar").attr("hidden", true);
    $("#typecustom").attr("hidden", false);
  }
});


$(document).on( "click", "#addfatransaction", async function () {
  event.preventDefault();
  var token =  await gettoken();
  var faid = GetUrlParameter("id");
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
      fixedassetamortisation(companyid, faid, token).done(function(resp){
      }).fail(function(resp){failedanswer(resp)});
});


$(document).on( "click", "#addcust", async function () {
event.preventDefault();
$('#addcustomer').attr("hidden", false);
$('#customerscard').attr("hidden", true);
});


$(document).on( "click", "#closecustbtn", async function () {
event.preventDefault();
$('#addcustomer').attr("hidden", true);
$('#customerscard').attr("hidden", false);
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
showcustomers(companyid, token, 25, 0).done(function(resp){
  $('#custtbody').empty();

  var comps = resp.data.customers;

  for (var i = 0; i < comps.length; i++) {
    var n = i + 1;

     var avclass = "";
    if (comps[i].CustomerType == "person") {
      var avclass = "personsavatar";
    }
    if (comps[i].CustomerType == "company") {
      var avclass = "companyavatar";
    }

    $('#custtbody').append('<tr name="'+comps[i].CustomerID+'"" class="custtr'+comps[i].CustomerType+'" style="cursor:pointer;"> \
    <td>'+ n +'</td> \
    <td><img src="" class="rounded mr-75 personsavatar" alt="profile image" height="36" width="36" cid="'+comps[i].CustomerID+'"></td> \
    <td>'+comps[i].CustomerNumber+'</td>\
    <td>'+comps[i].Name+'</td>\
    </tr>');

    if (comps[i].CustomerType == "person") {
    setpersonavatar(comps[i].CustomerID);
    }
    if (comps[i].CustomerType == "company") {
    setcompanyavatar(comps[i].CustomerID);
    }




    }

  }).fail(function(resp){failedanswer(resp)});

});

$(document).on( "click", "#addcustbtn", async function () {
event.preventDefault();
if ($("#custnumber").val() != "") {
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
       companyid: companyid,
       customernumber: $("#custnumber").val(),
       customertype: $("#custtype").val(),
       customerid: $("#counerparty").val(),
     };
    addcustomer(args, lang, token).done(function(resp){
      $("#custnumber").val("");
      $("#custtype").val("");
      $("#counerparty").val("");
      console.log(resp);
    }).fail(function(resp){failedanswer(resp)})
}
});


$(document).on( "click", ".custtrperson", async function () {
  var prid = $(this).attr("data-name");
  document.location.href = '/person_profile/?id=' + prid;
});

$(document).on( "click", ".custtrcompany", async function () {
  var prid = $(this).attr("data-name");
  document.location.href = '/company_profile/?id=' + prid;
});

$(document).on( "click", ".fatr", async function () {
  var prid = $(this).attr("data-name");
  document.location.href = '/fixed_asset/?id=' + prid;
});
