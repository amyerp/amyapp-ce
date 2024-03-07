export async function customersloader(auth) {
    if (auth == 1) {
        $('#catalogmenu').addClass("active");
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

          $('#custtbody').append('<tr data-name="'+comps[i].CustomerID+'"" class="custtr'+comps[i].CustomerType+'" style="cursor:pointer;"> \
          <td>'+ n +'</td> \
          <td><img src="" class="rounded mr-75 '+avclass+'" alt="profile image" height="36" width="36" cid="'+comps[i].CustomerID+'"></td> \
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

    } else {
    nosession()
    }

}

export async function fixedassetsloader(auth) {
    if (auth == 1) {
        $('#catalogmenu').addClass("active");
        var token =  await gettoken();
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
        showfixedassets(companyid, token, 25, 0).done(function(resp){
          var data = resp.data.fas;
          $('#fatable').attr("loaded", data.length);
          $('#fatable').attr("total", resp.data.fascount);
          $('#findrecords').text(resp.data.fascount);
          $('#fatable').attr("action", "0");
          $('#fatable').attr("filter", "");
          $('#fatable').bootstrapTable('load', data);
        }).fail(function(resp){failedanswer(resp)});



    } else {
    nosession()
    }

}

export async function addfixedassetsloader(auth) {
    if (auth == 1) {
        $('#catalogmenu').addClass("active");
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

export async function showfixedassetloader(auth) {
  console.log("showfixedasset");
    if (auth == 1) {
        $('#catalogmenu').addClass("active");
    if (GetUrlParameter("id") != "") {
        var token =  await gettoken();
        var faid = GetUrlParameter("id");
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
        console.log(companyid, faid, token);

showfixedasset(companyid, faid, token).done(function(resp){
  var data = resp.data.fa;
  $('#faid').text(data.FAID);
  $('#fatype').text(data.FAType);
  $('#branch').text(data.BranchID);
  $('#indate').text(data.IncomDate);
  $('#leavedate').text(data.LeaveDate);
  $('#pprice').text(data.PurchasedPrice + " " + data.Currency.toUpperCase());
  $('#cprice').text(data.CurrentPrice + " " + data.Currency.toUpperCase());
  $('#amperiod').text(data.AmortisationPeriod + " years");
  $('#comment').text(data.Comment);
  $('#desc').text(data.Description);
  $('#vin').text(data.VIN);
  $('#manu').text(data.Manufacturer);
  $('#model').text(data.CModel);
  $('#pyear').text(data.Year);
  $('#pnumber').text(data.PlateNumber);
  $('#fueltype').text(data.FuelType);
  $('#serdate').text(data.ServiceDate);
  $('#createdby').text(data.Creator);
  $('#created').text(data.Created);
  $('#edited').text(data.Edited);
  $('#editedby').text(data.Editor);
  $('#complitedby').text(data.Complitor);


    }).fail(function(resp){failedanswer(resp)});

} else {
    document.location.href = '/';
}
    } else {
    nosession()
    }

}
