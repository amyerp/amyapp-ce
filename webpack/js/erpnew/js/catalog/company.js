/*

There is functions for Catalog module
Company

Authorisation required

*/

//Show Company - show information about company by CompanyID
//Important Args: companiID
//GET
export function showcompany(id, token) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'catalog/company/' + id,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Show companyes address
export function showcompanyaddress(id, token, limit, offset) {
  var param = "address";
  return showcompanydetails(id, token, param, limit, offset)
}

//Show companyes banks
export function showcompanybanks(id, token, limit, offset) {
  var param = "bank";
  return showcompanydetails(id, token, param, limit, offset)
}

//Show companyes brokers
export function showcompanybrokers(id, token, limit, offset) {
  var param = "broker";
  return showcompanydetails(id, token, param, limit, offset)
}

//Show companies directors
export function showcompanydirectors(id, token, limit, offset) {
  var param = "director";
  return showcompanydetails(id, token, param, limit, offset)
}

//Show companyes shareholders
export function showcompanyshareholders(id, token, limit, offset) {
  var param = "shareholder";
  return showcompanydetails(id, token, param, limit, offset)
}

//Show companyes payment systems
export function showcompanypaymentsystems(id, token, limit, offset) {
  var param = "payment_system";
  return showcompanydetails(id, token, param, limit, offset)
}

//Show companyes Cryptocurrency accounts
export function showcompanycryptos(id, token, limit, offset) {
  var param = "crypto";
  return showcompanydetails(id, token, param, limit, offset)
}

//Show companyes phone book
export function showcompanyphones(id, token, limit, offset) {
  var param = "phone";
  return showcompanydetails(id, token, param, limit, offset)
}

//Show companyes email book
export function showcompanyemails(id, token, limit, offset) {
  var param = "email";
  return showcompanydetails(id, token, param, limit, offset)
}

//Show companyes URLs
export function showcompanyurls(id, token, limit, offset) {
  var param = "url";
  return showcompanydetails(id, token, param, limit, offset)
}

//Show companyes Files
export function showcompanyfiles(id, token, path, limit, offset) {
  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'catalog/company/' + id + '/files?limit=' + limit + '&offset=' + offset + '&path=' + path,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Show companyes custom data
export function showcompanycustom(id, token, limit, offset) {
  var param = "custom";
  return showcompanydetails(id, token, param, limit, offset)
}


//Show Company - show information about company by CompanyID
//Important Args: companiID
//GET
function showcompanydetails(id, token, param, limit, offset) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'catalog/company/' + id + '/' + param + '?limit=' + limit + '&offset=' + offset,
    type: "GET",
    headers: {
           'content-type': 'application/json; charset=utf-8',
           'Authorization': jwttoken,
       }
  });
}

//Show Companies - show information about all companies
//GET
export function showcompanies(token, isaccount, limit, offset, listonly) {

  var jwttoken = "Bearer " + token;
  var url = SERVER_URL + 'catalog/companies?isaccount=' + isaccount + '&limit=' + limit + '&offset=' + offset
if (listonly != "") {
  var url = SERVER_URL + 'catalog/companies?isaccount=' + isaccount + '&limit=' + limit + '&offset=' + offset + '&listonly=true'
}

   return $.ajax({
    url: url,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Show Companies - show information about all companies
//GET
export function showaccounts(token, limit, offset) {

  var jwttoken = "Bearer " + token;
  var url = SERVER_URL + 'catalog/accounts?limit=' + limit + '&offset=' + offset

   return $.ajax({
    url: url,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}


//Add / Update Company
//POST
//Iportant args for create: Name and type
// for update CompanyID
export function addcompany(args, lang, token) {

  var jwttoken = "Bearer " + token;


  // var timestamp = Math.round(+new Date()/1000);


  var jsonreq = JSON.stringify(args);
   console.log("jsonreq: ", jsonreq)

   return $.ajax({
    url: SERVER_URL + 'catalog/company',
    type: "POST",
    data: jsonreq,
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}

// Create folder
//POST
//Iportant args: CompanyID and Path
export function addcompanyfolder(companyid, path, token, lang) {
var args = {
  stage: "folder",
  companyid: companyid,
  path: path
};
return addcompany(args, lang, token)
}

//Delete Company
//Important Args: companyID
//If need just delete file, instaed of companyID use fileid
//DELETE
export function delcompany(args, lang, token) {

  var jwttoken = "Bearer " + token;


  // var timestamp = Math.round(+new Date()/1000);

  

   return $.ajax({
    url: SERVER_URL + 'catalog/company',
    type: "DELETE",
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
export function uploadcompanyfile(file, formData, companyid, token){

  // var timestamp = Math.round(+new Date()/1000);

  //var formData = new FormData();
  //formData.append('fname', fname);
  formData.append("file", file);
  //formData.append("file", file);
  formData.append("timestamp", timestamp);

  var jwttoken = "Bearer " + token;

  return $.ajax({
  // url: SERVER_URL + 'catalog/company/' + companyid + '/',
  url: SERVER_URL + 'files/upload/',
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

//Get file
//Important Args: companyID, fileID
//GET
export function showcomapnyfile(companyid, fileid, token) {
  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'catalog/company/' + companyid + '/file/' + fileid + '/',
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

export function companyavatar(companyid, token) {
  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'catalog/company/' + companyid + '/avatar/',
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

export function companylogo(companyid, token) {
  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'catalog/company/' + companyid + '/companylogo/',
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

export function companyshortlogo(companyid, token) {
  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'catalog/company/' + companyid + '/shortlogo/',
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

export function companyinvoicelogo(companyid, token) {
  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'catalog/company/' + companyid + '/invoicelogo/',
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
