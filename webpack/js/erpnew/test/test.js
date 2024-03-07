'use strict';

(function ($) {
$(document).ready(function() {


     $('#btn').click(async function () {




var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleGlwcmVkIjoxNjIwNjcwNDYwLCJ1c2VyIjoieDR2a3BxazQifQ.XDbyENehXaoENtXnA_i29OCIsCUFv-pr-Cf5gZREye4';

/*
  var req = {

   user: "admin",
    pass: "mzArWKdaMB_X"

    //fileid: "0s1q40o2od2s"
  };


var req = {
  stage: "person",
  name: "Alexey",
  surname: "Yanchenko",
  title: "Mr",
  doctype: "passport",
  docnumber: "123456",

stage: "address",




activity: "IT company",
finanzamt: "Central",
businesnumber: "HRB-3424",
lei: "123455678",
taxnumber: "123/123",
vatnumber: "DE123",
isaccount: "1",

regcountry: "Germany",

telefon: "+39345455",
fax: "+3945324",
mobile: "+39538453",
email: "mail@mymates.gmbh",
web: "www.mymates.gmbh",
director: "Alexey Yanchenko",
officer: "Alexey Yanchenko",
comment: "The Best",
name: "MyMates GmbH",
type: "GmbH",

country: "Germany",
city: "Nuremberg",
street: "Mainstrasse",
house: "1",
office: "1",
postecode: "121354",


bankid: "uu51hg0eihm6",
bank: "Postbank",
iban: "DE1234567890",
currency: "eur",
bic: "PDMFFDXXX",

startdate: "01.01",
enddate: "31.12",
acmethod: "SKR04",
kontenrahmen: "",
companysize: "small",


companyid: "euxie2gomzao",

};
*/
var file = $('#fileinput').get(0).files;
//await addperson(req, "en", token)
await showinvoicepdf("h99kr0wc1ru0", token)
//await showperson("mj66zvv0msoe", token)
//await uploadcompanyfile(file, "Comapany form", "39rnb4o5hfle", token)
//await uploadavatar(file, "avatar", token)
//await showavatar(token)
//await showcomapnyfile("h99kr0wc1ru0", "mvpa40usqvch", token)
//await delcompany(req, "en", token)
//await addcompany(req, "en", token)
  // await signin(req, "en")
    //await showcompany("39rnb4o5hfle", token)
 // await showcompanies(token, "1", "25", "0")
    //await logout(token)
    //await info()
    //$('#answ').text(s);
    //var msg = s.message
    //console.log(s);
/*
      .done(function(r) {
    if (r) {
        console.log(r);

    } else {
          console.log(r);
    }
})
.fail(function(x) {
      console.log(r);
});
*/
});
    });

})(jQuery);
