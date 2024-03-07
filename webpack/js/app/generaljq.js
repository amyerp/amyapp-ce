(function ($) {
$(document).ready(function() {
//General JQuery events

//Sign In
$('#inputEmail, #inputPassword').keypress(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
      $("#siginbtn").click();
    }
});

$("#closefalert").click(function(){
  event.preventDefault();
  $("#failedload").empty();
  $("#failedloadwindow").attr("hidden", true);
});


$("#siginbtn").click(function(){
  console.log("signin");
  $("#signupserresp").text("");
  var uname = $('#inputEmail').val();
  var pass = $('#inputPassword').val();
  var lang = getlang();
  var args =
   { user: uname, pass : pass };
signin(args, lang).done(function(resp){
  var tfa = resp.data.tfa;
  console.log("resp ", resp);
  console.log("tfa ", tfa);
  if (resp.data.hasOwnProperty('tfa')) {
    // required for 2fa
    $('#toem').text(resp.data.sendto)
    $('#otp').attr("name", uname);
    $('#tfa').removeAttr("hidden");
    $('#signinsection').attr("hidden", true);
    $('#first, #second, #third, #fourth, #fifth, #sixth').val("");

} else {

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

}).fail(function(resp){
  failedanswer(resp)
});

});

$("#valtfa").click(function(){
  var otp = $('#first').val() + $('#second').val() + $('#third').val() + $('#fourth').val() + $('#fifth').val() + $('#sixth').val();
  var uname = $('#otp').attr("name");
  var lang = getlang();
  var args =
   {tfa: otp, user : uname };
  signin(args, lang).done(function(resp){
    storeSession(resp.data.token, resp.session.Sesionexp, resp.session.uid, resp.session.isAdmin, resp.data.email, resp.data.email_confirmed, resp.data.username, resp.data.companyid)
    var lg = getlangpath();
    var path = lg + '/';
    document.location.href = path;
  }).fail(function(resp){failedanswer(resp)})
});

$('#resendotp').click(function (event) {
  var uname = $('#otp').attr("name");
  resendotp(uname).done(function(resp){
    $("#otpresp").addClass("alert alert-success");
    $("#otpresp").text("New code was sent");

  }).fail(function(resp){failedanswer(resp)})
  });

$('#menu-signin').click(function (event) {
  var path = getpagepath();
  if (path == "/") {
	event.preventDefault();
  $('#signinmodal').modal('show');
}
});

$('#signinbanner').click(function (event) {
	event.preventDefault();
  $('#signinmodal').modal('show');
});



//logout
$("#menu-logout, #menu-logoutb").click(async function(event){
  event.preventDefault();
  var token =  await gettoken();
  logout(token).done(function(response){
    clear(SessionStore);
    document.location.href = '/';
}).fail(function(resp){failedanswer(resp)});
});




$("#resconflink").click(async function(event){
  event.preventDefault();
  var token =  await gettoken();
  resendconfirmemail(token).done(function(response){
    if (resp.success != 1) {
    $("#confemailresp").css("color", "red");
    var errormsg = responsecode(resp.error, getlang())
    $("#confemailresp").text(date + " " + errormsg);
  } else {
  $('#confemailresp').text("New ewmail send")
}
}).fail(function(resp){failedanswer(resp)});
});

//Choose company
$(document).on( "click", ".mycompanychoose", async function(event) {
  event.preventDefault();
  var companyid = $(this).attr("name")
  var token = await gettoken();
  var lang = getlang();
  args = {
    companyid: companyid
  };
  switchcompany(args, lang, token).done(function(resp){
    //1. update user session info in IndexedDB
    // var SessionStore = new Store('erp-db', 'session')
    get('sessionid', SessionStore).then( result => {

      if (result !== undefined) {
        var session = JSON.parse(result);

      storeSession(session.token, session.sessionexp, session.uid, session.isadmin, session.email, session.emailconf, session.uname, resp.data.companyid)
      //2. reload page
    document.location.href = '/';
      }
    });

  }).fail(function(resp){failedanswer(resp)});

});

//Restore password
$('#restorebtn').click(function (event) {
	event.preventDefault();
	var email = $('#inputEmail').val();
	var code = $('#inputCode').val();
	var trimCode = $.trim(code);
	var trimEmail = $.trim(email);
  var lang = getlang();
  //restore(trimEmail, trimCode, lang);
  args = {
    email: trimEmail,
    key: trimCode
  };
  forgot(args, lang).done(function(resp){
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
}


}).fail(function(resp){failedanswer(resp)})
});

//Request new email
$('#reqnewemail').click(function (event) {
	var lang = getlang();
	event.preventDefault();
  confirmemailreq(lang);
});

});
})(jQuery);
