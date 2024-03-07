$("#agrcounerpartytype").on("change", async function () {

  var type = $("#agrcounerpartytype").val();
  var token =  await gettoken();
  if (type == "company") {
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
    }).fail(function(resp){failedanswer(resp)});

  };
  if (type == "person") {

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

        }).fail(function(resp){failedanswer(resp)});

  }


  });

$("#counerpartyselect").on("change", async function () {
  var type = $("#agrcounerpartytype").val();
  var companyid = $("#counerparty").val();
  var token =  await gettoken();
    if (type == "company") {
      showcompanyemails(companyid, token, 25, 0, 0, 0).done(function(resp){

          var emails = resp.data.emails;
          var select = document.getElementById("selectcounerpartyemail"),
              length = select.options.length;
          while(length--){
            select.remove(length);
          }
            $('#selectcounerpartyemail').append('<option value="">Select Billing Email</option> ');
            $('#counerpartyemail').attr("hidden", false);
            for (var i = 0; i < emails.length; i++) {
              var n = i + 1;

              $('#selectcounerpartyemail').append('<option value="'+emails[i].EmailID+'">'+emails[i].Email+'</option> ');


            }

      }).fail(function(resp){failedanswer(resp)});
    } else {
      showpersonemails(companyid, token, 25, 0, 0, 0).done(function(resp){

          var emails = resp.data.emails;
          var select = document.getElementById("selectcounerpartyemail"),
              length = select.options.length;
          while(length--){
            select.remove(length);
          }
            $('#selectcounerpartyemail').append('<option value="">Select Billing Email</option> ');
            $('#counerpartyemail').attr("hidden", false);
            for (var i = 0; i < emails.length; i++) {
              var n = i + 1;

              $('#selectcounerpartyemail').append('<option value="'+emails[i].EmailID+'">'+emails[i].Email+'</option> ');


            }

      }).fail(function(resp){failedanswer(resp)});
    }

});

$("#customertype").on("change", async function () {
    $('#cusptomerselect').attr("hidden", true);
  var type = $("#customertype").val();
  var token =  await gettoken();
  if (type == "company") {
    showcompanies(token, 0, 25, 0, 0).done(function(resp){
      var comps = resp.data.companies;
      var select = document.getElementById("cusptomerse"),
          length = select.options.length;
      while(length--){
        select.remove(length);
      }
      $('#cusptomerse').append('<option value="">Choose Company</option> ');
      $('#cusptomerselect').attr("hidden", false);
      for (var i = 0; i < comps.length; i++) {
        var n = i + 1;

        $('#cusptomerse').append('<option value="'+comps[i].UID+'">'+comps[i].Name+'</option> ');


      }
    }).fail(function(resp){failedanswer(resp)});
  };
  if (type == "person") {

    showpersons(token, 25, 0).done(function(resp){
        var comps = resp.data.persons;
        var select = document.getElementById("cusptomerse"),
            length = select.options.length;
        while(length--){
          select.remove(length);
        }
        $('#cusptomerse').append('<option value="">Choose Person</option> ');
        $('#cusptomerselect').attr("hidden", false);
        for (var i = 0; i < comps.length; i++) {
          var n = i + 1;

          $('#cusptomerse').append('<option value="'+comps[i].UID+'">'+comps[i].Surname+' '+comps[i].Name+'</option> ');


          }

        }).fail(function(resp){failedanswer(resp)});

  }

  });

$("#doctype").on("change", async function () {
  $('#agreementselect').attr("hidden", true);
    var type = $("#doctype").val();
    var token =  await gettoken();
    var companyid = $('#agreementform').attr("companyid");
    if (type == "apendix") {
      showagreements(companyid, token, 25, 0, "").done(function(resp){
        var comps = resp.data.agreements;
        var select = document.getElementById("selagreement"),
            length = select.options.length;
        while(length--){
          select.remove(length);
        }
        $('#selagreement').append('<option value="">Choose Agreement</option> ');
        $('#agreementselect').attr("hidden", false);
        for (var i = 0; i < comps.length; i++) {
          var n = i + 1;

          $('#selagreement').append('<option value="'+comps[i].AgreementID+'">'+comps[i].Name+'</option> ');


        }
      }).fail(function(resp){failedanswer(resp)});
    };


    });

$("#saveimportagreement").click(async function(event){
      event.preventDefault();
      var token =  await gettoken();
      var lang = getlang();
      var isactive = "0";
    if  ($('#cbactive').prop('checked')) {
      isactive = "1";
    }
    var ispublic = "0";
    var agtype = $("#doctype").val();
    if  ($("#doctype").val() == "public_offerta") {
      ispublic = "1";
      agtype = "offerta"
    }

var customer = $("#customertype").val();
if ($("#customertype").val() == "company" || $("#customertype").val() == "person") {
  customer = $("#cusptomerse").val();
}


      var args =
       {
         type: agtype,
         ispublic: ispublic,
         category: $("#category").val(),
         action: "import",
         number:  $("#docenum").val(),
         ownerid: $('#agreementform').attr("companyid"),
         parent: $("#selagreement").val(),
         name: $("#docname").val(),
         email: $("#selectcounerpartyemail").val(),
         customer: customer,
         counterparty: $("#counerparty").val(),
         description: $("#description").val(),
         comment: $("#commentc").val(),
         startdate: $("#startdate").val(),
         enddate: $("#enddate").val(),
         signdate: $("#signdate").val(),
         isactive: isactive,
         soll: $("#sollinput").attr("code"),
         haben: $("#habeninput").attr("code"),
       };

       addagreement(args, lang, token).done(function(resp){
         var agreementid = resp.data.agreementid;


    $('#importagreement').attr("agreementid", agreementid);
    $('#importagreement').attr("hidden", false);
    $('#doneagreemnt').attr("agreementid", agreementid);
    $('#doneagreemnt').attr("hidden", false);

       }).fail(function(resp){failedanswer(resp)})


    });

    $(document).on( "click", ".agreementtr", function () {
      console.log("showinvoice");
      agreementid = $(this).attr("data-name");
      	document.location.href = '/agreement?id=' + agreementid;
    });

    $(document).on( "click", ".agreementfile", async function () {
    	event.preventDefault();
    	var fileid =$(this).attr("data-name");
    	var queryString = window.location.search;
    	var urlParams = new URLSearchParams(queryString);
    	  var docid = urlParams.get('id');
    	var token = await gettoken();
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
      getagreementfile(companyid, docid, fileid, token).done(function(resp){
    		openfile(resp)
    	}).fail(function(resp){failedanswer(resp)})
    //	 $('<a href="/files?fid='+ fileid +'&cid='+companyid+'" target="blank"></a>')[0].click();


    });


$("#acdc").on("click", async function () {

  event.preventDefault();
  var token =  await gettoken();
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var agreementid = urlParams.get('id');
  var lang = getlang();
  agreementswichactive(agreementid, lang, token).done(function(resp){
    document.location.href = '/agreement?id=' + agreementid;
  }).fail(function(resp){failedanswer(resp)})

});

$("#expbtn").on("click", async function () {

  event.preventDefault();
  var token =  await gettoken();
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var agreementid = urlParams.get('id');
  var lang = getlang();
  agreementexpire(agreementid, lang, token).done(function(resp){
   document.location.href = '/agreement?id=' + agreementid;
  }).fail(function(resp){failedanswer(resp)})

});

$("#doneagreemnt").on("click", async function () {
  event.preventDefault();
  var agreementid = $(this).attr("agreementid");
   document.location.href = '/agreement?id=' + agreementid;
});
