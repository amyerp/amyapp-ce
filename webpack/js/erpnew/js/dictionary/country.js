/*

There is functions for Dictionary module
Currencies

Authorisation required

*/

//Add / Update Invoice
//POST
export function addcountry(args, lang, token) {

  var jwttoken = "Bearer " + token;


  // var timestamp = Math.round(+new Date()/1000);



   return $.ajax({
    url: SERVER_URL + 'dictionary/country',
    type: "POST",
    data: JSON.stringify(args),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}

//4. Show Languages
//GET
export function getcountries(token) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'dictionary/country/',
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}


//Add / Update Invoice
//POST
export function addcity(args, lang, token) {

  var jwttoken = "Bearer " + token;


  // var timestamp = Math.round(+new Date()/1000);


   return $.ajax({
    url: SERVER_URL + 'dictionary/cities',
    type: "POST",
    data: JSON.stringify(args),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}

//4. Show Languages
//GET
export function getcities(counrtyid, token) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'dictionary/cities/' + counrtyid,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}
