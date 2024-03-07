/*=========================================================================================
    File Name: wizard-steps.js
    Description: wizard steps page specific js
    ----------------------------------------------------------------------------------------
    Item Name: Modern Admin - Clean Bootstrap 4 Dashboard HTML Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

// Wizard tabs with numbers setup

// Wizard tabs with icons setup
$(".mycompanyformwizard").steps({
    headerTag: "h6",
    bodyTag: "fieldset",
   transitionEffect: "fade",
   titleTemplate: '<span class="step">#index#</span> #title#',
  labels: {
    finish: 'Submit'
   },
   onStepChanging: function (event, currentIndex, newIndex) {
     // Allways allow previous action even if the current form is not valid!
     if (currentIndex > newIndex) {
         return true;
     }
     // Needed in some cases if the user went back (clean up)
     if (currentIndex < newIndex) {
         // To remove error styles
         $(".mycompanyformwizard").find(".body:eq(" + newIndex + ") label.error").remove();
         $(".mycompanyformwizard").find(".body:eq(" + newIndex + ") .error").removeClass("error");
     }
     $(".mycompanyformwizard").validate().settings.ignore = ":disabled,:hidden";
     return $(".mycompanyformwizard").valid();

       },
       onFinishing: function (event, currentIndex) {
           $(".mycompanyformwizard").validate().settings.ignore = ":disabled";
           return $(".mycompanyformwizard").valid();
       },
   onFinished: async function (event, currentIndex) {
     var country = $('#mcloc').attr("name");
     var regcountry = $('#mcloc').val();

     var token = await gettoken();
     if (country == "de") {
       var cname = $('#companynamede').val();
       var ctype = $('#ctypeger').val();
       var args =
        { name: cname,
          type : ctype,
          regcountry: regcountry,
          isaccount: "1",
          stage:"company",
          activity: $('#c2de').val(),
          businesnumber: $('#bnde').val(),
          finanzamt: $('#fnde').val(),
          registeredby: $('#regbyde').val(),
          registrationdate: $('#regdatede').val(),
          taxnumber: $('#tnde').val(),
          lei: $('#lnde').val(),
          duns: $('#dnde').val(),
          vatnumber: $('#vnde').val(),
          officer: $('#secretaryde').val(),
          comment: $('#commentcde').val(),
          companysize: $('#csizede').val(),
          startdate: $('#ssdde').val(),
          enddate: $('#sedde').val(),
          acmethod: $('#acmethodde').val(),
          acstandart: $('#acstandartde').val(),
          kontenrahmen: $('#kontenrahmende').val(),
          shares: $('#totlasharesde').val(),
          sharecapital: $('#shareamountde').val(),
          currency: $('#currencyde').val(),
         };
         var lang = getlang();
        addcompany(args, lang, token).done(function(resp){

          var addrarr = {
            country: $('#adrcountry').val(),
            city: $('#ct').val(),
            street: $('#st').val(),
            house: $('#hs').val(),
            office: $('#of').val(),
            postecode: $('#pcode').val(),
            floor: $('#fl').val(),
            building: $('#blg').val(),
            area: $('#area').val(),
            comment: $('#commentadr').val(),
            description: $('#desc').val()
          }
          var addrarray = [];
          addrarray.push(addrarr);


          var companyid = resp.data.companyid;
          var args =  {
            stage:"address",
            address: addrarray,
            companyid: companyid,
          }
           addcompany(args, lang, token).done(function(resp){

             var companyid = resp.data.companyid;

             get('sessionid', SessionStore).then( result => {

      if (result !== undefined) {
        var session = JSON.parse(result);

      storeSession(session.token, session.sessionexp, session.uid, session.isadmin, session.email, session.emailconf, session.uname, companyid)
      //2. reload page
    $('<a href="/company_profile?id='+companyid+'" ></a>')[0].click();
      }
    });


          }).fail(function(resp){failedanswer(resp)});



        }).fail(function(resp){failedanswer(resp)});
     }
     if (country == "it") {
       var cname = $('#companynameit').val();
       var ctype = $('#ctypeit').val();
       var args =
        { name: cname,
          type : ctype,
          regcountry: regcountry,
          isaccount: "1",
          stage:"company",
          activity: $('#c2it').val(),
          businesnumber: $('#bnit').val(),
          registeredby: $('#regit').val(),
          registrationdate: $('#regdateit').val(),
          codicefiscale: $('#codfisc').val(),
          lei: $('#lnit').val(),
          duns: $('#dnit').val(),
          vatnumber: $('#iva').val(),
          officer: $('#secretaryit').val(),
          comment: $('#commentcit').val(),
          companysize: $('#csizeit').val(),
          startdate: $('#ssdit').val(),
          enddate: $('#sedit').val(),
          acmethod: $('#acmethodit').val(),
          acstandart: $('#acstandartit').val(),
          accchart: $('#kontenrahmenit').val(),
          shares: $('#totlasharesit').val(),
          sharecapital: $('#shareamountit').val(),
          currency: $('#currencyit').val(),
          inps: $('#inps').val(),
          inail: $('#inail').val(),
         };
         var lang = getlang();
        addcompany(args, lang, token).done(function(resp){

          var addrarr = {
            country: $('#adrcountry').val(),
            city: $('#ct').val(),
            street: $('#st').val(),
            house: $('#hs').val(),
            office: $('#of').val(),
            postecode: $('#pcode').val(),
            floor: $('#fl').val(),
            building: $('#blg').val(),
            area: $('#area').val(),
            comment: $('#commentadr').val(),
            description: $('#desc').val()
          }
          var addrarray = [];
          addrarray.push(addrarr);


          var companyid = resp.data.companyid;
          var args =  {
            stage:"address",
            address: addrarray,
            companyid: companyid,
          }
           addcompany(args, lang, token).done(function(resp){

             var companyid = resp.data.companyid;
           	$('<a href="/company_profile?id='+companyid+'" ></a>')[0].click();
          }).fail(function(resp){failedanswer(resp)});



        }).fail(function(resp){failedanswer(resp)});
     }
     if (country == "hk") {
       var cname = $('#companynamehk').val();
       var ctype = $('#ctypehk').val();
       var args =
        { name: cname,
          type : ctype,
          regcountry: regcountry,
          isaccount: "1",
          stage:"company",
          activity: $('#c2hk').val(),
          businesnumber: $('#bnhk').val(),
          registrationdate: $('#regdatehk').val(),
          lei: $('#lnhk').val(),
          duns: $('#dnhk').val(),
          officer: $('#secretaryhk').val(),
          comment: $('#commentchk').val(),
          accchart: $('#kontenrahmenhk').val(),
          shares: $('#totlashares').val(),
          sharecapital: $('#shareamount').val(),
          currency: $('#currency').val(),
          ordinaryshares:$('#ordsharecap').val(),
          preferenceshares:$('#prefsharescap').val(),
          brnumber: $('#br').val(),
         };
         var lang = getlang();
        addcompany(args, lang, token).done(function(resp){

          var addrarr = {
            country: $('#adrcountry').val(),
            city: $('#ct').val(),
            street: $('#st').val(),
            house: $('#hs').val(),
            office: $('#of').val(),
            postecode: $('#pcode').val(),
            floor: $('#fl').val(),
            building: $('#blg').val(),
            area: $('#area').val(),
            comment: $('#commentadr').val(),
            description: $('#desc').val()
          }
          var addrarray = [];
          addrarray.push(addrarr);


          var companyid = resp.data.companyid;
          var args =  {
            stage:"address",
            address: addrarray,
            companyid: companyid,
          }
           addcompany(args, lang, token).done(function(resp){

             var companyid = resp.data.companyid;
           	$('<a href="/company_profile?id='+companyid+'" ></a>')[0].click();
          }).fail(function(resp){failedanswer(resp)});



        }).fail(function(resp){failedanswer(resp)});
     }



   }
});

$(".faformwizard").steps({
    headerTag: "h6",
    bodyTag: "fieldset",
   transitionEffect: "fade",
   titleTemplate: '<span class="step">#index#</span> #title#',
  labels: {
    finish: 'Submit'
   },
   onStepChanging: function (event, currentIndex, newIndex) {
     // Allways allow previous action even if the current form is not valid!
     if (currentIndex > newIndex) {
         return true;
     }
     // Needed in some cases if the user went back (clean up)
     if (currentIndex < newIndex) {
         // To remove error styles
         $(".faformwizard").find(".body:eq(" + newIndex + ") label.error").remove();
         $(".faformwizard").find(".body:eq(" + newIndex + ") .error").removeClass("error");
     }
     $(".faformwizard").validate().settings.ignore = ":disabled,:hidden";
     return $(".faformwizard").valid();

       },
       onFinishing: function (event, currentIndex) {
           $(".faformwizard").validate().settings.ignore = ":disabled";
           return $(".faformwizard").valid();
       },
  onFinished: async function (event, currentIndex) {
    var token = await gettoken();
    var lang = getlang();
    var companyid = await  get('sessionid', SessionStore).then( result => {
          if (result !== undefined) {
            var session = JSON.parse(result);
            return session.companyid
          } else {
            return ""
          }
        });
    var fatype = $("#fatypesel").val();
    var args =
     {
       companyid: companyid,
       type: fatype,
       branchid: $("#companybranch").val(),
       incomingdate: $("#indate").val(),
       leavedate: $("#outdate").val(),
       currency: $("#cur").val(),
       price: $("#price").val(),
       amperiod: $("#amperiod").val(),
       comment: $("#comment").val(),
       description: $("#description").val(),

     }
    if (fatype == "car") {
      args = Object.assign({
        vin: $("#vin").val(),
        manufacturer: $("#manufacturer").val(),
        model: $("#model").val(),
        year: $("#year").val(),
        platenumber: $("#pnumber").val(),
        fueltype: $("#fueltype").val(),
        servicedate: $("#sdate").val()
      }, args)
    }
    if (fatype == "custom") {
      args = Object.assign({
        fatype: $("#fatype").val(),
        sn: $("#sn").val(),
        manufacturer: $("#manufacturer").val(),
        model: $("#model").val(),
        year: $("#year").val()
      }, args)
    }
    addfixedasset(args, lang, token).done(function(resp){
      var faid = resp.data.faid;
     $('<a href="/fixed_asset?id='+faid+'" ></a>')[0].click();
    }).fail(function(resp){failedanswer(resp)});

}

});

$(".companyformwizard").steps({
    headerTag: "h6",
    bodyTag: "fieldset",
   transitionEffect: "fade",
   titleTemplate: '<span class="step">#index#</span> #title#',
  labels: {
    finish: 'Submit'
   },
   onStepChanging: function (event, currentIndex, newIndex) {
     // Allways allow previous action even if the current form is not valid!
     if (currentIndex > newIndex) {
         return true;
     }
     // Needed in some cases if the user went back (clean up)
     if (currentIndex < newIndex) {
         // To remove error styles
         $(".companyformwizard").find(".body:eq(" + newIndex + ") label.error").remove();
         $(".companyformwizard").find(".body:eq(" + newIndex + ") .error").removeClass("error");
     }
     $(".companyformwizard").validate().settings.ignore = ":disabled,:hidden";
     return $(".companyformwizard").valid();

       },
       onFinishing: function (event, currentIndex) {
           $(".companyformwizard").validate().settings.ignore = ":disabled";
           return $(".companyformwizard").valid();
       },
   onFinished: async function (event, currentIndex) {

     var cname = $('#companyname').val();
     var ctype = $('#ctype').val();
     var token = await gettoken();
     var ownercompany = await  get('sessionid', SessionStore).then( result => {
           if (result !== undefined) {
             var session = JSON.parse(result);
             return session.companyid
           } else {
             return ""
           }
         });
     var args =
      { name: cname,
        type : ctype,
        regcountry: $('#regc').val(),
        isaccount: "0",
        ownercompany: ownercompany,
        stage:"company",
        activity: $('#c2').val(),
        businesnumber: $('#bn').val(),
        taxnumber: $('#tn').val(),
        lei: $('#ln').val(),
        duns: $('#dn').val(),
        vatnumber: $('#vn').val(),
        director: $('#directornm').val(),
        officer: $('#secretary').val(),
        shares: $('#totlashares').val(),
        sharecapital: $('#shareamount').val(),
        currency: $('#currency').val(),
        comment: $('#commentc').val(),
       };
       var lang = getlang();
      addcompany(args, lang, token).done(function(resp){
        var companyid = resp.data.companyid;

        var addrarr = {
          country: $('#adrcountrytxt').val(),
          city: $('#ct').val(),
          street: $('#st').val(),
          house: $('#hs').val(),
          office: $('#of').val(),
          postecode: $('#pcode').val(),
          floor: $('#fl').val(),
          building: $('#blg').val(),
          area: $('#area').val(),
          comment: $('#commentadr').val(),
          description: $('#desc').val()
        }
        var addrarray = [];
        addrarray.push(addrarr);

        var companyid = resp.data.companyid;
        var args =  {
          stage:"address",
          address: addrarray,
          companyid: companyid,
        }
         addcompany(args, lang, token).done(function(resp){

           var companyid = resp.data.companyid;
          $('<a href="/company_profile?id='+companyid+'" ></a>')[0].click();
        }).fail(function(resp){failedanswer(resp)});


      }).fail(function(resp){failedanswer(resp)});

   }
});

$(".personformwizard").steps({
    headerTag: "h6",
    bodyTag: "fieldset",
   transitionEffect: "fade",
   titleTemplate: '<span class="step">#index#</span> #title#',
  labels: {
    finish: 'Submit'
   },
   onStepChanging: function (event, currentIndex, newIndex) {
     // Allways allow previous action even if the current form is not valid!
     if (currentIndex > newIndex) {
         return true;
     }
     // Needed in some cases if the user went back (clean up)
     if (currentIndex < newIndex) {
         // To remove error styles
         $(".personformwizard").find(".body:eq(" + newIndex + ") label.error").remove();
         $(".personformwizard").find(".body:eq(" + newIndex + ") .error").removeClass("error");
     }
     $(".personformwizard").validate().settings.ignore = ":disabled,:hidden";
     return $(".personformwizard").valid();

       },
       onFinishing: function (event, currentIndex) {
           $(".personformwizard").validate().settings.ignore = ":disabled";
           return $(".personformwizard").valid();
       },
   onFinished: async function (event, currentIndex) {
     var token = await gettoken();
     var ownercompany = await  get('sessionid', SessionStore).then( result => {
           if (result !== undefined) {
             var session = JSON.parse(result);
             return session.companyid
           } else {
             return ""
           }
         });
     var args =
      { ownercompany: ownercompany,
      stage:"person",
        name: $('#pname').val(),
        middlename : $('#mname').val(),
        surname: $('#surname').val(),
        title: $('#titlesel').val(),
        suffix: $('#suffix').val(),
        birthdate: $('#bd').val(),
        birthcountry: $('#cb').val(),
        birthcity: $('#cib').val(),
        doctype: $('#doct').val(),
        docnumber: $('#docn').val(),
        docissued: $('#iss').val(),
        docexpiration: $('#exp').val(),
        sex: $('#sex').val(),
        citizenship: $('#cit').val(),
        taxresidence: $('#tred').val(),
        taxid: $('#tid').val(),
        ocupation: $('#occ').val(),
        company: $('#comp').val(),
        department: $('#dep').val(),
        comment: $('#commentp').val(),
       };
       var lang = getlang();
      addperson(args, lang, token).done(function(resp){
        console.log(resp.data.personid);
        var addrarr = {
          country: $('#adrcountry').val(),
          city: $('#ct').val(),
          street: $('#st').val(),
          house: $('#hs').val(),
          office: $('#of').val(),
          postecode: $('#pcode').val(),
          floor: $('#fl').val(),
          building: $('#blg').val(),
          area: $('#area').val(),
          comment: $('#commentadr').val(),
          description: $('#desc').val()
        }
        var addrarray = [];
        addrarray.push(addrarr);

        var personid = resp.data.personid;
        var args =  {
          stage:"address",
          address: addrarray,
          personid: personid,
        }
         addperson(args, lang, token).done(function(resp){

           var personid = resp.data.personid;
         	$('<a href="/person_profile?id='+personid+'" ></a>')[0].click();
        }).fail(function(resp){failedanswer(resp)});



      }).fail(function(resp){failedanswer(resp)});

   }
});

// Initialize validation
$(".mycompanyformwizard").validate({
    ignore: 'input[type=hidden]', // ignore hidden fields
    errorClass: 'danger',
    successClass: 'success',
    highlight: function (element, errorClass) {
        $(element).removeClass(errorClass);
    },
    unhighlight: function (element, errorClass) {
        $(element).removeClass(errorClass);
    },
    errorPlacement: function (error, element) {
        error.insertAfter(element);
    },
    rules: {
        email: {
            email: true
        }
    }
});

$(".companyformwizard").validate({
    ignore: 'input[type=hidden]', // ignore hidden fields
    errorClass: 'danger',
    successClass: 'success',
    highlight: function (element, errorClass) {
        $(element).removeClass(errorClass);
    },
    unhighlight: function (element, errorClass) {
        $(element).removeClass(errorClass);
    },
    errorPlacement: function (error, element) {
        error.insertAfter(element);
    },
    rules: {
        email: {
            email: true
        }
    }
});


$(".personformwizard").validate({
    ignore: 'input[type=hidden]', // ignore hidden fields
    errorClass: 'danger',
    successClass: 'success',
    highlight: function (element, errorClass) {
        $(element).removeClass(errorClass);
    },
    unhighlight: function (element, errorClass) {
        $(element).removeClass(errorClass);
    },
    errorPlacement: function (error, element) {
        error.insertAfter(element);
    },
    rules: {
        email: {
            email: true
        }
    }
});


$(".mycompanylogowizard").steps({
    headerTag: "h6",
    bodyTag: "fieldset",
  enableAllSteps: true,
   transitionEffect: "fade",
   titleTemplate: '<span class="step">#index#</span> #title#',
  labels: {
    finish: 'Finish'
  },
  onFinished: function (event, currentIndex) {
      alert("Form submitted.");
  },

   onStepChanging: function (event, currentIndex, newIndex) {
     // Allways allow previous action even if the current form is not valid!
    return true;
/*
     if (currentIndex == 0) {
       if ( $('#avasshcl').attr('checked')) {
         console.log("need to got step 2");
      //  $("#steps-uid-1-t-2").trigger("click");
        return true;

       }
     } else {
       return true;
     }

     if (currentIndex > newIndex) {
         return true;
     }
*/
     },


       /*
       onFinishing: function (event, currentIndex) {
           $(".mycompanyformwizard").validate().settings.ignore = ":disabled";
           return $(".mycompanyformwizard").valid();
       },
       */
   onFinished: function (event, currentIndex) {
    $("#logoskip").trigger("click");

   }

});


$(".icons-tab-steps2").steps({
        headerTag: "h6",
        bodyTag: "fieldset",
       transitionEffect: "fade",
       titleTemplate: '<span class="step">#index#</span> #title#',
      labels: {
        finish: 'Submit'
       },
       onFinished: function (event, currentIndex) {
           alert("Form submitted.");
       }
    });

// Initialize plugins
// ------------------------------

// Date & Time Range
$('.datetime').daterangepicker({
    timePicker: true,
    timePickerIncrement: 30,
    locale: {
        format: 'MM/DD/YYYY h:mm A'
    }
});
