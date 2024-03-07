/*

There is functions for Journals module
Transfers

Authorisation required

*/

//Show transfers -
//Important Args: companyID
//GET
//Filters can be:
//basetype
//counterparty
//currency
//accounttype
export function showtransfers(companyid, token, limit, offset, filters) {

  var jwttoken = "Bearer " + token;

  var cp = "";
  if  (filters != "") {
    cp = "&" + filters
  }

   return $.ajax({
    url: SERVER_URL + 'journals/transfers/' + companyid + '?limit=' + limit + '&offset=' + offset + cp,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Show transfer
//Important Args: companyID, transferID
//GET
export function showtransfer(transferid, companyid, token) {

  var jwttoken = "Bearer " + token;

   return $.ajax({
    url: SERVER_URL + 'journals/transfer/' + companyid + '/' + transferid,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Complite transfer
//Important Args: companyID, transferID
//GET
export function complitetransfer(transferid, companyid, token) {

  var jwttoken = "Bearer " + token;

   return $.ajax({
    url: SERVER_URL + 'journals/transfer/' + companyid + '/' + transferid + '/complite',
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Add / Update transfer
//POST
//Iportant args for create: Name and type
// for update CompanyID
export function addtransfer(args, lang, token) {

  var jwttoken = "Bearer " + token;


  var timestamp = Math.round(+new Date()/1000);

  var req = {
       param: 'transfer',
       args: args,
       lang: lang,
       timestamp: timestamp
   };

   return $.ajax({
    url: SERVER_URL + 'journals/transfer',
    type: "POST",
    data: JSON.stringify(req),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}
