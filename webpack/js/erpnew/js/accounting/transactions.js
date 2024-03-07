/*

There is functions for Accounting module
Transactions

Authorisation required

*/

//Show all lines of Hauptbuch - show information about all companies
//GET
//https://erp.mymates.gmbh/api/accounting/{companyid}/transactions/{type: bank, cassa}/{typeid}/?&from=25-01-2017&to=25-01-2018
export function showactransactions(token, companyid, type, typeid, filters) {

  var jwttoken = "Bearer " + token;

var tr = type;
if (typeid != ""){
  tr = tr + "/" + typeid;
}


   return $.ajax({
    url: SERVER_URL + 'accounting/transactions/' + companyid +'/'+ tr +'/?' + filters,
    type: "GET",
    async: false,
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Show all lines of Hauptbuch - show information about all companies
//GET
//https://erp.mymates.gmbh/api/accounting/{companyid}/transactions/{type: bank, cassa}/{typeid}/?&from=25-01-2017&to=25-01-2018
export function showsaldo(token, companyid, filters) {

  var jwttoken = "Bearer " + token;



   return $.ajax({
    url: SERVER_URL + 'accounting/saldo/'+ companyid +'/?' + filters,
    type: "GET",
    async: false,
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}
