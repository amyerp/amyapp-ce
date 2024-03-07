/*

There is functions for Catalog module
Person

Authorisation required

*/

//Show Person - show information about person by PersonID
//Important Args: PersonID
//GET
export function showperson(id, token) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'catalog/person/' + id,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Show Persons - show information about all companies
//GET
export function showpersons(token, limit, offset) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'catalog/persons?limit=' + limit + '&offset=' + offset,
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
export function showpersondetails(id, token, param, limit, offset) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'catalog/person/' + id + '/' + param + '?limit=' + limit + '&offset=' + offset,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}


//Show Person address
export function showpersonaddress(id, token, limit, offset) {
  var param = "address";
  return showpersondetails(id, token, param, limit, offset)
}

//Show Person banks
export function showpersonbanks(id, token, limit, offset) {
  var param = "bank";
  return showpersondetails(id, token, param, limit, offset)
}

//Show Person Cryptos
export function showpersoncryptos(id, token, limit, offset) {
  var param = "crypto";
  return showpersondetails(id, token, param, limit, offset)
}

//Show Person Phones
export function showpersonphones(id, token, limit, offset) {
  var param = "phone";
  return showpersondetails(id, token, param, limit, offset)
}


//Show Person Email
export function showpersonemails(id, token, limit, offset) {
  var param = "email";
  return showpersondetails(id, token, param, limit, offset)
}

//Show Person URL
export function showpersonurls(id, token, limit, offset) {
  var param = "url";
  return showpersondetails(id, token, param, limit, offset)
}

//Show PErson Files
export function showpersonfiles(id, token, limit, offset) {
  var param = "files";
  return showpersondetails(id, token, param, limit, offset)
}

//Show person custom data
export function showpersoncustom(id, token, limit, offset) {
  var param = "custom";
  return showpersondetails(id, token, param, limit, offset)
}

//Add / Update Person
//POST
//Iportant args for create: Name and Surname
// for update PersonID
export function addperson(args, lang, token) {

  var jwttoken = "Bearer " + token;


  var timestamp = Math.round(+new Date()/1000);

  var req = {
       param: 'person',
       args: args,
       lang: lang,
       timestamp: timestamp
   };

   return $.ajax({
    url: SERVER_URL + 'catalog/person',
    type: "POST",
    data: JSON.stringify(req),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}

//Delete Person
//Important Args: personID
//If need just delete file, instaed of personID use fileid
//DELETE
export function delperson(args, lang, token) {

  var jwttoken = "Bearer " + token;


  var timestamp = Math.round(+new Date()/1000);

  var req = {
       param: 'person',
       args: args,
       lang: lang,
       timestamp: timestamp
   };

   return $.ajax({
    url: SERVER_URL + 'catalog/person',
    type: "DELETE",
    data: JSON.stringify(req),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}

//Upload File
//PUT
//Important args: personID, file
export function uploadpersonfile(file, formData, personid, token){

  var timestamp = Math.round(+new Date()/1000);


  formData.append("file", file);
  formData.append("timestamp", timestamp);

  var jwttoken = "Bearer " + token;

  return $.ajax({
   url: SERVER_URL + 'catalog/person/' + personid + '/',
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
//Important Args: personID, fileID
//GET
export function showpersonfile(personid, fileid, token) {
  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'catalog/person/' + personid + '/file/' + fileid + '/',
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

export function personavatar(personid, token) {
  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'catalog/person/' + personid + '/avatar/',
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
