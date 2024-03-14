/*

There is functions for Accounting module
Connections

Authorisation required

*/


//Add / Update connections
//POST
//Iportant args for create: Name and type
// for update CompanyID objectconnections
export function accountconnect(args, lang, token) {

  var jwttoken = "Bearer " + token;


  //// var timestamp = Math.round(+new Date()/1000);


   return $.ajax({
    url: SERVER_URL + 'accounting/connections',
    type: "POST",
    data: JSON.stringify(args),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}



//Add / Update connections
//POST
//Iportant args for create: Name and type
// for update CompanyID objectconnections
export function addobjconnect(args, lang, token) {

  var jwttoken = "Bearer " + token;


//// var timestamp = Math.round(+new Date()/1000);



   return $.ajax({
    url: SERVER_URL + 'accounting/objectconnections',
    type: "POST",
    data: JSON.stringify(args),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}


//GET
//1. Show VAT connections
export function showvatconnections(companyid, token) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'accounting/vatconnections/'+ companyid,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}


//GET
//1. Show VAT connections
export function showvobjectconnections(companyid, token) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'accounting/objectconnections' + companyid,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}
