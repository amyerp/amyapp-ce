$(document).on('click', '#addlangbtn', async function (event) {
      event.preventDefault();

      var token =  await gettoken();
      var lang = getlang();
if ($("#addnewlanguage").val() != "") {
      var args =
       {
         language: $("#addnewlanguage").val(),
         shortcode: $("#addshortcode").val(),
         nativename: $("#addnativename").val(),
       };

       addlanguage(args, lang, token).done(function(resp){
$("#addnativename").val("");
$("#addnewlanguage").val("");
$("#addshortcode").val("");
showlanguages(token).done(function(resp){
  var data = resp.data.languages;
  console.log(data);
$('#langtbody').empty();
$('#langtbody').append('<tr> \
<td class="text-right"></td> \
<td class="text-right" ><input type="text" class="form-control"  id="addnewlanguage"></td> \
<td class="text-right" ><input type="text" class="form-control"  id="addshortcode"></td> \
<td class="text-right" ><input type="text" class="form-control"  id="addnativename"></td> \
<td class="text-right" ><button class="btn btn-sm btn-secondary ml-50 mb-2 mr-2" id="addlangbtn" >Save</button></td> \
</tr>');


  for (var i = 0; i < data.length; i++) {

    $('#langtbody').append('<tr> \
    <td> '+data[i].ID +'</td>\
    <td>'+data[i].Language+'</td>\
    <td>'+ data[i].Short+'</td> \
    <td>'+data[i].NativeName+'</td>\
    <td></td>\
    </tr>');
    }
   }).fail(function(resp){failedanswer(resp)})

       }).fail(function(resp){failedanswer(resp)})
}

    });

$(document).on('click', '#addcryptobtn', async function (event) {
          event.preventDefault();

          var token =  await gettoken();
          var lang = getlang();
    if ($("#addnewcrypto").val() != "") {
          var args =
           {
             currency: $("#addnewcrypto").val(),
             name: $("#addshortcode").val(),
           };

           addcrypto(args, lang, token).done(function(resp){
    $("#addnewcrypto").val("");
    $("#addshortcode").val("");
    showcryptocurrencies(token).done(function(resp){
      var data = resp.data.cryptocurrencies;
      console.log(data);
    $('#datatbody').empty();
    $('#datatbody').append('<tr> \
    <td class="text-right"></td> \
    <td class="text-right" ><input type="text" class="form-control"  id="addnewcrypto"></td> \
    <td class="text-right" ><input type="text" class="form-control"  id="addshortcode"></td> \
   <td class="text-right" ><button class="btn btn-sm btn-secondary ml-50 mb-2 mr-2" id="addcryptobtn" >Save</button></td>\
   </tr>');


      for (var i = 0; i < data.length; i++) {

        $('#datatbody').append('<tr> \
        <td> '+data[i].ID +'</td>\
        <td>'+data[i].Currency+'</td>\
        <td>'+ data[i].Name+'</td> \
        <td></td>\
        </tr>');
        }
       }).fail(function(resp){failedanswer(resp)})

           }).fail(function(resp){failedanswer(resp)})
    }

        });

$(document).on('click', '#addchartbtn', async function (event) {
      event.preventDefault();

                  var token =  await gettoken();
                  var lang = getlang();
            if ($("#addnewchart").val() != "") {
                  var args =
                   {
                     chartname: $("#addnewchart").val(),
                   };

                   addact(args, lang, token).done(function(resp){
            $("#addnewchart").val("");
            showacts(token).done(function(resp){
              var data = resp.data.typedata;
              console.log(data);
            $('#datatbody').empty();
            $('#datatbody').append('<tr> \
            <td class="text-right"></td> \
            <td class="text-right" ><input type="text" class="form-control"  id="addnewchart"></td> \
           <td class="text-right" ><button class="btn btn-sm btn-secondary ml-50 mb-2 mr-2" id="addchartbtn" >Save</button></td> \
           </tr>');


              for (var i = 0; i < data.length; i++) {

                $('#datatbody').append('<tr> \
                <td> '+data[i].ID +'</td>\
                <td>'+data[i].ChartName+'</td>\
                <td></td>\
                </tr>');
                }
               }).fail(function(resp){failedanswer(resp)})

                   }).fail(function(resp){failedanswer(resp)})
            }

                });

$(document).on('click', '#addcurbtn', async function (event) {
                      event.preventDefault();

                      var token =  await gettoken();
                      var lang = getlang();
                if ($("#lang").val() != "") {
                      var args =
                       {
                         action: "create",
                         name: $("#addnewcur").val(),
                         currencycode: $("#addshortcode").val(),
                         language: $("#lang").val(),
                       };

                       addcurrency(args, lang, token).done(function(resp){
                $("#addnativename").val("");
                $("#addnewlanguage").val("");
                $("#addshortcode").val("");
                getcurrencies(token).done(function(resp){
                  var data = resp.data.currencies;
                  console.log(data);
                $('#datatbody').empty();
                $('#datatbody').append('<tr> \
               <td class="text-right"><select class="custom-select form-control"  id="lang" > \
                   <option value="">Select Language</option> \
               </select></td> \
              <td class="text-right" ><input type="text" class="form-control"  id="addnewcur"></td> \
              <td class="text-right" ><input type="text" class="form-control"  id="addshortcode"></td> \
             <td class="text-right" ><button class="btn btn-sm btn-secondary ml-50 mb-2 mr-2" id="addcurbtn" >Save</button></td> \
            </tr>');


                  for (var i = 0; i < data.length; i++) {

                    $('#datatbody').append('<tr> \
                    <td> '+data[i].ID +'</td>\
                    <td>'+data[i].Name+'</td>\
                    <td>'+ data[i].CurrencyCode+'</td> \
                    <td></td>\
                    </tr>');
                    }

                    showlanguages(token).done(function(resp){
                      var data = resp.data.languages;
                      console.log(data);


                      for (var i = 0; i < data.length; i++) {
                        $('#lang').append('<option value="'+ data[i].Short+'">'+data[i].NativeName+'</option> ');

                        }
                       })
                   }).fail(function(resp){failedanswer(resp)})




                       }).fail(function(resp){failedanswer(resp)})
                }

                    });

$(document).on('click', '#addcountrybtn', async function (event) {
  event.preventDefault();

  var token =  await gettoken();
  var lang = getlang();
  if ($("#lang").val() != "") {

    var args =
     {
       action: "create",
       country: $("#addnewcountry").val(),
       countrycode: $("#addnewcountrycode").val(),
       language: $("#lang").val(),
     };
 addcountry(args, lang, token).done(function(resp){
   $("#addnewcountry").val("");
   $("#addnewcountrycode").val("");
   getcountries(token).done(function(resp){
     var data = resp.data.countries;
     console.log(data);
$('#countryselect').empty();
$('#countrybody').empty();
     for (var i = 0; i < data.length; i++) {

       $('#countryselect').append('<option value="'+ data[i].UID+'">'+data[i].Country+'</option> ');
       $('#countrybody').append('<tr class="countrytr" uid="'+data[i].UID +'" style="cursor:pointer;"> \
       <td> '+data[i].ID +'</td>\
       <td>'+data[i].Country+'</td>\
       <td>'+ data[i].CountryCode+'</td> \
       <td></td>\
       </tr>');
       }
      }).fail(function(resp){failedanswer(resp)})
 }).fail(function(resp){failedanswer(resp)})

  }

});

$(document).on('click', '.countrytr', async function (event) {
  var token =  await gettoken();
  var countryid = $(this).attr("uid");

  getcities(countryid, token).done(function(resp){
    var data = resp.data.cities;
$('#citybody').empty();
    for (var i = 0; i < data.length; i++) {


      $('#citybody').append('<tr> \
      <td> '+data[i].ID +'</td>\
      <td>'+data[i].City+'</td>\
      <td></td>\
      </tr>');
      }
     }).fail(function(resp){failedanswer(resp)})
});

$(document).on('click', '#addcitybtn', async function (event) {
  event.preventDefault();

  var token =  await gettoken();
  var lang = getlang();
  if ($("#citylang").val() != "") {

    var args =
     {
       action: "create",
       city: $("#addnewcity").val(),
       countryid: $("#countryselect").val(),
       language: $("#citylang").val(),
     };
 addcity(args, lang, token).done(function(resp){
   $("#addnewcity").val("");

 }).fail(function(resp){failedanswer(resp)})

  }

});

$(document).on('click', '#addctbtn', async function (event) {
  event.preventDefault();

  var token =  await gettoken();
  var lang = getlang();
  if ($("#countryselect").val() != "") {

    var args =
     {
       companytype: $("#addnewct").val(),
       countryid: $("#countryselect").val(),
     };
 addcompanytype(args, lang, token).done(function(resp){
   $("#addnewct").val("");

 }).fail(function(resp){failedanswer(resp)})

  }

});

$(document).on('click', '.ctcountrytr', async function (event) {
  var token =  await gettoken();
  var countryid = $(this).attr("uid");

  getcompanytypes(countryid, token).done(function(resp){
    var data = resp.data.companytypes;
$('#ctbody').empty();
    for (var i = 0; i < data.length; i++) {


      $('#ctbody').append('<tr> \
      <td> '+data[i].ID +'</td>\
      <td>'+data[i].CompanyType+'</td>\
      <td></td>\
      </tr>');
      }
     }).fail(function(resp){failedanswer(resp)})
});

$(document).on('click', '#addchartcatbtn', async function (event) {
      event.preventDefault();

                  var token =  await gettoken();
                  var lang = getlang();
            if ($("#addcateng").val() != "") {
                  var args =
                   {
                     type: "category",
                     action: "create",
                     chartid: $("#charttypecat").val(),
                     categoryeng: $("#addcateng").val(),
                     categoryloc: $("#addcatloc").val(),
                     language: $("#langcat").val(),
                   };

                   addaccounting(args, lang, token).done(function(resp){
            $("#charttypecat").val("");
            $("#addcateng").val("");
            $("#addcatloc").val("");
            $("#langcat").val("");


                   }).fail(function(resp){failedanswer(resp)})
            }

                });

$(document).on('click', '#charttypesubcat', async function (event) {
      var chartid = $(this).val();

      if (chartid != "") {
        var token =  await gettoken();
        showchartcategories(chartid, "", token).done(function(resp){
            var data = resp.data.categories;
            $('#catsubcat').empty();
            $('#catsubcat').append('<option value="">Select Category</option> ');
            for (var i = 0; i < data.length; i++) {
              $('#catsubcat').append('<option value="'+ data[i].UID+'">'+data[i].CategoryEng+'</option> ');
            }
        }).fail(function(resp){failedanswer(resp)});

      }
});

$(document).on('click', '#charttypeacc', async function (event) {
      var chartid = $(this).val();

      if (chartid != "") {
        var token =  await gettoken();
        showchartcategories(chartid, "", token).done(function(resp){
            var data = resp.data.categories;
            $('#catacc').empty();
            $('#catacc').append('<option value="">Select Category</option> ');
            for (var i = 0; i < data.length; i++) {
              $('#catacc').append('<option value="'+ data[i].UID+'">'+data[i].CategoryEng+'</option> ');
            }
        }).fail(function(resp){failedanswer(resp)});

      }
});

$(document).on('click', '#addsubcatbtn', async function (event) {
      event.preventDefault();

                  var token =  await gettoken();
                  var lang = getlang();
            if ($("#addsubcateng").val() != "") {

                  var args =
                   {
                     type: "subcategory",
                     action: "create",
                     categoryid: $("#catsubcat").val(),
                     subcategoryeng: $("#addsubcateng").val(),
                     subcategoryloc: $("#addsubcatloc").val(),
                     language: $("#langsubcat").val(),
                   };

                   addaccounting(args, lang, token).done(function(resp){
            $("#catsubcat").val("");
            $("#addsubcateng").val("");
            $("#addsubcatloc").val("");
            $("#langsubcat").val("");


                   }).fail(function(resp){failedanswer(resp)})
            }

                });

$(document).on('click', '#catacc', async function (event) {
  var categoryid = $(this).val();

                      if (categoryid != "") {
                        var token =  await gettoken();
                        showchartsubcategories(categoryid, "", token).done(function(resp){
                            var data = resp.data.subcategories;
                            $('#subcatacc').empty();
                            $('#subcatacc').append('<option value="">Select Sub Category</option> ');
                            for (var i = 0; i < data.length; i++) {
                              $('#subcatacc').append('<option value="'+ data[i].UID+'">'+data[i].SubCategoryEng+'</option> ');
                            }
                        }).fail(function(resp){failedanswer(resp)});

                      }
});

$(document).on('click', '#addaccbtn', async function (event) {
      event.preventDefault();

                  var token =  await gettoken();
                  var lang = getlang();
            if ($("#addaccountnameeng").val() != "") {

                  var args =
                   {
                     type: "chart",
                     action: "create",
                     chartid: $("#charttypeacc").val(),
                     categoryid: $("#catacc").val(),
                     subcategoryid: $("#subcatacc").val(),
                     account: $("#addaccount").val(),
                     nameeng: $("#addaccountnameeng").val(),
                     nameloc: $("#addaccnameloc").val(),
                     language: $("#langacc").val(),
                     comment: $("#addacccoment").val(),
                   };

                   addaccounting(args, lang, token).done(function(resp){
            $("#charttypeacc").val("");
            $("#catacc").val("");
            $("#subcatacc").val("");
            $("#addaccount").val("");
            $("#addaccountnameeng").val("");
            $("#addaccnameloc").val("");
            $("#langacc").val("");
            $("#addacccoment").val("");
                   }).fail(function(resp){failedanswer(resp)})
            }

                });

$(document).on('click', '#addvatbtn', async function (event) {
                      event.preventDefault();

                                  var token =  await gettoken();
                                  var lang = getlang();
                            if ($("#addnewvat").val() != "") {
                                  var args =
                                   {
                                     vat: $("#addnewvat").val(),
                                   };

                                   addvat(args, lang, token).done(function(resp){
                            $("#addnewvat").val("");
                            showvats(token).done(function(resp){
                              var data = resp.data.typedata;
                              console.log(data);
                            $('#datatbody').empty();
                            $('#datatbody').append('<tr> \
                            <td class="text-right"></td> \
                           <td class="text-right" ><input type="text" class="form-control"  id="addnewvat"></td> \
                          <td class="text-right" ><button class="btn btn-sm btn-secondary ml-50 mb-2 mr-2" id="addvatbtn" >Add</button></td> \
                           </tr>');


                              for (var i = 0; i < data.length; i++) {

                                $('#datatbody').append('<tr> \
                                <td> '+data[i].ID +'</td>\
                                <td>'+data[i].VAT+' %</td>\
                                <td></td>\
                                </tr>');
                                }
                               }).fail(function(resp){failedanswer(resp)})

                                   }).fail(function(resp){failedanswer(resp)})
                            }

});
