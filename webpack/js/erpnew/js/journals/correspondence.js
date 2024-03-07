/*

There is functions for Journals module
Correspondence

Authorisation required

*/


//1. Create Mail
//POST
//Iportant args for create: Counetparty, Customer, Number
// for update AgreementID
export function addmail(args, lang, token) {

  var jwttoken = "Bearer " + token;


  var timestamp = Math.round(+new Date()/1000);

  var req = {
       param: 'correspondence',
       args: args,
       lang: lang,
       timestamp: timestamp
   };

   return $.ajax({
    url: SERVER_URL + 'journals/correspondence',
    type: "POST",
    data: JSON.stringify(req),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}

//2. Attach file to agreement
//PUT
//Important args: companiID,  file, AgreementID
export function uploadmailfile(file, formData, companyid, mailid, type, token){

  var timestamp = Math.round(+new Date()/1000);

  //var formData = new FormData();
  //formData.append('fname', fname);
  formData.append("file", file);
  formData.append("mailid", mailid);
  formData.append("type", type);
  formData.append("timestamp", timestamp);

  var jwttoken = "Bearer " + token;

  return $.ajax({
   url: SERVER_URL + 'journals/correspondence/' + companyid ,
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


//3. Show income mails
//GET
//Important Args: CompanyID
//GET
export function showincommails(companyid, token, limit, offset, filters) {

  var jwttoken = "Bearer " + token;
  var cp = "";
  if  (filters != "") {
    cp = "&" + filters
  }


   return $.ajax({
    url: SERVER_URL + 'journals/correspondence//' + companyid + 'incoming?limit=' + limit + '&offset=' + offset + cp,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//4. Show outgoing mail
//GET
//Important Args: CompanyID
//GET
export function showoutgoingmails(companyid, token, limit, offset, filters) {

  var jwttoken = "Bearer " + token;
  var cp = "";
  if  (filters != "") {
    cp = "&" + filters
  }


   return $.ajax({
    url: SERVER_URL + 'journals/correspondence//' + companyid + 'outgoing?limit=' + limit + '&offset=' + offset + cp,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//5. Show Income Mail
//GET
//Important Args: MailID, CompanyID
//GET
export function showincomemail(mailid, companyid, token) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'journals/correspondence//'+ companyid +'incoming/' + mailid,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//6. Show Outgoing Mail
//GET
//Important Args: MailID, CompanyID
//GET
export function showoutgoingmail(mailid, companyid, token) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'journals/correspondence//'+ companyid +'outgoing/' + mailid,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//7. Show Mail Files
//GET
//GET
export function showmailfiles(companyid, mailid, type, token, limit, offset) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'journals/correspondence/' + companyid + '/'+type+'/'+mailid+'/files?limit=' + limit + '&offset=' + offset,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}


//8. Download Files
//GET
export function getmailfile(companyid, mailid, type, fileid, token) {
  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'journals/correspondence/' + companyid + '/'+type+'/'+ mailid +'/file/' + fileid + '/',
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
