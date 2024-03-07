import { Store, get, set, del, clear, keys } from './plugins/idb-keyval.mjs';
window.Store = Store;
window.get = get;
window.del = del;
window.set = set;
window.clear = clear;
window.keys = keys;
const SessionStore = new Store('erp-db', 'session')
window.SessionStore = SessionStore;

var $ = require("jquery");
window.$ = $;
window.jQuery = $;


require("components-unison");
require("bootstrap");
require("bootstrap-datepicker");
//require("bootstrap-icons");
require("bootstrap-select");
require("hammerjs");
require("jquery-blockui");
require("jquery-match-height");
require("jquery-slinky");
require("jquery-ui");

require("pace-js");
require("popper.js");
var screenfull = require("screenfull");
window.screenfull = screenfull;
require("jquery.repeater");
require("./js/app/form-repeater.js");
require("dropzone");
require("./js/app/dropzone.js");
require("jquery-validation");
require("daterangepicker");
require("moment");
require("../node_modules/jquery-resizable-columns/dist/jquery.resizableColumns.js");
//require("bootstrap-table");
require("../node_modules/bootstrap-table/dist/bootstrap-table.js");
require("bootstrap-table-mobile");
//require("storejs");






import Cropper from 'cropperjs';
window.Cropper = Cropper;

require("../node_modules/jquery-steps/build/jquery.steps.js");
require("./js/app/wizard-steps.js");

import PerfectScrollbar from 'perfect-scrollbar';
window.PerfectScrollbar = PerfectScrollbar;
//require("themify-icons-scss");






var download = require("downloadjs");
window.download = download;


//import pdfjsLib from 'pdfjs-dist/webpack';

require("bootstrap-icons/bootstrap-icons.svg");

import {server, SessonKey} from './js/app/consts.js';
window.server = server;
window.SessonKey = SessonKey;


import {
  mungeEmailAddress,
  GetUrlParameter,
  getpagepath,
  getlang,
  responsecode,
  engresponsecode,
  deresponsecode,
  getlangpath,
  gettoken,
  alertwindow,
  shortcounrty,
  darktheme,
  lighttheme,
  openfile,
  nosession,
  setpersonavatar,
  setcompanyavatar,
  failedanswer,
  statusFormatter,
  currencyFormatter,
  paidFormatter,
  ininvoicesAttributes,
  glAttributes,
  flagFormatter,
  addressFormatter,
  accountslistAttributes,
  companylogoFormatter,
  paymentsAttributes,
  sentFormatter,
  outinvoicesAttributes,
  incomesAttributes,
  faAttributes,
  CPFormatter,
  toBinary,
transfersAttributes} from './js/app/general.js';
window.toBinary = toBinary;
window.mungeEmailAddress = mungeEmailAddress;
window.GetUrlParameter = GetUrlParameter;
window.getpagepath = getpagepath;
window.getlang = getlang;
window.responsecode = responsecode;
window.engresponsecode = engresponsecode;
window.deresponsecode = deresponsecode;
window.getlangpath = getlangpath;
window.gettoken = gettoken;
window.alertwindow = alertwindow;
window.shortcounrty = shortcounrty;
window.darktheme = darktheme;
window.lighttheme = lighttheme;
window.openfile = openfile;
window.nosession = nosession;
window.setpersonavatar = setpersonavatar;
window.setcompanyavatar = setcompanyavatar;
window.failedanswer = failedanswer;
window.statusFormatter = statusFormatter;
window.currencyFormatter = currencyFormatter;
window.paidFormatter = paidFormatter;
window.ininvoicesAttributes = ininvoicesAttributes;
window.glAttributes = glAttributes;
window.flagFormatter = flagFormatter;
window.addressFormatter = addressFormatter;
window.accountslistAttributes = accountslistAttributes;
window.companylogoFormatter = companylogoFormatter;
window.paymentsAttributes = paymentsAttributes;
window.transfersAttributes = transfersAttributes;
window.sentFormatter = sentFormatter;
window.outinvoicesAttributes = outinvoicesAttributes;
window.incomesAttributes = incomesAttributes;
window.faAttributes = faAttributes;
window.CPFormatter = CPFormatter;












import {
  incomesloader,
  incomeloader,
  incomesmailloader,
  addincommailloader,
  incomemailloader,
  ioutgoingmailsloader,
  addoutgoingmailloader,
  outgoingmailloader,
  incominginvoiceloader,
  showincominginvoiceloader,
  paymentsloader,
  showpaymentloader,
  steatmentsloader,
  addincomeloader,
  addpaymentloader,
  addincominginvoiceloader,
  loansloader,
  addloanloader,
  showloanloader,
  showtransfersloader,
  addransferloader,
  transferloader
} from './js/app/pages/journalsload.js';
window.incomesloader = incomesloader;
window.incomeloader = incomeloader;
window.incomesmailloader = incomesmailloader;
window.addincommailloader = addincommailloader;
window.incomemailloader = incomemailloader;
window.ioutgoingmailsloader = ioutgoingmailsloader;
window.addoutgoingmailloader = addoutgoingmailloader;
window.outgoingmailloader = outgoingmailloader;
window.incominginvoiceloader = incominginvoiceloader;
window.showincominginvoiceloader = showincominginvoiceloader;
window.paymentsloader = paymentsloader;
window.showpaymentloader = showpaymentloader;
window.steatmentsloader = steatmentsloader;
window.addincomeloader = addincomeloader;
window.addpaymentloader = addpaymentloader;
window.addincominginvoiceloader = addincominginvoiceloader;
window.loansloader = loansloader;
window.addloanloader = addloanloader;
window.showloanloader = showloanloader;
window.showtransfersloader = showtransfersloader;
window.addransferloader = addransferloader;
window.transferloader = transferloader;


import {
  glloader,
  objectconnectloader
} from './js/app/pages/accounting.js';
window.glloader = glloader;
window.objectconnectloader = objectconnectloader;

import {
  getsession
} from './js/app/loader.js';
window.getsession = getsession;


import {
  currenciesloader,
  languagesloader,
  cryptocurrenciesloader,
  account_chart_typeloader,
  countriesloader,
  companytypesloader,
  vatsloader
} from './js/app/pages/dictionary.js';
window.currenciesloader = currenciesloader;
window.languagesloader = languagesloader;
window.cryptocurrenciesloader = cryptocurrenciesloader;
window.account_chart_typeloader = account_chart_typeloader;
window.countriesloader = countriesloader;
window.companytypesloader = companytypesloader;
window.vatsloader = vatsloader;


import {
  customersloader,
  fixedassetsloader,
  addfixedassetsloader,
  showfixedassetloader
} from './js/app/pages/catalog.js';
window.customersloader = customersloader;
window.fixedassetsloader = fixedassetsloader;
window.addfixedassetsloader = addfixedassetsloader;
window.showfixedassetloader = showfixedassetloader;

import {
  staffsloader,
  staffcardloader,
  warehousesloader
} from './js/app/pages/hr.js';
window.staffsloader = staffsloader;
window.staffcardloader = staffcardloader;
window.warehousesloader = warehousesloader;

import {
  pagebuilder,
  tokensign,
  forgotbuilder,
  getversion,
  checkforperiods,
  checkforcompany,
  formpagebuilder,
  storeSession,
  logout,
  signup,
  signin,
  contactus,
  confirmemail,
  restore,
  confirmemailreq, //
  dashboardbuilder,
  createmycompanyloader,
  createcompanyloader,
  addpersonloader,
  companyprofilebuilder,
  accountprofilebuilder,
  personprofilebuilder,
  accountsbuilder,
  createinvoiceloader,
  importagreementloader,
  companiesbuilder,
  personsbuilder,
  outgoinginvoiceloader,
  agreementsloader,
  showinvoiceloader,
  editinvoiceloader,
  showagreementloader
} from './js/app/generaljquery.js';
window.pagebuilder = pagebuilder;
window.tokensign = tokensign;
window.forgotbuilder = forgotbuilder;
window.getversion = getversion;
window.checkforperiods = checkforperiods;
window.checkforcompany = checkforcompany;
window.formpagebuilder = formpagebuilder;
window.storeSession = storeSession;
//window.logout = logout;
window.signup = signup;
//window.signin = signin;
window.contactus = contactus;
window.confirmemail = confirmemail;
window.restore = restore;
window.confirmemailreq = confirmemailreq;
window.dashboardbuilder = dashboardbuilder;
window.createmycompanyloader = createmycompanyloader;
window.createcompanyloader = createcompanyloader;
window.addpersonloader = addpersonloader;
window.companyprofilebuilder = companyprofilebuilder;
window.accountprofilebuilder = accountprofilebuilder;
window.personprofilebuilder = personprofilebuilder;
window.accountsbuilder = accountsbuilder;
window.createinvoiceloader = createinvoiceloader;
window.importagreementloader = importagreementloader;
window.companiesbuilder = companiesbuilder;
window.personsbuilder = personsbuilder;
window.outgoinginvoiceloader = outgoinginvoiceloader;
window.agreementsloader = agreementsloader;
window.showinvoiceloader = showinvoiceloader;
window.editinvoiceloader = editinvoiceloader;
window.showagreementloader = showagreementloader;

require("./js/query.js");
require("./js/erpnew/index.js");
require("./js/app/generaljq.js");
require("./js/app/my_company/mycompany.js");
require("./js/app/invoices.js");
require("./js/app/incomes.js");
require("./js/app/catalog.js");
require("./js/app/hr.js");
require("./js/app/loans.js");
require("./js/app/agreements.js");
require("./js/app/dictionary.js");
require("./js/app/payments.js");
require("./js/app/steatments.js");
require("./js/app/accounting.js");
require("./js/app/journals.js");
require("./js/app/app-menu.js");
require("./js/app/app.js");
require("./js/app/settings.js");
require("./js/app/correspondence.js");
var Switchery = require('switchery');
window.Switchery = Switchery;
var elem = document.querySelector('.js-switch');
var init = new Switchery(elem);



//require("./js/app/switchery.min.js");
//require("./js/app/switchery.js");
//require("./js/app/wizard-steps.js");
