/*

There is functions for Catalog module
Fixed Assets

Authorisation required

*/

//Show Fixed Asset
//Important Args: companiID
//GET
export function showfixedasset(companyid, faid, token) {

  var jwttoken = "Bearer " + token;

   return $.ajax({
    url: SERVER_URL + 'catalog/fixedasset/' + companyid + '/' + faid,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Show Persons - show information about all companies
//GET
export function showfixedassets(companyid, token, limit, offset) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'catalog/fixedassets/'+ companyid +'?limit=' + limit + '&offset=' + offset,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Add Fixed Asset
//POST
export function addfixedasset(args, lang, token) {

  var jwttoken = "Bearer " + token;


  var timestamp = Math.round(+new Date()/1000);

  var req = {
       param: 'fixedasset',
       args: args,
       lang: lang,
       timestamp: timestamp
   };

   return $.ajax({
    url: SERVER_URL + 'catalog/fixedasset',
    type: "POST",
    data: JSON.stringify(req),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}

export function fixedassetavatar(faid, token) {
  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'catalog/fixedasset/' + companyid + '/' + faid + '/avatar/',
    type: "GET",
    headers: {
           //'content-type': 'application/json',
           'Authorization': jwttoken,
       },
       xhrFields:{
                   responseType: 'blob'
               }
  });
}

//Show Fixed Asset
//Important Args: companiID
//GET
export function fixedassetamortisation(companyid, faid, token) {

  var jwttoken = "Bearer " + token;

   return $.ajax({
    url: SERVER_URL + 'catalog/fixedasset/' + companyid + '/' + faid + '/amortisation',
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}
