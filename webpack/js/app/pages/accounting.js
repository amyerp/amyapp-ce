export async function glloader(auth) {

if (auth == 1) {
  $('#accountingmenu').addClass("active");
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

  showgl(token, companyid, 25, 0, "").done(function(resp){

    var data = resp.data.gl;

    $('#gltable').attr("loaded", data.length);
    $('#gltable').attr("total", resp.data.glcount);
    $('#findrecords').text(resp.data.glcount);
    $('#gltable').attr("action", "0");
    $('#gltable').attr("filter", "");

    $('#gltableb').bootstrapTable('load', data);

  }).fail(function(resp){failedanswer(resp)});
} else {
    nosession()
}
}

export async function objectconnectloader(auth) {

if (auth == 1) {
  $('#accountingmenu').addClass("active");

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

  showvobjectconnections(companyid, token).done(function(resp){
    if (resp.data.objectconnections.length != 0) {


               var i;

  for (i = 0; i < resp.data.objectconnections.length; i++) {
  	var n = i + 1;
  	var dt = resp.data.objectconnections[i];


    $('#objtbody').append('<tr> \
    <td>'+dt.ObjectType +'</td>\
    <td>'+dt.ObjectName+'</td>\
    <td>'+dt.TypeAccount+'</td>\
    <td>'+dt.TypeAccountName+'</td>\
    <td>'+dt.Account+'</td>\
    </tr>');


  }
  }
  }).fail(function(resp){failedanswer(resp)});
} else {
    nosession()
}
}
