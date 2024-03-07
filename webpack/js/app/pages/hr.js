export async function staffsloader(auth) {
    if (auth == 1) {
        $('#hrmenu').addClass("active");
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


      showstaffcards(companyid, token, 25, 0).done(function(resp){

        var comps = resp.data.staff;

        for (var i = 0; i < comps.length; i++) {
          var n = i + 1;



          $('#stafftbody').append('<tr data-name="'+comps[i].UID+'"" class="stafftr" style="cursor:pointer;"> \
          <td>'+ n +'</td> \
          <td><img src="" class="rounded mr-75 personsavatar" alt="profile image" height="36" width="36" cid="'+comps[i].UserID+'"></td> \
          <td>'+comps[i].Surname+'</td>\
          <td>'+comps[i].Name+'</td>\
          <td>'+comps[i].BirthDate+'</td>\
          <td>'+comps[i].Sex+'</td>\
          <td>'+comps[i].Status+'</td>\
          <td>'+comps[i].Position+'</td>\
          <td>'+comps[i].Departmnet+'</td>\
          <td>'+comps[i].BaseSalary+' '+comps[i].Currency.toUpperCase()+'</td>\
          </tr>');

          setpersonavatar(comps[i].UserID);

          }

        }).fail(function(resp){failedanswer(resp)});
      getcurrencies(token).done(function(resp){

          var data = resp.data.currencies;

          for (var i = 0; i < data.length; i++) {
            var n = i + 1;
        $('#currency').append('<option value="'+ data[i].CurrencyCode+'">'+data[i].Name+'</option> ');
            }
        }).fail(function(resp){failedanswer(resp)});
      getcountries(token).done(function(resp){
          var data = resp.data.countries;

          for (var i = 0; i < data.length; i++) {

                $('#adrcountry').append('<option value="'+ data[i].UID+'">'+data[i].Country+'</option> ');
            }
           }).fail(function(resp){failedanswer(resp)});
      showpersons(token, 25, 0).done(function(resp){

             var comps = resp.data.persons;

             for (var i = 0; i < comps.length; i++) {
               var n = i + 1;

               $('#cparty').append('<option value="'+ comps[i].UID+'">'+comps[i].Name+' '+comps[i].Surname + '</option> ');

               }

             }).fail(function(resp){failedanswer(resp)});

    } else {
    nosession()
    }

}

export async function staffcardloader(auth) {
    if (auth == 1) {
        $('#hrmenu').addClass("active");
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
      var staffid = GetUrlParameter("id");
      if (staffid == "") {
        nosession()
      }

      showstaffcard(companyid, staffid, token).done(function(resp){

        var comp = resp.data.staff;
        var fullname = comp.Name + " " + comp.MiddleName + " " + comp.Surname;
        if (comp.Suffix != "") {
          fullname = fullname + ", " + comp.Suffix;
        }
        if (comp.Title == "dr") {
          fullname = "Dr. " + fullname;
        }
setpersonavatar(comp.UserID);
$('#cnameh').text(fullname);
$('#persid').text("StaffID: " + comp.UID);
$('#bd').text(comp.BirthDate);
$('#cb').text(comp.BirthCountry);
$('#cib').text(comp.BirthCity);
$('#sex').text(comp.Sex);
$('#cit').text(comp.Citizenship);
$('#doct').text(comp.DocumentType);
$('#docn').text(comp.DocumentNumber);
$('#iss').text(comp.Issued);
$('#exp').text(comp.Expiration);
$('#tred').text(comp.Taxresidence);
$('#tid').text(comp.TaxID);
$('#occ').text(comp.Status);
$('#occ').text(comp.Position);
$('#dep').text(comp.Departmnet);
$('#oc').text(comp.Country + ", " + comp.City);
$('#salary').text(comp.BaseSalary + " " + comp.Currency.toUpperCase());
$('#wf').text(comp.WorksFrom);
$('#wt').text(comp.WorksTo);
$('#commentp').text(comp.Comment);
        }).fail(function(resp){failedanswer(resp)});


    } else {
    nosession()
    }

}


export async function warehousesloader(auth) {
    if (auth == 1) {
        $('#wmsmenu').addClass("active");

    } else {
    nosession()
    }

}
