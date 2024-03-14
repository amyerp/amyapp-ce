/*

There is functions for Catalog module
Customers

Authorisation required

*/

//Show Customers - show information about all companies
//GET
export function showcustomers(companyid, token, limit, offset) {

  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'catalog/customers/'+ companyid +'?limit=' + limit + '&offset=' + offset,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//Add / Update Customer
//POST
//Iportant args for create: Name and Surname
// for update CustomerID
export function addcustomer(args, lang, token) {

  var jwttoken = "Bearer " + token;


  // var timestamp = Math.round(+new Date()/1000);

   return $.ajax({
    url: SERVER_URL + 'catalog/customers',
    type: "POST",
    data: JSON.stringify(args),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}
