var $ = require("jquery");
window.$ = $;
window.jQuery = $;


import {SERVER_URL} from './js/constants.js';
window.SERVER_URL = SERVER_URL;


import {
  showinvoicesettings,
  addinvoicesettings,
  showinvoiceemailsettings,
  addinvoiceemailsettings,
sendtestinvoiceemail

} from './js/settings/invoice.js';
window.showinvoicesettings = showinvoicesettings;
window.addinvoicesettings = addinvoicesettings;
window.showinvoiceemailsettings = showinvoiceemailsettings;
window.addinvoiceemailsettings = addinvoiceemailsettings;
window.sendtestinvoiceemail = sendtestinvoiceemail;



import {signin, forgot, resendconfirmemail, resendotp, signinwithottoken} from './js/auth.js';
window.signin = signin;
window.forgot = forgot;
window.resendconfirmemail = resendconfirmemail;
window.resendotp = resendotp;
window.signinwithottoken = signinwithottoken;

import {info, logout, confirmemail} from './js/gufo.js';
window.info = info;
window.logout = logout;
window.confirmemail = confirmemail;

import {
  showcompany,
  showcompanies,
  showaccounts,
  addcompany,
  delcompany,
  uploadcompanyfile,
  showcomapnyfile,
  companyavatar,
  showcompanyaddress,
  showcompanybanks,
  showcompanycryptos,
  showcompanyphones,
  showcompanyemails,
  showcompanyurls,
  showcompanyfiles,
  companylogo,
  companyshortlogo,
  companyinvoicelogo,
  showcompanycustom,
  addcompanyfolder,
  showcompanybrokers,
  showcompanyshareholders,
  showcompanypaymentsystems,
  showcompanydirectors
} from './js/catalog/company.js';
window.showcompany = showcompany;
window.showcompanies = showcompanies;
window.showaccounts = showaccounts;
window.addcompany = addcompany;
window.delcompany = delcompany;
window.uploadcompanyfile = uploadcompanyfile;
window.showcomapnyfile = showcomapnyfile;
window.companyavatar = companyavatar;
window.showcompanyaddress = showcompanyaddress;
window.showcompanybanks = showcompanybanks;
window.showcompanycryptos = showcompanycryptos;
window.showcompanyphones = showcompanyphones;
window.showcompanyemails = showcompanyemails;
window.showcompanyurls = showcompanyurls;
window.showcompanyfiles = showcompanyfiles;
window.companylogo = companylogo;
window.addcompanyfolder = addcompanyfolder;
window.companyshortlogo = companyshortlogo;
window.companyinvoicelogo = companyinvoicelogo;
window.showcompanycustom = showcompanycustom;
window.showcompanybrokers = showcompanybrokers;
window.showcompanydirectors = showcompanydirectors;
window.showcompanyshareholders = showcompanyshareholders;
window.showcompanypaymentsystems = showcompanypaymentsystems;

import {
  showperson,
  showpersons,
  addperson,
  delperson,
  uploadpersonfile,
  showpersonfile,
  personavatar,
  showpersondetails,
  showpersonaddress,
  showpersonbanks,
  showpersoncryptos,
  showpersonphones,
  showpersonemails,
  showpersonurls,
  showpersonfiles,
  showpersoncustom
} from './js/catalog/person.js';
window.showperson = showperson;
window.showpersons = showpersons;
window.addperson = addperson;
window.delperson = delperson;
window.uploadpersonfile = uploadpersonfile;
window.showpersonfile = showpersonfile;
window.personavatar = personavatar;
window.showpersondetails = showpersondetails;
window.showpersonaddress = showpersonaddress;
window.showpersonbanks = showpersonbanks;
window.showpersoncryptos = showpersoncryptos;
window.showpersonphones = showpersonphones;
window.showpersonemails = showpersonemails;
window.showpersonurls = showpersonurls;
window.showpersonfiles = showpersonfiles;
window.showpersoncustom = showpersoncustom;

import {
  showcustomers,
  addcustomer
} from './js/catalog/customers.js';
window.showcustomers = showcustomers;
window.addcustomer = addcustomer;

import {
  showfixedasset,
  showfixedassets,
  addfixedasset,
  fixedassetavatar,
  fixedassetamortisation
} from './js/catalog/fixedassets.js';
window.showfixedasset = showfixedasset;
window.showfixedassets = showfixedassets;
window.addfixedasset = addfixedasset;
window.fixedassetavatar = fixedassetavatar;
window.fixedassetamortisation = fixedassetamortisation;

import {
  showinvoicepdf,
  addinvoice,
  compliteinvoice,
  markassent,
  uploadinvoice
} from './js/documents/invoice.js';
window.showinvoicepdf = showinvoicepdf;
window.addinvoice = addinvoice;
window.compliteinvoice = compliteinvoice;
window.markassent = markassent;
window.uploadinvoice = uploadinvoice;

import {
  showinvoice,
  showinvoices,
  duplicateinvoice,
  addincomeinvoice,
  showincomeinvoice,
  showincomeinvoices,
  uploadincomeinvoice,
  showincomeinvoicefile,
  emailinvoice,
  compliteincominginvoice
  } from './js/journals/invoices.js';
window.showinvoice = showinvoice;
window.showinvoices = showinvoices;
window.duplicateinvoice = duplicateinvoice;
window.addincomeinvoice = addincomeinvoice;
window.showincomeinvoice = showincomeinvoice;
window.showincomeinvoices = showincomeinvoices;
window.uploadincomeinvoice = uploadincomeinvoice;
window.showincomeinvoicefile = showincomeinvoicefile;
window.emailinvoice = emailinvoice;
window.compliteincominginvoice = compliteincominginvoice;

import {
  showincomes,
  addincome,
  showincome,
  getreceipt,
  compliteincome
} from './js/journals/incomes.js';
window.showincomes = showincomes;
window.addincome = addincome;
window.showincome = showincome;
window.getreceipt = getreceipt;
window.compliteincome = compliteincome;

import {
  addloan,
  showloans,
  showloan,
  showloantransactions,
  getcurrentloanamount
} from './js/journals/loans.js';
window.addloan = addloan;
window.showloans = showloans;
window.showloan = showloan;
window.showloantransactions = showloantransactions;
window.getcurrentloanamount = getcurrentloanamount;


import {
  showpayments,
  showpayment,
  showpaymentreceipt,
  uploadipaymentreceipt,
  addpayment,
  complitepayment
} from './js/journals/payments.js';
window.showpayments = showpayments;
window.showpayment = showpayment;
window.showpaymentreceipt = showpaymentreceipt;
window.uploadipaymentreceipt = uploadipaymentreceipt;
window.addpayment = addpayment;
window.complitepayment = complitepayment;

import {
  showtransfers,
  showtransfer,
  addtransfer,
  complitetransfer
} from './js/journals/transfers.js';
window.showtransfers = showtransfers;
window.showtransfer = showtransfer;
window.addtransfer = addtransfer;
window.complitetransfer = complitetransfer;

import {
  addagreement,
  uploadagreementfile,
  showagreements,
  showagreement,
  showagreementfiles,
  getagreementfile,
  agreementswichactive,
  agreementexpire
} from './js/journals/agreements.js';
window.addagreement = addagreement;
window.uploadagreementfile = uploadagreementfile;
window.showagreements = showagreements;
window.showagreement = showagreement;
window.showagreementfiles = showagreementfiles;
window.getagreementfile = getagreementfile;
window.agreementswichactive = agreementswichactive;
window.agreementexpire = agreementexpire;

import {
  addmail,
  uploadmailfile,
  showincommails,
  showoutgoingmails,
  showincomemail,
  showoutgoingmail,
  showmailfiles,
  getmailfile
} from './js/journals/correspondence.js';
window.addmail = addmail;
window.uploadmailfile = uploadmailfile;
window.showincommails = showincommails;
window.showoutgoingmails = showoutgoingmails;
window.showincomemail = showincomemail;
window.showoutgoingmail = showoutgoingmail;
window.showmailfiles = showmailfiles;
window.getmailfile = getmailfile;

import {uploadsteatment, getsteatment, getsteatmentfiles} from './js/journals/steatments.js';
window.uploadsteatment = uploadsteatment;
window.getsteatment = getsteatment;
window.getsteatmentfiles = getsteatmentfiles;

import {uploadavatar, showavatar} from './js/user/avatar.js';
window.uploadavatar = uploadavatar;
window.showavatar = showavatar;

import {switchcompany} from './js/user/company.js';
window.switchcompany = switchcompany;

import {setdateformat} from './js/user/settings.js';
window.setdateformat = setdateformat;

import {addlanguage, showlanguages} from './js/dictionary/languages.js';
window.addlanguage = addlanguage;
window.showlanguages = showlanguages;

import {addcurrency, getcurrencies} from './js/dictionary/currency.js';
window.addcurrency = addcurrency;
window.getcurrencies = getcurrencies;

import {addcompanytype, getcompanytypes} from './js/dictionary/companytypes.js';
window.addcompanytype = addcompanytype;
window.getcompanytypes = getcompanytypes;

import {addcountry, getcountries, addcity, getcities} from './js/dictionary/country.js';
window.addcountry = addcountry;
window.getcountries = getcountries;
window.addcity = addcity;
window.getcities = getcities;

import {addcrypto, showcryptocurrencies} from './js/dictionary/cryptocurrencies.js';
window.addcrypto = addcrypto;
window.showcryptocurrencies = showcryptocurrencies;

import {addact, showacts} from './js/dictionary/accountcharttypes.js';
window.addact = addact;
window.showacts = showacts;

import {addvat, showvats} from './js/dictionary/vat.js';
window.addvat = addvat;
window.showvats = showvats;

import {addaccounting, showchartcategories, showchartsubcategories, showchartbwaforms, showchartbwagroups, showchart} from './js/dictionary/accounting.js';
window.addaccounting = addaccounting;
window.showchartcategories = showchartcategories;
window.showchartsubcategories = showchartsubcategories;
window.showchartbwaforms = showchartbwaforms;
window.showchartbwagroups = showchartbwagroups;
window.showchart = showchart;

import {
  showactransactions,
  showsaldo

} from './js/accounting/transactions.js';
window.showactransactions = showactransactions;
window.showsaldo = showsaldo;



import {
  accountconnect,
  showvatconnections,
  showvobjectconnections,
  addobjconnect
} from './js/accounting/connections.js';
window.accountconnect = accountconnect;

import {
  showglline,
  showgl,
  addgl,
  delgl,
  modifygl,
  addglcomment,
  switchglflag,
  summaraizebalance
} from './js/accounting/generalledger.js';
window.showglline = showglline;
window.showgl = showgl;
window.addgl = addgl;
window.delgl = delgl;
window.modifygl = modifygl;
window.addglcomment = addglcomment;
window.switchglflag = switchglflag;
window.summaraizebalance = summaraizebalance;

import {
  addstaffinfo,
  showstaffcards,
  showstaffcard,
  getpayslippdf
} from './js/hr/staff.js';
window.addstaffinfo = addstaffinfo;
window.showstaffcards = showstaffcards;
window.showstaffcard = showstaffcard;
window.getpayslippdf = getpayslippdf;
