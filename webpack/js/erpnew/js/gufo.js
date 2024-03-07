/*
There is functions for Gufo Server
*/

// GET request
export function info() {
  var url = SERVER_URL + 'info';
 return $.getJSON(url);
}

//GET request
export function logout(token) {

  var jwttoken = "Bearer " + token;


  return $.ajax({
   url: SERVER_URL + 'logout',
   type: "GET",
   headers: {
          'Authorization': jwttoken,
      }
 });

}


//GET request
export function confirmemail(data) {
  var url = SERVER_URL + 'confirmemail' + data;
  return $.getJSON(url);
}
