/*

There is functions for Dictionary module
Currencies

Authorisation required

*/

//Add / Update Invoice
//POST
export function addcurrency(args, lang, token) {

  var jwttoken = "Bearer " + token;


  // var timestamp = Math.round(+new Date()/1000);

  
   return $.ajax({
    url: SERVER_URL + 'dictionary/currency',
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
export function getcurrencies(token) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'dictionary/currency/',
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}
