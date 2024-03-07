/*

There is functions for Journals module
Loans

Authorisation required

*/


//1. Create Loan
//POST
//Iportant args for create: Counetparty, CompanyPosition
// for update AgreementID
export function addloan(args, lang, token) {

  var jwttoken = "Bearer " + token;


  var timestamp = Math.round(+new Date()/1000);

  var req = {
       param: 'loan',
       args: args,
       lang: lang,
       timestamp: timestamp
   };

   return $.ajax({
    url: SERVER_URL + 'journals/loan',
    type: "POST",
    data: JSON.stringify(req),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}


//3. Show loans
//GET
//Important Args: CompanyID
//GET
export function showloans(companyid, token, limit, offset, filters) {

  var jwttoken = "Bearer " + token;
  var cp = "";
  if  (filters != "") {
    cp = "&" + filters
  }


   return $.ajax({
    url: SERVER_URL + 'journals/loans/' + companyid + '?limit=' + limit + '&offset=' + offset + cp,
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
export function showloan(loanid, companyid, token) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'journals/loan/'+ companyid +'/' + loanid,
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
export function getcurrentloanamount(loanid, companyid, token) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'journals/loancurrentamount/'+ companyid +'/' + loanid,
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
export function showloantransactions(loanid, companyid, limit, offset, token) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'journals/loantransactions/'+ companyid +'/' + loanid + '?limit=' + limit + '&offset=' + offset,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}
