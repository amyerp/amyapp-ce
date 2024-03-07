/*

There is functions for Dictionary module
Accounting

Authorisation required

*/

//Create
//POST
//Args: chartid, categoryeng, categoryloc, language, type
//Types: category, subcategory, bwaform, bwagroups, chart
//1. Create Category
export function addaccounting(args, lang, token) {

  var jwttoken = "Bearer " + token;


  var timestamp = Math.round(+new Date()/1000);

  var req = {
       module: 'dictionary',
       param: 'accounting',
       args: args,
       lang: lang,
       timestamp: timestamp
   };

   return $.ajax({
    url: SERVER_URL + 'dictionary/accounting',
    type: "POST",
    data: JSON.stringify(req),
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });

}

//GET
//1. Show categories
export function showchartcategories(chartid, lang, token) {

  var jwttoken = "Bearer " + token;

var filters = "";
if (lang != "") {
  filters = "?lang=" + lang;
}

   return $.ajax({
    url: SERVER_URL + 'dictionary/accounting/category/' + chartid + filters,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//2. Show subcategories
export function showchartsubcategories(categoryid, lang, token) {

  var jwttoken = "Bearer " + token;

var filters = "";
if (lang != "") {
  filters = "?lang=" + lang;
}

   return $.ajax({
    url: SERVER_URL + 'dictionary/accounting/subcategory/' + categoryid + filters,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//3. Show BWA Form
export function showchartbwaforms(chartid, token) {

  var jwttoken = "Bearer " + token;



   return $.ajax({
    url: SERVER_URL + 'dictionary/accounting/bwaform/' + chartid,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//4. Show BWA Groups
export function showchartbwagroups(bwafromid, token) {

  var jwttoken = "Bearer " + token;



   return $.ajax({
    url: SERVER_URL + 'dictionary/accounting/bwagroups/' + bwafromid,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}

//5. Show charts
export function showchart(chartid, categoryid, subcategoryid, lang, code, name, token) {

var jwttoken = "Bearer " + token;

var filters = "?";
if (lang != "") {
  filters = filters + "lang=" + lang;
}
if (code != "") {
  filters = filters + "code=" + code;
}
if (name != "") {
  filters = filters + "name=" + name;
}
var gurl = SERVER_URL + 'dictionary/accounting/chart/' + chartid;
var query = gurl;

if (categoryid != ""){
  var cat = '/' + categoryid;
  query = query + cat;
}

if (subcategoryid != ""){
  var subcat = '/' + subcategoryid;
  query = query + subcat;
}

query = query + filters;


   return $.ajax({
    url: query,
    type: "GET",
    headers: {
           'content-type': 'application/json',
           'Authorization': jwttoken,
       }
  });
}
