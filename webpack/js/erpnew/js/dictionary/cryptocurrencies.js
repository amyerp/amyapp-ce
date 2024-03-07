/*

There is functions for Dictionary module
Cryptocurencies

Authorisation required

*/

//Add / Update Cryptocurrency
//POST
export function addcrypto(args, lang, token) {

  var jwttoken = "Bearer " + token;


  var timestamp = Math.round(+new Date()/1000);

  var req = {
       module: 'dictionary',
       param: 'cryptocurrencies',
       args: args,
       lang: lang,
       timestamp: timestamp
   };

   return $.ajax({
    url: SERVER_URL + 'dictionary/cryptocurrencies',
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
export function showcryptocurrencies(token) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'dictionary/cryptocurrencies/',
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}
