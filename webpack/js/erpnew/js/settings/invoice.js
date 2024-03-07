/*

There is functions for Settings module
Invoice

Authorisation required

*/

//Show invoice Settings
//Important Args: companyid
//GET
export function showinvoicesettings(companyid, token) {
  var jwttoken = "Bearer " + token;

   return $.ajax({
    url: SERVER_URL + 'settings/invoice/' + companyid,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}


//Add / Update Invoice Settings
//POST
//Iportant args for create: CompanyID
// for update DataID
export function addinvoicesettings(args, lang, token) {

  var jwttoken = "Bearer " + token;


  var timestamp = Math.round(+new Date()/1000);

  var req = {
       param: 'invoice',
       args: args,
       lang: lang,
       timestamp: timestamp
   };

   return $.ajax({
    url: SERVER_URL + 'settings/invoice',
    type: "POST",
    data: JSON.stringify(req),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}

//Show invoice Email Settings
//Important Args: companyid
//GET
export function showinvoiceemailsettings(companyid, token) {
  var jwttoken = "Bearer " + token;

   return $.ajax({
    url: SERVER_URL + 'settings/invoiceemail/' + companyid,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}


//Add / Update Invoice EMAIL Settings
//POST
//Iportant args for create: CompanyID
// for update DataID
export function addinvoiceemailsettings(args, lang, token) {

  var jwttoken = "Bearer " + token;


  var timestamp = Math.round(+new Date()/1000);

  var req = {
       param: 'invoiceemail',
       args: args,
       lang: lang,
       timestamp: timestamp
   };

   return $.ajax({
    url: SERVER_URL + 'settings/invoiceemail',
    type: "POST",
    data: JSON.stringify(req),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}

//Send test invoice email
//Important Args: token
//GET
export function sendtestinvoiceemail(companyid, token) {
  var jwttoken = "Bearer " + token;

   return $.ajax({
    url: SERVER_URL + 'settings/sendtestinvoiceemail/' + companyid,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}
