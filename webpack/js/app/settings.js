$("#updatedateformat").click(async function(event){

      event.preventDefault();
      dateformat = $("#dateformat").val();
      var token =  await gettoken();
      var lang = getlang();
      setdateformat(dateformat, lang, token).done(function(){
        console.log("done");
      }).fail(function(resp){failedanswer(resp)});

  });
