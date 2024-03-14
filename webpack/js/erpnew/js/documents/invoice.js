/*

There is functions for Documents module
Invoice

Authorisation required

*/


//Show invoice in PDF
//Important Args: invoiceID
//GET
export function showinvoicepdf(id, token) {
  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'documents/invoice/pdf/' + id,
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


//Add / Update Invoice
//POST
//Iportant args for create: Name and type
// for update CompanyID
export function addinvoice(args, lang, token) {

  var jwttoken = "Bearer " + token;


  // var timestamp = Math.round(+new Date()/1000);



   return $.ajax({
    url: SERVER_URL + 'documents/invoice',
    type: "POST",
    data: JSON.stringify(args),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}


//Complite Invoice
//POST
//Iportant args : InvoiceID
export function compliteinvoice(invoiceid, lang, token) {

  var jwttoken = "Bearer " + token;


  // var timestamp = Math.round(+new Date()/1000);

  var args = {
    action: "complite",
    invoiceid: invoiceid
  }


   return $.ajax({
    url: SERVER_URL + 'documents/invoice',
    type: "POST",
    data: JSON.stringify(args),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}

//Mark as Sent
//POST
//Iportant args : InvoiceID
export function markassent(invoiceid, lang, token) {

  var jwttoken = "Bearer " + token;


  // var timestamp = Math.round(+new Date()/1000);

  var args = {
    action: "marksent",
    invoiceid: invoiceid
  }


   return $.ajax({
    url: SERVER_URL + 'documents/invoice',
    type: "POST",
    data: JSON.stringify(args),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}

//Upload File
//PUT
//Important args: companiID, file
export function uploadinvoice(file, formData, invoiceid, companyid, token){

  // var timestamp = Math.round(+new Date()/1000);


  formData.append("file", file);
  formData.append("timestamp", timestamp);
  formData.append("invoiceid", invoiceid);
  formData.append("companyid", companyid);

  var jwttoken = "Bearer " + token;

  return $.ajax({
   url: SERVER_URL + 'documents/invoice/upload/',
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
