export async function currenciesloader(auth) {

if (auth == 1) {
  $('#dictionarymenu').addClass("active");
  var token =  await gettoken();

  showlanguages(token).done(function(resp){
    var data = resp.data.languages;
    console.log(data);


    for (var i = 0; i < data.length; i++) {
      $('#lang').append('<option value="'+ data[i].Short+'">'+data[i].NativeName+'</option> ');

      }
     }).fail(function(resp){failedanswer(resp)});

  getcurrencies(token).done(function(resp){

    var data = resp.data.currencies;

    for (var i = 0; i < data.length; i++) {
      var n = i + 1;


      $('#datatbody').append('<tr> \
      <td> '+data[i].ID +'</td>\
      <td>'+data[i].Name+'</td>\
      <td>'+ data[i].CurrencyCode+'</td> \
      <td></td>\
      </tr>');



      }
  }).fail(function(resp){failedanswer(resp)});
} else {
    nosession()
}
}

export async function languagesloader(auth) {

if (auth == 1) {
  $('#dictionarymenu').addClass("active");
  var token =  await gettoken();

  showlanguages(token).done(function(resp){
    var data = resp.data.languages;
    console.log(data);


    for (var i = 0; i < data.length; i++) {

      $('#langtbody').append('<tr> \
      <td> '+data[i].ID +'</td>\
      <td>'+data[i].Language+'</td>\
      <td>'+ data[i].Short+'</td> \
      <td>'+data[i].NativeName+'</td>\
      <td></td>\
      </tr>');
      }
     }).fail(function(resp){failedanswer(resp)});
} else {
    nosession()
}
}

export async function cryptocurrenciesloader(auth) {

if (auth == 1) {
  $('#dictionarymenu').addClass("active");
  var token =  await gettoken();

  showcryptocurrencies(token).done(function(resp){
    var data = resp.data.cryptocurrencies;
    console.log(data);


    for (var i = 0; i < data.length; i++) {

      $('#datatbody').append('<tr> \
      <td> '+data[i].ID +'</td>\
      <td>'+data[i].Currency+'</td>\
      <td>'+ data[i].Name+'</td> \
      <td></td>\
      </tr>');
      }
     }).fail(function(resp){failedanswer(resp)});
} else {
    nosession()
}
}

export async function account_chart_typeloader(auth) {

if (auth == 1) {
  $('#dictionarymenu').addClass("active");
  var token =  await gettoken();

  //Load Languages
  showlanguages(token).done(function(resp){
    var data = resp.data.languages;
    console.log(data);



    for (var i = 0; i < data.length; i++) {
      if (data[i].Short != "en") {
      $('#langcat, #langsubcat, #langacc').append('<option value="'+ data[i].Short+'">'+data[i].NativeName+'</option> ');
}


      }
     }).fail(function(resp){failedanswer(resp)});

  showacts(token).done(function(resp){
    var data = resp.data.typedata;


    for (var i = 0; i < data.length; i++) {

      $('#datatbody').append('<tr> \
      <td> '+data[i].ID +'</td>\
      <td>'+data[i].ChartName+'</td>\
      <td></td>\
      </tr>');
       $('#charttypecat, #charttypesubcat, #charttypebwaform, #charttypeacc').append('<option value="'+ data[i].ChartName+'">'+data[i].ChartName+'</option> ');
      }
     }).fail(function(resp){failedanswer(resp)});




} else {
    nosession()
}
}

export async function countriesloader(auth) {

if (auth == 1) {
  $('#dictionarymenu').addClass("active");
  var token =  await gettoken();
  showlanguages(token).done(function(resp){
    var data = resp.data.languages;
    console.log(data);



    for (var i = 0; i < data.length; i++) {
      $('#lang').append('<option value="'+ data[i].Short+'">'+data[i].NativeName+'</option> ');
      $('#citylang').append('<option value="'+ data[i].Short+'">'+data[i].NativeName+'</option> ');


      }
     }).fail(function(resp){failedanswer(resp)});
  getcountries(token).done(function(resp){
    var data = resp.data.countries;
    console.log(data);


    for (var i = 0; i < data.length; i++) {

        $('#countryselect').append('<option value="'+ data[i].UID+'">'+data[i].Country+'</option> ');
      $('#countrybody').append('<tr class="countrytr" uid="'+data[i].UID +'" style="cursor:pointer;"> \
      <td> '+data[i].ID +'</td>\
      <td>'+data[i].Country+'</td>\
      <td>'+ data[i].CountryCode+'</td> \
      <td></td>\
      </tr>');
      }
     }).fail(function(resp){failedanswer(resp)});
} else {
    nosession()
}
}

export async function companytypesloader(auth) {

if (auth == 1) {
  $('#dictionarymenu').addClass("active");
  var token =  await gettoken();

  getcountries(token).done(function(resp){
    var data = resp.data.countries;
    console.log(data);


    for (var i = 0; i < data.length; i++) {

        $('#countryselect').append('<option value="'+ data[i].UID+'">'+data[i].Country+'</option> ');
      $('#countrybody').append('<tr class="ctcountrytr" uid="'+data[i].UID +'" style="cursor:pointer;"> \
      <td> '+data[i].ID +'</td>\
      <td>'+data[i].Country+'</td>\
      <td>'+ data[i].CountryCode+'</td> \
      <td></td>\
      </tr>');
      }
     }).fail(function(resp){failedanswer(resp)});
} else {
    nosession()
}
}

export async function vatsloader(auth) {

if (auth == 1) {
  $('#dictionarymenu').addClass("active");
 var token =  await gettoken();
 showvats(token).done(function(resp){
   var data = resp.data.typedata;

   for (var i = 0; i < data.length; i++) {

     $('#datatbody').append('<tr> \
     <td> '+data[i].ID +'</td>\
     <td>'+data[i].VAT+' %</td>\
     <td></td>\
     </tr>');
     }
    }).fail(function(resp){failedanswer(resp)});


} else {
    nosession()
}
}
