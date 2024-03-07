/*

There is functions for Dictionary module
Account Chart Types

Authorisation required

*/

//Add / Update Account Chart Type
//POST
export function addvat(args, lang, token) {

  var jwttoken = "Bearer " + token;


  var timestamp = Math.round(+new Date()/1000);

  var req = {
       module: 'dictionary',
       param: 'vat',
       args: args,
       lang: lang,
       timestamp: timestamp
   };

   return $.ajax({
    url: SERVER_URL + 'dictionary/vat',
    type: "POST",
    data: JSON.stringify(req),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}

//4. Show Languages
//GET
export function showvats(token) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'dictionary/vat/',
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}
