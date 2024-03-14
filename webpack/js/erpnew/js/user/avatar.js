/*

There is functions for User module
Avatar

Authorisation required

*/

//Upload avatar
//PUT
//Important args: companiID, file
export function uploadavatar(file, fname, token){

  // var timestamp = Math.round(+new Date()/1000);

  var formData = new FormData();
  formData.append('fname', fname);
  formData.append("file", file[0]);
  

  var jwttoken = "Bearer " + token;

  return $.ajax({
   url: SERVER_URL + 'user/avatar/',
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

//Get avatar
//Important Args: companyID, fileID
//GET
export function showavatar(token) {
  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'user/avatar/',
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
