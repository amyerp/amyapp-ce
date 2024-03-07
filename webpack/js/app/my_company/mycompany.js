(function ($) {
$(document).ready(function() {

	$(document).on('click', '#adrcountry', async function (event) {
		var token =  await gettoken();
		var countryid = $(this).val();
		getcities(countryid, token).done(function(resp){
	    var data = resp.data.cities;
	$('#ct').empty();
	$('#ct').append('<option value="">Choose City</option> ');

	    for (var i = 0; i < data.length; i++) {

  $('#ct').append('<option value="'+ data[i].UID+'">'+data[i].City+'</option> ');

	      }
			}).fail(function(resp){failedanswer(resp)});
	});
	$(document).on('click', '#adrcountrytxt', async function (event) {
		var token =  await gettoken();
		var countryid = $(this).val();
		getcities(countryid, token).done(function(resp){
	    var data = resp.data.cities;
	$('#ct').empty();
	$('#ct').append('<option value="">Select City</option> ');

	    for (var i = 0; i < data.length; i++) {

  $('#ct').append('<option value="'+ data[i].UID+'">'+data[i].City+'</option> ');

	      }
	     }).fail(function(resp){failedanswer(resp)});
	});
	$(document).on('click', '#cb', async function (event) {
		var token =  await gettoken();
		var countryid = $(this).val();
		getcities(countryid, token).done(function(resp){
	    var data = resp.data.cities;
	$('#cib').empty();
	$('#cib').append('<option value="">Select City</option> ');

	    for (var i = 0; i < data.length; i++) {

  $('#cib').append('<option value="'+ data[i].UID+'">'+data[i].City+'</option> ');

	      }
	     }).fail(function(resp){failedanswer(resp)});
	});

	$(document).on('click', '#mcloc', async function (event) {
			var token =  await gettoken();
		var countryid = $(this).val();
		if (countryid != "") {
			getcompanytypes(countryid, token).done(function(resp){
		    var data = resp.data.companytypes;
				switch (countryid) {
					case "hzqqo0kh":
					$('#mcloc').attr("name", "de");
					$('.myhidden').attr("hidden", true);
					$('#germanycomp').attr("hidden", false);
					$('#germanydet').attr("hidden", false);
					$('#ctypeger').empty();
					$('#ctypeger').append('<option value="">Select Type</option>');
							for (var i = 0; i < data.length; i++) {
			$('#ctypeger').append('<option value="'+ data[i].UID+'">'+data[i].CompanyType+'</option> ');

								}
					break;
					case "kjb9kddj":
					$('#mcloc').attr("name", "hk");
					$('.myhidden').attr("hidden", true);
					$('#hongkongcomp').attr("hidden", false);
					$('#hongkongdet').attr("hidden", false);
					$('#ctypehk').empty();
					$('#ctypehk').append('<option value="">Select Type</option>');
							for (var i = 0; i < data.length; i++) {
			$('#ctypehk').append('<option value="'+ data[i].UID+'">'+data[i].CompanyType+'</option> ');

								}
					break;
					case "sltv7opn":
						$('#mcloc').attr("name", "it");
					$('.myhidden').attr("hidden", true);
					$('#italycomp').attr("hidden", false);
					$('#italydet').attr("hidden", false);
					$('#ctypeit').empty();
					$('#ctypeit').append('<option value="">Select Type</option>');
							for (var i = 0; i < data.length; i++) {
			$('#ctypeit').append('<option value="'+ data[i].UID+'">'+data[i].CompanyType+'</option> ');

								}
					break;
					default:
					$('.myhidden').attr("hidden", true);

				}

		     }).fail(function(resp){failedanswer(resp)});

		}
	});


	$(document).on('click', '#regc', async function (event) {
			var token =  await gettoken();
		var countryid = $(this).val();
		if (countryid != "") {
			getcompanytypes(countryid, token).done(function(resp){
		    var data = resp.data.companytypes;
		$('#ctype').empty();
		$('#ctype').append('<option value="">Select Type</option>');
		    for (var i = 0; i < data.length; i++) {
$('#ctype').append('<option value="'+ data[i].UID+'">'+data[i].CompanyType+'</option> ');

		      }
		     }).fail(function(resp){failedanswer(resp)});
		}
	});




	$('#addnewadress').click(async function (event) {
		$('#account-vertical-address').removeClass("active");
		$('#account-vertical-address').addClass("fade");
		$('#newaddress').removeAttr("hidden");

	});


	$('#addresscancel').click(async function (event) {
		$('#account-vertical-address').removeClass("fade");
		$('#account-vertical-address').addClass("active");
		$('#newaddress').attr("hidden", true);

	});

	$('#addnewbank').click(async function (event) {
		$('#account-vertical-bank').removeClass("active");
		$('#account-vertical-bank').addClass("fade");
		$('#newbank').removeAttr("hidden");

	});

	$('#bankcancel').click(async function (event) {
		$('#account-vertical-bank').removeClass("fade");
		$('#account-vertical-bank').addClass("active");
		$('#newbank').attr("hidden", true);

	});

	$('#addnewcrypto').click(async function (event) {
		$('#account-vertical-crypto').removeClass("active");
		$('#account-vertical-crypto').addClass("fade");
		$('#newcrypto').removeAttr("hidden");
	});

	$('#cryptocancel').click(async function (event) {
		$('#account-vertical-crypto').removeClass("fade");
		$('#account-vertical-crypto').addClass("active");
		$('#newcrypto').attr("hidden", true);
	});

	$('#addpaymentsys').click(async function (event) {
		$('#account-vertical-payment').removeClass("active");
		$('#account-vertical-payment').addClass("fade");
		$('#newpayment').removeAttr("hidden");
	});

	$('#paymantsyscancel').click(async function (event) {
		$('#account-vertical-payment').removeClass("fade");
		$('#account-vertical-payment').addClass("active");
		$('#newpayment').attr("hidden", true);
	});

	$('#addnewbroker').click(async function (event) {
		$('#account-vertical-broker').removeClass("active");
		$('#account-vertical-broker').addClass("fade");
		$('#newbroker').removeAttr("hidden");
	});

	$('#brokercancel').click(async function (event) {
		$('#account-vertical-broker').removeClass("fade");
		$('#account-vertical-broker').addClass("active");
		$('#newbroker').attr("hidden", true);
	});

	$('#addnewshareholder').click(async function (event) {
		$('#account-vertical-shareholders').removeClass("active");
		$('#account-vertical-shareholders').addClass("fade");
		$('#newshareholder').removeAttr("hidden");
	});

	$('#shareholdcancel').click(async function (event) {
		$('#account-vertical-shareholders').removeClass("fade");
		$('#account-vertical-shareholders').addClass("active");
		$('#newshareholder').attr("hidden", true);
	});

	$('#addnewdirector').click(async function (event) {
		$('#account-vertical-directors').removeClass("active");
		$('#account-vertical-directors').addClass("fade");
		$('#newdirector').removeAttr("hidden");
	});

	$('#shareholdcancel').click(async function (event) {
		$('#account-vertical-directors').removeClass("fade");
		$('#account-vertical-directors').addClass("active");
		$('#newdirector').attr("hidden", true);
	});


	$('#addnewphone').click(async function (event) {
		$('#account-vertical-phone').removeClass("active");
		$('#account-vertical-phone').addClass("fade");
		$('#newphone').removeAttr("hidden");
	});

	$('#phonecancel').click(async function (event) {
		$('#account-vertical-phone').removeClass("fade");
		$('#account-vertical-phone').addClass("active");
		$('#newphone').attr("hidden", true);
	});

	$('#addnewemail').click(async function (event) {
		$('#account-vertical-email').removeClass("active");
		$('#account-vertical-email').addClass("fade");
		$('#newemail').removeAttr("hidden");
	});

	$('#emailcancel').click(async function (event) {
		$('#account-vertical-email').removeClass("fade");
		$('#account-vertical-email').addClass("active");
		$('#newemail').attr("hidden", true);
	});

	$('#addnewurl').click(async function (event) {
		$('#account-vertical-url').removeClass("active");
		$('#account-vertical-url').addClass("fade");
		$('#newurl').removeAttr("hidden");
	});

	$('#urlcancel').click(async function (event) {
		$('#account-vertical-url').removeClass("fade");
		$('#account-vertical-url').addClass("active");
		$('#newurl').attr("hidden", true);
	});

	$('#addnewcustom').click(async function (event) {
		$('#account-vertical-custom').removeClass("active");
		$('#account-vertical-custom').addClass("fade");
		$('#newcustom').removeAttr("hidden");
	});

	$('#customcancel').click(async function (event) {
		$('#account-vertical-custom').removeClass("fade");
		$('#account-vertical-custom').addClass("active");
		$('#newcustom').attr("hidden", true);
	});

	$('#editinvoiceset').click(async function (event) {
		$('#account-vertical-settings').removeClass("active");
		$('#account-vertical-settings').addClass("fade");
		$('#newinvoicesettings').removeAttr("hidden");
	});

	$('#invsetcancel').click(async function (event) {
		$('#account-vertical-settings').removeClass("fade");
		$('#account-vertical-settings').addClass("active");
		$('#newinvoicesettings').attr("hidden", true);
	});

	$('#editemailinvoiceset').click(async function (event) {
		$('#account-vertical-settings').removeClass("active");
		$('#account-vertical-settings').addClass("fade");
		$('#newemailinvoicesettings').removeAttr("hidden");
	});

	$('#editemailinvsetcancel').click(async function (event) {
		$('#account-vertical-settings').removeClass("fade");
		$('#account-vertical-settings').addClass("active");
		$('#newemailinvoicesettings').attr("hidden", true);
	});

	$('#addnewfile').click(async function (event) {
		$('#account-vertical-files').removeClass("active");
		$('#account-vertical-files').addClass("fade");
		$('#newfile').removeAttr("hidden");
		var path = $(this).attr("path");
	$('#mycompanyfiles').attr("path", path);
	$('#droptopath').text("Upload to: " + path);
		//console.log(path);
	});

	$('#filescancel').click(async function (event) {
		$('#account-vertical-files').removeClass("fade");
		$('#account-vertical-files').addClass("active");
		$('#newfile').attr("hidden", true);
	});

	$('#sladd').click(async function (event) {
		$('#account-vertical-logo').removeClass("active");
		$('#account-vertical-logo').addClass("fade");
		$('#newshortlogo').removeAttr("hidden");
	});

	$('#shortlogoskip').click(async function (event) {
		$('#account-vertical-logo').removeClass("fade");
		$('#account-vertical-logo').addClass("active");
		$('#newshortlogo').attr("hidden", true);
	});

	$('#ladd').click(async function (event) {
		$('#account-vertical-logo').removeClass("active");
		$('#account-vertical-logo').addClass("fade");
		$('#newbiglogo').removeAttr("hidden");
	});

	$('#biglogoskip').click(async function (event) {
		$('#account-vertical-logo').removeClass("fade");
		$('#account-vertical-logo').addClass("active");
		$('#newbiglogo').attr("hidden", true);
	});

	$('#companyavatar, #personavatar').click(function() {
		event.preventDefault();
		$('#account-vertical-general').removeClass("active");
		$('#account-vertical-general').addClass("fade");
		$('#newavatarcard').attr("hidden", false);
	});

	$('#avatarskip').click(async function (event) {
		event.preventDefault();
		$('#account-vertical-general').removeClass("fade");
		$('#account-vertical-general').addClass("active");
		$('#newavatarcard').attr("hidden", true);
	});

	$('#inladd').click(function() {
		event.preventDefault();
		$('#account-vertical-logo').removeClass("active");
		$('#account-vertical-logo').addClass("fade");
		$('#newinvoicelogo').attr("hidden", false);
	});

	$('#invoicelogoskip').click(async function (event) {
		event.preventDefault();
		$('#account-vertical-logo').removeClass("fade");
		$('#account-vertical-logo').addClass("active");
		$('#newinvoicelogo').attr("hidden", true);
	});


$(document).on( "click hover mouseover", ".counerpartydir", async function () {
	var token =  await gettoken();
	var curname = $(this).attr("name");
	if ($("[name='"+curname+"']").val() == "") {
			showpersons(token, 25, 0).done(function(resp){
				  var comps = resp.data.persons;
				$("[name='"+curname+"']").empty();
					$("[name='"+curname+"']").append('<option value="">Choose Person</option> ');
					$("[name='"+curname+"']").attr("hidden", false);
					for (var i = 0; i < comps.length; i++) {
						var n = i + 1;

						$("[name='"+curname+"']").append('<option value="'+comps[i].UID+'">'+comps[i].Surname+' '+comps[i].Name+'</option> ');


						}

					}).fail(function(resp){failedanswer(resp)});
				}
});


$('#directorsave').click(async function (event) {
	event.preventDefault();

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
  var companyid = urlParams.get('id');
	//if id = "" - get id from Store
	console.log(companyid);
  var token = await gettoken();

   var lang = getlang();
	 var lindex = $(".cryptorepeater").attr("index");
	 var index = parseInt(lindex) - 1;
	 var dataarray = [];
for (var i = 0; i < lindex; i++) {

	 var dataarr = {
		 directortype: "person",
		 position: $("[name='car["+i+"][position]']").val(),
		 counterparty: $("[name='car["+i+"][counterparty]']").val()
	 }
	 dataarray.push(dataarr);
 }



	 var args =  {
		 stage:"director",
		 director: dataarray,
		 companyid: companyid,
	 }
		addcompany(args, lang, token).done(function(resp){

			var companyid = resp.data.companyid;
		 $('<a href="/company_profile?id='+companyid+'" ></a>')[0].click();
		}).fail(function(resp){failedanswer(resp)})

});



//Seve invoice settings data
	$('#invsave').click(async function (event) {
		event.preventDefault();

		var queryString = window.location.search;
		var urlParams = new URLSearchParams(queryString);
		  var companyid = urlParams.get('id');
			//if id = "" - get id from Store

		  var token = await gettoken();
			var lang = getlang();

			var args = {
				companyid: companyid,
				dataid: $('#insettable').attr('dataid'),
				address: $('#insetnewaddr').val(),
				bank: $('#insetnewbank').val(),
				phone: $('#insetnewphone').val(),
				fax: $('#insetnewfax').val(),
				mobile: $('#insetnewmobile').val(),
				email: $('#insetnewemail').val(),
				url: $('#insetnewurl').val()
			}

			addinvoicesettings(args, lang, token).done(function(resp){
				$('<a href="/company_profile?id='+companyid+'" ></a>')[0].click();
			}).fail(function(resp){failedanswer(resp)});

});

//Seve email invoice settings data
	$('#emailinvsave').click(async function (event) {
		event.preventDefault();

		var queryString = window.location.search;
		var urlParams = new URLSearchParams(queryString);
		  var companyid = urlParams.get('id');
			//if id = "" - get id from Store

		  var token = await gettoken();
			var lang = getlang();

			var args = {
				companyid: companyid,
				dataid: $('#emailinsettable').attr('dataid'),
				host: $('#emailhost').val(),
				port: $('#emailport').val(),
				user: $('#emailuser').val(),
				pass: $('#emailpass').val(),
				address: $('#emailemail').val(),
				reply: $('#emailreply').val(),
				title: $('#emailtitle').val()
			}

			addinvoiceemailsettings(args, lang, token).done(function(resp){
				$('<a href="/company_profile?id='+companyid+'" ></a>')[0].click();
			}).fail(function(resp){failedanswer(resp)});

});

//Create address
$('#addressavebtn').click(async function (event) {
	event.preventDefault();

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
  var companyid = urlParams.get('id');
	//if id = "" - get id from Store
	console.log(companyid);
  var token = await gettoken();

   var lang = getlang();
	 var lindex = $(".addressrepeater").attr("index");
	 var index = parseInt(lindex) - 1;
	 var addrarray = [];
for (var i = 0; i < lindex; i++) {

	 var addrarr = {
		 country: $("[name='car["+i+"][adrcountry]']").val(),
		 city: $("[name='car["+i+"][ct]']").val(),
		 street: $("[name='car["+i+"][st]']").val(),
		 house: $("[name='car["+i+"][hs]']").val(),
		 office: $("[name='car["+i+"][of]']").val(),
		 postecode: $("[name='car["+i+"][pcode]']").val(),
		 floor: $("[name='car["+i+"][fl]']").val(),
		 building: $("[name='car["+i+"][blg]']").val(),
		 area: $("[name='car["+i+"][area]']").val(),
		 comment: $("[name='car["+i+"][commentadr]']").val(),
		 description: $("[name='car["+i+"][descript]']").val()
	 }
	 addrarray.push(addrarr);
 }

if ($('body').attr("page") == "person") {

	var args =  {
		stage:"address",
		address: addrarray,
		personid: companyid,
	}
	 addperson(args, lang, token).done(function(resp){

		 var companyid = resp.data.personid;
		$('<a href="/person_profile?id='+companyid+'" ></a>')[0].click();
	 }).fail(function(resp){failedanswer(resp)})

} else {
	 var args =  {
		 stage:"address",
		 address: addrarray,
		 companyid: companyid,
	 }
		addcompany(args, lang, token).done(function(resp){

			var companyid = resp.data.companyid;
		 $('<a href="/company_profile?id='+companyid+'" ></a>')[0].click();
		}).fail(function(resp){failedanswer(resp)})
}
});

//Create Bnak
$('#banksave').click(async function (event) {
	event.preventDefault();

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
  var companyid = urlParams.get('id');
	//if id = "" - get id from Store
	console.log(companyid);
  var token = await gettoken();

   var lang = getlang();
	 var lindex = $(".bankrepeater").attr("index");
	 var index = parseInt(lindex) - 1;
	 var dataarray = [];
for (var i = 0; i < lindex; i++) {

	 var dataarr = {
		 bank: $("[name='car["+i+"][bnxxx]']").val(),
		 iban: $("[name='car["+i+"][iban]']").val(),
		 account: $("[name='car["+i+"][acn]']").val(),
		 bic: $("[name='car["+i+"][bic]']").val(),
		 bankcode: $("[name='car["+i+"][bankcode]']").val(),
		 branch: $("[name='car["+i+"][branch]']").val(),
		 currency: $("[name='car["+i+"][cursel]']").val(),
		 comment: $("[name='car["+i+"][bankcomment]']").val(),
		 description: $("[name='car["+i+"][bankdesc]']").val()
	 }
	 dataarray.push(dataarr);
 }

	 if ($('body').attr("page") == "person") {

		 var args =  {
			 stage:"bank",
			 bank: dataarray,
			 personid: companyid,
		 }
			addperson(args, lang, token).done(function(resp){

				var companyid = resp.data.personid;
			 $('<a href="/person_profile?id='+companyid+'" ></a>')[0].click();
			}).fail(function(resp){failedanswer(resp)})


	 } else {

	 var args =  {
		 stage:"bank",
		 bank: dataarray,
		 companyid: companyid,
	 }
		addcompany(args, lang, token).done(function(resp){

			var companyid = resp.data.companyid;
		 $('<a href="/company_profile?id='+companyid+'" ></a>')[0].click();
		}).fail(function(resp){failedanswer(resp)})
	}

});

//Create Crypto
$('#cryptosave').click(async function (event) {
	event.preventDefault();

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
  var companyid = urlParams.get('id');
	//if id = "" - get id from Store
	console.log(companyid);
  var token = await gettoken();

   var lang = getlang();
	 var lindex = $(".cryptorepeater").attr("index");
	 var index = parseInt(lindex) - 1;
	 var dataarray = [];
for (var i = 0; i < lindex; i++) {

	 var dataarr = {
		 type: $("[name='car["+i+"][ccurname]']").val(),
		 account: $("[name='car["+i+"][accnumber]']").val(),
		 comment: $("[name='car["+i+"][cryptocomment]']").val(),
		 description: $("[name='car["+i+"][cryptodesc]']").val()
	 }
	 dataarray.push(dataarr);
 }


if ($('body').attr("page") == "person") {

	var args =  {
		stage:"crypto",
		crypto: dataarray,
		personid: companyid,
	}
	 addperson(args, lang, token).done(function(resp){

		 var companyid = resp.data.personid;
		$('<a href="/person_profile?id='+companyid+'" ></a>')[0].click();
	 }).fail(function(resp){failedanswer(resp)})

} else {
	 var args =  {
		 stage:"crypto",
		 crypto: dataarray,
		 companyid: companyid,
	 }
		addcompany(args, lang, token).done(function(resp){

			var companyid = resp.data.companyid;
		 $('<a href="/company_profile?id='+companyid+'" ></a>')[0].click();
		}).fail(function(resp){failedanswer(resp)})
}
});


$('#sendtestemail').click(async function (event) {
		event.preventDefault();
		var token = await gettoken();
		var queryString = window.location.search;
		var urlParams = new URLSearchParams(queryString);
		  var companyid = urlParams.get('id');
		sendtestinvoiceemail(companyid, token).done(function(resp){}).fail(function(resp){failedanswer(resp)});
	});

//Create Crypto
$('#paymantsave').click(async function (event) {
	event.preventDefault();

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
  var companyid = urlParams.get('id');
	//if id = "" - get id from Store
	console.log(companyid);
  var token = await gettoken();

   var lang = getlang();
	 var lindex = $(".cryptorepeater").attr("index");
	 var index = parseInt(lindex) - 1;
	 var dataarray = [];
for (var i = 0; i < lindex; i++) {

	 var dataarr = {
		 type: $("[name='car["+i+"][paysys]']").val(),
		 link: $("[name='car["+i+"][link]']").val(),
		 accountid: $("[name='car["+i+"][accid]']").val(),
		 currency: $("[name='car["+i+"][ccur]']").val(),
		 comment: $("[name='car["+i+"][paycomment]']").val(),
		 description: $("[name='car["+i+"][paydesc]']").val()
	 }
	 dataarray.push(dataarr);
 }


	 var args =  {
		 stage:"payment_system",
		 paymentsystem: dataarray,
		 companyid: companyid,
	 }
		addcompany(args, lang, token).done(function(resp){

			var companyid = resp.data.companyid;
		 $('<a href="/company_profile?id='+companyid+'" ></a>')[0].click();
		}).fail(function(resp){failedanswer(resp)})

});

//Create Crypto
$('#brokersave').click(async function (event) {
	event.preventDefault();

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
  var companyid = urlParams.get('id');
	//if id = "" - get id from Store
	console.log(companyid);
  var token = await gettoken();

   var lang = getlang();
	 var lindex = $(".cryptorepeater").attr("index");
	 var index = parseInt(lindex) - 1;
	 var dataarray = [];
for (var i = 0; i < lindex; i++) {

	 var dataarr = {
		 type: $("[name='car["+i+"][paysys]']").val(),
		 broker: $("[name='car["+i+"][brokernmae]']").val(),
		 account: $("[name='car["+i+"][braccnumber]']").val(),
		 comment: $("[name='car["+i+"][brokercomment]']").val(),
		 description: $("[name='car["+i+"][brokerdesc]']").val()
	 }
	 dataarray.push(dataarr);
 }

	 var args =  {
		 stage:"broker",
		 broker: dataarray,
		 companyid: companyid,
	 }
		addcompany(args, lang, token).done(function(resp){

			var companyid = resp.data.companyid;
		 $('<a href="/company_profile?id='+companyid+'" ></a>')[0].click();
		}).fail(function(resp){failedanswer(resp)})

});

//Create Crypto
$('#shareholdsave').click(async function (event) {
	event.preventDefault();

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
  var companyid = urlParams.get('id');
	//if id = "" - get id from Store
	console.log(companyid);
  var token = await gettoken();

   var lang = getlang();
	 var lindex = $(".cryptorepeater").attr("index");
	 var index = parseInt(lindex) - 1;
	 var dataarray = [];
for (var i = 0; i < lindex; i++) {

	 var dataarr = {
		 type: $("[name='car["+i+"][ctype]']").val(),
		 sid: $("[name='car["+i+"][chareholder]']").val(),
		 shares: $("[name='car["+i+"][shares]']").val(),
		 comment: $("[name='car["+i+"][sharecomment]']").val(),
		 sharesamount: $("[name='car["+i+"][shareamount]']").val()
	 }
	 dataarray.push(dataarr);
 }

	 var args =  {
		 stage:"shareholders",
		 shareholder: dataarray,
		 companyid: companyid,
	 }
		addcompany(args, lang, token).done(function(resp){

			var companyid = resp.data.companyid;
		 $('<a href="/company_profile?id='+companyid+'" ></a>')[0].click();
		}).fail(function(resp){failedanswer(resp)})

});

//Create Phone
$('#phonesave').click(async function (event) {
	event.preventDefault();

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
  var companyid = urlParams.get('id');
	//if id = "" - get id from Store
	console.log(companyid);
  var token = await gettoken();

   var lang = getlang();
	 var lindex = $(".phonerepeater").attr("index");
	 var index = parseInt(lindex) - 1;
	 var dataarray = [];
for (var i = 0; i < lindex; i++) {
console.log("index: ", i);
	 var dataarr = {
		 type: $("[name='car["+i+"][phonetype]']").val(),
		 countrycode: $("[name='car["+i+"][phonecc]']").val(),
		 areacode: $("[name='car["+i+"][phonearea]']").val(),
		 phonenumber: $("[name='car["+i+"][phonenumber]']").val(),
		 comment: $("[name='car["+i+"][phonecomment]']").val(),
		 description: $("[name='car["+i+"][phonedesc]']").val()
	 }
	 dataarray.push(dataarr);
 }



if ($('body').attr("page") == "person") {

	var args =  {
		stage:"phone",
		phone: dataarray,
		personid: companyid,
	}
	 addperson(args, lang, token).done(function(resp){

		 var companyid = resp.data.personid;
	 $('<a href="/person_profile?id='+companyid+'" ></a>')[0].click();
	 }).fail(function(resp){failedanswer(resp)})

}else {
	 var args =  {
		 stage:"phone",
		 phone: dataarray,
		 companyid: companyid,
	 }
		addcompany(args, lang, token).done(function(resp){

			var companyid = resp.data.companyid;
		$('<a href="/company_profile?id='+companyid+'" ></a>')[0].click();
		}).fail(function(resp){failedanswer(resp)})
}
});

//Create Email
$('#emailsave').click(async function (event) {
	event.preventDefault();

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
  var companyid = urlParams.get('id');
	//if id = "" - get id from Store
	console.log(companyid);
  var token = await gettoken();

   var lang = getlang();
	 var lindex = $(".emailrepeater").attr("index");
	 var index = parseInt(lindex) - 1;
	 var dataarray = [];
for (var i = 0; i < lindex; i++) {
console.log("index: ", i);
	 var dataarr = {
		 email: $("[name='car["+i+"][emailinp]']").val(),
		 comment: $("[name='car["+i+"][emailcomment]']").val(),
		 description: $("[name='car["+i+"][emaildesc]']").val()
	 }
	 dataarray.push(dataarr);
 }


if ($('body').attr("page") == "person") {

	var args =  {
		stage:"email",
		email: dataarray,
		personid: companyid,
	}
	 addperson(args, lang, token).done(function(resp){

		 var companyid = resp.data.personid;
		$('<a href="/person_profile?id='+companyid+'" ></a>')[0].click();
	 }).fail(function(resp){failedanswer(resp)})

} else {
	 var args =  {
		 stage:"email",
		 email: dataarray,
		 companyid: companyid,
	 }
		addcompany(args, lang, token).done(function(resp){

			var companyid = resp.data.companyid;
		 $('<a href="/company_profile?id='+companyid+'" ></a>')[0].click();
		}).fail(function(resp){failedanswer(resp)})
}
});

//Create Url
$('#urlsave').click(async function (event) {
	event.preventDefault();

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
  var companyid = urlParams.get('id');
	//if id = "" - get id from Store
	console.log(companyid);
  var token = await gettoken();

   var lang = getlang();
	 var lindex = $(".urlrepeater").attr("index");
	 var index = parseInt(lindex) - 1;
	 var dataarray = [];
for (var i = 0; i < lindex; i++) {
console.log("index: ", i);
	 var dataarr = {
		 url: $("[name='car["+i+"][urlinp]']").val(),
		 comment: $("[name='car["+i+"][urlcomment]']").val(),
		 description: $("[name='car["+i+"][urldesc]']").val()
	 }
	 dataarray.push(dataarr);
 }



if ($('body').attr("page") == "person") {

	var args =  {
		stage:"url",
		url: dataarray,
		personid: companyid,
	}
	 addperson(args, lang, token).done(function(resp){

		 var companyid = resp.data.personid;
	 $('<a href="/person_profile?id='+companyid+'" ></a>')[0].click();
	 }).fail(function(resp){failedanswer(resp)})

} else {


	 var args =  {
		 stage:"url",
		 url: dataarray,
		 companyid: companyid,
	 }
		addcompany(args, lang, token).done(function(resp){

			var companyid = resp.data.companyid;
		$('<a href="/company_profile?id='+companyid+'" ></a>')[0].click();
		}).fail(function(resp){failedanswer(resp)})
}
});

//Create Custom Data
$('#customsave').click(async function (event) {
	event.preventDefault();

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
  var companyid = urlParams.get('id');
	//if id = "" - get id from Store
	console.log(companyid);
  var token = await gettoken();

   var lang = getlang();
	 var lindex = $(".urlrepeater").attr("index");
	 var index = parseInt(lindex) - 1;
	 var dataarray = [];
for (var i = 0; i < lindex; i++) {
console.log("index: ", i);
	 var dataarr = {
		 type: $("[name='car["+i+"][customtype]']").val(),
		 data: $("[name='car["+i+"][customvalue]']").val(),
		 comment: $("[name='car["+i+"][customcomment]']").val(),
		 description: $("[name='car["+i+"][customdesc]']").val()
	 }
	 dataarray.push(dataarr);
 }



if ($('body').attr("page") == "person") {

	var args =  {
		stage:"custom",
		customdata: dataarray,
		personid: companyid,
	}
	 addperson(args, lang, token).done(function(resp){

		 var companyid = resp.data.personid;
	 $('<a href="/person_profile?id='+companyid+'" ></a>')[0].click();
	 }).fail(function(resp){failedanswer(resp)})

} else {


	 var args =  {
		 stage:"custom",
		 customdata: dataarray,
		 companyid: companyid,
	 }

		addcompany(args, lang, token).done(function(resp){

			var companyid = resp.data.companyid;
		$('<a href="/company_profile?id='+companyid+'" ></a>')[0].click();
		}).fail(function(resp){failedanswer(resp)})

}
});

//Create address
$('#addressaveperson').click(async function (event) {
	event.preventDefault();

  var personid = $('#addresscard').attr("name");
  var token = await gettoken();
  var args =
   {
     stage: "address",
     country: $('#adrcountrytxt').val(),
     city: $('#ct').val(),
     street: $('#st').val(),
     house: $('#hs').val(),
     office: $('#of').val(),
     postecode: $('#pcode').val(),
     floor: $('#fl').val(),
     building: $('#blg').val(),
     comment: $('#commentadr').val(),
     personid: personid,
   }
   var lang = getlang();
   addperson(args, lang, token).done(function(resp){

     	addressnextstep(personid);
   }).fail(function(resp){failedanswer(resp)});

});


$('#banksaveperson').click(async function (event) {
	event.preventDefault();

  var personid = $('#bankaccard').attr("name");
  var token = await gettoken();
  var args =
   {
     stage: "bank",
     bank: $('#bnxxx').val(),
     iban: $('#iban').val(),
     account: $('#acn').val(),
     bic: $('#bic').val(),
		 bankcode: $('#bankcode').val(),
     branch: $('#branch').val(),
     currency: $('#cursel').val(),
     comment: $('#commentbc').val(),

     personid: personid,
   }
   var lang = getlang();
   addperson(args, lang, token).done(function(resp){
banknextstep(personid);

   }).fail(function(resp){failedanswer(resp)});

});



//Create crypto account
$('#cryptosaveperson').click(async function (event) {
	event.preventDefault();

  var personid = $('#cryptocard').attr("name");
  var token = await gettoken();
  var args =
   {
     stage: "crypto",
     type: $('#ccurname').val(),
     account: $('#accnumber').val(),
     comment: $('#commentccac').val(),
     personid: personid,
   }
   var lang = getlang();
   addperson(args, lang, token).done(function(resp){
cryptonextstep(personid);

   }).fail(function(resp){failedanswer(resp)});

});

$('#addrskip').click(function (event) {
	event.preventDefault();
	var companyid = $('#addresscard').attr("name");
	addressnextstep(companyid);

});

$('#bankskip').click(function (event) {
	event.preventDefault();
	var companyid = $('#bankaccard').attr("name");
	banknextstep(companyid);

});

$('#cryptoskip').click(function (event) {
	event.preventDefault();
	var companyid = $('#cryptocard').attr("name");
	cryptonextstep(companyid);

});

$('#logoskip').click(function (event) {
	event.preventDefault();
	var companyid = $('#logocard').attr("name");
	logonextstep(companyid);

});

$('#filesfinish').click(function (event) {
	event.preventDefault();
	var companyid =$('#filescard').attr("name");
	document.location.href = '/company_profile?id=' + companyid;

});

$('#personfilesfinish').click(function (event) {
	event.preventDefault();
	var personid =$('#filescard').attr("name");
	document.location.href = '/person_profile?id=' + personid;

});

function addressnextstep(companyid) {
	$('#bankaccard').addClass("show");
	$('#bankaccard').attr("name", companyid);
	$("#myaddrcollapse").trigger("click");
	$('.addressheader').hide();
	$('.bankaccountheader').show();
	$('#addrfinisheicon').removeAttr('hidden');
}

function banknextstep(companyid) {
	$('#cryptocard').addClass("show");
	$('#cryptocard').attr("name", companyid);
	$("#mybankcolapse").trigger("click");
	 $('.bankaccountheader').hide();
	 $('.cryptoheader').show();
	 $('#bankfinisheicon').removeAttr('hidden');
}

function cryptonextstep(companyid) {
	    $('#logocard').addClass("show");
    $('#logocard').attr("name", companyid);
	   $("#cryptocollapse").trigger("click");
	     $('.cryptoheader').hide();
	    $('.addlogoheader').show();
	    $('#cryptofinisheicon').removeAttr('hidden');
}

function logonextstep(companyid) {
	    $('#filescard').addClass("show");
    $('#filescard').attr("name", companyid);
	   $("#myfilecollapse").trigger("click");
	     $('.addlogoheader').hide();
	    $('.addfilesheader').show();
	    $('#logofinisheicon').removeAttr('hidden');
}

$(document).on( "click", ".companyfolder", async function () {
	console.log(".companyfolder");
	event.preventDefault();
	var path = $(this).attr("name");
	$("#filestbody").empty();
	var token =  await gettoken();
  companyid = GetUrlParameter("id");
		$("#addnewfile").attr("path", path);
	showcompanyfiles(companyid, token, path, 25, 0).done(function(resp) {
	  if (resp.data.files.length != 0) {


	             var i;
	var fl = "/";
	var returnicon = ""
	if (resp.data.files[0].Folder != ""){
	  fl = resp.data.files[0].Folder;
		returnicon = '<div class="returnfback" name="'+fl+'" style="cursor:pointer;"><i class="la la-reply"></i></div>'
	}

console.log(".companyfolder, fl = ", fl);
	$('#filestbody').append('<tr name="folderpath"  loaded="'+resp.data.files.length+'" count="'+resp.data.filescount+'" > \
	<td>'+fl +'</i></td> \
	<td id="createfolder" data-name="'+fl +'" style="cursor:pointer;"><i class="la la-plus-circle"></i></td>\
	<td>'+returnicon+'</td>\
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
	  //there is empty folder
		if (path != "/") {
			path = path + "/";
		}
		returnicon = '<div class="returnfback" name="'+path+'" style="cursor:pointer;"><i class="la la-reply"></i></div>'
		$('#filestbody').append('<tr name="folderpath"  loaded="'+resp.data.files.length+'" count="'+resp.data.filescount+'"  > \
		<td>'+path +'</td> \
		<td id="createfolder" data-name="'+path +'" style="cursor:pointer;"><i class="la la-plus-circle"></i></td>\
		<td>'+returnicon+'</td>\
		<td></td>\
		<td></td>\
		</tr>');

		$('#filestbody').append('<tr name="folderpath"  loaded="'+resp.data.files.length+'" count="'+resp.data.filescount+'"  > \
		<td colspan="5">There is no files in the folder</td> \
		</tr>');

	}

	}).fail(function(resp){failedanswer(resp)});


});

$(document).on( "click", ".returnfback", async function () {
	var path = $(this).attr("name");
	var newpath = "/";
	if (path != "/") {
var patharray = path.split("/");
for (var i = 0; i < patharray.length - 2; i++) {
	if (patharray[i] != "") {
	newpath = newpath + patharray[i];
}
}
	} else {
		newpath = "/";
	}
	console.log(newpath);
	var token =  await gettoken();
	var companyid = GetUrlParameter("id");
	$("#filestbody").empty();
		$("#addnewfile").attr("path", newpath);
	showcompanyfiles(companyid, token, newpath, 25, 0).done(function(resp) {
			if (resp.data.files.length != 0) {

								 var i;

		var returnicon = ""
		if (resp.data.files[0].Folder != ""){
			var fl = resp.data.files[0].Folder;
			if (fl != "/") {
			returnicon = '<div class="returnfback" name="'+fl+'"><i class="la la-reply"></i></div>'
		}
		}

		$('#filestbody').append('<tr name="folderpath"  loaded="'+resp.data.files.length+'" count="'+resp.data.filescount+'"  > \
		<td>'+fl +'</i></td> \
		<td id="createfolder" data-name="'+fl +'" style="cursor:pointer;"><i class="la la-plus-circle"></i></td>\
		<td>'+returnicon+'</td>\
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
			$('#filesmsg').text("There is no files in the folder");
		}

		}).fail(function(resp){failedanswer(resp)});

});

$(document).on( "click", "#createfolder", async function () {
var title = "Create Folder" ;
	var path = $(this).attr("data-name");
var body = "<div> \
<div>" +path +"</div> \
<div><input type='text' placeholder='folder name' id='foldername' /></div> \
</div>";
var footer = "<div> \
<button class='btn btn-sm btn-secondary ml-50 mb-2 mr-2' id='createcfolder' name="+path+">Create</button> \
</div>";
alertwindow(title, body, footer)

});

$(document).on( "click", "#createcfolder", async function () {
	event.preventDefault();
	var path = $(this).attr("name");
	var newfolder = $('#foldername').val();
	if (newfolder != "") {
	var newpath = path + newfolder
	var token =  await gettoken();
	var companyid = GetUrlParameter("id");
	  $('#generalmodal').modal('hide');
	addcompanyfolder(companyid, newpath, token, getlang()).done(function (resp){
		$("#filestbody").empty();
		$("#addnewfile").attr("path", path);
	showcompanyfiles(companyid, token, path, 25, 0).done(function(resp) {
			if (resp.data.files.length != 0) {

								 var i;

		var returnicon = ""
		if (resp.data.files[0].Folder != ""){
			var fl = resp.data.files[0].Folder;
			if (fl != "/") {
			returnicon = '<div class="returnfback" name="'+fl+'" style="cursor:pointer;"><i class="la la-reply"></i></div>'
		}
		}

		$('#filestbody').append('<tr name="folderpath"  loaded="'+resp.data.files.length+'" count="'+resp.data.filescount+'"  > \
		<td>'+fl +'</i></td> \
		<td id="createfolder" data-name="'+fl +'" style="cursor:pointer;"><i class="la la-plus-circle"></i></td>\
		<td>'+returnicon+'</td>\
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
			$('#filesmsg').text("There is no files in the folder");
		}

		}).fail(function(resp){failedanswer(resp)});
	}).fail(function(resp){failedanswer(resp)});
}
		});


$(document).on( "click", ".companyfile", async function () {
	event.preventDefault();
	var fileid =$(this).attr("name");
	var queryString = window.location.search;
	var urlParams = new URLSearchParams(queryString);
	  var companyid = urlParams.get('id');
	var token = await gettoken();
	showcomapnyfile(companyid, fileid, token).done(function(resp){
		openfile(resp)
	}).fail(function(resp){failedanswer(resp)})
//	 $('<a href="/files?fid='+ fileid +'&cid='+companyid+'" target="blank"></a>')[0].click();


});

$(document).on( "click", ".personfile", async function () {
	event.preventDefault();
	var fileid =$(this).attr("data-name");
	var queryString = window.location.search;
	var urlParams = new URLSearchParams(queryString);
	var personid = urlParams.get('id');
	var token = await gettoken();
	showpersonfile(personid, fileid, token).done(function(resp){
openfile(resp)
	}).fail(function(resp){failedanswer(resp)})
//	 $('<a href="/files?fid='+ fileid +'&cid='+companyid+'" target="blank"></a>')[0].click();


});

$(document).on( "click", ".companytr", async function () {
	event.preventDefault();
	var companyid = $(this).attr("data-name");
	$('<a href="/company_profile?id='+companyid+'" ></a>')[0].click();
});

$(document).on( "click", ".accounttr", async function () {
	event.preventDefault();
	var companyid = $(this).attr("data-name");
	$('<a href="/account_profile?id='+companyid+'" ></a>')[0].click();
});

$(document).on( "click", ".persontr", async function () {
	event.preventDefault();
	var companyid = $(this).attr("data-name");
	$('<a href="/person_profile?id='+companyid+'" ></a>')[0].click();
});


});
})(jQuery);
