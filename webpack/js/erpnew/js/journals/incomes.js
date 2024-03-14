/*

There is functions for Journals module
Incomes

Authorisation required

*/


//Show Incomes -
//Important Args: companyID
//GET
//Filters can be:
//basetype
//counterparty
//currency
//accounttype
export function showincomes(companyid, token, limit, offset, filters) {

  var jwttoken = "Bearer " + token;

  var cp = "";
  if  (filters != "") {
    cp = "&" + filters
  }

   return $.ajax({
    url: SERVER_URL + 'journals/incomes/' + companyid + '?limit=' + limit + '&offset=' + offset + cp,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Complite income
//Important Args: companyID, paymentID
//GET
export function compliteincome(incomeid, companyid, token) {

  var jwttoken = "Bearer " + token;

   return $.ajax({
    url: SERVER_URL + 'journals/income/' + companyid + '/' + incomeid + '/complite',
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Show Income
//Important Args: companyID, IncomeID
//GET
export function showincome(incomeid, companyid, token) {

  var jwttoken = "Bearer " + token;

   return $.ajax({
    url: SERVER_URL + 'journals/income/' + companyid + '/' + incomeid,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Get Receipt
//Important Args: companyID, IncomeID
//GET
export function getreceipt(incomeid, companyid, token) {

  var jwttoken = "Bearer " + token;

   return $.ajax({
    url: SERVER_URL + 'journals/income/' + companyid + '/' + incomeid + '/receipt',
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       },
       xhrFields:{
                   responseType: 'blob'
               }
  });
}



//Add / Update Incomes
//POST
//Iportant args for create: Name and type
// for update CompanyID
export function addincome(args, lang, token) {

  var jwttoken = "Bearer " + token;


  // var timestamp = Math.round(+new Date()/1000);

  

   return $.ajax({
    url: SERVER_URL + 'journals/income',
    type: "POST",
    data: JSON.stringify(args),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}

//TODO: showreceipt
