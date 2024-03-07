/*

There is functions for Journals module
Invoices

Authorisation required

*/

//Add / Update Income Invoice
//POST
//Iportant args for create: Name and type, received Date
// for update CompanyID
export function addincomeinvoice(args, lang, token) {

  var jwttoken = "Bearer " + token;


  var timestamp = Math.round(+new Date()/1000);

  var req = {
       param: 'incoming_invoice',
       args: args,
       lang: lang,
       timestamp: timestamp
   };

   return $.ajax({
    url: SERVER_URL + 'journals/incoming_invoice',
    type: "POST",
    data: JSON.stringify(req),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}


//Show Outgoing Invoice - show outgoing invoice by invoice id
//Important Args: InvoiceID
//GET
export function showinvoice(invoiceid, companyid, token) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'journals/outgoing_invoice/'+ companyid +'/' + invoiceid,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Show Outgoing Invoice - show outgoing invoice by invoice id
//Important Args: InvoiceID
//GET
export function compliteincominginvoice(invoiceid, companyid, token) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'journals/'+ companyid +'/complite/' + invoiceid,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Show Company - show information about company by CompanyID
//Important Args: companiID
//GET
//Filters can be:
//type
//counterparty
//currency
//complited = true/false
//sent = true/flase
export function showinvoices(companyid, token, limit, offset, filters) {

  var jwttoken = "Bearer " + token;

  var cp = "";
  if  (filters != "") {
    cp = "&" + filters
  }

   return $.ajax({
    url: SERVER_URL + 'journals/outgoing_invoices/' + companyid + '?limit=' + limit + '&offset=' + offset + cp,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Show Invoice - show invoice by invoice id
//Important Args: InvoiceID, CompanyID
//GET
export function duplicateinvoice(invoiceid, companyid, token) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'journals/outgoing_invoice/'+ companyid +'/' + invoiceid + '/duplicate',
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}


//Show Income Invoice - show income invoice by invoice id
//Important Args: InvoiceID
//GET
export function showincomeinvoice(invoiceid, companyid, token) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'journals/incoming_invoice/'+ companyid +'/' + invoiceid,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Show Income Invoices - show all income Invoices
//Important Args: companiID
//GET
//Filters can be:
//type
//counterparty
//currency
//complited = true/false
//sent = true/flase
export function showincomeinvoices(companyid, token, limit, offset, filters) {

  var jwttoken = "Bearer " + token;

  var cp = "";
  if  (filters != "") {
    cp = "&" + filters
  }

   return $.ajax({
    url: SERVER_URL + 'journals/incoming_invoices/' + companyid + '?limit=' + limit + '&offset=' + offset + cp,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Upload File
//PUT
//Important args: companiID, file
export function uploadincomeinvoice(file, formData, invoiceid, companyid, token){

  var timestamp = Math.round(+new Date()/1000);


  formData.append("file", file);
  formData.append("timestamp", timestamp);
  formData.append("invoiceid", invoiceid);
  formData.append("companyid", companyid);

  var jwttoken = "Bearer " + token;

  return $.ajax({
   url: SERVER_URL + 'journals/incoming_invoice/'+ companyid +'/upload/',
   type: "PUT",
   data: formData,
   processData: false,
   contentType: false,
   cache: false,
   headers: {
          'Authorization': jwttoken,
      }
 });

}

//Show Income invoice uploaded file
//Important Args: invoiceID, FileID, CompanyID
//GET
export function showincomeinvoicefile(fileid, invoiceid, companyid, token) {
  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'journals/incoming_invoice/'+ companyid +'/' + invoiceid + '/file/' + fileid,
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

//Send Invoice to email - show invoice by invoice id
//Important Args: InvoiceID, CompanyID
//GET
export function emailinvoice(invoiceid, companyid, customemail, token) {

  var jwttoken = "Bearer " + token;
var custom = "";
if (customemail != "") {
  custom = "?email=" + customemail;
}

   return $.ajax({
    url: SERVER_URL + 'journals/outgoing_invoice/'+ companyid +'/' + invoiceid + '/sendemail' + custom,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}
