/*

There is functions for User module
Settings

Authorisation required

*/


//Set Date Format
//POST
//Iportant args : dateformat

export function setdateformat(dateformat, lang, token) {

  var jwttoken = "Bearer " + token;

  var args = {
    dateformat : dateformat,
  };


  // var timestamp = Math.round(+new Date()/1000);

  
   return $.ajax({
    url: SERVER_URL + 'user/settings',
    type: "POST",
    data: JSON.stringify(args),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}
