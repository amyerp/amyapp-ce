/*

There is functions for Journals module
Agreements

Authorisation required

*/


//1. Create Agreement
//POST
//Iportant args for create: Counetparty, Customer, Number
// for update AgreementID
export function addagreement(args, lang, token) {

  var jwttoken = "Bearer " + token;


  // var timestamp = Math.round(+new Date()/1000);



   return $.ajax({
    url: SERVER_URL + 'journals/agreements',
    type: "POST",
    data: JSON.stringify(args),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}

//2. Attach file to agreement
//PUT
//Important args: companiID,  file, AgreementID
export function uploadagreementfile(file, formData, companyid, agreementid, token){

  // var timestamp = Math.round(+new Date()/1000);

  //var formData = new FormData();
  //formData.append('fname', fname);
  formData.append("file", file);
  formData.append("agreementid", agreementid);
  formData.append("timestamp", timestamp);

  var jwttoken = "Bearer " + token;

  return $.ajax({
   url: SERVER_URL + 'journals/agreement/' + companyid,
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


//3. Show agreements
//GET
//Important Args: CompanyID
//GET
export function showagreements(companyid, token, limit, offset, filters) {

  var jwttoken = "Bearer " + token;
  var cp = "";
  if  (filters != "") {
    cp = "&" + filters
  }


   return $.ajax({
    url: SERVER_URL + 'journals/agreements/' + companyid + '?limit=' + limit + '&offset=' + offset + cp,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//4. Show Agreement
//GET
//Important Args: AgreementID, CompanyID
//GET
export function showagreement(agreementid, companyid, token) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'journals/agreement/' + companyid + '/' + agreementid,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//5. Show Agreement Files
//GET
//GET
export function showagreementfiles(companyid, agreementid, token, limit, offset) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'journals/agreement/' + companyid + '/' + agreementid + '/files?limit=' + limit + '&offset=' + offset,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}


//6. Download Files
//GET
export function getagreementfile(companyid, agreementid, fileid, token) {
  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'journals/agreement/' + companyid + '/'+ agreementid +'/file/' + fileid + '/',
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


//TODO:
//7. Complite Agreement

//8. Make Active / InActive
export function agreementswichactive(agreementid, lang, token) {

  var jwttoken = "Bearer " + token;


  // var timestamp = Math.round(+new Date()/1000);

  var args = {
    action: "switchactive",
    agreementid: agreementid
  }

   return $.ajax({
    url: SERVER_URL + 'journals/agreement',
    type: "POST",
    data: JSON.stringify(args),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}

//9. Mark as Expired
export function agreementexpire(agreementid, lang, token) {

  var jwttoken = "Bearer " + token;


  // var timestamp = Math.round(+new Date()/1000);

  var args = {
    action: "expire",
    agreementid: agreementid
  }

   return $.ajax({
    url: SERVER_URL + 'journals/agreement',
    type: "POST",
    data: JSON.stringify(args),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}
