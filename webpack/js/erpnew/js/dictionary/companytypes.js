/*

There is functions for Dictionary module
Company Types

Authorisation required

*/

//Add / Update Invoice
//POST
export function addcompanytype(args, lang, token) {

  var jwttoken = "Bearer " + token;


  // var timestamp = Math.round(+new Date()/1000);

  
   return $.ajax({
    url: SERVER_URL + 'dictionary/companytypes',
    type: "POST",
    data: JSON.stringify(args),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}

//4. Show Company Types by country
//GET
export function getcompanytypes(counrtyid, token) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'dictionary/companytypes/' + counrtyid,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}
