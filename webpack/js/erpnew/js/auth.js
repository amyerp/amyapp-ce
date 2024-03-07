/*

There is functions for Auth Module

*/

//SignIn
//Important Args: uname, pass
export function signin(args, lang) {

  var timestamp = Math.round(+new Date()/1000);
/*
  var req = {

       args: args,
       lang: lang,
       timestamp: timestamp
   };
*/
   return $.ajax({
    url: SERVER_URL + 'auth/signin',
    type: "POST",
    data: JSON.stringify(args),
    headers: {
           'content-type': 'application/json',
       }
  });
}

//SignIn with One Time Token
//Important Args: uname, pass


  export function signinwithottoken(data) {
    var url = SERVER_URL + 'auth/signin' + data;
    return $.getJSON(url);
  }


//Forgot
//Important Args: email
//Use two times. First for ask for a key, second time with a key for request a new password
export function forgot(args, lang) {

  var timestamp = Math.round(+new Date()/1000);
/*
  var req = {
       param: 'forgot',
       args: args,
       lang: lang,
       timestamp: timestamp
   };
*/
   return $.ajax({
    url: SERVER_URL + 'auth/forgot',
    type: "POST",
    data: JSON.stringify(args),
    headers: {
           'content-type': 'application/json',
       }
  });

}


//Resend Confirmation email
//Method GET
export function resendconfirmemail(token) {

  var jwttoken = "Bearer " + token;

  return $.ajax({
   url: SERVER_URL + 'auth/confemail/',
   type: "GET",
   headers: {
          'content-type': 'application/json',
          'Authorization': jwttoken,
      }
 });
}

//Resend OTP
//Method GET
export function resendotp(uname) {

  return $.ajax({
   url: SERVER_URL + 'auth/otp/' + uname,
   type: "GET",
   headers: {
          'content-type': 'application/json',
      }
 });
}
