$("#saveincomemail").click(async function(event){
      event.preventDefault();
      var token =  await gettoken();
      var lang = getlang();

      var needans = 0;
    if  ($('#needanswer').is(":checked")) {
      needans = 1;
    }


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



      var args =
       {
         action: "import",
         mailstatus: "incoming",
         outgoingnum: $("#docenum").val(),
         ownerid: companyid,
         title: $("#title").val(),
         sender:  $("#counerparty").val(),
         sendertype:  $("#agrcounerpartytype").val(),
         date: $("#receiveddata").val(),
         description: $("#description").val(),
         comment: $("#commentc").val(),
         deadline: $("#adeadline").val(),
         needanswer: needans,
       };

       addmail(args, lang, token).done(function(resp){
         var mailid = resp.data.mailid;


    $('#incomemailfiles').attr("mailid", mailid);
    $('#incomemailfiles').attr("hidden", false);

       }).fail(function(resp){failedanswer(resp)})


    });

$("#saveoutgoingmail").click(async function(event){
          event.preventDefault();
          var token =  await gettoken();
          var lang = getlang();

          var needans = 0;
        if  ($('#needanswer').is(":checked")) {
          needans = 1;
        }


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



          var args =
           {
             action: "import",
             mailstatus: "outgoing",
             outgoingnum: $("#docenum").val(),
             ownerid: companyid,
             title: $("#title").val(),
             receiver:  $("#counerparty").val(),
             receivertype:  $("#agrcounerpartytype").val(),
             date: $("#receiveddata").val(),
             description: $("#description").val(),
             comment: $("#commentc").val(),
             deadline: $("#adeadline").val(),
             needanswer: needans,
           };

           addmail(args, lang, token).done(function(resp){
             var mailid = resp.data.mailid;


        $('#outgoingmailfiles').attr("mailid", mailid);
        $('#outgoingmailfiles').attr("hidden", false);

           }).fail(function(resp){failedanswer(resp)})


        });

$(document).on( "click", ".incomemailtr", function () {
  mailid = $(this).attr("data-name");
  document.location.href = '/incoming_mail?id=' + mailid;
});

$(document).on( "click", ".outgoingmailtr", function () {
  mailid = $(this).attr("data-name");
  document.location.href = '/outgoing_mail?id=' + mailid;
});

$(document).on( "click", ".mailfile", async function () {
  event.preventDefault();
  var fileid = $(this).attr("data-name");
  var type = $(this).attr("data-type");
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
      getmailfile(companyid, docid, type, fileid, token).done(function(resp){
    openfile(resp)
  }).fail(function(resp){failedanswer(resp)})
//	 $('<a href="/files?fid='+ fileid +'&cid='+companyid+'" target="blank"></a>')[0].click();


});
