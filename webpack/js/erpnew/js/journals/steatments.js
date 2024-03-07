/*

There is functions for Journals module
Steatments

Authorisation required

*/


//Upload File
//PUT
//Important args: companiID, file
//api/journals/{companyid}/steatments/{type}/{typeid}/{year}/{month}

export function uploadsteatment(file, formData, companyid, type, typeid, year, month, token){

  var timestamp = Math.round(+new Date()/1000);


  formData.append("file", file);
  formData.append("timestamp", timestamp);

  var jwttoken = "Bearer " + token;

  return $.ajax({
   url: SERVER_URL + 'journals/steatments/'+ companyid +'/'+ type +'/'+ typeid +'/'+ year +'/'+ month +'/',
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

//Download Files
//GET
//https://erp.mymates.gmbh/api/journals/{companyid}/steatments/file/{fileid}
export function getsteatment(companyid, fileid, token) {
  var jwttoken = "Bearer " + token;


   return $.ajax({
    url: SERVER_URL + 'journals/steatments/' + companyid + '/file/'+ fileid + '/',
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

//Show Files
// GET
//api/journals/{companyid}/steatments/{type}/{typeid} - return years
//api/journals/{companyid}/steatments/{type}/{typeid}/{year}/ - return month
//api/journals/{companyid}/steatments/{type}/{typeid}/{year}/{month} - return files
export function getsteatmentfiles(companyid, type, typeid, path, token) {
    var jwttoken = "Bearer " + token;
    return $.ajax({
     url: SERVER_URL + 'journals/steatments/'+ companyid +'/'+ type +'/'+ typeid + path,
     type: "GET",
     headers: {
            //'content-type': 'application/json',
            'Authorization': jwttoken,
        }
   });
}
