/*

There is functions for User module
Company

Authorisation required

*/

//Add / Update Company
//POST
//Iportant args for create: Name and type
// for update CompanyID
export function switchcompany(args, lang, token) {

  var jwttoken = "Bearer " + token;


  // var timestamp = Math.round(+new Date()/1000);

  

   return $.ajax({
    url: SERVER_URL + 'user/company/switch',
    type: "POST",
    data: JSON.stringify(args),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}
