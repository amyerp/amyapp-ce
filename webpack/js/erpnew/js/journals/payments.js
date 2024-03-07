/*

There is functions for Journals module
Payments

Authorisation required

*/


//Show payments -
//Important Args: companyID
//GET
//Filters can be:
//basetype
//counterparty
//currency
//accounttype
export function showpayments(companyid, token, limit, offset, filters) {

  var jwttoken = "Bearer " + token;

  var cp = "";
  if  (filters != "") {
    cp = "&" + filters
  }

   return $.ajax({
    url: SERVER_URL + 'journals/payments/' + companyid + '?limit=' + limit + '&offset=' + offset + cp,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Show payment
//Important Args: companyID, paymentID
//GET
export function showpayment(paymentid, companyid, token) {

  var jwttoken = "Bearer " + token;

   return $.ajax({
    url: SERVER_URL + 'journals/payment/' + companyid + '/' + paymentid,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Complite payment
//Important Args: companyID, paymentID
//GET
export function complitepayment(paymentid, companyid, token) {

  var jwttoken = "Bearer " + token;

   return $.ajax({
    url: SERVER_URL + 'journals/payment/' + companyid + '/' + paymentid + '/complite',
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Get Payment Receipt
//Important Args: companyID, paymentID
//GET
export function showpaymentreceipt(paymentid, fileid, companyid, token) {

  var jwttoken = "Bearer " + token;

   return $.ajax({
    url: SERVER_URL + 'journals/payment/' + companyid + '/' + paymentid + '/receipt/' + fileid,
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

//Upload File
//PUT
//Important args: companiID, file
export function uploadipaymentreceipt(file, formData, paymentid, companyid, token){

  var timestamp = Math.round(+new Date()/1000);


  formData.append("file", file);
  formData.append("timestamp", timestamp);
  formData.append("paymentid", paymentid);
  formData.append("companyid", companyid);

  var jwttoken = "Bearer " + token;

  return $.ajax({
   url: SERVER_URL + 'journals/payment/'+ companyid +'/upload/',
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

//Add / Update payments
//POST
//Iportant args for create: Name and type
// for update CompanyID
export function addpayment(args, lang, token) {

  var jwttoken = "Bearer " + token;


  var timestamp = Math.round(+new Date()/1000);

  var req = {
       param: 'payment',
       args: args,
       lang: lang,
       timestamp: timestamp
   };

   return $.ajax({
    url: SERVER_URL + 'journals/payment',
    type: "POST",
    data: JSON.stringify(req),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}
