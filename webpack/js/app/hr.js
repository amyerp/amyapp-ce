$(document).on( "click", "#createstaffbtn", async function () {
event.preventDefault();
$('#createstaffcard').attr("hidden", false);
$('#stafflist').attr("hidden", true);
});

$(document).on( "click", "#closestaffbtn", async function () {
event.preventDefault();
$('#createstaffcard').attr("hidden", true);
$('#stafflist').attr("hidden", false);
});

$(document).on( "click", "#addstaffbtn", async function () {
event.preventDefault();
if ($('#cparty').val() != ""){
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
         action: "card",
         userid: $("#cparty").val(),
         status: $("#status").val(),
         position: $("#position").val(),
         department: $("#department").val(),
         basesalary: $("#basesalary").val(),
         currency: $("#currency").val(),
         country: $("#adrcountry").val(),
         city: $("#ct").val(),
         worksfrom: $("#startwork").val(),
         worksto: $("#endwork").val(),
         comment: $("#comment").val(),
       };
       addstaffinfo(args, lang, token).done(function(resp){
         $("#cparty").val();
        $("#status").val();
         $("#position").val();
         $("#department").val();
         $("#basesalary").val();
         $("#currency").val();
         $("#adrcountry").val();
         $("#ct").val();
         $("#startwork").val();
         $("#endwork").val();
         $("#comment").val();
         console.log(resp);
       }).fail(function(resp){failedanswer(resp)})
}
});

$(document).on( "click", ".stafftr", async function () {
  var staffid = $(this).attr("data-name");
  document.location.href = '/staff_card/?id=' + staffid;
});

$(document).on( "click", "#addnewrule", async function () {
		$('#account-vertical-rules').removeClass("active");
		$('#account-vertical-rules').addClass("fade");
		$('#newrule').removeAttr("hidden");
});

$('#rulecancel').click(async function (event) {
  $('#account-vertical-rules').removeClass("fade");
  $('#account-vertical-rules').addClass("active");
  $('#newrule').attr("hidden", true);
});

$(document).on( "click", "#addnewrule", async function () {
  event.preventDefault();
  if ($('#ruledep').val() != ""){
    var token =  await gettoken();
    var lang = getlang();
    var staffid = GetUrlParameter("id");
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
           action: "paymentrules",
           staffid: staffid,
           description: $("#ruledesc").val(),
           paymentfor: $("#payfor").val(),
           type: $("#paytype").val(),
           amount: $("#ruleamount").val(),
           department: $("#ruledep").val(),
           staffnumber: $("#rulenum").val(),
           comment: $("#rulecomment").val(),
         };
         addstaffinfo(args, lang, token).done(function(resp){
           $("#ruledesc").val("");
          $("#payfor").val("");
           $("#paytype").val("");
           $("#ruleamount").val("");
           $("#ruledep").val("");
           $("#rulenum").val("");
           $("#rulecomment").val("");
         }).fail(function(resp){failedanswer(resp)})
  }
});

$(document).on( "click", "#pdfpayslip", async function () {
  event.preventDefault();
  var token =  await gettoken();
  var lang = getlang();
  var staffid = GetUrlParameter("id");
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
    getpayslippdf(companyid, staffid, token).done(function(resp){
      alert(resp.data.answer);
    }).fail(function(resp){failedanswer(resp)})
});
