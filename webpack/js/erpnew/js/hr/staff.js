/*

There is functions for HR module
Staff

Authorisation required

*/

//Add / Update staff
//POST

export function addstaffinfo(args, lang, token) {

  var jwttoken = "Bearer " + token;


  // var timestamp = Math.round(+new Date()/1000);

  

   return $.ajax({
    url: SERVER_URL + 'hr/staff',
    type: "POST",
    data: JSON.stringify(args),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}


//Show staff info -
//Important Args: companyID
//GET
export function showstaffcards(companyid, token, limit, offset) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'hr/' + companyid + '/staff/cards?limit=' + limit + '&offset=' + offset,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Show full staff info -
//Important Args: companyID, staffid
//GET
export function showstaffcard(companyid, staffid, token) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'hr/' + companyid + '/staff/card/' + staffid,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Get PaySlip Pdf -
//Important Args: companyID, staffid
//GET
export function getpayslippdf(companyid, staffid, token) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'hr/' + companyid + '/staff/payslip/' + staffid,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}
