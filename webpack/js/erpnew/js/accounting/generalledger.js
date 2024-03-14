/*

There is functions for Journals module
Hauptbuch

Authorisation required

*/


//Show hauptbuch
//Important Args: companyidID
//GET
export function showglline(companyid, lineid, token) {

  var jwttoken = "Bearer " + token;

  return $.ajax({
    url: SERVER_URL + 'accounting/generalledger/' + companyid + '/' + lineid,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Show all lines of Hauptbuch - show information about all companies
//GET
export function showgl(token, companyid, limit, offset, filters) {

  var jwttoken = "Bearer " + token;

  var cp = "";
  if  (filters != "") {
    cp = "&" + filters
  }


   return $.ajax({
    url: SERVER_URL + 'accounting/generalledger/'+ companyid +'?limit=' + limit + '&offset=' + offset + cp,
    type: "GET",
    async: false,
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Add / Update Houptbuch line
//POST
//Iportant args for create: CompanyID
// for update LineID
export function addgl(args, lang, token) {

  var jwttoken = "Bearer " + token;


  // var timestamp = Math.round(+new Date()/1000);



   return $.ajax({
    url: SERVER_URL + 'accounting/generalledger',
    type: "POST",
    data: JSON.stringify(args),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}

//Modify Houptbuch line
//POST
//Iportant args for create: CompanyID
// for update LineID
export function modifygl(companyid, lineid, soll, haben, lang, token) {

  var args = {
    action: "modify",
    companyid: companyid,
    lineid: lineid,
    soll: soll,
    haben: haben
  };

  return addgl(args, lang, token)
}

//Comment Houptbuch line
//POST
//Iportant args for create: CompanyID
// for update LineID
export function addglcomment(companyid, lineid, comment, lang, token) {

  var args = {
    action: "addcomment",
    companyid: companyid,
    lineid: lineid,
    comment: comment
  };

  return addgl(args, lang, token)
}

//Comment Houptbuch line
//POST
//Iportant args for create: CompanyID
// for update LineID
export function switchglflag(companyid, lineid, lang, token) {

  var args = {
    action: "switchflag",
    companyid: companyid,
    lineid: lineid
  };

  return addgl(args, lang, token)
}

//Delete Hauptbuch line
//Important Args: companyID, lineID
//DELETE
export function delgl(args, lang, token) {

  var jwttoken = "Bearer " + token;


  // var timestamp = Math.round(+new Date()/1000);
  

   return $.ajax({
    url: SERVER_URL + 'accounting/generalledger',
    type: "DELETE",
    data: JSON.stringify(args),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}

//Show hauptbuch
//Important Args: companyidID
//GET
export function summaraizebalance(companyid, token) {

  var jwttoken = "Bearer " + token;

  return $.ajax({
    url: SERVER_URL + 'accounting/generalledger/'+ companyid +'/closebalance/',
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}
